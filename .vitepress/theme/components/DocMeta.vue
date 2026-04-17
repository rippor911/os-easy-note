<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { frontmatter } = useData()

const tags = computed(() => {
  const raw = frontmatter.value.tags
  if (!raw) return []
  return Array.isArray(raw) ? raw : String(raw).split(',').map((tag) => tag.trim())
})

const difficulty = computed(() => frontmatter.value.difficulty)
const review = computed(() => frontmatter.value.review)

function tagHref(tag: string) {
  return withBase(`/tags?tag=${encodeURIComponent(tag)}`)
}
</script>

<template>
  <section v-if="tags.length || difficulty || review" class="doc-meta">
    <div v-if="tags.length" class="doc-meta__group">
      <span class="doc-meta__label">Tags</span>
      <a v-for="tag in tags" :key="tag" class="doc-meta__tag" :href="tagHref(tag)">
        {{ tag }}
      </a>
    </div>
    <div v-if="difficulty" class="doc-meta__item">
      <span class="doc-meta__label">Difficulty</span>
      <span>{{ difficulty }}</span>
    </div>
    <div v-if="review" class="doc-meta__item">
      <span class="doc-meta__label">Review</span>
      <span>{{ review }}</span>
    </div>
  </section>
</template>
