import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const docsDir = path.join(root, 'docs')
const orderConfigFile = path.join(root, 'content-order.json')
const warnings = []
const errors = []
const sectionIndexNames = new Set(['index.md', 'main.md', 'README.md'])

function toPosix(value) {
  return value.replace(/\\/g, '/')
}

function listMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) return []

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return listMarkdownFiles(fullPath)
    if (entry.isFile() && entry.name.endsWith('.md')) return [fullPath]
    return []
  })
}

function relative(file) {
  return toPosix(path.relative(root, file))
}

function validateFrontmatter(file, source) {
  if (!source.startsWith('---')) return

  const end = source.indexOf('\n---', 3)
  if (end === -1) {
    errors.push(`${relative(file)} starts frontmatter with --- but never closes it.`)
  }
}

function validateLinks(file, source) {
  const linkPattern = /\[[^\]]+\]\(([^)]+)\)/g
  let match

  while ((match = linkPattern.exec(source))) {
    const rawHref = match[1].trim()
    if (!rawHref || rawHref.startsWith('#')) continue
    if (/^(https?:|mailto:|tel:)/.test(rawHref)) continue

    const hrefWithoutHash = rawHref.split('#')[0]
    if (!hrefWithoutHash.endsWith('.md')) continue

    const decodedHref = decodeURIComponent(hrefWithoutHash)
    const target = decodedHref.startsWith('/')
      ? path.join(docsDir, decodedHref)
      : path.resolve(path.dirname(file), decodedHref)

    if (!fs.existsSync(target)) {
      warnings.push(`${relative(file)} links to missing markdown file: ${rawHref}`)
    }
  }
}

function validateSectionIndexes() {
  const entries = fs.readdirSync(docsDir, { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const sectionDir = path.join(docsDir, entry.name)
    const hasIndex = fs
      .readdirSync(sectionDir, { withFileTypes: true })
      .some((child) => child.isFile() && sectionIndexNames.has(child.name))

    if (!hasIndex) {
      warnings.push(`${relative(sectionDir)} has no index.md or main.md section landing page.`)
    }
  }
}

function validateOrderConfig() {
  if (!fs.existsSync(orderConfigFile)) return

  let config
  try {
    config = JSON.parse(fs.readFileSync(orderConfigFile, 'utf8').replace(/^\uFEFF/, ''))
  } catch (error) {
    errors.push(`content-order.json is not valid JSON: ${error.message}`)
    return
  }

  for (const page of config.top || []) {
    const target = path.join(docsDir, page)
    if (!fs.existsSync(target)) {
      warnings.push(`content-order.json top entry does not exist: ${page}`)
    }
  }

  for (const section of config.sections || []) {
    if (!section.dir) {
      warnings.push('content-order.json has a section without dir.')
      continue
    }

    const sectionDir = path.join(docsDir, section.dir)
    if (!fs.existsSync(sectionDir)) {
      warnings.push(`content-order.json section dir does not exist: ${section.dir}`)
      continue
    }

    for (const pageEntry of section.pages || []) {
      const page = typeof pageEntry === 'string' ? pageEntry : pageEntry.file
      if (!page) {
        warnings.push(`content-order.json section ${section.dir} has a page entry without file.`)
        continue
      }

      const target = path.join(sectionDir, page)
      if (!fs.existsSync(target)) {
        warnings.push(`content-order.json page does not exist: ${section.dir}/${page}`)
      }
    }
  }
}

if (!fs.existsSync(docsDir)) {
  errors.push('docs/ directory does not exist.')
} else {
  const indexFile = path.join(docsDir, 'index.md')
  if (!fs.existsSync(indexFile)) {
    errors.push('docs/index.md is required because it serves the site root /.')
  }

  const files = listMarkdownFiles(docsDir)
  for (const file of files) {
    const source = fs.readFileSync(file, 'utf8')
    if (!source.trim()) warnings.push(`${relative(file)} is empty. It will build, but the page will be blank.`)
    if (!/^#\s+.+/m.test(source)) warnings.push(`${relative(file)} has no H1 heading.`)
    validateFrontmatter(file, source)
    validateLinks(file, source)
  }

  validateSectionIndexes()
  validateOrderConfig()
}

if (warnings.length) {
  console.log('Doc warnings:')
  warnings.forEach((warning) => console.log(`- ${warning}`))
}

if (errors.length) {
  console.error('Doc errors:')
  errors.forEach((error) => console.error(`- ${error}`))
  process.exit(1)
}

console.log('Doc check completed.')
