<script setup lang="ts">
import { ref } from 'vue'

withDefaults(defineProps<{
  title?: string
  openText?: string
  closeText?: string
}>(), {
  title: '答案与解析',
  openText: '展开',
  closeText: '收起'
})

const open = ref(false)
</script>

<template>
  <section class="reveal">
    <button class="reveal__button" type="button" :aria-expanded="open" @click="open = !open">
      <span>{{ title }}</span>
      <strong>{{ open ? closeText : openText }}</strong>
    </button>
    <div v-if="open" class="reveal__content">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.reveal {
  margin: 18px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.reveal__button {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 0;
  padding: 13px 16px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-weight: 800;
  cursor: pointer;
}

.reveal__button strong {
  color: var(--vp-c-brand-1);
  font-size: 13px;
}

.reveal__content {
  padding: 14px 16px;
}
</style>
