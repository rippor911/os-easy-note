<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { data as pages, type NotePage } from '../.vitepress/theme/data/pages.data'
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

const notePages = computed(() => pages.filter((page: NotePage) => !['/', '/tags', '/progress'].includes(page.url)))
const readRate = computed(() => {
  if (!notePages.value.length) return 0
  const read = new Set(readPages.value.map((page) => page.path.replace(/\/$/, '')))
  const count = notePages.value.filter((page) => read.has(page.url.replace(/\/$/, ''))).length
  return Math.round((count / notePages.value.length) * 100)
})

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

    <section class="progress__panel">
      <h2>最近阅读</h2>
      <p v-if="!readPages.length">还没有阅读记录。打开任意笔记页面停留片刻后会自动记录。</p>
      <a v-for="page in readPages.slice(0, 10)" :key="page.path" :href="page.path" class="progress__row">
        <strong>{{ page.title }}</strong>
        <span>{{ formatTime(page.readAt) }}</span>
      </a>
    </section>

    <section class="progress__panel">
      <h2>错题记录</h2>
      <p v-if="!wrongQuestions.length">暂无错题。答错单选题或填空题后会出现在这里。</p>
      <article v-for="question in wrongQuestions" :key="question.id" class="progress__wrong">
        <strong>{{ question.title }}</strong>
        <span>你的答案：{{ question.selected }}；标准答案：{{ question.answer }}</span>
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

.progress__stat,
.progress__panel,
.progress__wrong,
.progress__row {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg);
}

.progress__stat {
  padding: 16px;
}

.progress__stat span {
  display: block;
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.progress__stat strong {
  display: block;
  margin-top: 8px;
  font-size: 30px;
}

.progress__actions {
  display: flex;
  gap: 10px;
  margin: 18px 0;
}

.progress__actions button {
  border: 0;
  border-radius: 10px;
  padding: 9px 13px;
  background: var(--vp-c-brand-1);
  color: white;
  font-weight: 800;
  cursor: pointer;
}

.progress__actions button.is-danger {
  background: #b42318;
}

.progress__panel {
  margin-top: 18px;
  padding: 16px;
}

.progress__panel h2 {
  margin-top: 0;
  border: 0;
  padding: 0;
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
  gap: 6px;
  margin-top: 10px;
  padding: 12px;
}

.progress__wrong span,
.progress__row span {
  color: var(--vp-c-text-2);
}

@media (max-width: 720px) {
  .progress__stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
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
}
</style>
