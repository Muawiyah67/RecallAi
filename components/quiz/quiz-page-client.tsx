"use client"

import * as React from "react"

import { QuizResults } from "@/components/quiz/quiz-results"
import { QuizRunner, type QuizAnswer } from "@/components/quiz/quiz-runner"
import { QuizSetup } from "@/components/quiz/quiz-setup"
import { H1 } from "@/components/ui/typography"
import { buildQuiz, getQuizBankSize } from "@/lib/quiz"
import type { QuizDifficulty, QuizQuestion, Subject } from "@/lib/types"

type Stage = "setup" | "running" | "results"

export function QuizPageClient({ subject }: { subject: Subject }) {
  const [stage, setStage] = React.useState<Stage>("setup")
  const [questions, setQuestions] = React.useState<QuizQuestion[]>([])
  const [answers, setAnswers] = React.useState<QuizAnswer[]>([])
  const [elapsedSeconds, setElapsedSeconds] = React.useState(0)

  const bankSize = getQuizBankSize(subject.id)

  function handleGenerate(difficulty: QuizDifficulty | "mixed", count: number) {
    setQuestions(buildQuiz(subject.id, difficulty, count))
    setStage("running")
  }

  function handleFinish(finalAnswers: QuizAnswer[], seconds: number) {
    setAnswers(finalAnswers)
    setElapsedSeconds(seconds)
    setStage("results")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <H1>{subject.name} Quiz</H1>
      </div>

      {stage === "setup" && (
        <QuizSetup subjectName={subject.name} bankSize={bankSize} onGenerate={handleGenerate} />
      )}
      {stage === "running" && <QuizRunner questions={questions} onFinish={handleFinish} />}
      {stage === "results" && (
        <QuizResults
          subjectId={subject.id}
          questions={questions}
          answers={answers}
          elapsedSeconds={elapsedSeconds}
          onRetry={() => setStage("setup")}
        />
      )}
    </div>
  )
}
