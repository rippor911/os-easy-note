<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { quizCollections, type QuizQuestion } from './quizBank'
import { recordQuestion } from './utils/progress'

const props = withDefaults(defineProps<{
  collection?: string
  questionId?: string
  title?: string
  items?: QuizQuestion[]
}>(), {
  collection: 'memory'
})

const selected = ref('')
const checked = ref(false)
const currentIndex = ref(0)

const sourceQuestions = computed(() => {
  if (props.items?.length) return props.items
  return quizCollections[props.collection] || []
})

const questions = computed(() => {
  if (!props.questionId) return sourceQuestions.value
  return sourceQuestions.value.filter((question) => question.id === props.questionId)
})

const current = computed(() => questions.value[currentIndex.value])
const isCorrect = computed(() => checked.value && selected.value === current.value?.answer)
const hasNext = computed(() => currentIndex.value < questions.value.length - 1)

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
    question: current.value.question,
    options: current.value.options,
    explanation: current.value.explanation,
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

watch(() => [props.collection, props.questionId], () => {
  currentIndex.value = 0
  resetAnswer()
})
</script>

<template>
  <section class="quiz study-card">
    <header class="quiz__header">
      <div>
        <p class="quiz__eyebrow">Single Choice</p>
        <h3>{{ title || current?.title || '单选题' }}</h3>
      </div>
      <span v-if="questions.length > 1" class="quiz__count">
        {{ currentIndex + 1 }} / {{ questions.length }}
      </span>
    </header>

    <p v-if="current" class="quiz__question">{{ current.question }}</p>
    <p v-else class="quiz__empty">当前题库为空，请检查 collection 或 questionId。</p>

    <div v-if="current" class="quiz__options">
      <button
        v-for="option in current.options"
        :key="option.label"
        class="quiz__option"
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

    <footer v-if="current" class="quiz__footer">
      <button class="quiz__submit" type="button" :disabled="!selected || checked" @click="submit">
        提交答案
      </button>
      <button v-if="hasNext" class="quiz__next" type="button" :disabled="!checked" @click="nextQuestion">
        下一题
      </button>
    </footer>

    <div v-if="checked && current" class="quiz__result" :class="{ 'is-correct': isCorrect }">
      <strong>{{ isCorrect ? '回答正确' : `回答错误，正确答案是 ${current.answer}` }}</strong>
      <p>{{ current.explanation }}</p>
    </div>
  </section>
</template>

<style scoped>
.quiz {
  margin: 24px 0;
}

.quiz__header,
.quiz__footer {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.quiz__eyebrow {
  margin: 0 0 4px;
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.quiz h3 {
  margin: 0;
  border: 0;
  padding: 0;
}

.quiz__count {
  border-radius: 999px;
  padding: 4px 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 700;
}

.quiz__question {
  margin: 16px 0;
  color: var(--vp-c-text-1);
  font-size: 16px;
  font-weight: 650;
}

.quiz__options {
  display: grid;
  gap: 10px;
}

.quiz__option {
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

.quiz__option strong {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.quiz__option:hover,
.quiz__option.is-selected {
  border-color: var(--vp-c-brand-1);
}

.quiz__option.is-correct {
  border-color: var(--os-c-green);
  background: color-mix(in srgb, var(--os-c-green) 10%, transparent);
}

.quiz__option.is-wrong {
  border-color: var(--os-c-red);
  background: color-mix(in srgb, var(--os-c-red) 10%, transparent);
}

.quiz__submit,
.quiz__next {
  margin-top: 16px;
  border: 0;
  border-radius: var(--os-radius);
  padding: 9px 14px;
  font-weight: 700;
  cursor: pointer;
}

.quiz__submit {
  background: var(--vp-c-brand-1);
  color: white;
}

.quiz__next {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.quiz__submit:disabled,
.quiz__next:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.quiz__result {
  margin-top: 16px;
  border-left: 4px solid var(--os-c-red);
  border-radius: var(--os-radius);
  padding: 12px 14px;
  background: color-mix(in srgb, var(--os-c-red) 9%, transparent);
}

.quiz__result.is-correct {
  border-left-color: var(--os-c-green);
  background: color-mix(in srgb, var(--os-c-green) 9%, transparent);
}

.quiz__result p {
  margin: 6px 0 0;
}

.quiz__empty {
  color: var(--vp-c-text-2);
}
</style>
