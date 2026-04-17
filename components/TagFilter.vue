<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { data as pages, type NotePage } from '../.vitepress/theme/data/pages.data'

const selectedTag = ref('')

const taggedPages = computed(() => pages.filter((page: NotePage) => page.tags.length))

const allTags = computed(() => {
  const tags = new Set<string>()
  taggedPages.value.forEach((page) => page.tags.forEach((tag) => tags.add(tag)))
  return [...tags].sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'))
})

const filteredPages = computed(() => {
  if (!selectedTag.value) return taggedPages.value
  return taggedPages.value.filter((page) => page.tags.includes(selectedTag.value))
})

onMounted(() => {
  const tag = new URLSearchParams(window.location.search).get('tag')
  if (tag) selectedTag.value = tag
})
</script>

<template>
  <section class="tag-filter">
    <div class="tag-filter__toolbar">
      <button
        class="tag-filter__tag"
        :class="{ 'is-active': selectedTag === '' }"
        type="button"
        @click="selectedTag = ''"
      >
        全部
      </button>
      <button
        v-for="tag in allTags"
        :key="tag"
        class="tag-filter__tag"
        :class="{ 'is-active': selectedTag === tag }"
        type="button"
        @click="selectedTag = tag"
      >
        {{ tag }}
      </button>
    </div>

    <p class="tag-filter__count">共 {{ filteredPages.length }} 个页面</p>

    <div class="tag-filter__list">
      <a v-for="page in filteredPages" :key="page.url" class="tag-filter__item" :href="page.url">
        <strong>{{ page.title }}</strong>
        <span>
          <em v-for="tag in page.tags" :key="tag">{{ tag }}</em>
        </span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.tag-filter {
  margin: 24px 0;
}

.tag-filter__toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tag-filter__tag {
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 7px 12px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-weight: 700;
  cursor: pointer;
}

.tag-filter__tag.is-active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: white;
}

.tag-filter__count {
  color: var(--vp-c-text-2);
}

.tag-filter__list {
  display: grid;
  gap: 10px;
}

.tag-filter__item {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 14px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.tag-filter__item:hover {
  border-color: var(--vp-c-brand-1);
}

.tag-filter__item span {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: flex-end;
}

.tag-filter__item em {
  border-radius: 999px;
  padding: 2px 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-style: normal;
  font-size: 12px;
}

@media (max-width: 640px) {
  .tag-filter__item {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
