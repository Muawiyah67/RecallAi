import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Session } from "@supabase/supabase-js";

import { SupabaseService } from "../supabase/supabase.service";
import type { ForgotPasswordDto } from "./dto/forgot-password.dto";
import type { LoginDto } from "./dto/login.dto";
import type { ResetPasswordDto } from "./dto/reset-password.dto";
import type { SignupDto } from "./dto/signup.dto";

interface SignupResult {
  session: Session | null;
  requiresEmailConfirmation: boolean;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly config: ConfigService
  ) {}

  async login(dto: LoginDto): Promise<Session> {
    const { data, error } = await this.supabase.client.auth.signInWithPassword({
      email: dto.email,
      password: dto.password,
    });

    if (error || !data.session) {
      throw new UnauthorizedException(error?.message ?? "Invalid email or password");
    }

    return data.session;
  }

  async signup(dto: SignupDto): Promise<SignupResult> {
    const { data, error } = await this.supabase.client.auth.signUp({
      email: dto.email,
      password: dto.password,
      options: { data: { name: dto.name } },
    });

    if (error) {
      throw new BadRequestException(error.message);
    }

    // If your Supabase project has "Confirm email" turned on (Authentication
    // > Providers > Email in the dashboard), signUp succeeds but returns no
    // session — the account exists but can't log in until the confirmation
    // link is clicked. The controller needs to know which case this is
    // rather than silently trying to set a cookie from a null session.
    return {
      session: data.session,
      requiresEmailConfirmation: data.session === null,
    };
  }

  async getUserFromToken(token: string) {
    const { data, error } = await this.supabase.client.auth.getUser(token);
    if (error || !data.user) {
      throw new UnauthorizedException("Session expired or invalid.");
    }
    return data.user;
  }

  async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    const frontendUrl = this.config.get<string>("FRONTEND_URL") ?? "http://localhost:3000";

    // Deliberately not inspecting the result here — success or failure, the
    // controller always responds the same generic way. That's what stops
    // this endpoint being usable to check which emails have accounts, and
    // matches the message already built into ForgotPasswordForm.
    await this.supabase.client.auth.resetPasswordForEmail(dto.email, {
      redirectTo: `${frontendUrl}/reset-password`,
    });
  }

  async resetPassword(dto: ResetPasswordDto): Promise<void> {
    // IMPORTANT — this is the piece most likely to need adjusting once you
    // actually test the email flow end to end.
    //
    // Supabase's password-reset emails link back with a token, but *how*
    // that token arrives depends on your Supabase email template config.
    // This assumes the classic OTP-style flow: the link contains
    // `token_hash=...&type=recovery`, and `dto.token` is that token_hash
    // value (ResetPasswordForm currently reads it from a `?token=` query
    // param — same value, different param name is fine, they just both
    // need to refer to the same thing).
    //
    // If your Supabase email template instead uses the older
    // `#access_token=...` hash-fragment flow, verifyOtp below won't work —
    // that flow is designed to be consumed by the Supabase JS client
    // directly in the browser, not POSTed to a backend like this. Check
    // Authentication > Email Templates > Reset Password in the Supabase
    // dashboard to see which one you actually have configured.
    const { data, error } = await this.supabase.client.auth.verifyOtp({
      token_hash: dto.token,
      type: "recovery",
    });

    if (error || !data.user) {
      throw new BadRequestException("This reset link is invalid or has expired.");
    }

    // Updating the password requires admin privileges — the token we just
    // verified proves who the user is, but doesn't hand us a normal session
    // to update our own password with, so this goes through the
    // service-role client instead.
    const { error: updateError } = await this.supabase.admin.auth.admin.updateUserById(
      data.user.id,
      { password: dto.password }
    );

    if (updateError) {
      throw new BadRequestException(updateError.message);
    }
  }
}