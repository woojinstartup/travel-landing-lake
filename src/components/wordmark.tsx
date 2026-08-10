import { cn } from "@/lib/utils"
import { site } from "@/site"

/**
 * Wordmark: a sun sitting on the horizon, then the name.
 * The mark echoes the frame the hero video sits on.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-5 text-aqua"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4.25" />
        <path d="M2.5 16.25h19" />
      </svg>
      <span className="font-display text-[1.375rem] leading-none tracking-[0.02em]">
        {site.name}
      </span>
    </span>
  )
}
