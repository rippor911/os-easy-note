export interface ReadPageRecord {
  path: string
  title: string
  tags: string[]
  readAt: number
}

export interface QuestionRecord {
  id: string
  type: 'single' | 'blank' | 'true-false' | 'subjective'
  collection: string
  title: string
  selected: string
  answer: string
  correct: boolean
  at: number
}

const STORAGE_KEYS = {
  readPages: 'os-notes:read-pages',
  doneQuestions: 'os-notes:done-questions',
  wrongQuestions: 'os-notes:wrong-questions'
}

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback

  try {
    const value = window.localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : fallback
  } catch {
    return fallback
  }
}

function writeJson<T>(key: string, value: T) {
  if (!canUseStorage()) return
  window.localStorage.setItem(key, JSON.stringify(value))
}

function byNewest<T extends { at?: number; readAt?: number }>(a: T, b: T) {
  return (b.at || b.readAt || 0) - (a.at || a.readAt || 0)
}

export function markPageRead(record: ReadPageRecord) {
  const pages = readJson<ReadPageRecord[]>(STORAGE_KEYS.readPages, [])
  const next = [record, ...pages.filter((page) => page.path !== record.path)].sort(byNewest)
  writeJson(STORAGE_KEYS.readPages, next)
}

export function getReadPages() {
  return readJson<ReadPageRecord[]>(STORAGE_KEYS.readPages, []).sort(byNewest)
}

export function recordQuestion(record: QuestionRecord) {
  const done = readJson<string[]>(STORAGE_KEYS.doneQuestions, [])
  if (!done.includes(record.id)) {
    writeJson(STORAGE_KEYS.doneQuestions, [...done, record.id])
  }

  const wrong = readJson<QuestionRecord[]>(STORAGE_KEYS.wrongQuestions, [])
  const withoutCurrent = wrong.filter((item) => item.id !== record.id)
  writeJson(STORAGE_KEYS.wrongQuestions, record.correct ? withoutCurrent : [record, ...withoutCurrent].sort(byNewest))
}

export function getDoneQuestionIds() {
  return readJson<string[]>(STORAGE_KEYS.doneQuestions, [])
}

export function getWrongQuestions() {
  return readJson<QuestionRecord[]>(STORAGE_KEYS.wrongQuestions, []).sort(byNewest)
}

export function clearLearningProgress() {
  if (!canUseStorage()) return
  Object.values(STORAGE_KEYS).forEach((key) => window.localStorage.removeItem(key))
}
