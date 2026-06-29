# TUXIA Search Console, Ads, and Growth Checklist

This checklist is for the public static site at `https://tuxiatools.com/`.

## Google Search Console

The domain property should be verified for:

```text
tuxiatools.com
```

Submit this sitemap:

```text
https://tuxiatools.com/sitemap.xml
```

After each major deployment, use URL Inspection for these priority URLs:

```text
https://tuxiatools.com/
https://tuxiatools.com/tools/compress.html
https://tuxiatools.com/tools/convert.html
https://tuxiatools.com/tools/resize.html
https://tuxiatools.com/tools/crop.html
https://tuxiatools.com/tools/watermark.html
https://tuxiatools.com/tools/retouch.html
https://tuxiatools.com/tools/palette.html
https://tuxiatools.com/tools/qrcode-gen.html
https://tuxiatools.com/tools/qrcode-dec.html
https://tuxiatools.com/tools/base64.html
https://tuxiatools.com/tools/exif.html
https://tuxiatools.com/zh/
https://tuxiatools.com/zh-tw/
```

Use "Test Live URL" first, then "Request Indexing" for pages that have changed.

## Technical SEO Checks

- `https://tuxiatools.com/robots.txt` returns `200` and references the sitemap.
- `https://tuxiatools.com/sitemap.xml` returns `200` and includes English, Simplified Chinese, and Traditional Chinese URLs.
- Each tool page has one canonical URL and alternate `hreflang` links for `en`, `zh-CN`, `zh-TW`, and `x-default`.
- Each tool page includes an English guide and FAQ section.
- Chinese SEO pages exist under `/zh/` and `/zh-tw/`.
- Page titles and meta descriptions are unique enough for every tool.

## Google AdSense

- Confirm `ads.txt` is reachable:

```text
https://tuxiatools.com/ads.txt
```

- Confirm the AdSense script is present in the page source.
- Leave Auto Ads enabled in AdSense unless a page layout needs manual ad placement later.
- Do not encourage accidental or artificial ad clicks.

## Initial Traffic and External Links

Start with useful, non-spam links:

- Add the official site link to the GitHub repository About field.
- Add screenshots and a concise feature list to the GitHub README.
- Submit the sitemap to Bing Webmaster Tools.
- Publish a short launch post on X, LinkedIn, Reddit, V2EX, Product Hunt, Hacker News "Show HN", or relevant designer/developer communities.
- Write small tutorials such as "compress images before uploading to a blog", "extract a color palette from a screenshot", and "generate a styled QR code".
- Link to specific tool pages from those tutorials instead of linking only to the homepage.

## Deployment Flow

The repository includes GitHub Actions. Push to `main` to build Hugo and deploy `public/` to the `gh-pages` branch automatically.

Manual fallback:

```powershell
Set-Location E:\QuickWeb\Tuxia-github-static
hugo --config hugo.toml --gc --minify --cleanDestinationDir --destination .\public
```
