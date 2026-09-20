import Link from "next/link"
import { FileText, Upload } from "lucide-react"

import { DocumentStatusBadge } from "@/components/document-status-badge"
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { getSubjectById, recentUploads } from "@/lib/dummy-data"
import { formatFileSize, formatRelativeTime } from "@/lib/format"

export function RecentUploadsList() {
  if (recentUploads.length === 0) {
    return (
      <Empty>
        <EmptyMedia variant="icon">
          <Upload />
        </EmptyMedia>
        <EmptyTitle>No uploads yet</EmptyTitle>
        <EmptyDescription>Documents you upload will show up here.</EmptyDescription>
      </Empty>
    )
  }

  return (
    <ItemGroup>
      {recentUploads.map((doc) => {
        const subject = getSubjectById(doc.subjectId)
        return (
          <Item key={doc.id} variant="outline" asChild>
            <Link href={`/subjects/${doc.subjectId}`}>
              <ItemMedia variant="icon">
                <FileText />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{doc.filename}</ItemTitle>
                <ItemDescription>
                  {subject?.name} · {doc.pages} pages · {formatFileSize(doc.sizeKb)} · {formatRelativeTime(doc.uploadedAt)}
                </ItemDescription>
              </ItemContent>
              <DocumentStatusBadge status={doc.status} />
            </Link>
          </Item>
        )
      })}
    </ItemGroup>
  )
}
