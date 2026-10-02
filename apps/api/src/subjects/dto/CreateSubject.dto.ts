import { IsHexColor, IsOptional, IsString, MinLength } from "class-validator";

export class CreateSubjectDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsHexColor()
  color?: string;
}