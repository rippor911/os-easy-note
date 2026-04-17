<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps<{
  code: string
}>()

const container = ref<HTMLElement | null>(null)
let observer: MutationObserver | undefined

function decodedCode() {
  try {
    return decodeURIComponent(props.code)
  } catch {
    return props.code
  }
}

async function renderDiagram() {
  if (!container.value || typeof window === 'undefined') return

  const { default: mermaid } = await import('mermaid')
  const id = `mermaid-${Math.random().toString(36).slice(2)}`
  const dark = document.documentElement.classList.contains('dark')

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: dark ? 'dark' : 'default'
  })

  try {
    const { svg } = await mermaid.render(id, decodedCode())
    container.value.innerHTML = svg
  } catch (error) {
    container.value.textContent = error instanceof Error ? error.message : 'Mermaid render failed.'
  }
}

onMounted(() => {
  void nextTick(renderDiagram)

  observer = new MutationObserver(() => {
    void renderDiagram()
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

watch(() => props.code, () => {
  void renderDiagram()
})
</script>

<template>
  <figure class="mermaid-block">
    <div ref="container" class="mermaid-block__canvas" />
  </figure>
</template>

<style scoped>
.mermaid-block {
  margin: 24px 0;
  overflow-x: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 18px;
  background: var(--vp-c-bg);
}

.mermaid-block__canvas {
  min-width: 320px;
}
</style>
