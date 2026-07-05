import { notFound } from "next/navigation"

import { SubjectPageClient } from "@/components/subjects/subject-page-client"
import { getDocumentsBySubject, getSubjectById, sampleChatMessages } from "@/lib/dummy-data"

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subjectId: string }>
}) {
  const { subjectId } = await params
  const subject = getSubjectById(subjectId)
  if (!subject) notFound()

  const documents = getDocumentsBySubject(subjectId)
  const initialMessages = subjectId === "biology" ? sampleChatMessages : []

  return (
    <SubjectPageClient
      subject={subject}
      initialDocuments={documents}
      initialMessages={initialMessages}
    />
  )
}
