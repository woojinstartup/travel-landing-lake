# Altura — landing page

A landing page for a fictional package-tour operator, built around a full-bleed
hero video. Four sections: the hero, destinations, an FAQ, and contact. Every
CTA opens the same inquiry dialog.

This is the lake cut — the same page as `travel-landing`, rebuilt around
daylight paddleboarding footage instead of the sunset flight. The palette is
re-derived from the new video, so the two are not colour-compatible.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
npm run preview  # serve the built output
```

`dist/` is fully static — drop it on Vercel, Netlify, Cloudflare Pages, or any
static host.

## Where things are

| File | What it holds |
| --- | --- |
| `src/site.ts` | All page copy — nav links, destinations, FAQ. Rewrite here, not in the layout. |
| `src/App.tsx` | Page shell and the hero: video, scrims, headline block. |
| `src/components/site-nav.tsx` | Fixed nav island and its mobile sheet. |
| `src/components/sections.tsx` | Destinations, FAQ, contact, footer. |
| `src/components/inquiry-dialog.tsx` | The CTA dialog and its form. |
| `src/index.css` | Design tokens — palette, fonts, grain, motion. |
| `public/hero.av1.mp4` | 3840×2160 · AV1 · 30fps · 8s. First choice. |
| `public/hero.mp4` | 2560×1440 · H.264 · 30fps · 8s. Fallback. |
| `public/hero-poster.jpg` | First frame, shown until the video is ready. |

## Design notes

The palette is sampled from the video itself, so the page and the footage stay
in one key:

| Token | Value | Sampled from |
| --- | --- | --- |
| `lake` / `depth` | `oklch(0.255 0.048 226)` / `oklch(0.172 0.04 228)` | the deep water on the left, pushed dark enough to sit type on |
| `aqua` | `oklch(0.78 0.115 193)` | the shallow turquoise over the sandbar, lifted to accent brightness |
| `foam` | `oklch(0.968 0.006 210)` | the sunlit chop |

Measured off a frame of the source: deep water `oklch(0.486 0.089 225)`,
shallow turquoise `oklch(0.504 0.08 173)`, sky `oklch(0.528 0.058 245)`.

Type is Instrument Serif for display and Inter for UI, both self-hosted via
Fontsource — no external font requests at runtime.

The delivered video is 2560×1440, upscaled from a 1920×1080 source with lanczos
and an unsharp pass so it stays crisp when it fills a large viewport:

```bash
ffmpeg -i original.mov -t 8 \
  -vf "scale=2560:1440:flags=lanczos,unsharp=luma_msize_x=5:luma_msize_y=5:luma_amount=1.0:chroma_amount=0,fps=30" \
  -c:v libx264 -profile:v high -crf 27 -preset medium \
  -pix_fmt yuv420p -movflags +faststart -an public/hero.mp4
```

Open water is expensive to encode — every ripple is detail the codec has to
carry. This clip measures a Laplacian variance of 99.7 with 11.9% strong-edge
pixels, against 49.7 / 2.8% for the sunset cut: four times the high-frequency
detail. Compressing it like ordinary footage smears the water in motion, which
a still-frame comparison will not reveal.

So the page ships two encodes and lets the browser pick. Measured as SSIM
against the source, all compared at 1920×1080:

| Encode | Size | SSIM |
| --- | --- | --- |
| H.264 2560×1440 crf 27 | 6.8 MB | 0.9723 |
| H.264 1920×1080 crf 22 | 10 MB | 0.9727 |
| H.264 2560×1440 crf 19 | 20 MB | 0.9830 |
| AV1 2560×1440 crf 34 | 7.0 MB | 0.9832 |
| **AV1 3840×2160 crf 36** | **9.0 MB** | **0.9866** |
| AV1 3840×2160 crf 34 | 11 MB | 0.9874 |

AV1 is worth roughly half the bytes here: at 7 MB it matches what H.264 needs
20 MB to reach. The 4K AV1 encode is therefore both higher quality and smaller
than any usable H.264 option, so it leads, with the 1440p H.264 file behind it.

The browser downloads only the first source it can decode, so the two do not
add up. The fallback is load-bearing rather than ceremonial: Safari decodes AV1
only from 17 with hardware support (M3 / A17 Pro and up). Verified in WebKit —
when AV1 is unavailable it lands on `hero.mp4` at 2560×1440.

Upscaling past the 1920×1080 source does not invent detail. It helps only
because a retina viewport downsamples a larger frame; genuine 4K detail would
need an AI upscale or a 4K source.

This footage is bright daylight, which is the hard case for white type: the
water under the copy sits around L 0.55 on its own. The scrims are therefore
heavier than the sunset cut needs, but still local — a bottom-left radial pools
under the copy and leaves the open water and far shore untouched, rather than
washing the frame (a global wash reads as blur). The copy also carries its own
contrast via `.copy-shadow`.

Measured on the rendered page at 1440×900, worst-case backdrop:

| Element | Contrast | WCAG AA needs |
| --- | --- | --- |
| Headline | 4.05:1 | 3:1 (large text) |
| Subhead | 5.86:1 | 4.5:1 |
| Highlights row | 9.38:1 | 4.5:1 |

The grain layer is down at 5% opacity; it only breaks up banding in the sky.

The grain and the entrance animations both stop under
`prefers-reduced-motion: reduce`.

## Navigation

The nav links point at real sections, so none of them dead-ends: `#home`,
`#destinations`, `#faq`, `#contact`. Below `md` they collapse into a sheet.

The hero runs on the light token set inverted by hand (`foam` on `depth`);
everything below it is wrapped in `.dark` so the shadcn primitives — accordion,
sheet — inherit the right colours rather than being re-skinned one by one. The
dialog portals to `<body>`, which keeps it on the light surface.

Destination cards open the inquiry dialog with that destination preselected, so
clicking "Iceland" is a real action rather than decoration.

## No phone number or email address

There is deliberately no phone number and no email address anywhere on the page,
in the nav, or in `site.ts`. A plausible-looking contact detail on a public page
invites someone to dial or write to it, and this operator does not exist. The
request form is the only channel, and the contact section carries reply times
instead of addresses.

If you add real contact details later, that is the moment to also wire the form
up — see below.

## The inquiry form does not send anything

This is deliberate — there is no backend and no endpoint configured. On submit,
`handleSubmit` in `src/components/inquiry-dialog.tsx` logs the collected values
to the console and switches the dialog to its success state. **A visitor would
see "Request received" while nothing was actually delivered**, so wire it up
before this goes anywhere real.

To make it work, POST the `values` object to an endpoint in that handler and
drive the success state off the response. Formspree or a Resend-backed function
both drop in with a few lines.
