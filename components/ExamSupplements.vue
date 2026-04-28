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

