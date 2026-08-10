import { ArrowUpRight } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { InquiryDialog } from "@/components/inquiry-dialog"
import { Wordmark } from "@/components/wordmark"
import { destinations, faqs, site } from "@/site"

function SectionHeading({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string
  title: string
  lede?: string
}) {
  return (
    <div className="max-w-2xl">
      <p className="flex items-center gap-3 text-[0.7rem] tracking-[0.28em] text-muted-foreground uppercase">
        <span aria-hidden="true" className="h-px w-8 bg-aqua/80" />
        {eyebrow}
      </p>
      <h2 className="font-display mt-5 text-4xl leading-[1.05] text-balance sm:text-5xl">
        {title}
      </h2>
      {lede ? (
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-pretty text-muted-foreground">
          {lede}
        </p>
      ) : null}
    </div>
  )
}

export function Destinations() {
  return (
    <section id="destinations" className="scroll-mt-28 px-6 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          eyebrow="Where we go"
          title="Six itineraries we run most often."
          lede="Each one is a starting point. Tell us what you would rather do differently and we will rebuild it around that."
        />

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((place) => (
            <li key={place.name} className="group bg-background">
              <InquiryDialog destination={place.name}>
                <button
                  type="button"
                  className="flex h-full w-full flex-col items-start gap-3 p-7 text-left transition-colors outline-none hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                >
                  <span className="flex w-full items-start justify-between gap-3">
                    <span className="font-display text-2xl">{place.name}</span>
                    <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>

                  <span className="text-[0.9rem] leading-relaxed text-pretty text-muted-foreground">
                    {place.blurb}
                  </span>

                  <span className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-3 text-[0.75rem] tracking-wide text-muted-foreground/80 uppercase">
                    {place.length}
                    <span aria-hidden="true" className="size-1 rounded-full bg-border" />
                    {place.season}
                  </span>
                </button>
              </InquiryDialog>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Faq() {
  return (
    <section
      id="faq"
      className="scroll-mt-28 border-y border-border bg-muted/30 px-6 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-20">
        <SectionHeading
          eyebrow="Before you ask"
          title="The questions we get every week."
          lede="If yours is not here, the fastest route is to send it with your trip request — we answer those first."
        />

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item, index) => (
            <AccordionItem key={item.q} value={`item-${index}`}>
              <AccordionTrigger className="py-5 text-left text-[1.0625rem] font-medium hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[0.95rem] leading-relaxed text-pretty text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-28 px-6 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-2 lg:items-start lg:gap-20">
        <SectionHeading
          eyebrow="Contact"
          title="Tell us where you want to go."
          lede="Send the request form and a trip planner replies with two or three options built around what you asked for. No call queue, no sales sequence."
        />

        <div className="grid gap-8">
          {/* No phone number and no email address, here or anywhere else on the
              page — the form is the only channel, so there is nothing on screen
              that could be dialled or written to. */}
          <dl className="grid gap-5">
            {site.contactFacts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col gap-1 border-b border-border pb-5 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <dt className="w-40 shrink-0 text-[0.8rem] tracking-wide text-muted-foreground uppercase">
                  {fact.label}
                </dt>
                <dd className="text-[1.0625rem] text-pretty">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <InquiryDialog>
            <Button className="h-13 w-full rounded-full px-8 text-[0.95rem] font-medium tracking-wide sm:w-auto sm:self-start">
              {site.cta}
            </Button>
          </InquiryDialog>
        </div>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-10 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 text-[0.8rem] text-muted-foreground sm:flex-row sm:items-center">
        <Wordmark className="text-foreground" />
        <p>© 2026 {site.name}. A fictional operator, built as a design exercise.</p>
      </div>
    </footer>
  )
}
