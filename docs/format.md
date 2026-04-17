---
title: Document Format
tags: [guide]
---

# Document Format

OS Notes Web uses a loose Markdown-first contract:

- `docs/index.md` is required because it serves `/`.
- Markdown files must live under `docs/`.
- Section folders may use either `index.md` or `main.md` as the landing page.
- Frontmatter is optional.
- One H1 heading is recommended.
- Empty files are allowed as drafts, but they render as blank pages.
- Prefer relative Markdown links such as `./3_2 页式管理基础.md`.

## Optional Frontmatter

```md
---
title: Paging Basics
tags: [memory, exam]
difficulty: medium
review: 2026-04-17
---
```

## Check Command

```bash
npm run check:docs
```
