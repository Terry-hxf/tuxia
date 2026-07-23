---
title: "QR Code Design Guide: Colors, Sizes, Logos, and Testing Best Practices | TUXIA"
heading: "QR Code Design Guide: Colors, Sizes, Logos, and Testing Best Practices"
description: "Master QR code design with this comprehensive guide. Learn about error correction, minimum sizes, color contrast, logo placement, dot styles, export formats, and testing methods to ensure reliable scanning."
keywords: "QR code design,QR code error correction,QR code colors,QR code logo,QR code minimum size,QR code best practices,QR code testing,QR code PNG vs SVG,generate QR code,custom QR code,TUXIA"
date: "2026-07-23"
readingTime: 6
layout: "guide-single"
pageLang: "en"
relatedTools: ["qrcode-gen", "qrcode-dec"]
---

A QR code that looks beautiful but will not scan is worse than no QR code at all. Every design decision -- color, size, logo placement, error correction -- affects whether a smartphone can reliably read your code in the real world. This guide explains how QR codes work, what the design parameters mean, and how to create codes that balance aesthetics with reliability.

## How QR Codes Actually Work

A QR code (Quick Response code) is a two-dimensional barcode that stores data in a grid of black and white modules (the small squares). A scanner reads these modules and decodes them back into text, a URL, contact information, or whatever data was encoded.

Every QR code contains several fixed elements:

- **Finder patterns**: The three large squares in the corners. They tell the scanner "this is a QR code" and establish orientation.
- **Alignment pattern**: A smaller square (for codes version 2 and above) that helps the scanner correct for perspective distortion.
- **Timing patterns**: Alternating black and white modules between the finder patterns that define the grid spacing.
- **Quiet zone**: The blank margin around the code (minimum 4 modules wide) that separates it from surrounding content.
- **Data and error correction modules**: The remaining space, which stores your actual content plus redundancy for recovery.

### Module Size and QR Code Versions

QR codes come in versions 1 through 40. Version 1 is a 21x21 grid (smallest). Version 40 is a 177x177 grid (largest). The version is determined automatically by the amount of data you encode. A short URL fits in version 2 or 3. A long paragraph of text might require version 10 or higher.

You do not need to choose a version manually. The TUXIA QR Code Generator calculates the minimum version needed based on your input and your chosen error correction level.

## The Four Error Correction Levels

Error correction is what makes QR codes robust. Even if part of the code is damaged, obscured, or covered by a logo, the scanner can reconstruct the original data using redundant information stored alongside it.

| Level | Recovery Capacity | When to Use |
|---|---|---|
| **L (Low)** | ~7% of the code can be damaged | Clean digital displays, controlled environments. Maximizes data capacity. |
| **M (Medium)** | ~15% recovery | General purpose. The default for most QR codes. Balances density and durability. |
| **Q (Quartile)** | ~25% recovery | Codes that may get dirty, worn, or partially obscured. A good balance for printed materials. |
| **H (High)** | ~30% recovery | Codes with a logo overlay, codes printed on curved or textured surfaces, codes for outdoor use, codes that will be small relative to scanning distance. |

Higher error correction levels produce physically larger (or denser) QR codes because more modules are dedicated to recovery data instead of your content. For a given input, an H-level code may be 3-5 versions higher than an L-level code.

**Practical recommendation**: For QR codes that will contain a logo, always use H (30%) error correction. The logo physically covers data modules, and you need maximum redundancy to compensate. For clean codes displayed on a screen (no logo, no risk of physical damage), M (15%) is sufficient.

## Minimum Size Guidelines

The minimum size of a QR code depends on two factors: the scanning distance and the print resolution.

### Digital Display (Screens)

For codes displayed on a screen, the minimum is roughly **2 cm (about 0.8 inches) on the smallest side**. At typical phone scanning distances (15-30 cm or 6-12 inches), this is clearly readable. Codes on a large monitor or TV can be smaller because the user's phone is closer to the screen.

