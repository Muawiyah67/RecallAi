"use client"

import * as React from "react"
import { Flag, Flame, Layers, Shuffle, ChevronLeft, ChevronRight } from "lucide-react"

import { Flashcard } from "@/components/flashcards/flashcard"
import { Button } from "@/components/ui/button"
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Progress } from "@/components/ui/progress"
import { Muted, Small } from "@/components/ui/typography"
import { studyStreak } from "@/lib/dummy-data"
import { cn, shuffle } from "@/lib/utils"
import type { Flashcard as FlashcardType } from "@/lib/types"

export function FlashcardDeck({
  subjectName,
  initialCards,
}: {
  subjectName: string
  initialCards: FlashcardType[]
}) {
  const [cards, setCards] = React.useState(initialCards)
  const [index, setIndex] = React.useState(0)
  const [flipped, setFlipped] = React.useState(false)
  const [difficultIds, setDifficultIds] = React.useState<Set<string>>(new Set())

  const goNext = React.useCallback(() => {
    setFlipped(false)
    setIndex((i) => Math.min(i + 1, cards.length - 1))
  }, [cards.length])

  const goPrev = React.useCallback(() => {
    setFlipped(false)
    setIndex((i) => Math.max(i - 1, 0))
  }, [])

  const toggleDifficult = React.useCallback(() => {
    const card = cards[index]
    if (!card) return
    setDifficultIds((prev) => {
      const next = new Set(prev)
      if (next.has(card.id)) next.delete(card.id)
      else next.add(card.id)
      return next
    })
  }, [cards, index])

  const handleShuffle = React.useCallback(() => {
    setCards((prev) => shuffle(prev))
    setIndex(0)
    setFlipped(false)
  }, [])

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault()
        setFlipped((f) => !f)
      } else if (event.key === "ArrowRight") {
        goNext()
      } else if (event.key === "ArrowLeft") {
        goPrev()
      } else if (event.key.toLowerCase() === "d") {
        toggleDifficult()
      } else if (event.key.toLowerCase() === "s") {
        handleShuffle()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [goNext, goPrev, toggleDifficult, handleShuffle])

  if (cards.length === 0) {
    return (
      <Empty className="mt-8">
        <EmptyMedia variant="icon">
          <Layers />
        </EmptyMedia>
        <EmptyTitle>No flashcards yet</EmptyTitle>
        <EmptyDescription>
          Upload documents to {subjectName} first — flashcards are generated from your material.
        </EmptyDescription>
      </Empty>
    )
  }

  const card = cards[index]
  const isDifficult = difficultIds.has(card.id)

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-5">
      <div className="flex items-center justify-between">
        <Muted>
          Card {index + 1} of {cards.length}
        </Muted>
        <div className="flex items-center gap-1.5 text-sm text-warning">
          <Flame className="size-4" />
          <Small>{studyStreak.currentDays}-day streak</Small>
        </div>
      </div>
      <Progress value={((index + 1) / cards.length) * 100} />

      <Flashcard card={card} flipped={flipped} onFlip={() => setFlipped((f) => !f)} />

      <div className="flex items-center justify-between gap-2">
        <Button variant="outline" size="icon" onClick={goPrev} disabled={index === 0} aria-label="Previous card">
          <ChevronLeft />
        </Button>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleShuffle}>
            <Shuffle /> Shuffle
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleDifficult}
            className={cn(isDifficult && "border-warning text-warning")}
          >
            <Flag /> {isDifficult ? "Marked difficult" : "Mark difficult"}
          </Button>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={goNext}
          disabled={index === cards.length - 1}
          aria-label="Next card"
        >
          <ChevronRight />
        </Button>
      </div>

      <Muted className="text-center text-xs">
        Space to flip · ← → to navigate · D to mark difficult · S to shuffle
      </Muted>
    </div>
  )
}
