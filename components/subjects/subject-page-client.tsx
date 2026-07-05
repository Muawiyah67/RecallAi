"use client"

import * as React from "react"
import { toast } from "sonner"

import { ChatThread } from "@/components/chat/chat-thread"
import { DocumentList } from "@/components/subjects/document-list"
import { StudyToolsPanel, type StudyToolsMode } from "@/components/subjects/study-tools-panel"
import { SubjectTopActions } from "@/components/subjects/subject-top-actions"
import { DocumentViewer } from "@/components/document-viewer/document-viewer"
import { UploadFlow } from "@/components/upload/upload-flow"
import { H1, Muted } from "@/components/ui/typography"
import { getSubjectSummary, getStudyPlan } from "@/lib/study-content"
import { cn } from "@/lib/utils"
import type { ChatMessage, Document, Source, Subject } from "@/lib/types"

type MobileTab = "documents" | "chat" | "tools"

const MOBILE_TABS: { key: MobileTab; label: string }[] = [
  { key: "documents", label: "Documents" },
  { key: "chat", label: "Chat" },
  { key: "tools", label: "Study Tools" },
]

export function SubjectPageClient({
  subject,
  initialDocuments,
  initialMessages,
}: {
  subject: Subject
  initialDocuments: Document[]
  initialMessages: ChatMessage[]
}) {
  const [documents, setDocuments] = React.useState(initialDocuments)
  const [mobileTab, setMobileTab] = React.useState<MobileTab>("chat")

  const [uploadOpen, setUploadOpen] = React.useState(false)

  const [viewerOpen, setViewerOpen] = React.useState(false)
  const [viewerDoc, setViewerDoc] = React.useState<Document | null>(null)
  const [viewerPage, setViewerPage] = React.useState(1)

  const [studyMode, setStudyMode] = React.useState<StudyToolsMode>("default")
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [generatedContent, setGeneratedContent] = React.useState<string | null>(null)

  function openDocument(doc: Document, page = 1) {
    setViewerDoc(doc)
    setViewerPage(page)
    setViewerOpen(true)
  }

  function handleOpenSource(source: Source) {
    const doc = documents.find((d) => d.id === source.documentId)
    if (doc) openDocument(doc, source.page)
  }

  function handleUploadComplete(filename: string) {
    const newDoc: Document = {
      id: `doc-${Date.now()}`,
      subjectId: subject.id,
      filename,
      uploadedAt: new Date().toISOString(),
      pages: Math.floor(Math.random() * 15) + 5,
      sizeKb: Math.floor(Math.random() * 3000) + 500,
      status: "ready",
    }
    setDocuments((prev) => [newDoc, ...prev])
    toast.success(`${filename} added to ${subject.name}`)
  }

  function runGeneration(mode: "summary" | "plan") {
    setStudyMode(mode)
    setIsGenerating(true)
    setGeneratedContent(null)
    setTimeout(() => {
      setGeneratedContent(mode === "summary" ? getSubjectSummary(subject) : getStudyPlan(subject))
      setIsGenerating(false)
    }, 900)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <H1>{subject.name}</H1>
        <Muted>{subject.description}</Muted>
      </div>

      <SubjectTopActions
        subjectId={subject.id}
        onUpload={() => setUploadOpen(true)}
        onSummarize={() => runGeneration("summary")}
        onStudyPlan={() => runGeneration("plan")}
      />

      <div className="flex gap-1 rounded-lg bg-muted p-1 lg:hidden">
        {MOBILE_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setMobileTab(tab.key)}
            className={cn(
              "flex-1 rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
              mobileTab === tab.key
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex min-w-0 flex-col gap-4 lg:grid lg:h-[75vh] lg:grid-cols-[18rem_1fr_20rem]">
        <div
          className={cn(
            "h-[70vh] overflow-y-auto rounded-lg border border-border p-3 lg:h-full",
            mobileTab === "documents" ? "block" : "hidden",
            "lg:block"
          )}
        >
          <DocumentList documents={documents} onSelect={(doc) => openDocument(doc)} />
        </div>

        <div
          className={cn(
            "h-[70vh] min-h-0 rounded-lg border border-border lg:h-full",
            mobileTab === "chat" ? "block" : "hidden",
            "lg:block"
          )}
        >
          <ChatThread
            subjectId={subject.id}
            subjectName={subject.name}
            initialMessages={initialMessages}
            onOpenSource={handleOpenSource}
          />
        </div>

        <div
          className={cn(
            "h-[70vh] overflow-y-auto rounded-lg border border-border p-3 lg:h-full",
            mobileTab === "tools" ? "block" : "hidden",
            "lg:block"
          )}
        >
          <StudyToolsPanel
            subject={subject}
            mode={studyMode}
            isGenerating={isGenerating}
            generatedContent={generatedContent}
            onBack={() => setStudyMode("default")}
          />
        </div>
      </div>

      <UploadFlow
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        subjectName={subject.name}
        onComplete={handleUploadComplete}
      />
      <DocumentViewer
        open={viewerOpen}
        onOpenChange={setViewerOpen}
        doc={viewerDoc}
        initialPage={viewerPage}
      />
    </div>
  )
}
