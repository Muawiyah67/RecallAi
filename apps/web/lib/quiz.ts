import { quizQuestionBank } from "@/lib/dummy-data"
import { shuffle } from "@/lib/utils"
import type { QuizDifficulty, QuizQuestion } from "@/lib/types"

export function getQuizBankSize(subjectId: string): number {
  return quizQuestionBank[subjectId]?.length ?? 0
}

export function buildQuiz(
  subjectId: string,
  difficulty: QuizDifficulty | "mixed",
  count: number,
  type: string = "Mixed"
): QuizQuestion[] {
  const bank = quizQuestionBank[subjectId] ?? []

  const matchesDifficulty = (q: QuizQuestion) => difficulty === "mixed" || q.difficulty === difficulty

  // QuizQuestion has no explicit type/format field, so this infers it from
  // choices.length: exactly 2 choices reads as True/False, anything else as
  // Multiple Choice. If the bank for this subject has no 2-choice questions,
  // selecting "True/False" backfills from the rest of the bank below rather
  // than returning fewer questions than requested.
  const matchesType = (q: QuizQuestion) => {
    if (type === "Mixed") return true
    const isTrueFalse = q.choices.length === 2
    return type === "True/False" ? isTrueFalse : !isTrueFalse
  }

  const preferred = bank.filter((q) => matchesDifficulty(q) && matchesType(q))
  const preferredIds = new Set(preferred.map((q) => q.id))
  const rest = bank.filter((q) => !preferredIds.has(q.id))
  const pool = [...shuffle(preferred), ...shuffle(rest)]
  return pool.slice(0, Math.min(count, bank.length))
}