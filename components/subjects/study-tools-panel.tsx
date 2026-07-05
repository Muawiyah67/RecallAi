import Link from "next/link"
import { ArrowLeft, FileStack, ListChecks } from "lucide-react"

import { MarkdownRenderer } from "@/components/chat/markdown-renderer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Spinner } from "@/components/ui/spinner"
import { SkeletonText } from "@/components/ui/skeleton"
import { Muted, Small } from "@/components/ui/typography"
import { formatRelativeTime } from "@/lib/format"
import type { Subject } from "@/lib/types"

export type StudyToolsMode = "default" | "summary" | "plan"

export function StudyToolsPanel({
  subject,
  mode,
  isGenerating,
  generatedContent,
  onBack,
}: {
  subject: Subject
  mode: StudyToolsMode
  isGenerating: boolean
  generatedContent: string | null
  onBack: () => void
}) {
  if (mode !== "default") {
    return (
      <div className="flex flex-col gap-3">
        <Button variant="ghost" size="sm" className="w-fit" onClick={onBack}>
          <ArrowLeft /> Back
        </Button>
        <Card>
          <CardContent>
            {isGenerating ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Spinner /> Generating {mode === "summary" ? "summary" : "study plan"}...
                </div>
                <SkeletonText lines={4} />
              </div>
            ) : (
              generatedContent && <MarkdownRenderer content={generatedContent} />
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Progress</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Small className="font-normal text-muted-foreground">Mastery</Small>
            <Small>{subject.masteryPercent}%</Small>
          </div>
          <Progress value={subject.masteryPercent} />
          <Muted className="text-xs">
            {subject.documentCount} documents · active {formatRelativeTime(subject.lastActivityAt)}
          </Muted>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Study tools</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Button variant="outline" className="justify-start" asChild>
            <Link href={`/subjects/${subject.id}/quiz`}>
              <ListChecks /> Take a quiz
            </Link>
          </Button>
          <Button variant="outline" className="justify-start" asChild>
            <Link href={`/subjects/${subject.id}/flashcards`}>
              <FileStack /> Study flashcards
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
