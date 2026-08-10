import { Button } from "@/components/ui/button"
import { Contact, Destinations, Faq, SiteFooter } from "@/components/sections"
import { InquiryDialog } from "@/components/inquiry-dialog"
import { SiteNav } from "@/components/site-nav"
import { site } from "@/site"

export default function App() {
  return (
    <>
      <SiteNav />

      <main>
        <Hero />

        {/* Everything below the hero runs on the dark token set, so the shadcn
            primitives (accordion, sheet) inherit the right colours instead of
            being re-skinned one by one. The dialog portals to <body> and stays
            on the light surface. */}
        <div className="dark bg-background text-foreground">
          <Destinations />
          <Faq />
          <Contact />
          <SiteFooter />
        </div>
      </main>
    </>
  )
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-depth"
    >
      <HeroMedia />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end">
        <HeroCopy />
      </div>
    </section>
  )
}

function HeroMedia() {
  return (
    <div className="grain absolute inset-0 overflow-hidden">
      {/* No upscale on the element itself — the source is already 2560×1440,
          so any CSS scale would just throw that resolution away again. */}
      <video
        className="size-full object-cover contrast-[1.04] saturate-[1.03]"
        src="/hero.mp4"
        poster="/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* This footage is bright daylight — the water under the copy sits around
          L 0.55, where white type has nowhere near enough contrast on its own.
          The scrims are therefore heavier than a dusk shot would need, but still
          local: the radial pools under the bottom-left copy and leaves the open
          water and the far shore clean rather than washing the whole frame. */}
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-depth/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-depth/88 via-depth/18 via-32% to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_72%_62%_at_4%_96%,color-mix(in_oklch,var(--color-depth),transparent_8%)_0%,color-mix(in_oklch,var(--color-depth),transparent_48%)_40%,transparent_72%)]" />
    </div>
  )
}

function HeroCopy() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col px-6 pb-14 sm:px-8 sm:pb-20 lg:pb-24">
      <p
        className="rise copy-shadow flex items-center gap-3 text-[0.7rem] tracking-[0.28em] text-foam/85 uppercase"
        style={{ animationDelay: "120ms" }}
      >
        <span aria-hidden="true" className="h-px w-8 bg-aqua/80" />
        {site.eyebrow}
      </p>

      <h1
        className="rise copy-shadow font-display mt-5 max-w-[15ch] text-5xl leading-[0.95] font-normal text-balance text-foam sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
        style={{ animationDelay: "220ms" }}
      >
        {site.headline.lead}{" "}
        <em className="text-foam/90 italic">{site.headline.accent}</em>
      </h1>

      <p
        className="rise copy-shadow mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-pretty text-foam/75 sm:text-lg"
        style={{ animationDelay: "320ms" }}
      >
        {site.subhead}
      </p>

      <div
        className="rise mt-9 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8"
        style={{ animationDelay: "420ms" }}
      >
        <InquiryDialog>
          <Button className="h-13 rounded-full bg-foam px-8 text-[0.95rem] font-medium tracking-wide text-depth shadow-lg shadow-depth/30 hover:bg-foam/90 focus-visible:ring-foam/50">
            {site.cta}
          </Button>
        </InquiryDialog>

        {/* Dot separators only once the row is guaranteed to fit on one line —
            below `sm` they wrap and a leading dot reads as a stray bullet. */}
        <ul className="copy-shadow flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.8rem] text-foam/70 sm:gap-x-3">
          {site.highlights.map((item, index) => (
            <li key={item} className="flex items-center gap-3">
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className="hidden size-1 rounded-full bg-foam/35 sm:block"
                />
              ) : null}
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
