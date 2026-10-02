import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";

import { SessionGuard, type AuthenticatedRequest } from "../auth/guards/session.guard";
import { CreateSubjectDto } from "./dto/CreateSubject.dto";
import { UpdateSubjectDto } from "./dto/UpdateSubject.dto";
import { SubjectsService } from "./subjects.service";

@Controller("subjects")
@UseGuards(SessionGuard) // applies to every route below, not just one
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  list(@Req() req: AuthenticatedRequest) {
    return this.subjectsService.listSubjects(req.user!.id);
  }

  @Post()
  create(@Req() req: AuthenticatedRequest, @Body() dto: CreateSubjectDto) {
    return this.subjectsService.createSubject(req.user!.id, dto);
  }

  @Patch(":id")
  update(@Req() req: AuthenticatedRequest, @Param("id") id: string, @Body() dto: UpdateSubjectDto) {
    return this.subjectsService.updateSubject(req.user!.id, id, dto);
  }

  @Delete(":id")
  remove(@Req() req: AuthenticatedRequest, @Param("id") id: string) {
    return this.subjectsService.deleteSubject(req.user!.id, id);
  }
}