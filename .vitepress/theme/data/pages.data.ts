import { createContentLoader } from 'vitepress'

export interface NotePage {
  title: string
  url: string
  tags: string[]
  difficulty?: string
  review?: string
}

function normalizeTags(raw: unknown): string[] {
  if (!raw) return []
  if (Array.isArray(raw)) return raw.map(String).map((tag) => tag.trim()).filter(Boolean)
  return String(raw).split(',').map((tag) => tag.trim()).filter(Boolean)
}

declare const data: NotePage[]
export { data }

export default createContentLoader('**/*.md', {
  transform(raw) {
    return raw
      .filter((page) => !page.url.includes('/_template'))
      .map((page) => ({
        title: page.frontmatter.title || page.url.replace(/^\//, ''),
        url: page.url,
        tags: normalizeTags(page.frontmatter.tags),
        difficulty: page.frontmatter.difficulty,
        review: page.frontmatter.review
      }))
      .sort((a, b) => a.title.localeCompare(b.title, 'zh-Hans-CN'))
  }
})
