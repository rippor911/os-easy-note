<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import { markPageRead } from '../../../components/utils/progress'

const route = useRoute()
const { frontmatter, page } = useData()

let timer: number | undefined

function scheduleReadMark() {
  if (typeof window === 'undefined') return
  window.clearTimeout(timer)

  timer = window.setTimeout(() => {
    const title = frontmatter.value.title || page.value.title || route.path
    const rawTags = frontmatter.value.tags
    const tags = Array.isArray(rawTags) ? rawTags : rawTags ? String(rawTags).split(',') : []

    markPageRead({
      path: route.path,
      title,
      tags: tags.map((tag) => String(tag).trim()).filter(Boolean),
      readAt: Date.now()
    })
  }, 1200)
}

onMounted(() => {
  watch(() => route.path, scheduleReadMark, { immediate: true })
})
</script>

<template>
  <span hidden aria-hidden="true" />
</template>
