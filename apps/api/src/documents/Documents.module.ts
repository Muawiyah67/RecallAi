import { Module } from "@nestjs/common";

import { DocumentsController } from "./Documents.controller";
import { DocumentsService } from "./Documents.service";

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}