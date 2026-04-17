# OS Notes Web Document Format

This project now uses a loose Markdown-first contract. The goal is to avoid 404s and avoid forcing your notes into a heavy schema.

## Required

- `docs/index.md` must exist. It is the home page for `/`.
- Markdown files must live under `docs/`.
- File extension must be `.md`.
- Frontmatter is optional.

## Recommended

- Each section folder should have either `index.md` or `main.md`.
- Each page should have one H1 heading, for example `# Paging Basics`.
- Empty Markdown files are allowed, but they produce blank pages.
- Use relative Markdown links when possible, for example `./3_2 页式管理基础.md`.

## Optional Frontmatter

```md
---
title: Paging Basics
tags: [memory, exam]
difficulty: medium
review: 2026-04-17
---
```

Supported fields:

- `title`: display title.
- `tags`: list of tags used by the tag page.
- `difficulty`: any text label.
- `review`: date or note for review planning.

## Custom Components

These components are optional and can be used inside Markdown:

```md
<Reveal title="Answer">
Explanation here.
</Reveal>

<Quiz collection="memory" />

<FillBlank id="page-offset" question="Page size is 4 KiB. Offset bits?" answer="12" />

<CompareCard
  left-title="TLB miss"
  right-title="Page Fault"
  :left="['TLB cache miss', 'May still be in memory']"
  :right="['Invalid page-table translation', 'May need kernel handling']"
/>
```

## Check Command

```bash
npm run check:docs
```

This command reports missing `docs/index.md`, unclosed frontmatter, empty draft pages, missing H1 headings, missing section landing pages, and broken relative `.md` links.
