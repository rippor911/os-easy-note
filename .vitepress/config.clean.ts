import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type DefaultTheme } from 'vitepress'

const projectRoot = fileURLToPath(new URL('..', import.meta.url))
const docsDir = path.join(projectRoot, 'docs')
const ignoredFiles = new Set(['_template.md'])
const sectionIndexNames = ['index.md', 'main.md', 'README.md']
const enableSearch = process.env.VP_DISABLE_SEARCH !== '1'

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
  return frontmatterTitle?.[1]?.trim() || headingTitle?.[1]?.trim() || path.basename(file, '.md')
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

  const entries = fs.readdirSync(docsDir, { withFileTypes: true })
  const topLevelPages = entries
    .filter((entry) => entry.isFile() && isMarkdownFile(entry.name) && entry.name !== 'index.md')
    .map((entry) => path.join(docsDir, entry.name))
    .map((file) => ({ text: readTitle(file), link: normalizeRoute(file) }))

  const groups = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const sectionDir = path.join(docsDir, entry.name)
      const files = listMarkdownFiles(sectionDir)
      if (!files.length) return null

      const indexFile = findSectionIndex(files)
      const childFiles = files.filter((file) => file !== indexFile)

      return {
        text: readableSectionTitle(entry.name, indexFile),
        link: indexFile ? normalizeRoute(indexFile) : undefined,
        collapsed: false,
        items: childFiles.map((file) => ({
          text: readTitle(file),
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
