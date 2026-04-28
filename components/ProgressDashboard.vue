<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { data as pages, type NotePage } from '../.vitepress/theme/data/pages.data'
import { quizCollections, type QuizOption } from './quizBank'
import {
  clearLearningProgress,
  getDoneQuestionIds,
  getReadPages,
  getWrongQuestions,
  type QuestionRecord,
  type ReadPageRecord
} from './utils/progress'

const readPages = ref<ReadPageRecord[]>([])
const doneQuestions = ref<string[]>([])
const wrongQuestions = ref<QuestionRecord[]>([])

interface WrongQuestionView {
  record: QuestionRecord
  title: string
  question: string
  options: QuizOption[]
  explanation: string
}

const utilityPageUrls = new Set(['/', '/progress', '/knowledge-map', '/resources'])
const utilityPagePrefixes = ['/exams/']

const studySections = [
  { label: 'OS Boot', prefix: '/OS Boot/' },
  { label: '内存管理', prefix: '/内存管理/' },
  { label: '进程与线程', prefix: '/进程与线程/' }
]

const notePages = computed(() => pages.filter((page: NotePage) => (
  !utilityPageUrls.has(page.url) && !utilityPagePrefixes.some((prefix) => page.url.startsWith(prefix))
)))
const readPageKeys = computed(() => new Set(readPages.value.map((page) => page.path.replace(/\/$/, ''))))
const sortedReadPages = computed(() => [...readPages.value].sort((a, b) => b.readAt - a.readAt))
const readRate = computed(() => {
  if (!notePages.value.length) return 0
  const count = notePages.value.filter((page) => readPageKeys.value.has(page.url.replace(/\/$/, ''))).length
  return Math.round((count / notePages.value.length) * 100)
})
const nextPage = computed(() => notePages.value.find((page) => !readPageKeys.value.has(page.url.replace(/\/$/, ''))))
const sectionCoverage = computed(() => studySections
  .map((section) => {
    const sectionPages = notePages.value.filter((page) => page.url.startsWith(section.prefix))
    const read = sectionPages.filter((page) => readPageKeys.value.has(page.url.replace(/\/$/, ''))).length
    const total = sectionPages.length
    return {
      ...section,
      read,
      total,
      rate: total ? Math.round((read / total) * 100) : 0
    }
  })
  .filter((section) => section.total))
const wrongQuestionViews = computed<WrongQuestionView[]>(() => wrongQuestions.value.map((record) => {
  const bankQuestion = findBankQuestion(record)

  return {
    record,
    title: bankQuestion?.title || record.title,
    question: record.question || bankQuestion?.question || record.title,
    options: record.options || bankQuestion?.options || [],
    explanation: record.explanation || bankQuestion?.explanation || ''
  }
}))

function findBankQuestion(record: QuestionRecord) {
  const collection = quizCollections[record.collection]
  if (!collection) return undefined

  const quizIdPrefix = `quiz:${record.collection}:`
  const questionId = record.id.startsWith(quizIdPrefix) ? record.id.slice(quizIdPrefix.length) : record.id
  return collection.find((question) => question.id === questionId)
}

function isSelectedOption(record: QuestionRecord, label: string) {
  return splitLabels(record.selected).includes(label)
}

function isAnswerOption(record: QuestionRecord, label: string) {
  return splitLabels(record.answer).includes(label)
}

