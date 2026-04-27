<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const difficulty = computed(() => frontmatter.value.difficulty)
const review = computed(() => frontmatter.value.review)
</script>

<template>
  <section v-if="difficulty || review" class="doc-meta">
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
