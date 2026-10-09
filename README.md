# TUXIA

TUXIA 是基于 Hugo 的静态图片工具箱。压缩、格式转换、尺寸调整、裁剪、水印、局部擦除/马赛克、Base64、二维码、取色和 EXIF 查看主要在浏览器本地完成；图片在线链接工具只有在用户主动填写自己的 ImgBB API Key 并点击上传时才会向 ImgBB 发起请求。

站点默认语言是英文，同时提供 `/zh/` 简体中文和 `/zh-tw/` 繁体中文页面。英文页面使用目录 URL（例如 `/tools/compress/`），旧的 `.html` 地址保留为静态兼容跳转入口。语言下拉框以当前页面的 `lang` 为准，因此打开英文首页时顶部会稳定显示 `English`。

## 本地预览和构建

在 PowerShell 中执行：

```powershell
Set-Location E:\Workspace\tuxia
hugo server --bind 127.0.0.1 --port 1313 --disableFastRender
```

生产构建：

```powershell
Set-Location E:\Workspace\tuxia
hugo --config hugo.toml --gc --minify --cleanDestinationDir --destination .\public
```

构建后应检查 `public/index.html`、`public/sitemap.xml`、`public/robots.txt`、`public/ads.txt` 和 `public/404.html`。工具页会生成在 `public/tools/<tool>/index.html`，旧 `.html` 地址会生成兼容跳转文件。

## GitHub Pages 自动部署

仓库的 `.github/workflows/deploy.yml` 会在 `main` 分支收到 push 或手动运行时执行：

1. 使用 Hugo Extended `0.166.0` 构建站点。
2. 写入 `CNAME` 和 `.nojekyll`。
3. 将 `public/` 发布到 `gh-pages` 分支。

首次配置 GitHub：

1. 在 **Settings → Pages** 选择 **Deploy from a branch**。
2. 选择 `gh-pages`，目录选择 `/ (root)`。
3. Custom domain 填 `tuxiatools.com`，打开 **Enforce HTTPS`。
4. 确认仓库 Actions 有写入 contents 的权限，并在 **Actions** 页面手动运行一次 `Deploy TUXIA to GitHub Pages`。

以后更新只需：

```powershell
git add .
git commit -m "Update TUXIA site"
git push origin main
```

部署完成后检查：

```text
https://tuxiatools.com/
https://tuxiatools.com/sitemap.xml
https://tuxiatools.com/robots.txt
https://tuxiatools.com/ads.txt
https://tuxiatools.com/tools/compress/
https://tuxiatools.com/tools/compress.html   (旧地址兼容跳转)
```

如果不使用 Actions，也可以在本地运行上面的 Hugo 构建命令，把 `public/` 的全部内容上传到 `gh-pages` 分支根目录；不要把 Hugo 源文件直接上传到 Pages 发布分支。

## Search Console 和 AdSense

- Search Console 提交 `https://tuxiatools.com/sitemap.xml`，优先检查首页、`/guides/`、主要工具目录页和两个中文首页。
- 每个可索引页面只有一个目录形式 canonical；sitemap 不再提交 `index.html` 或薄的 `/tools/` 区域页。
- `ads.txt` 使用当前 AdSense publisher ID：`pub-5966198580321080`。
- Auto Ads 脚本只在首页和指南页加载，工具操作页保留完整说明和 FAQ，但不在上传/编辑界面插入广告，减少误触并降低低价值工具页的广告风险。
- 在 AdSense 后台完成站点审核，并为 EEA、英国和瑞士流量配置 Google 认证的 CMP；隐私政策页面已说明 AdSense、Cookie、ImgBB 直传和本地处理边界。
- 不要诱导点击广告，也不要通过脚本、刷新或测试流量制造点击。

更完整的上线检查在 [docs/search-console-and-growth-checklist.md](docs/search-console-and-growth-checklist.md)。

第三方前端库的归属和许可证见 [static/vendor/THIRD-PARTY-NOTICES.md](static/vendor/THIRD-PARTY-NOTICES.md)。
