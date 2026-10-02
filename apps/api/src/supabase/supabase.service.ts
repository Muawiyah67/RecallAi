import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class SupabaseService {
  // Anon-key client — safe for the regular auth flows (login, signup,
  // verifying a user's own access token).
  public readonly client: SupabaseClient;

  // Service-role client — has admin privileges and bypasses row-level
  // security. Only used for actions a user's own token can't perform, like
  // finishing a password reset. This key must never reach the frontend.
  public readonly admin: SupabaseClient;

  constructor(private readonly config: ConfigService) {
    const url = this.config.getOrThrow<string>("SUPABASE_URL");
    const anonKey = this.config.getOrThrow<string>("SUPABASE_ANON_KEY");
    const serviceRoleKey = this.config.getOrThrow<string>("SUPABASE_SERVICE_ROLE_KEY");

    this.client = createClient(url, anonKey);
    this.admin = createClient(url, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }
}