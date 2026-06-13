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
  }
  applyCollapsed()
})

function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value
  localStorage.setItem('os-sidebar-collapsed', String(sidebarCollapsed.value))
  applyCollapsed()
}

function applyCollapsed() {
  if (sidebarCollapsed.value) {
    document.documentElement.classList.add('os-sidebar-collapsed')
  } else {
    document.documentElement.classList.remove('os-sidebar-collapsed')
  }
}
</script>

<template>
  <Layout>
    <template #sidebar-nav-before>
      <button class="os-sidebar-toggle" @click="toggleSidebar" :title="sidebarCollapsed ? '展开边栏' : '收起边栏'">
        <span v-if="sidebarCollapsed">&#9654;</span>
        <span v-else>&#9664;</span>
      </button>
    </template>
    <template #doc-before>
      <ProgressClient />
      <DocMeta />
    </template>
  </Layout>
</template>