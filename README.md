# OS Notes Web

一个面向计算机学生的操作系统学习笔记网站骨架，使用 VitePress、Vue 3、TypeScript 与 Markdown 构建。目标是把手写 Markdown 笔记沉淀为可长期维护、可复习、可刷题的静态学习站点。

## 快速开始

```bash
# 依赖下载
npm install

# 构建与检查
npm run build        # 静态构建，输出到 dist/
npm run preview      # 预览构建结果
npm run typecheck    # TypeScript 类型检查

# 远程部署更新
# 正常流程更新 GitHub 仓库即可
```

默认本地开发地址通常是 `http://localhost:5173/`。

## 编辑方法

中文编辑手册见 `EDITING_GUIDE.zh-CN.md`。

## 内容组织

- `docs/`：Markdown 笔记页面，是最核心的内容资产。
- `quizzes/`：本地 JSON 题库，和页面内容解耦。
- `components/`：学习交互组件，例如单选题、填空题、答案折叠和概念对比。
- `.vitepress/`：站点配置、主题扩展、页面索引数据加载器。
- `scripts/`：内容生产辅助脚本。

## Markdown 页面模板

```md
---
title: 页面标题
tags: [memory, exam, 高频考点]
difficulty: medium
review: 2026-04-16
---

# 一句话概括

# 核心内容

# 易错点

# 例题

# 代码示例

# 关联知识
```

也可以使用脚本生成：

```bash
npm run new:note -- memory "Virtual Memory"
```