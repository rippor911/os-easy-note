<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  title?: string
  leftTitle: string
  rightTitle: string
  left?: string | string[]
  right?: string | string[]
  summary?: string
}>(), {
  title: '概念对比'
})

function toItems(value?: string | string[]) {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

const leftItems = computed(() => toItems(props.left))
const rightItems = computed(() => toItems(props.right))
</script>

<template>
  <section class="compare study-card">
    <p class="compare__eyebrow">{{ title }}</p>
    <div class="compare__grid">
      <article class="compare__side">
        <h3>{{ leftTitle }}</h3>
        <ul v-if="leftItems.length">
          <li v-for="item in leftItems" :key="item">{{ item }}</li>
        </ul>
        <slot v-else name="left" />
      </article>
      <article class="compare__side">
        <h3>{{ rightTitle }}</h3>
        <ul v-if="rightItems.length">
          <li v-for="item in rightItems" :key="item">{{ item }}</li>
        </ul>
        <slot v-else name="right" />
      </article>
    </div>
    <p v-if="summary" class="compare__summary">{{ summary }}</p>
  </section>
</template>

<style scoped>
.compare {
  margin: 24px 0;
}

.compare__eyebrow {
  margin: 0 0 12px;
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.compare__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.compare__side {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 14px;
  background: var(--vp-c-bg-soft);
}

.compare__side h3 {
  margin: 0 0 10px;
  border: 0;
  padding: 0;
  font-size: 18px;
}

.compare__side ul {
  margin: 0;
  padding-left: 18px;
}

.compare__summary {
  margin: 14px 0 0;
  color: var(--vp-c-text-2);
}

@media (max-width: 720px) {
  .compare__grid {
    grid-template-columns: 1fr;
  }
}
</style>
