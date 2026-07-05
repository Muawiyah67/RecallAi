import Link from "next/link"
import { FileStack, ListChecks, NotebookPen, Sparkles, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"

export function SubjectTopActions({
  subjectId,
  onUpload,
  onSummarize,
  onStudyPlan,
}: {
  subjectId: string
  onUpload: () => void
  onSummarize: () => void
  onStudyPlan: () => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" size="sm" onClick={onUpload}>
        <Upload /> Upload
      </Button>
      <Button variant="outline" size="sm" asChild>
        <Link href={`/subjects/${subjectId}/quiz`}>
          <ListChecks /> Quiz
        </Link>
      </Button>
      <Button variant="outline" size="sm" asChild>
        <Link href={`/subjects/${subjectId}/flashcards`}>
          <FileStack /> Flashcards
        </Link>
      </Button>
      <Button variant="outline" size="sm" onClick={onSummarize}>
        <NotebookPen /> Summarize
      </Button>
      <Button variant="outline" size="sm" onClick={onStudyPlan}>
        <Sparkles /> Generate Study Plan
      </Button>
    </div>
  )
}
