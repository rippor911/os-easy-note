---
title: 中文编辑方法
tags: [guide]
---

# 中文编辑方法

本页是站内版编辑说明。完整版本见项目根目录的 `EDITING_GUIDE.zh-CN.md`。

## 最常用命令

```bash
npm run dev
npm run check:docs
npm run typecheck
```

## 最低格式要求

- `docs/index.md` 必须存在。
- 所有笔记放在 `docs/` 下。
- Markdown 文件使用 `.md` 后缀。
- 章节目录建议放 `main.md` 或 `index.md`。
- frontmatter 可选。
- H1 标题推荐写，但不是强制。

## 推荐页面模板

```md
---
title: 页面标题
tags: [memory, exam]
difficulty: medium
review: 2026-04-17
---

# 页面标题

## 一句话概括

## 核心内容

## 易错点

## 例题

## 关联知识
```

## 检查文档

```bash
npm run check:docs
```

这个命令会检查首页是否存在、frontmatter 是否闭合、空文件、缺少 H1、章节目录缺入口页、相对 Markdown 链接是否失效。
