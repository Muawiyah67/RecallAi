import { randomUUID } from "crypto";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";

import { SupabaseService } from "../supabase/supabase.service";
import type { UploadDocumentDto } from "./dto/upload-document.dto";

const BUCKET = "documents";

@Injectable()
export class DocumentsService {
  constructor(private readonly supabase: SupabaseService) {}

  async uploadDocument(userId: string, dto: UploadDocumentDto, file: Express.Multer.File) {
    // Confirm this subject actually belongs to this user before attaching
    // anything to it — dto.subjectId is just a string the client sent,
    // never trust it points where it claims to without checking.
    const { data: subject, error: subjectError } = await this.supabase.admin
      .from("subjects")
      .select("id")
      .eq("id", dto.subjectId)
      .eq("user_id", userId)
      .maybeSingle();

    if (subjectError) {
      throw new BadRequestException(subjectError.message);
    }
    if (!subject) {
      throw new NotFoundException("Subject not found");
    }

    const documentId = randomUUID();
    const safeFilename = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    // Must start with the uploader's own user ID — the storage RLS
    // policies from the migration check exactly this first path segment.
    const storagePath = `${userId}/${documentId}-${safeFilename}`;

    const { error: uploadError } = await this.supabase.admin.storage
      .from(BUCKET)
      .upload(storagePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (uploadError) {
      throw new BadRequestException(uploadError.message);
    }

    const { data: document, error: insertError } = await this.supabase.admin
      .from("documents")
      .insert({
        id: documentId,
        subject_id: dto.subjectId,
        user_id: userId,
        filename: file.originalname,
        storage_path: storagePath,
        size_kb: Math.round(file.size / 1024),
        // No text-extraction pipeline exists yet, so there's nothing left
        // to process after the upload itself — this goes straight to
        // "ready". pages stays null until real extraction can fill it in.
        status: "ready",
      })
      .select()
      .single();

    if (insertError) {
      // The file made it into Storage but the row failed — clean up rather
      // than leave an orphaned file nothing points at.
      await this.supabase.admin.storage.from(BUCKET).remove([storagePath]);
      throw new BadRequestException(insertError.message);
    }

    return document;
  }
}