function splitLabels(value: string) {
  return value
    .split(/[、,，\s]+/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function displayValue(value: string) {
  return value?.trim() || '未作答'
}

function refresh() {
  readPages.value = getReadPages()
  doneQuestions.value = getDoneQuestionIds()
  wrongQuestions.value = getWrongQuestions()
}

function reset() {
  clearLearningProgress()
  refresh()
}

function formatTime(timestamp: number) {
  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(timestamp)
}

onMounted(refresh)
</script>

<template>
  <section class="progress">
    <div class="progress__stats">
      <article class="progress__stat">
        <span>已读页面</span>
        <strong>{{ readPages.length }}</strong>
      </article>
      <article class="progress__stat">
        <span>阅读覆盖</span>
        <strong>{{ readRate }}%</strong>
      </article>
      <article class="progress__stat">
        <span>已做题目</span>
        <strong>{{ doneQuestions.length }}</strong>
      </article>
      <article class="progress__stat">
        <span>错题记录</span>
        <strong>{{ wrongQuestions.length }}</strong>
      </article>
    </div>

    <div class="progress__actions">
      <button type="button" @click="refresh">刷新进度</button>
      <button type="button" class="is-danger" @click="reset">清空本地进度</button>
    </div>

    <div class="progress__focus">
      <section class="progress__panel progress__panel--focus">
        <h2>继续学习</h2>
        <a v-if="nextPage" class="progress__continue" :href="nextPage.url">
          <span>下一篇</span>
          <strong>{{ nextPage.title }}</strong>
        </a>
        <p v-else>当前笔记页面已经全部阅读过，可以回到错题记录做复盘。</p>
      </section>

      <section class="progress__panel">
        <h2>章节覆盖</h2>
        <div v-for="section in sectionCoverage" :key="section.prefix" class="progress__coverage">
          <div>
            <strong>{{ section.label }}</strong>
            <span>{{ section.read }} / {{ section.total }}</span>
          </div>
          <div class="progress__bar" aria-hidden="true">
            <span :style="{ width: `${section.rate}%` }" />
          </div>
        </div>
      </section>
    </div>

    <section class="progress__panel">
      <h2>最近阅读</h2>
      <p v-if="!readPages.length">还没有阅读记录。打开任意笔记页面停留片刻后会自动记录。</p>
      <a v-for="page in sortedReadPages.slice(0, 10)" :key="page.path" :href="page.path" class="progress__row">
        <strong>{{ page.title }}</strong>
        <span>{{ formatTime(page.readAt) }}</span>
      </a>
    </section>

    <section class="progress__panel">
      <h2>错题记录</h2>
      <p v-if="!wrongQuestions.length">暂无错题。答错客观题，或把主观题自主判为错误后，会出现在这里。</p>
      <article v-for="item in wrongQuestionViews" :key="item.record.id" class="progress__wrong">
        <header class="progress__wrong-head">
          <strong>{{ item.title }}</strong>
          <span>{{ formatTime(item.record.at) }}</span>
        </header>

        <p class="progress__wrong-question">{{ item.question }}</p>

        <div v-if="item.options.length" class="progress__wrong-options">
          <div
            v-for="option in item.options"
            :key="option.label"
            class="progress__wrong-option"
            :class="{
              'is-answer': isAnswerOption(item.record, option.label),
              'is-selected': isSelectedOption(item.record, option.label)
            }"
          >
            <strong>{{ option.label }}</strong>
            <span>{{ option.text }}</span>
          </div>
        </div>

        <div class="progress__wrong-answer">
          <span>你的答案：{{ displayValue(item.record.selected) }}</span>
          <span>标准答案：{{ displayValue(item.record.answer) }}</span>
        </div>

        <p v-if="item.explanation" class="progress__wrong-explanation">
          解析：{{ item.explanation }}
        </p>
      </article>
    </section>
  </section>
</template>

<style scoped>
.progress {
  margin: 24px 0;
}

.progress__stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.progress__focus {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 12px;
  margin-top: 18px;
}

.progress__stat,
.progress__panel,
.progress__wrong,
.progress__row {
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--os-radius);
  background: var(--vp-c-bg);
}

.progress__stat {
  padding: 16px;
  box-shadow: var(--os-shadow-soft);
}

.progress__stat span {
  display: block;
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.progress__stat strong {
  display: block;
  margin-top: 8px;
  color: var(--vp-c-text-1);
  font-size: 30px;
}

.progress__actions {
  display: flex;
  gap: 10px;
  margin: 18px 0;
}

.progress__actions button {
  border: 0;
  border-radius: var(--os-radius);
  padding: 9px 13px;
  background: var(--vp-c-brand-1);
  color: white;
  font-weight: 800;
  cursor: pointer;
}

.progress__actions button.is-danger {
  background: var(--os-c-red);
}

.progress__panel {
  margin-top: 18px;
  padding: 16px;
  box-shadow: var(--os-shadow-soft);
}

.progress__focus .progress__panel {
  margin-top: 0;
}

.progress__panel h2 {
  margin-top: 0;
  border: 0;
  padding: 0;
}

.progress__continue {
  display: grid;
  gap: 6px;
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 28%, var(--vp-c-divider));
  border-radius: var(--os-radius);
  padding: 14px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 7%, transparent);
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.progress__continue span {
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 800;
}

.progress__coverage {
  display: grid;
  gap: 8px;
  margin-top: 12px;
}

.progress__coverage div:first-child {
  display: flex;
  gap: 12px;
  justify-content: space-between;
}

.progress__coverage span {
  color: var(--vp-c-text-2);
}

.progress__bar {
  height: 7px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
}

.progress__bar span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--os-c-green));
}

.progress__row {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding: 12px;
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.progress__wrong {
  display: grid;
  gap: 12px;
  margin-top: 10px;
  padding: 12px;
}

.progress__wrong-head,
.progress__wrong-answer {
  display: flex;
  gap: 12px;
  justify-content: space-between;
}

.progress__wrong-question {
  margin: 0;
  color: var(--vp-c-text-1);
  font-weight: 700;
  line-height: 1.7;
}

.progress__wrong-options {
  display: grid;
  gap: 8px;
}

.progress__wrong-option {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 10px;
  align-items: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--os-radius);
  padding: 9px 10px;
  background: var(--vp-c-bg-soft);
}

.progress__wrong-option strong {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--vp-c-bg);
}

.progress__wrong-option.is-answer {
  border-color: var(--os-c-green);
  background: color-mix(in srgb, var(--os-c-green) 10%, transparent);
}

.progress__wrong-option.is-selected:not(.is-answer) {
  border-color: var(--os-c-red);
  background: color-mix(in srgb, var(--os-c-red) 10%, transparent);
}

.progress__wrong-answer {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 10px;
}

.progress__wrong-explanation {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.progress__wrong-head span,
.progress__wrong-answer span,
.progress__row span {
  color: var(--vp-c-text-2);
}

@media (max-width: 720px) {
  .progress__stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .progress__focus {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .progress__stats {
    grid-template-columns: 1fr;
  }

  .progress__row {
    flex-direction: column;
    gap: 4px;
  }

  .progress__wrong-head,
  .progress__wrong-answer {
    flex-direction: column;
    gap: 4px;
  }
}
</style>
