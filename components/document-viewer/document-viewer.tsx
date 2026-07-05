"use client"

import * as React from "react"
import { FileText } from "lucide-react"

import { PageThumbnails } from "@/components/document-viewer/page-thumbnails"
import { PdfPage } from "@/components/document-viewer/pdf-page"
import { ViewerToolbar } from "@/components/document-viewer/viewer-toolbar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Muted, Small } from "@/components/ui/typography"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getPageParagraphs, pageContainsQuery } from "@/lib/fake-page-content"
import { formatFileSize, formatRelativeTime } from "@/lib/format"
import type { Document } from "@/lib/types"

interface DocumentViewerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  doc: Document | null
  initialPage?: number
}

export function DocumentViewer({ open, onOpenChange, doc, initialPage = 1 }: DocumentViewerProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[85vh] w-full max-w-6xl! flex-col gap-0 p-0 sm:max-w-6xl!">
        {doc && (
          <ViewerBody key={`${doc.id}-${initialPage}`} doc={doc} initialPage={initialPage} />
        )}
      </DialogContent>
    </Dialog>
  )
}

function ViewerBody({ doc, initialPage }: { doc: Document; initialPage: number }) {
  const [page, setPage] = React.useState(initialPage)
  const [zoom, setZoom] = React.useState(100)
  const [searchQuery, setSearchQuery] = React.useState("")

  const matchingPages = searchQuery.trim()
    ? Array.from({ length: doc.pages }, (_, i) => i + 1).filter((p) =>
        pageContainsQuery(p, searchQuery)
      )
    : []

  function handlePageChange(next: number) {
    setPage(Math.min(Math.max(1, next), doc.pages))
  }

  function handleSearchChange(query: string) {
    setSearchQuery(query)
    const firstMatch = Array.from({ length: doc.pages }, (_, i) => i + 1).find((p) =>
      pageContainsQuery(p, query)
    )
    if (firstMatch) setPage(firstMatch)
  }

  const isCitedPage = page === initialPage
  const explanation = `This passage was surfaced because it directly discusses the concept referenced in the AI's answer. The highlighted paragraph on page ${initialPage} has the strongest semantic match to your question — it's why the model cited it as a source.`

  return (
    <>
      <DialogHeader className="flex-row items-center gap-2 border-b border-border px-4 py-3">
        <FileText className="size-4 shrink-0 text-muted-foreground" />
        <div className="flex min-w-0 flex-1 flex-col">
          <DialogTitle className="truncate text-sm">{doc.filename}</DialogTitle>
          <DialogDescription className="text-xs">
            {doc.pages} pages · {formatFileSize(doc.sizeKb)} · uploaded{" "}
            {formatRelativeTime(doc.uploadedAt)}
          </DialogDescription>
        </div>
      </DialogHeader>

      <ViewerToolbar
        page={page}
        pageCount={doc.pages}
        zoom={zoom}
        searchQuery={searchQuery}
        matchCount={matchingPages.length}
        onPageChange={handlePageChange}
        onZoomChange={setZoom}
        onSearchChange={handleSearchChange}
      />

      <div className="hidden min-h-0 flex-1 md:grid md:grid-cols-[7rem_1fr_20rem]">
        <div className="min-h-0 border-r border-border bg-muted/30">
          <PageThumbnails pageCount={doc.pages} currentPage={page} onSelect={handlePageChange} />
        </div>
        <div className="min-h-0 overflow-y-auto bg-muted/20 p-6">
          <PdfPage pageNumber={page} zoom={zoom} highlighted={isCitedPage} />
        </div>
        <div className="min-h-0 overflow-y-auto p-4">
          <ExplanationPanel explanation={explanation} isCitedPage={isCitedPage} citedPage={initialPage} />
        </div>
      </div>

      <Tabs defaultValue="document" className="flex min-h-0 flex-1 flex-col gap-0 md:hidden">
        <TabsList className="mx-3 mt-2">
          <TabsTrigger value="document">Document</TabsTrigger>
          <TabsTrigger value="explanation">AI Explanation</TabsTrigger>
        </TabsList>
        <TabsContent value="document" className="min-h-0 overflow-y-auto bg-muted/20 p-4">
          <PdfPage pageNumber={page} zoom={zoom} highlighted={isCitedPage} />
        </TabsContent>
        <TabsContent value="explanation" className="min-h-0 overflow-y-auto p-4">
          <ExplanationPanel explanation={explanation} isCitedPage={isCitedPage} citedPage={initialPage} />
        </TabsContent>
      </Tabs>
    </>
  )
}

function ExplanationPanel({
  explanation,
  isCitedPage,
  citedPage,
}: {
  explanation: string
  isCitedPage: boolean
  citedPage: number
}) {
  return (
    <div className="flex flex-col gap-3">
      <Small>AI Explanation</Small>
      {isCitedPage ? (
        <Muted>{explanation}</Muted>
      ) : (
        <Muted>Navigate to the cited page to see why this section was referenced.</Muted>
      )}
      <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-muted/30 p-3">
        <Small className="text-muted-foreground">Excerpt</Small>
        <p className="text-xs leading-relaxed text-foreground">{getPageParagraphs(citedPage)[0]}</p>
      </div>
    </div>
  )
}
