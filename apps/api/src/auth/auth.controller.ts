import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import type { Response } from "express";
import type { Session } from "@supabase/supabase-js";

import { AuthService } from "./auth.service";
import { SESSION_COOKIE } from "./constants";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { LoginDto } from "./dto/login.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { SignupDto } from "./dto/signup.dto";
import { SessionGuard, type AuthenticatedRequest } from "./guards/session.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const session = await this.authService.login(dto);
    this.setSessionCookie(res, session);
    return { user: session.user };
  }

  @Post("signup")
  async signup(@Body() dto: SignupDto, @Res({ passthrough: true }) res: Response) {
    const { session, requiresEmailConfirmation } = await this.authService.signup(dto);

    if (requiresEmailConfirmation || !session) {
      return { requiresEmailConfirmation: true };
    }

    this.setSessionCookie(res, session);
    return { user: session.user };
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) res: Response) {
    // Purely a cookie clear — there's no server-side session store to also
    // invalidate here, since the cookie holds the Supabase access token
    // directly rather than a reference to one.
    res.clearCookie(SESSION_COOKIE, { path: "/" });
    return { success: true };
  }

  @Get("me")
  @UseGuards(SessionGuard)
  me(@Req() req: AuthenticatedRequest) {
    return { user: req.user };
  }

  @Post("forgot-password")
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    await this.authService.forgotPassword(dto);
    return { success: true };
  }

  @Post("reset-password")
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.authService.resetPassword(dto);
    return { success: true };
  }

  private setSessionCookie(res: Response, session: Session) {
    res.cookie(SESSION_COOKIE, session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: session.expires_in * 1000,
      path: "/",
    });
  }
}