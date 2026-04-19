import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type DefaultTheme } from 'vitepress'

const projectRoot = fileURLToPath(new URL('..', import.meta.url))
const docsDir = path.join(projectRoot, 'docs')
const orderConfigFile = path.join(projectRoot, 'content-order.json')
const ignoredFiles = new Set(['_template.md'])
const sectionIndexNames = ['index.md', 'main.md', 'README.md']
const enableSearch = process.env.VP_DISABLE_SEARCH !== '1'

interface SidebarOrderConfig {
  top?: string[]
  sections?: Array<{
    dir: string
    text?: string
    pages?: Array<string | {
      file: string
      text?: string
    }>
  }>
}

function isMarkdownFile(fileName: string) {
  return fileName.endsWith('.md') && !ignoredFiles.has(fileName)
}

function normalizeRoute(file: string) {
  const relative = path.relative(docsDir, file).replace(/\\/g, '/')
  const withoutExt = relative.replace(/\.md$/, '')
  return `/${withoutExt.replace(/\/index$/, '/')}`.replace(/\/+/g, '/')
}

function readTitle(file: string) {
  const source = fs.readFileSync(file, 'utf8')
  const frontmatterTitle = source.match(/^---[\s\S]*?\ntitle:\s*["']?(.+?)["']?\s*\n[\s\S]*?---/)
  const headingTitle = source.match(/^#\s+(.+)$/m)
  return cleanDisplayTitle(frontmatterTitle?.[1]?.trim() || headingTitle?.[1]?.trim() || path.basename(file, '.md'))
}

function cleanDisplayTitle(title: string) {
  return title
    .replace(/^\s*\d+(?:[_\-.]\d+)*(?:\s+|[_\-.]+)?/, '')
    .trim()
}

function pageOrderKey(page: string | { file: string; text?: string }) {
  return typeof page === 'string' ? page : page.file
}

function pageOrderText(page: string | { file: string; text?: string }) {
  return typeof page === 'string' ? undefined : page.text
}

function readOrderConfig(): SidebarOrderConfig {
  if (!fs.existsSync(orderConfigFile)) return {}

  try {
    return JSON.parse(fs.readFileSync(orderConfigFile, 'utf8').replace(/^\uFEFF/, '')) as SidebarOrderConfig
  } catch {
    return {}
  }
}

function byConfiguredOrder<T>(items: T[], order: string[] | undefined, getKey: (item: T) => string) {
  if (!order?.length) return items

  const rank = new Map(order.map((key, index) => [key, index]))
  return [...items].sort((a, b) => {
    const aRank = rank.get(getKey(a)) ?? Number.MAX_SAFE_INTEGER
    const bRank = rank.get(getKey(b)) ?? Number.MAX_SAFE_INTEGER
    if (aRank !== bRank) return aRank - bRank
    return getKey(a).localeCompare(getKey(b), 'zh-Hans-CN')
  })
}

function listMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry): string[] => {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) return listMarkdownFiles(fullPath)
      if (!entry.isFile() || !isMarkdownFile(entry.name)) return []
      return [fullPath]
    })
    .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'))
}

function findSectionIndex(files: string[]) {
  return files.find((file) => sectionIndexNames.includes(path.basename(file)))
}

function readableSectionTitle(entryName: string, indexFile?: string) {
  if (!indexFile) return entryName
  const title = readTitle(indexFile)
  return title === 'index' || title === 'main' || title === 'README' ? entryName : title
}

function buildSidebar(): DefaultTheme.SidebarItem[] {
  if (!fs.existsSync(docsDir)) return []

  const orderConfig = readOrderConfig()
  const sectionConfig = new Map(orderConfig.sections?.map((section) => [section.dir, section]) ?? [])
  const entries = fs.readdirSync(docsDir, { withFileTypes: true })
  const topLevelPageFiles = entries
    .filter((entry) => entry.isFile() && isMarkdownFile(entry.name) && entry.name !== 'index.md')
    .map((entry) => path.join(docsDir, entry.name))

  const topLevelPages = byConfiguredOrder(topLevelPageFiles, orderConfig.top, (file) => path.basename(file))
    .map((file) => ({ text: readTitle(file), link: normalizeRoute(file) }))

  const sectionEntries = byConfiguredOrder(
    entries.filter((entry) => entry.isDirectory()),
    orderConfig.sections?.map((section) => section.dir),
    (entry) => entry.name
  )

  const groups = sectionEntries
    .map((entry) => {
      const sectionDir = path.join(docsDir, entry.name)
      const files = listMarkdownFiles(sectionDir)
      if (!files.length) return null

      const config = sectionConfig.get(entry.name)
      const indexFile = findSectionIndex(files)
      const configuredPages = config?.pages ?? []
      const configuredPageText = new Map(
        configuredPages
          .filter((page) => pageOrderText(page))
          .map((page) => [pageOrderKey(page), pageOrderText(page) as string])
      )
      const childFiles = byConfiguredOrder(
        files.filter((file) => file !== indexFile),
        configuredPages
          .map(pageOrderKey)
          .filter((page) => !sectionIndexNames.includes(page)),
        (file) => path.relative(sectionDir, file).replace(/\\/g, '/')
      )

      return {
        text: config?.text || readableSectionTitle(entry.name, indexFile),
        link: indexFile ? normalizeRoute(indexFile) : undefined,
        collapsed: false,
        items: childFiles.map((file) => ({
          text: configuredPageText.get(path.relative(sectionDir, file).replace(/\\/g, '/')) || readTitle(file),
          link: normalizeRoute(file)
        }))
      } satisfies DefaultTheme.SidebarItem
    })
    .filter(Boolean) as DefaultTheme.SidebarItem[]

  return [
    {
      text: '\u5b66\u4e60\u5165\u53e3',
      collapsed: false,
      items: [
        { text: '\u9996\u9875', link: '/' },
        ...topLevelPages
      ]
    },
    ...groups
  ]
}

