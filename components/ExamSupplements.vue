<script setup lang="ts">
export interface SupplementCodeBlock {
  type: 'code'
  language?: string
  content: string
}

export interface SupplementTableBlock {
  type: 'table'
  headers?: string[]
  rows: string[][]
  caption?: string
}

export type SupplementBlock = SupplementCodeBlock | SupplementTableBlock

defineProps<{
  blocks?: SupplementBlock[]
}>()

function supplementKey(block: SupplementBlock, index: number) {
  if (block.type === 'code') return `${block.type}:${block.language || 'plain'}:${index}`
  return `${block.type}:${block.caption || 'table'}:${index}`
}
</script>

<template>
  <template v-for="(block, blockIndex) in blocks" :key="supplementKey(block, blockIndex)">
    <pre v-if="block.type === 'code'" class="exam-supplement exam-supplement--code">{{ block.content }}</pre>
    <div v-else class="exam-supplement exam-supplement--table">
      <p v-if="block.caption" class="exam-supplement__caption">{{ block.caption }}</p>
      <table>
        <thead v-if="block.headers?.length">
          <tr>
            <th v-for="header in block.headers" :key="header">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in block.rows" :key="rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="`${rowIndex}-${cellIndex}`">{{ cell }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
</template>

<style scoped>
.exam-supplement {
  box-sizing: border-box;
  max-width: 100%;
  margin: 10px 0;
}

.exam-supplement--code {
  overflow-x: auto;
  border-radius: var(--os-radius);
  padding: 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.55;
}

.exam-supplement--table {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.exam-supplement__caption {
  margin: 0 0 6px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 800;
}

.exam-supplement--table table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  font-size: 12px;
  line-height: 1.35;
}

.exam-supplement--table th,
.exam-supplement--table td {
  padding: 4px 5px;
  text-align: center;
  white-space: nowrap;
}

.exam-supplement--table th:first-child,
.exam-supplement--table td:first-child {
  width: 68px;
  text-align: left;
}

@media (max-width: 760px) {
  .exam-supplement--table table {
    min-width: 720px;
  }
}
</style>
