<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { quizCollections, type QuizQuestion } from './quizBank'
import { recordQuestion } from './utils/progress'

const props = withDefaults(defineProps<{
  collection?: string
  questionIds?: string[]
  title?: string
  description?: string
  initiallyOpen?: boolean
}>(), {
  collection: 'memory',
  title: '本节练习',
  initiallyOpen: false
})

const open = ref(props.initiallyOpen)
const selected = ref('')
const checked = ref(false)
const currentIndex = ref(0)

const questions = computed(() => {
  const source = quizCollections[props.collection] || []
  if (!props.questionIds?.length) return source

  const byId = new Map(source.map((question) => [question.id, question]))
  return props.questionIds
    .map((id) => byId.get(id))
    .filter((question): question is QuizQuestion => Boolean(question))
})

const current = computed(() => questions.value[currentIndex.value])
const hasNext = computed(() => currentIndex.value < questions.value.length - 1)
const isCorrect = computed(() => checked.value && selected.value === current.value?.answer)
const answeredCount = computed(() => checked.value ? currentIndex.value + 1 : currentIndex.value)
const completionRate = computed(() => {
  if (!questions.value.length) return 0
  return Math.round((answeredCount.value / questions.value.length) * 100)
})

function resetAnswer() {
  selected.value = ''
  checked.value = false
}

function choose(label: string) {
  if (checked.value) return
  selected.value = label
}

function submit() {
  if (!current.value || !selected.value) return
  checked.value = true

  recordQuestion({
    id: `quiz:${props.collection}:${current.value.id}`,
    type: 'single',
    collection: props.collection,
    title: current.value.title,
    selected: selected.value,
    answer: current.value.answer,
    correct: selected.value === current.value.answer,
    at: Date.now()
  })
}

function nextQuestion() {
  if (!hasNext.value) return
  currentIndex.value += 1
  resetAnswer()
}

watch(() => [props.collection, props.questionIds?.join('|')], () => {
  currentIndex.value = 0
  resetAnswer()
})
</script>

<template>
  <section class="quiz-set study-card">
    <header class="quiz-set__header">
      <div>
        <p class="quiz-set__eyebrow">Practice Set</p>
        <h3>{{ title }}</h3>
        <p v-if="description" class="quiz-set__description">{{ description }}</p>
      </div>
      <button class="quiz-set__toggle" type="button" :aria-expanded="open" @click="open = !open">
        {{ open ? '收起练习' : '开始练习' }}
      </button>
    </header>

    <div class="quiz-set__meta">
      <span>{{ answeredCount }} / {{ questions.length }}</span>
      <span>{{ completionRate }}%</span>
    </div>
    <div class="quiz-set__bar" aria-hidden="true">
      <span :style="{ width: `${completionRate}%` }" />
    </div>

    <p v-if="!questions.length" class="quiz-set__empty">当前题组为空，请检查 collection 或 question-ids。</p>

    <div v-else-if="open" class="quiz-set__body">
      <p class="quiz-set__count">第 {{ currentIndex + 1 }} 题，共 {{ questions.length }} 题</p>
      <p class="quiz-set__question">{{ current.question }}</p>

      <div class="quiz-set__options">
        <button
          v-for="option in current.options"
          :key="option.label"
          class="quiz-set__option"
          :class="{
            'is-selected': selected === option.label,
            'is-correct': checked && option.label === current.answer,
            'is-wrong': checked && selected === option.label && selected !== current.answer
          }"
          type="button"
          :aria-pressed="selected === option.label"
          @click="choose(option.label)"
        >
          <strong>{{ option.label }}</strong>
          <span>{{ option.text }}</span>
        </button>
      </div>

      <footer class="quiz-set__footer">
        <button class="quiz-set__submit" type="button" :disabled="!selected || checked" @click="submit">
          提交答案
        </button>
        <button v-if="hasNext" class="quiz-set__next" type="button" :disabled="!checked" @click="nextQuestion">
          下一题
        </button>
      </footer>

      <div v-if="checked" class="quiz-set__result" :class="{ 'is-correct': isCorrect }">
        <strong>{{ isCorrect ? '回答正确' : `回答错误，正确答案是 ${current.answer}` }}</strong>
        <p>{{ current.explanation }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.quiz-set {
  margin: 24px 0;
}

.quiz-set__header,
.quiz-set__footer,
.quiz-set__meta {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.quiz-set__eyebrow {
  margin: 0 0 4px;
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.quiz-set h3 {
  margin: 0;
  border: 0;
  padding: 0;
}

.quiz-set__description {
  margin: 8px 0 0;
  color: var(--vp-c-text-2);
}

.quiz-set__toggle,
.quiz-set__submit,
.quiz-set__next {
  border: 0;
  border-radius: var(--os-radius);
  padding: 9px 13px;
  font-weight: 800;
  cursor: pointer;
}

.quiz-set__toggle,
.quiz-set__next {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.quiz-set__submit {
  background: var(--vp-c-brand-1);
  color: white;
}

.quiz-set__submit:disabled,
.quiz-set__next:disabled {
  opacity: 0.48;
  cursor: not-allowed;
}

.quiz-set__meta {
  margin-top: 16px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 800;
}

.quiz-set__bar {
  height: 7px;
  margin-top: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
}

.quiz-set__bar span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--os-c-green));
  transition: width 0.2s ease;
}

.quiz-set__body {
  margin-top: 18px;
}

.quiz-set__count {
  margin: 0 0 10px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 800;
}

.quiz-set__question {
  margin: 0 0 16px;
  color: var(--vp-c-text-1);
  font-size: 16px;
  font-weight: 700;
}

.quiz-set__options {
  display: grid;
  gap: 10px;
}

.quiz-set__option {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 10px;
  align-items: center;
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--os-radius);
  padding: 12px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  text-align: left;
  cursor: pointer;
}

.quiz-set__option strong {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.quiz-set__option:hover,
.quiz-set__option.is-selected {
  border-color: var(--vp-c-brand-1);
}

.quiz-set__option.is-correct {
  border-color: var(--os-c-green);
  background: color-mix(in srgb, var(--os-c-green) 10%, transparent);
}

.quiz-set__option.is-wrong {
  border-color: var(--os-c-red);
  background: color-mix(in srgb, var(--os-c-red) 10%, transparent);
}

.quiz-set__footer {
  justify-content: flex-start;
  margin-top: 16px;
}

.quiz-set__result {
  margin-top: 16px;
  border-left: 4px solid var(--os-c-red);
  border-radius: var(--os-radius);
  padding: 12px 14px;
  background: color-mix(in srgb, var(--os-c-red) 9%, transparent);
}

.quiz-set__result.is-correct {
  border-left-color: var(--os-c-green);
  background: color-mix(in srgb, var(--os-c-green) 9%, transparent);
}

.quiz-set__result p {
  margin: 6px 0 0;
}

.quiz-set__empty {
  margin-bottom: 0;
  color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
  .quiz-set__header,
  .quiz-set__meta {
    align-items: flex-start;
    flex-direction: column;
  }

  .quiz-set__toggle {
    width: 100%;
  }
}
</style>
