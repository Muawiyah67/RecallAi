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
import { formatFileSize, formatRelativeTime } from "@/lib/format"
import type { Document } from "@/lib/types"

export function DocumentList({
  documents,
  onSelect,
}: {
  documents: Document[]
  onSelect: (doc: Document) => void
}) {
  if (documents.length === 0) {
    return (
      <Empty className="mt-6">
        <EmptyMedia variant="icon">
          <Upload />
        </EmptyMedia>
        <EmptyTitle>No documents yet</EmptyTitle>
        <EmptyDescription>Upload a file to start chatting with this subject.</EmptyDescription>
      </Empty>
    )
  }

  return (
    <ItemGroup>
      {documents.map((doc) => (
        <Item key={doc.id} variant="outline" size="sm" asChild className="cursor-pointer">
          <button type="button" onClick={() => onSelect(doc)} className="text-left">
            <ItemMedia variant="icon">
              <FileText />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{doc.filename}</ItemTitle>
              <ItemDescription>
                {formatRelativeTime(doc.uploadedAt)} · {doc.pages} pages · {formatFileSize(doc.sizeKb)}
              </ItemDescription>
            </ItemContent>
            <DocumentStatusBadge status={doc.status} />
          </button>
        </Item>
      ))}
    </ItemGroup>
  )
}
