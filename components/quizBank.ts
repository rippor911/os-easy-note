import memory from '../quizzes/memory.json'
import process from '../quizzes/process.json'
import sync from '../quizzes/sync.json'
import boot from '../quizzes/boot.json'

export interface QuizOption {
  label: string
  text: string
}

export interface QuizQuestion {
  id: string
  title: string
  question: string
  options: QuizOption[]
  answer: string
  explanation: string
  tags?: string[]
  difficulty?: string
}

export const quizCollections: Record<string, QuizQuestion[]> = {
  boot,
  memory,
  process,
  sync
}
