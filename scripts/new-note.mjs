import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const projectRoot = process.cwd()
const docsDir = path.join(projectRoot, 'docs')

function usage() {
  console.log('Usage: npm run new:note -- <section> "<title>" [slug]')
  console.log('Example: npm run new:note -- memory "Virtual Memory" virtual-memory')
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const [section, title, explicitSlug] = process.argv.slice(2)

if (!section || !title) {
  usage()
  process.exit(1)
}

const slug = explicitSlug || slugify(title) || `note-${Date.now()}`
const sectionDir = path.join(docsDir, section)
const target = path.join(sectionDir, `${slug}.md`)

if (fs.existsSync(target)) {
  console.error(`Note already exists: ${target}`)
  process.exit(1)
}

fs.mkdirSync(sectionDir, { recursive: true })

const today = new Date().toISOString().slice(0, 10)
const template = `---
title: ${title}
tags: [${section}]
difficulty: todo
review: ${today}
---

# 一句话概括

用一句话说明本页要解决的核心问题。

# 核心内容

- 

# 易错点

- 

# 例题

<Reveal title="例题解析">

这里写解析。

</Reveal>

# 代码示例

\`\`\`c
// 如果本节不需要代码，可以删除本节。
\`\`\`

# 关联知识

- 
`

fs.writeFileSync(target, template, 'utf8')
console.log(`Created ${path.relative(projectRoot, target)}`)
