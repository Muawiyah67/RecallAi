export type DocumentStatus = "processing" | "ready" | "error"

export interface Document {
  id: string
  subjectId: string
  filename: string
  uploadedAt: string
  pages: number
  sizeKb: number
  status: DocumentStatus
  processingStage?: "extracting" | "embedding"
}

export interface Subject {
  id: string
  name: string
  description: string
  color: string
  documentCount: number
  masteryPercent: number
  lastActivityAt: string
}

export interface Source {
  id: string
  documentId: string
  documentName: string
  page: number
  confidence: number
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  createdAt: string
  sources?: Source[]
}

export interface RecentChat {
  id: string
  subjectId: string
  subjectName: string
  title: string
  lastMessage: string
  updatedAt: string
  messageCount: number
}

export type QuizDifficulty = "easy" | "medium" | "hard"
export type QuizQuestionType = "multiple-choice" | "true-false" | "mixed"

export interface QuizQuestion {
  id: string
  question: string
  choices: string[]
  correctIndex: number
  explanation: string
  difficulty: QuizDifficulty
}

export interface Flashcard {
  id: string
  subjectId: string
  front: string
  back: string
  difficult: boolean
}

export type NotificationType = "info" | "success" | "warning"

export interface Notification {
  id: string
  title: string
  description: string
  createdAt: string
  read: boolean
  type: NotificationType
}

export interface StorageBreakdownEntry {
  subjectName: string
  sizeGb: number
}

export interface StorageStats {
  usedGb: number
  totalGb: number
  breakdown: StorageBreakdownEntry[]
}

export interface StudyStreak {
  currentDays: number
  longestDays: number
  lastStudiedAt: string
}

export interface UserProfile {
  id: string
  name: string
  email: string
  avatarUrl?: string
  plan: "Free" | "Pro" | "Team"
  joinedAt: string
}
