import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";

import { SupabaseService } from "../supabase/supabase.service";
import type { CreateSubjectDto } from "./dto/CreateSubject.dto";
import type { UpdateSubjectDto } from "./dto/UpdateSubject.dto";

@Injectable()
export class SubjectsService {
  constructor(private readonly supabase: SupabaseService) {}

  async listSubjects(userId: string) {
    // documents(count) is a PostgREST feature: it uses the foreign key
    // from documents.subject_id -> subjects.id to return a live count,
    // rather than us storing a documentCount column that could drift out
    // of sync with reality.
    const { data, error } = await this.supabase.admin
      .from("subjects")
      .select("*, documents(count)")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false });

    if (error) {
      throw new BadRequestException(error.message);
    }

    return (data ?? []).map((subject) => {
      const { documents, ...rest } = subject as typeof subject & {
        documents: { count: number }[];
      };
      return { ...rest, documentCount: documents?.[0]?.count ?? 0 };
    });
  }

  async createSubject(userId: string, dto: CreateSubjectDto) {
    const { data, error } = await this.supabase.admin
      .from("subjects")
      .insert({
        user_id: userId,
        name: dto.name,
        description: dto.description,
        ...(dto.color && { color: dto.color }),
      })
      .select()
      .single();

    if (error) {
      throw new BadRequestException(error.message);
    }
    return data;
  }

  async updateSubject(userId: string, subjectId: string, dto: UpdateSubjectDto) {
    await this.assertOwnership(userId, subjectId);

    const { data, error } = await this.supabase.admin
      .from("subjects")
      .update({
        ...(dto.name !== undefined && { name: dto.name }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.color !== undefined && { color: dto.color }),
      })
      .eq("id", subjectId)
      .select()
      .single();

    if (error) {
      throw new BadRequestException(error.message);
    }
    return data;
  }

  async deleteSubject(userId: string, subjectId: string) {
    await this.assertOwnership(userId, subjectId);

    // The documents FK is "on delete cascade", so this also removes every
    // document row under this subject. It does NOT remove the actual files
    // from the Storage bucket — those would need cleaning up separately.
    // Fine to leave as a known gap for now; not urgent for a non-production
    // project, but worth remembering before this ever has real users.
    const { error } = await this.supabase.admin.from("subjects").delete().eq("id", subjectId);

    if (error) {
      throw new BadRequestException(error.message);
    }
    return { success: true };
  }

  private async assertOwnership(userId: string, subjectId: string) {
    const { data, error } = await this.supabase.admin
      .from("subjects")
      .select("id")
      .eq("id", subjectId)
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      throw new BadRequestException(error.message);
    }
    if (!data) {
      throw new NotFoundException("Subject not found");
    }
  }
}