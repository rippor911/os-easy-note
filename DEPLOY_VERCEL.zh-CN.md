# 部署到 Vercel

这份说明适用于当前项目：VitePress 静态站点，构建输出目录为 `dist/`。

## 一、项目内已经配置好的内容

项目根目录已经包含 `vercel.json`：

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "installCommand": "npm ci",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

`package.json` 中也固定了 Node 版本：

```json
{
  "engines": {
    "node": "22.x"
  }
}
```

这样做是为了避免 Vercel 默认 Node 24.x 或本地 Node 24.x 与当前 VitePress/Vite 组合在 Windows 构建时出现原生崩溃。

## 二、推荐部署方式：GitHub + Vercel

### 1. 先推送到 GitHub

如果当前目录还不是 Git 仓库：

```bash
git init
git add .
git commit -m "init os notes web"
```

创建 GitHub 仓库后，把本地仓库推上去：

```bash
git remote add origin https://github.com/<你的用户名>/<你的仓库名>.git
git branch -M main
git push -u origin main
```

### 2. 在 Vercel 导入项目

1. 打开 <https://vercel.com/new>。
2. 选择你的 GitHub 仓库。
3. Root Directory 保持项目根目录。
4. Framework Preset 可以选择 `Other`。如果 Vercel 自动识别为 Vite，也可以保留。
5. Build Command 填 `npm run build`。
6. Output Directory 填 `dist`。
7. Install Command 填 `npm ci`。
8. Node.js Version 选择 `22.x`。
9. 点击 Deploy。

因为项目里已经有 `vercel.json` 和 `engines.node`，多数情况下 Vercel 会自动使用这些配置。

## 三、部署后更新

以后每次改完内容：

```bash
npm run check:docs
git add .
git commit -m "update notes"
git push
```

Vercel 会自动重新部署。

## 四、如果出现 404

优先检查：

- `docs/index.md` 是否存在。
- Vercel 的 Output Directory 是否为 `dist`。
- Vercel 的 Build Command 是否为 `npm run build`。
- 访问的是 Vercel 分配的根域名，例如 `https://xxx.vercel.app/`。
- 如果打开的是某个旧链接，确认对应的 Markdown 文件是否还存在。

当前项目已经关闭 `cleanUrls`，部署后页面路径通常会更接近静态文件输出，能减少静态托管下的路径问题。

## 五、如果构建失败

先在本地运行：

```bash
npm run check:docs
npm run typecheck
```

如果 Vercel 日志里显示 Node 版本是 24.x，请检查：

- `package.json` 是否包含 `"engines": { "node": "22.x" }`。
- Vercel Project Settings 里的 Node.js Version 是否选择了 `22.x`。

如果是 Markdown 链接问题，运行：

```bash
npm run check:docs
```

根据提示修复缺失文件或空白页面。
