"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check, RotateCcw, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Muted, Small } from "@/components/ui/typography"
import { formatDuration } from "@/lib/utils"
import type { QuizQuestion } from "@/lib/types"
import type { QuizAnswer } from "@/components/quiz/quiz-runner"

export function QuizResults({
  subjectId,
  questions,
  answers,
  elapsedSeconds,
  onRetry,
}: {
  subjectId: string
  questions: QuizQuestion[]
  answers: QuizAnswer[]
  elapsedSeconds: number
  onRetry: () => void
}) {
  const score = answers.filter((a) => a.correct).length
  const percent = Math.round((score / questions.length) * 100)
  const [displayPercent, setDisplayPercent] = React.useState(0)
  const incorrect = answers
    .map((a, i) => ({ answer: a, question: questions[i] }))
    .filter((entry) => !entry.answer.correct)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDisplayPercent((prev) => {
        const next = prev + 4
        if (next >= percent) {
          clearInterval(interval)
          return percent
        }
        return next
      })
    }, 20)
    return () => clearInterval(interval)
  }, [percent])

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex flex-col items-center gap-2 py-4 text-center"
      >
        <span className="text-5xl font-bold tracking-tight">{displayPercent}%</span>
        <Muted>
          {score} of {questions.length} correct · {formatDuration(elapsedSeconds)}
        </Muted>
      </motion.div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onRetry} className="flex-1">
          <RotateCcw /> Try again
        </Button>
        <Button asChild className="flex-1">
          <Link href={`/subjects/${subjectId}`}>Back to subject</Link>
        </Button>
      </div>

      {incorrect.length > 0 && (
        <div className="flex flex-col gap-3">
          <Small>Review incorrect answers</Small>
          {incorrect.map(({ answer, question }) => (
            <Card key={question.id}>
              <CardContent className="flex flex-col gap-2">
                <span className="text-sm font-medium">{question.question}</span>
                <div className="flex items-start gap-2 text-sm text-destructive">
                  <X className="mt-0.5 size-4 shrink-0" />
                  <span>{question.choices[answer.selectedIndex]}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-success">
                  <Check className="mt-0.5 size-4 shrink-0" />
                  <span>{question.choices[question.correctIndex]}</span>
                </div>
                <Muted className="text-xs">{question.explanation}</Muted>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
