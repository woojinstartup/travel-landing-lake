import * as React from "react"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { InquiryDialog } from "@/components/inquiry-dialog"
import { Wordmark } from "@/components/wordmark"
import { navLinks, site } from "@/site"

export function SiteNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
      {/* The island floats clear of the top edge, so page content scrolls
          through the gap above it. This blurs that strip and fades out, rather
          than darkening it — a solid band would fight the hero's own scrim. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_50%,transparent)]"
      />

      <nav className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-4 rounded-full border border-foam/15 bg-depth/45 py-2.5 pr-2.5 pl-5 text-foam backdrop-blur-xl sm:pr-3 sm:pl-6">
        <a
          href="#home"
          className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-foam/60"
        >
          <Wordmark />
          <span className="sr-only">{site.name} — home</span>
        </a>

        {/* Pinned to the true centre line: with justify-between the middle
            column drifts with the width of whatever sits either side of it. */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3.5 py-2 text-[0.85rem] font-medium text-foam/70 transition-colors outline-none hover:bg-foam/10 hover:text-foam focus-visible:ring-2 focus-visible:ring-foam/60"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <InquiryDialog>
            <Button
              variant="ghost"
              className="h-10 rounded-full border-foam/25 px-5 text-[0.85rem] font-medium text-foam hover:border-foam/40 hover:bg-foam/10 hover:text-foam focus-visible:ring-foam/50"
            >
              {site.cta}
            </Button>
          </InquiryDialog>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                aria-label="Open menu"
                className="size-10 rounded-full p-0 text-foam hover:bg-foam/10 hover:text-foam focus-visible:ring-foam/50 md:hidden"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="dark w-72 bg-background">
              <SheetHeader className="border-b border-border pb-4">
                <SheetTitle className="text-left">
                  <Wordmark className="text-foreground" />
                </SheetTitle>
              </SheetHeader>

              <ul className="grid gap-1 px-4 py-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <SheetClose asChild>
                      <a
                        href={link.href}
                        className="block rounded-lg px-3 py-2.5 font-display text-2xl text-foreground transition-colors outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  </li>
                ))}
              </ul>

            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
