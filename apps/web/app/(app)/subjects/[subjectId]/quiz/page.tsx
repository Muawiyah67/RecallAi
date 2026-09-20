import { notFound } from "next/navigation"

import { QuizPageClient } from "@/components/quiz/quiz-page-client"
import { getSubjectById } from "@/lib/dummy-data"

export default async function QuizPage({
  params,
}: {
  params: Promise<{ subjectId: string }>
}) {
  const { subjectId } = await params
  const subject = getSubjectById(subjectId)
  if (!subject) notFound()

  return <QuizPageClient subject={subject} />
}