### Print

Printed codes need to be larger because they are usually scanned from farther away. The rule of thumb:

| Scanning Distance | Minimum QR Code Size |
|---|---|
| Close (under 30 cm / 12 inches) | 2 x 2 cm (0.8 x 0.8 inches) |
| Arm's length (30-60 cm / 12-24 inches) | 5 x 5 cm (2 x 2 inches) |
| Sign or poster (1-2 meters / 3-6 feet) | 10 x 10 cm (4 x 4 inches) |
| Billboard or distant sign (3-5 meters / 10-16 feet) | 20 x 20 cm (8 x 8 inches) or larger |

A good general rule: **the scanning distance in centimeters divided by 10 equals the minimum code width in centimeters**. For a scanning distance of one meter, use a code at least 10 cm wide.

### High-DPI Printing

If you are printing the QR code at 300 DPI or higher, ensure each module (small square) occupies at least 4-5 printed dots. Below that threshold, individual modules may merge or blur, causing scan failures. The TUXIA QR Code Generator exports at 300 DPI by default when you select PNG export at a specific pixel size.

## Color Contrast Requirements

The most common QR code design mistake is insufficient contrast between the foreground (dark modules) and background (light modules). Here is what you need to know:

**The foreground must be darker than the background.** Period. A scanner interprets darker areas as data modules and lighter areas as empty space. If these are reversed or too similar in brightness, the code will not scan.

**The contrast ratio should be at least 4:1**, the same standard used for web text accessibility. Pure black on pure white is a ratio of 21:1 and will scan reliably. Dark blue (#003366) on light yellow (#FFFFCC) is roughly 8:1 and works well. Light gray (#CCCCCC) on white (#FFFFFF) is barely 1.5:1 and will fail.

**Avoid these color combinations:**

- Light colors on dark backgrounds (the scanner expects dark modules on a light background)
- Colors of similar brightness (red on green, blue on purple)
- Gradients that cause some modules to lose contrast near the edges

**Safe color approaches:**

- Always test the code yourself with at least two different phones before publishing.
- If you use brand colors, make the foreground significantly darker than the background.
- When in doubt, black on white is always reliable.
- A dark navy blue on white or very light cream works well for branded codes.

The TUXIA QR Code Generator lets you set custom foreground and background colors. Use the live preview to verify readability. A good test: squint at the preview. If you can still distinguish the foreground from the background, the contrast is probably sufficient. If the pattern blurs together, the contrast is too low.

## Adding Logos to QR Codes

A logo in the center of a QR code makes it recognizable and branded, but it also covers up data modules. This is why logo placement must be handled carefully.

### Logo Size Limits

The logo should cover no more than **15-20% of the QR code's total area** (which translates to roughly 30% of the code's width and height). A larger logo covers too many data modules for even H-level error correction to compensate.

If the TUXIA QR Code Generator's preview shows the logo overlapping the finder patterns (the three large corner squares), the logo or the code size is too large. Reduce one or the other.

### Error Correction Tradeoff

When you add a logo, you must use **H (High, 30%) error correction**. The H level dedicates approximately 30% of the modules to redundancy, which is enough to recover from the data lost under a properly sized logo. Using M or Q levels with a logo risks scan failure.

### Logo Design Tips

- Use a simple, high-contrast logo. Detailed logos with gradients, shadows, or thin lines may not render clearly at the small sizes required.
- Place the logo in the dead center of the code, covering the area where vertical and horizontal timing patterns intersect. This area contains fewer critical modules.
- Add a small white padding around the logo (2-4 modules wide) to prevent the code's data modules from visually bleeding into the logo.
- Export as SVG when possible. SVG logos embedded in SVG QR codes remain sharp at any size.

## Dot Style and Corner Style Options

Modern QR code generators offer visual customization beyond simple squares:

**Dot style** controls the shape of individual data modules. Options include:

