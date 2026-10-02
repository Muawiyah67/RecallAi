import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";

import { SessionGuard, type AuthenticatedRequest } from "../auth/guards/session.guard";
import { DocumentsService } from "./Documents.service";
import { UploadDocumentDto } from "./dto/upload-document.dto";

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // matches the Storage bucket's default limit

@Controller("documents")
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @UseGuards(SessionGuard)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: memoryStorage(), // keeps the file in memory as a Buffer,
      // since it's being forwarded straight to Supabase Storage — never
      // touches this server's own disk.
      limits: { fileSize: MAX_FILE_SIZE },
    })
  )
  async upload(
    @Req() req: AuthenticatedRequest,
    @Body() dto: UploadDocumentDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) {
      throw new BadRequestException("No file provided");
    }
    // Note: this checks the mimetype the client's browser reported, which
    // isn't cryptographically verified — someone could lie about it. Fine
    // for a personal project; a production one would want to sniff the
    // file's actual content instead of trusting this header.
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException("Unsupported file type. Upload a PDF, DOC, DOCX, or TXT file.");
    }

    const userId = req.user!.id;
    return this.documentsService.uploadDocument(userId, dto, file);
  }
}