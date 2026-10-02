import { IsString, MinLength } from "class-validator";

export class ResetPasswordDto {
  @IsString()
  @MinLength(8)
  password: string;

  // This is the token from the reset-link URL — see the note on
  // AuthService.resetPassword for what it actually needs to contain.
  @IsString()
  token: string;
}