import { notFound } from "next/navigation"

import { FlashcardDeck } from "@/components/flashcards/flashcard-deck"
import { H1 } from "@/components/ui/typography"
import { flashcardBank, getSubjectById } from "@/lib/dummy-data"

export default async function FlashcardsPage({
  params,
}: {
  params: Promise<{ subjectId: string }>
}) {
  const { subjectId } = await params
  const subject = getSubjectById(subjectId)
  if (!subject) notFound()

  const cards = flashcardBank[subjectId] ?? []

  return (
    <div className="flex flex-col gap-6">
      <H1>{subject.name} Flashcards</H1>
      <FlashcardDeck subjectName={subject.name} initialCards={cards} />
    </div>
  )
}
