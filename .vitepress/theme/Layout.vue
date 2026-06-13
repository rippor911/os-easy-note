<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DefaultTheme from 'vitepress/theme'
import DocMeta from './components/DocMeta.vue'
import ProgressClient from './components/ProgressClient.vue'

const { Layout } = DefaultTheme

const sidebarCollapsed = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('os-sidebar-collapsed')
  if (saved === 'true') {
    sidebarCollapsed.value = true
    document.documentElement.classList.add('os-sidebar-collapsed')
  }
})

function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value
  localStorage.setItem('os-sidebar-collapsed', String(sidebarCollapsed.value))
  document.documentElement.classList.toggle('os-sidebar-collapsed', sidebarCollapsed.value)
}
</script>

<template>
  <Layout>
    <template #nav-bar-content-before>
      <button class="os-sidebar-toggle" @click="toggleSidebar" :title="sidebarCollapsed ? '展开边栏' : '收起边栏'">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1.5" y="2.5" width="13" height="1.5" rx="0.75" fill="currentColor"/>
          <rect v-if="!sidebarCollapsed" x="1.5" y="7" width="10" height="1.5" rx="0.75" fill="currentColor"/>
          <rect x="1.5" y="11.5" width="13" height="1.5" rx="0.75" fill="currentColor"/>
        </svg>
      </button>
    </template>
    <template #doc-before>
      <ProgressClient />
      <DocMeta />
    </template>
  </Layout>
</template>