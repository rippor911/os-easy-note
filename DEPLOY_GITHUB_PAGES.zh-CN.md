# 部署到 GitHub Pages

这份说明适用于当前仓库 `rippor911/os-easy-note`。

当前项目已经添加 GitHub Actions 工作流：

```text
.github/workflows/deploy-pages.yml
```

它会在推送到 `main` 分支时自动：

1. 使用 Node 22。
2. 执行 `npm ci`。
3. 执行 `npm run check:docs`。
4. 执行 `npm run typecheck`。
5. 执行 `npm run build`。
6. 上传 `dist/` 到 GitHub Pages。

## 一、为什么需要 VITEPRESS_BASE

GitHub Project Pages 的默认访问地址是：

```text
https://rippor911.github.io/os-easy-note/
```

也就是说站点不是挂在域名根路径 `/`，而是挂在 `/os-easy-note/`。

本项目的 VitePress 配置中有：

```ts
base: process.env.VITEPRESS_BASE || '/'
```

因此 GitHub Actions 构建时会设置：

```yaml
VITEPRESS_BASE: /${{ github.event.repository.name }}/
```

对于当前仓库，实际就是：

```text
/os-easy-note/
```

## 二、启用 GitHub Pages

第一次部署前，可以在 GitHub 仓库页面手动开启 Pages：

1. 打开仓库 `rippor911/os-easy-note`。
2. 进入 `Settings`。
3. 左侧选择 `Pages`。
4. `Build and deployment` 中：
   - Source 选择 `GitHub Actions`。
5. 保存。

之后每次 push 到 `main`，GitHub Actions 会自动部署。

当前 workflow 也给 `actions/configure-pages` 设置了：

```yaml
enablement: true
```

如果仓库权限允许，它会在第一次运行时自动启用 GitHub Pages。若 Actions 仍提示 `Get Pages site failed`，就按上面的步骤手动把 Source 改成 `GitHub Actions`，再重新运行 workflow。

## 三、推送触发部署

本地提交并推送：

```bash
git add .
git commit -m "deploy with github pages"
git push
```

然后打开：

```text
https://rippor911.github.io/os-easy-note/
```

## 四、本地模拟 GitHub Pages 路径

如果想在本地提前检查 `/os-easy-note/` 这个 base 路径：

```bash
$env:VITEPRESS_BASE="/os-easy-note/"
npm run build
npm run preview -- --port 4174
```

然后访问：

```text
http://localhost:4174/os-easy-note/
```

如果使用 bash：

```bash
VITEPRESS_BASE=/os-easy-note/ npm run build
npm run preview -- --port 4174
```

## 五、常见问题

### 页面能打开但样式丢失

通常是 `base` 不对。确认 GitHub Actions 的 Build 步骤中存在：

```yaml
env:
  VITEPRESS_BASE: /${{ github.event.repository.name }}/
```

如果仓库名改了，这个值会自动跟着仓库名变化。

### Actions 成功但 Pages 仍是旧页面

检查：

1. `Settings → Pages → Source` 是否选择 `GitHub Actions`。
2. `Actions` 页面中最新的 `Deploy GitHub Pages` workflow 是否成功。
3. 浏览器是否缓存了旧资源，可以强制刷新。

### 想用自定义域名

如果以后绑定自定义域名并挂在域名根路径，例如：

```text
https://os-note.example.com/
```

那么 `VITEPRESS_BASE` 应改回 `/`。可以在 workflow 里把 Build 步骤的环境变量改成：

```yaml
VITEPRESS_BASE: /
```
