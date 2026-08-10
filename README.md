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
| `public/hero.mp4` | 2560×1440 · H.264 · 30fps · 8s, loops silently, no audio track. |
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

Three deliberate reductions, because open water is expensive to encode — every
ripple is detail the codec has to carry. At crf 21 / 60fps / full length this
clip came out at 15 MB, which is not a background video. Dropping to 30fps,
crf 27, and the first 8 seconds lands it at 6.8 MB with no visible difference
at 1:1 against the crf 21 encode.

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
