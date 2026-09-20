"use client"

import * as React from "react"
import { Check, Timer, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Muted } from "@/components/ui/typography"
import { formatDuration, cn } from "@/lib/utils"
import type { QuizQuestion } from "@/lib/types"

export interface QuizAnswer {
  questionId: string
  selectedIndex: number
  correct: boolean
}

export function QuizRunner({
  questions,
  onFinish,
}: {
  questions: QuizQuestion[]
  onFinish: (answers: QuizAnswer[], elapsedSeconds: number) => void
}) {
  const [index, setIndex] = React.useState(0)
  const [selected, setSelected] = React.useState<number | null>(null)
  const [answers, setAnswers] = React.useState<QuizAnswer[]>([])
  const [elapsed, setElapsed] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  const question = questions[index]
  const isLast = index === questions.length - 1

  function handleSelect(optionIndex: number) {
    if (selected !== null) return
    setSelected(optionIndex)
  }

  function handleNext() {
    const correct = selected === question.correctIndex
    const nextAnswers = [...answers, { questionId: question.id, selectedIndex: selected!, correct }]
    setAnswers(nextAnswers)
    setSelected(null)

    if (isLast) {
      onFinish(nextAnswers, elapsed)
    } else {
      setIndex((i) => i + 1)
    }
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-5">
      <div className="flex items-center justify-between">
        <Muted>
          Question {index + 1} of {questions.length}
        </Muted>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Timer className="size-4" />
          {formatDuration(elapsed)}
        </div>
      </div>
      <Progress value={((index + (selected !== null ? 1 : 0)) / questions.length) * 100} />

      <h2 className="text-lg font-semibold">{question.question}</h2>

      <div className="flex flex-col gap-2.5">
        {question.choices.map((choice, i) => {
          const isCorrect = i === question.correctIndex
          const isSelected = i === selected
          const showFeedback = selected !== null

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showFeedback}
              className={cn(
                "flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                !showFeedback && "border-border hover:bg-muted",
                showFeedback && isCorrect && "border-success bg-success/10 text-success",
                showFeedback && isSelected && !isCorrect && "border-destructive bg-destructive/10 text-destructive",
                showFeedback && !isSelected && !isCorrect && "border-border text-muted-foreground opacity-60"
              )}
            >
              <span>{choice}</span>
              {showFeedback && isCorrect && <Check className="size-4 shrink-0" />}
              {showFeedback && isSelected && !isCorrect && <X className="size-4 shrink-0" />}
            </button>
          )
        })}
      </div>

      {selected !== null && (
        <div className="flex flex-col gap-3 rounded-lg bg-muted/50 p-3">
          <Muted className="text-xs">{question.explanation}</Muted>
          <Button onClick={handleNext} className="w-fit">
            {isLast ? "See results" : "Next question"}
          </Button>
        </div>
      )}
    </div>
  )
}