function mermaidFencePlugin(md: any) {
  const defaultFence = md.renderer.rules.fence?.bind(md.renderer.rules)

  md.renderer.rules.fence = (tokens: any[], idx: number, options: any, env: any, self: any) => {
    const token = tokens[idx]
    const info = token.info.trim()

    if (info === 'mermaid' || info.startsWith('mermaid ')) {
      return `<Mermaid code="${encodeURIComponent(token.content)}"></Mermaid>`
    }

    return defaultFence ? defaultFence(tokens, idx, options, env, self) : self.renderToken(tokens, idx, options)
  }
}

function adjacentStrongPlugin(md: any) {
  md.core.ruler.after('inline', 'adjacent_strong', (state: any) => {
    const splitStrongText = (token: any) => {
      const text = token.content
      if (!text.includes('**')) return [token]

      const Token = token.constructor
      const tokens = []
      const strongRE = /\*\*(?=\S)(.+?\S)\*\*/g
      const cjkRE = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u
      let lastIndex = 0
      let match: RegExpExecArray | null

      while ((match = strongRE.exec(text)) !== null) {
        const beforeChar = match.index > 0 ? text[match.index - 1] : ''
        const afterChar = strongRE.lastIndex < text.length ? text[strongRE.lastIndex] : ''
        if (!cjkRE.test(`${beforeChar}${match[1]}${afterChar}`)) continue

        if (match.index > lastIndex) {
          const before = new Token('text', '', 0)
          before.content = text.slice(lastIndex, match.index)
          tokens.push(before)
        }

        const open = new Token('strong_open', 'strong', 1)
        open.markup = '**'
        tokens.push(open)

        const content = new Token('text', '', 0)
        content.content = match[1]
        tokens.push(content)

        const close = new Token('strong_close', 'strong', -1)
        close.markup = '**'
        tokens.push(close)

        lastIndex = strongRE.lastIndex
      }

      if (lastIndex === 0) return [token]

      if (lastIndex < text.length) {
        const after = new Token('text', '', 0)
        after.content = text.slice(lastIndex)
        tokens.push(after)
      }

      return tokens
    }

    const walk = (tokens: any[]) => {
      for (let index = 0; index < tokens.length; index += 1) {
        const token = tokens[index]
        if (token.children) walk(token.children)
        if (token.type !== 'text') continue

        const replacement = splitStrongText(token)
        if (replacement.length === 1 && replacement[0] === token) continue

        tokens.splice(index, 1, ...replacement)
        index += replacement.length - 1
      }
    }

    walk(state.tokens)
  })
}

export default defineConfig({
  title: 'OS Notes Web',
  description: 'Operating system notes for study and review.',
  srcDir: 'docs',
  outDir: 'dist',
  base: process.env.VITEPRESS_BASE || '/',
  cleanUrls: false,
  appearance: true,
  lastUpdated: true,
  srcExclude: ['**/_template.md'],
  markdown: {
    math: true,
    lineNumbers: true,
    toc: {
      level: [2, 3]
    },
    config(md) {
      mermaidFencePlugin(md)
      adjacentStrongPlugin(md)
    }
  },
  vite: {
    resolve: {
      alias: {
        '@components': path.join(projectRoot, 'components'),
        '@quizzes': path.join(projectRoot, 'quizzes')
      }
    }
  },
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '\u9996\u9875', link: '/' },
      { text: '\u77e5\u8bc6\u7ed3\u6784', link: '/knowledge-map' },
      { text: '\u6807\u7b7e', link: '/tags' },
      { text: '\u5b66\u4e60\u8fdb\u5ea6', link: '/progress' }
    ],
    sidebar: buildSidebar(),
    outline: {
      level: [2, 3],
      label: '\u672c\u9875\u76ee\u5f55'
    },
    ...(enableSearch ? { search: { provider: 'local' as const } } : {}),
    lastUpdated: {
      text: '\u6700\u540e\u66f4\u65b0'
    },
    footer: {
      message: 'Markdown-first OS learning notes.',
      copyright: 'Released for personal study and review.'
    }
  }
})
