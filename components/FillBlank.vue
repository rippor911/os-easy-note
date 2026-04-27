<script setup lang="ts">
import { computed, ref } from 'vue'
import { recordQuestion } from './utils/progress'

const props = withDefaults(defineProps<{
  id: string
  question: string
  answer: string | string[]
  explanation?: string
  placeholder?: string
  caseSensitive?: boolean
}>(), {
  placeholder: '输入答案后校验',
  caseSensitive: false
})

const input = ref('')
const checked = ref(false)

const answers = computed(() => Array.isArray(props.answer) ? props.answer : [props.answer])

function normalize(value: string) {
  const trimmed = value.trim()
  return props.caseSensitive ? trimmed : trimmed.toLowerCase()
}

const correct = computed(() => {
  const userAnswer = normalize(input.value)
  return answers.value.some((answer) => normalize(answer) === userAnswer)
})

function check() {
  if (!input.value.trim()) return
  checked.value = true

  recordQuestion({
    id: `blank:${props.id}`,
    type: 'blank',
    collection: 'inline',
    title: props.question,
    question: props.question,
    explanation: props.explanation,
    selected: input.value,
    answer: answers.value.join(' / '),
    correct: correct.value,
    at: Date.now()
  })
}
</script>

<template>
  <section class="fill study-card">
    <p class="fill__question">{{ question }}</p>
    <div class="fill__row">
      <input
        v-model="input"
        class="fill__input"
        :placeholder="placeholder"
        type="text"
        @keyup.enter="check"
      >
      <button class="fill__button" type="button" @click="check">校验</button>
    </div>
    <div v-if="checked" class="fill__result" :class="{ 'is-correct': correct }">
      <strong>{{ correct ? '回答正确' : `标准答案：${answers.join(' / ')}` }}</strong>
      <p v-if="explanation">{{ explanation }}</p>
    </div>
  </section>
</template>

<style scoped>
.fill {
  margin: 24px 0;
}

.fill__question {
  margin: 0 0 12px;
  font-weight: 700;
}

.fill__row {
  display: flex;
  gap: 10px;
}

.fill__input {
  flex: 1;
  min-width: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--os-radius);
  padding: 10px 12px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.fill__button {
  border: 0;
  border-radius: var(--os-radius);
  padding: 10px 14px;
  background: var(--vp-c-brand-1);
  color: white;
  font-weight: 700;
  cursor: pointer;
}

.fill__result {
  margin-top: 12px;
  border-left: 4px solid var(--os-c-red);
  border-radius: var(--os-radius);
  padding: 10px 12px;
  background: color-mix(in srgb, var(--os-c-red) 9%, transparent);
}

.fill__result.is-correct {
  border-left-color: var(--os-c-green);
  background: color-mix(in srgb, var(--os-c-green) 9%, transparent);
}

.fill__result p {
  margin: 6px 0 0;
}

@media (max-width: 560px) {
  .fill__row {
    flex-direction: column;
  }
}
</style>
