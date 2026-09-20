"use client"

import * as React from "react"
import { Info, ListChecks } from "lucide-react"

import { OptionButtonGroup } from "@/components/option-button-group"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Label } from "@/components/ui/label"
import type { QuizDifficulty } from "@/lib/types"

const DIFFICULTIES: { value: QuizDifficulty | "mixed"; label: string }[] = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
  { value: "mixed", label: "Mixed" },
]

const COUNTS = [5, 8, 10].map((c) => ({ value: c, label: String(c) }))
const TYPES = ["Multiple Choice", "True/False", "Mixed"].map((t) => ({ value: t, label: t }))

export function QuizSetup({
  subjectName,
  bankSize,
  onGenerate,
}: {
  subjectName: string
  bankSize: number
  onGenerate: (difficulty: QuizDifficulty | "mixed", count: number, type: string) => void
}) {
  const [difficulty, setDifficulty] = React.useState<QuizDifficulty | "mixed">("mixed")
  const [count, setCount] = React.useState(5)
  const [type, setType] = React.useState("Multiple Choice")

  if (bankSize === 0) {
    return (
      <Empty className="mt-8">
        <EmptyMedia variant="icon">
          <ListChecks />
        </EmptyMedia>
        <EmptyTitle>No quiz questions yet</EmptyTitle>
        <EmptyDescription>
          Upload documents to {subjectName} first — quizzes are generated from your material.
        </EmptyDescription>
      </Empty>
    )
  }

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle>Generate a quiz</CardTitle>
        <CardDescription>Test your knowledge of {subjectName}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <p className="flex items-start gap-1.5 rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
          <Info className="mt-0.5 size-3 shrink-0" />
          Pulled from a fixed practice bank for now — not generated from your uploaded documents
          yet.
        </p>

        <div className="flex flex-col gap-2">
          <Label>Difficulty</Label>
          <OptionButtonGroup options={DIFFICULTIES} value={difficulty} onChange={setDifficulty} />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Question count</Label>
          <OptionButtonGroup options={COUNTS} value={count} onChange={setCount} />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Question type</Label>
          <OptionButtonGroup options={TYPES} value={type} onChange={setType} />
        </div>

        <Button
          onClick={() => onGenerate(difficulty, Math.min(count, bankSize), type)}
          className="mt-2"
        >
          <ListChecks /> Generate quiz
        </Button>
      </CardContent>
    </Card>
  )
}