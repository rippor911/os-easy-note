<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { recordQuestion } from './utils/progress'

interface BlankItem {
  label: string
  answer: string | string[]
  placeholder?: string
  hint?: string
}

const props = withDefaults(defineProps<{
  id: string
  question: string
  items: BlankItem[]
  explanation?: string
  caseSensitive?: boolean
}>(), {
  caseSensitive: false
})

const inputs = ref<string[]>(props.items.map(() => ''))
const checked = ref(false)

watch(() => props.items, (items) => {
  inputs.value = items.map(() => '')
  checked.value = false
})

function answersOf(item: BlankItem) {
  return Array.isArray(item.answer) ? item.answer : [item.answer]
}

function normalize(value: string) {
  const trimmed = value.trim()
  return props.caseSensitive ? trimmed : trimmed.toLowerCase()
}

function itemCorrect(item: BlankItem, index: number) {
  const userAnswer = normalize(inputs.value[index] || '')
  return answersOf(item).some((answer) => normalize(answer) === userAnswer)
}

const canCheck = computed(() => inputs.value.every((value) => value.trim()))
const correct = computed(() => props.items.every((item, index) => itemCorrect(item, index)))

function standardAnswer(item: BlankItem) {
  return answersOf(item).join(' / ')
}

function check() {
  if (!canCheck.value) return
  checked.value = true

  recordQuestion({
    id: `blank:${props.id}`,
    type: 'blank',
    collection: 'inline',
    title: props.question,
    selected: props.items.map((item, index) => `${item.label}=${inputs.value[index]}`).join('; '),
    answer: props.items.map((item) => `${item.label}=${standardAnswer(item)}`).join('; '),
    correct: correct.value,
    at: Date.now()
  })
}
</script>

<template>
  <section class="multi-fill study-card">
    <p class="multi-fill__question">{{ question }}</p>

    <div class="multi-fill__items">
      <label
        v-for="(item, index) in items"
        :key="item.label"
        class="multi-fill__item"
        :class="{
          'is-correct': checked && itemCorrect(item, index),
          'is-wrong': checked && !itemCorrect(item, index)
        }"
      >
        <span class="multi-fill__label">{{ item.label }}</span>
        <input
          v-model="inputs[index]"
          class="multi-fill__input"
          :placeholder="item.placeholder || '输入答案'"
          type="text"
          @keyup.enter="check"
        >
        <small v-if="item.hint" class="multi-fill__hint">{{ item.hint }}</small>
        <small v-if="checked && !itemCorrect(item, index)" class="multi-fill__answer">
          标准答案：{{ standardAnswer(item) }}
        </small>
      </label>
    </div>

    <button class="multi-fill__button" type="button" :disabled="!canCheck" @click="check">
      校验
    </button>

    <div v-if="checked" class="multi-fill__result" :class="{ 'is-correct': correct }">
      <strong>{{ correct ? '全部正确' : '还有空需要修正' }}</strong>
      <p v-if="explanation">{{ explanation }}</p>
    </div>
  </section>
</template>

<style scoped>
.multi-fill {
  margin: 24px 0;
}

.multi-fill__question {
  margin: 0 0 14px;
  font-weight: 700;
}

.multi-fill__items {
  display: grid;
  gap: 12px;
}

.multi-fill__item {
  display: grid;
  grid-template-columns: minmax(150px, 0.42fr) minmax(220px, 1fr);
  gap: 8px 12px;
  align-items: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--os-radius);
  padding: 10px 12px;
  background: var(--vp-c-bg-soft);
}

.multi-fill__item.is-correct {
  border-color: var(--os-c-green);
}

.multi-fill__item.is-wrong {
  border-color: var(--os-c-red);
}

.multi-fill__label {
  color: var(--vp-c-text-1);
  font-weight: 700;
}

.multi-fill__input {
  min-width: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--os-radius);
  padding: 9px 11px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
}

.multi-fill__hint,
.multi-fill__answer {
  grid-column: 2;
  color: var(--vp-c-text-2);
}

.multi-fill__answer {
  color: var(--os-c-red);
  font-weight: 700;
}

.multi-fill__button {
  margin-top: 14px;
  border: 0;
  border-radius: var(--os-radius);
  padding: 10px 16px;
  background: var(--vp-c-brand-1);
  color: white;
  font-weight: 700;
  cursor: pointer;
}

.multi-fill__button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.multi-fill__result {
  margin-top: 12px;
  border-left: 4px solid var(--os-c-red);
  border-radius: var(--os-radius);
  padding: 10px 12px;
  background: color-mix(in srgb, var(--os-c-red) 9%, transparent);
}

.multi-fill__result.is-correct {
  border-left-color: var(--os-c-green);
  background: color-mix(in srgb, var(--os-c-green) 9%, transparent);
}

.multi-fill__result p {
  margin: 6px 0 0;
}

@media (max-width: 640px) {
  .multi-fill__item {
    grid-template-columns: 1fr;
  }

  .multi-fill__hint,
  .multi-fill__answer {
    grid-column: 1;
  }
}
</style>
