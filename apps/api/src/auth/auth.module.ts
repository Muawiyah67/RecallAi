import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SessionGuard } from "./guards/session.guard";

@Module({
  controllers: [AuthController],
  providers: [AuthService, SessionGuard],
  // Exported so later modules (documents, chat) can reuse SessionGuard to
  // protect their own routes without redefining it.
  exports: [SessionGuard],
})
export class AuthModule {}