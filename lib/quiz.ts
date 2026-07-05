import { quizQuestionBank } from "@/lib/dummy-data"
import { shuffle } from "@/lib/utils"
import type { QuizDifficulty, QuizQuestion } from "@/lib/types"

export function getQuizBankSize(subjectId: string): number {
  return quizQuestionBank[subjectId]?.length ?? 0
}

export function buildQuiz(
  subjectId: string,
  difficulty: QuizDifficulty | "mixed",
  count: number
): QuizQuestion[] {
  const bank = quizQuestionBank[subjectId] ?? []
  const preferred = difficulty === "mixed" ? bank : bank.filter((q) => q.difficulty === difficulty)
  const preferredIds = new Set(preferred.map((q) => q.id))
  const rest = bank.filter((q) => !preferredIds.has(q.id))
  const pool = [...shuffle(preferred), ...shuffle(rest)]
  return pool.slice(0, Math.min(count, bank.length))
}
