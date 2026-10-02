import { IsUUID } from "class-validator";

export class UploadDocumentDto {
  @IsUUID()
  subjectId: string;
}