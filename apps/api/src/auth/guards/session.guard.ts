import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import type { Request } from "express";
import type { User } from "@supabase/supabase-js";

import { SupabaseService } from "../../supabase/supabase.service";
import { SESSION_COOKIE } from "../constants";

export interface AuthenticatedRequest extends Request {
  user?: User;
}

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly supabase: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = req.cookies?.[SESSION_COOKIE];

    if (!token) {
      throw new UnauthorizedException("Not signed in.");
    }

    const { data, error } = await this.supabase.client.auth.getUser(token);
    if (error || !data.user) {
      throw new UnauthorizedException("Session expired or invalid.");
    }

    req.user = data.user;
    return true;
  }
}