- **Squares**: The classic, most reliable shape. Maximum contrast and clean edges.
- **Rounded dots**: Circles instead of squares. Softer look, generally scan reliably but may be slightly less robust at very small sizes.
- **Rounded squares**: A middle ground. Cleaner than squares, more robust than circles.

**Corner style** controls the shape of the finder pattern squares. Options include rounded corners, square-with-rounded-inner, and circle outlines. These are decorative and generally do not affect scan reliability as long as the finder pattern remains recognizable.

The TUXIA QR Code Generator shows these options in the live preview, so you can experiment and find a look that matches your brand while remaining scannable.

## PNG vs SVG Export

| Feature | PNG | SVG |
|---|---|---|
| File type | Raster (fixed pixels) | Vector (scales infinitely) |
| Best for | Direct sharing, social media, email | Print design, websites, further editing |
| Scalability | Limited (enlarging causes blur) | Unlimited (sharp at any size) |
| File size for a 1000px code | 15-30 KB | 2-8 KB |
| Editing | Harder (pixel-level editing needed) | Easy (open in vector editor, modify) |
| Color precision | Exact | Exact |

**Choose PNG** when you need a ready-to-use image for social media, email, or a presentation. Export at the exact pixel size you need (e.g., 500x500 pixels for an Instagram post).

**Choose SVG** when the code will be used in print design (business cards, posters, packaging) or on a responsive website where it needs to scale. SVG files are smaller, sharper at any size, and can be opened in vector editors like Illustrator or Inkscape for further customization.

The TUXIA QR Code Generator supports both formats. You can export your code as SVG, then open it in a vector editor to fine-tune colors, add effects, or integrate it into a larger design.

## Why You Should Always Test Before Publishing

Testing is not optional. A QR code that fails in the field is a lost opportunity -- a potential customer who could not reach your website, a conference attendee who could not download your app, a diner who could not view your menu.

### Testing Checklist

1. **Test on at least two different phones**, ideally with different operating systems (iOS and Android). Camera apps and QR scanning behavior can vary.
2. **Test at the actual physical size** the code will appear in its final form. Do not test a 500px on-screen preview and assume a 2 cm printed code will work identically.
3. **Test in the actual lighting conditions** the code will be scanned in. A code that scans perfectly in bright office light may fail in a dimly lit restaurant.
4. **Test at the expected scanning distance.** Walk back to the distance a real user would stand.
5. **Test after printing.** Print quality matters. Low ink levels, incorrect paper types, and scaling errors during printing can all degrade a QR code.
6. **Use the TUXIA QR Code Decoder** to verify the encoded content matches your intent. Upload the exported QR code image and confirm it decodes to exactly what you expected.

### Common QR Code Mistakes and How to Avoid Them

| Mistake | Why It Happens | How to Fix It |
|---|---|---|
| Code too small for scanning distance | Underestimating the distance users will stand | Follow the 10:1 rule; test at the actual distance |
| Insufficient contrast | Using brand colors without checking brightness difference | Use a contrast checker; darken the foreground or lighten the background |
| Logo too large | Prioritizing branding over functionality | Keep the logo under 15-20% of code area; use H error correction |
| No quiet zone margin | Placing the code flush against other design elements | Ensure at least 4 modules of blank space on all sides |
| Using L error correction with a logo | Misunderstanding error correction levels | Always use H (30%) when adding a logo |
| Low-resolution export | Exporting a small PNG and scaling it up | Export at the exact size needed or use SVG for scalability |
| Encoding an incorrect or broken URL | Typing errors, missing protocol (https://) | Decode the generated QR code before publishing to verify the content |

## Summary

A reliable QR code balances design and function. Use H error correction for codes with logos, maintain strong foreground-to-background contrast, size the code appropriately for its scanning distance, provide an adequate quiet zone, and always test on real devices before publishing. The TUXIA QR Code Generator and Decoder give you everything you need to create, customize, and verify QR codes directly in your browser.
