# TUXIA

TUXIA is a free static browser-based image toolbox built with Hugo. It is designed for GitHub Pages, Cloudflare Pages, Netlify, Vercel Static, or any static hosting service.

## Features

- Image compression, format conversion, resizing, cropping, watermarking, local retouching and mosaic.
- Image Base64 conversion, QR code generation and decoding, color extraction, and EXIF metadata viewing.
- Most tools run locally in the browser with no login, backend, membership logic, TUXIA server upload, or TUXIA file storage.
- Image URL generation uses the official ImgBB upload API only when users provide their own ImgBB API key and choose to upload directly from the browser to ImgBB.
- ImgBB API keys are saved only in the current browser localStorage.
- Google AdSense is enabled through `googleAdClient` in `hugo.toml`.
- The default language is English, with real static SEO pages for English, Simplified Chinese, and Traditional Chinese.

## Local Preview

```powershell
Set-Location E:\QuickWeb\Tuxia-github-static
hugo server --bind 127.0.0.1 --port 1313 --disableFastRender
```

## Build

```powershell
Set-Location E:\QuickWeb\Tuxia-github-static
hugo --config hugo.toml --gc --minify --cleanDestinationDir --destination .\public
```

## GitHub Pages

The source code lives on `main`. GitHub Actions builds the Hugo site and publishes the generated static files to the `gh-pages` branch automatically.

Production site:

```text
https://tuxiatools.com/
```

GitHub Pages should be configured with:

- Source: `Deploy from a branch`
- Branch: `gh-pages`
- Folder: `/ (root)`
- Custom domain: `tuxiatools.com`
- Enforce HTTPS: enabled

## SEO and Ads

- Sitemap: `https://tuxiatools.com/sitemap.xml`
- Robots: `https://tuxiatools.com/robots.txt`
- Ads file: `https://tuxiatools.com/ads.txt`
- Search Console and launch checklist: `docs/search-console-and-growth-checklist.md`
