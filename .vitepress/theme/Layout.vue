<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import DocMeta from './components/DocMeta.vue'
import ProgressClient from './components/ProgressClient.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-before>
      <ProgressClient />
      <DocMeta />
    </template>
  </Layout>
</template>
