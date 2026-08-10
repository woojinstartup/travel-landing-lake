import * as React from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { destinationOptions, site } from "@/site"

/**
 * NOT WIRED TO A BACKEND.
 *
 * `handleSubmit` collects the form into an object and moves the dialog to its
 * success state. Nothing is transmitted anywhere. To make this real, POST
 * `values` to an endpoint here and drive `status` off the response.
 */
function InquiryForm({
  onSent,
  initialDestination = "",
}: {
  onSent: () => void
  initialDestination?: string
}) {
  const [destination, setDestination] = React.useState(initialDestination)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const values = Object.fromEntries(new FormData(event.currentTarget))
    values.destination = destination
    console.info("[Altura] inquiry (not sent — no endpoint configured):", values)
    onSent()
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name">
          <Input id="name" name="name" required autoComplete="name" placeholder="Jamie Rivera" />
        </Field>
        <Field label="Email" htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jamie@example.com"
          />
        </Field>
      </div>

      <Field label="Where to?" htmlFor="destination">
        <Select value={destination} onValueChange={setDestination}>
          <SelectTrigger id="destination" className="w-full">
            <SelectValue placeholder="Pick a region, or tell us below" />
          </SelectTrigger>
          <SelectContent>
            {destinationOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="When" htmlFor="dates" hint="Approximate is fine">
          <Input id="dates" name="dates" placeholder="Late September, ~10 days" />
        </Field>
        <Field label="Travellers" htmlFor="party">
          <Input
            id="party"
            name="party"
            type="number"
            min={1}
            max={24}
            defaultValue={2}
            inputMode="numeric"
          />
        </Field>
      </div>

      <Field label="Anything we should know?" htmlFor="message" hint="Optional">
        <Textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Two of us, first time in Asia, would rather not be on a coach all day."
          className="resize-none"
        />
      </Field>

      <Button
        type="submit"
        className="mt-1 h-12 w-full rounded-full text-[0.95rem] tracking-wide"
      >
        {site.dialog.submit}
      </Button>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string
  htmlFor: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <Label htmlFor={htmlFor} className="text-[0.8rem] font-medium tracking-wide">
          {label}
        </Label>
        {hint ? (
          <span className="text-[0.7rem] text-muted-foreground">{hint}</span>
        ) : null}
      </div>
      {children}
    </div>
  )
}

export function InquiryDialog({
  children,
  destination,
}: {
  children: React.ReactNode
  /** Preselects the "Where to?" field — used by the destination cards, so
   *  clicking "Japan" opens the form already pointed at Japan. */
  destination?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [sent, setSent] = React.useState(false)

  function handleOpenChange(next: boolean) {
    setOpen(next)
    // Reset back to the form once the close animation has finished, so the
    // panel does not visibly flip while it is fading out.
    if (!next) window.setTimeout(() => setSent(false), 250)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[92svh] gap-6 overflow-y-auto rounded-2xl border-border/70 bg-card p-6 sm:max-w-xl sm:p-8">
        {sent ? (
          <div className="grid justify-items-center gap-5 py-6 text-center">
            <span className="grid size-12 place-items-center rounded-full bg-aqua/20 text-aqua-deep">
              <Check className="size-5" strokeWidth={2.5} />
            </span>
            <DialogHeader className="items-center gap-2 text-center">
              <DialogTitle className="font-display text-3xl leading-tight font-normal">
                {site.dialog.successTitle}
              </DialogTitle>
              <DialogDescription className="max-w-sm text-[0.9rem] leading-relaxed">
                {site.dialog.successBody}
              </DialogDescription>
            </DialogHeader>
            <Button
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="mt-1 h-10 rounded-full px-6"
            >
              {site.dialog.closeLabel}
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="gap-2 text-left">
              <DialogTitle className="font-display text-3xl leading-tight font-normal">
                {site.dialog.title}
              </DialogTitle>
              <DialogDescription className="text-[0.9rem] leading-relaxed">
                {site.dialog.description}
              </DialogDescription>
            </DialogHeader>
            <InquiryForm
              key={destination ?? ""}
              initialDestination={destination}
              onSent={() => setSent(true)}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
