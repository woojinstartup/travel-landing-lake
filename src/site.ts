/**
 * All page copy in one place, so it can be rewritten without touching layout.
 */
export const site = {
  name: "Altura",
  eyebrow: "Package tours, end to end",
  headline: {
    lead: "The world,",
    accent: "already planned.",
  },
  subhead:
    "Curated package tours. Flights, hotels, and local guides in a single booking. You just show up.",
  cta: "Request a trip",
  highlights: [
    "Small groups",
    "Flights + hotels included",
    "40+ destinations",
  ],
  /* Deliberately no phone number or email address anywhere on this page. The
     request form is the only contact channel, so nothing here can be mistaken
     for a real address and dialled or written to. */
  contactFacts: [
    { label: "Reply time", value: "Within one business day" },
    { label: "Planning hours", value: "Mon–Fri, 9–6 PT" },
    { label: "To book", value: "No deposit until the itinerary is agreed" },
  ],
  dialog: {
    title: "Request a trip",
    description:
      "Tell us roughly what you have in mind. A trip planner replies within one business day with two or three options.",
    submit: "Send request",
    successTitle: "Request received",
    successBody:
      "Thanks — we have your details. A trip planner will be in touch within one business day.",
    closeLabel: "Close",
  },
} as const

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Destinations", href: "#destinations" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const

export const destinations = [
  {
    name: "Japan",
    blurb: "Tokyo, Hakone, and Kyoto by rail, with two nights in a ryokan.",
    length: "10–12 days",
    season: "Mar–May · Oct–Nov",
  },
  {
    name: "Italy",
    blurb: "Rome, Florence, and a slow week between the hill towns of Tuscany.",
    length: "9–12 days",
    season: "Apr–Jun · Sep",
  },
  {
    name: "Iceland",
    blurb: "The Ring Road at a pace that leaves room for the weather to change.",
    length: "8–10 days",
    season: "Jun–Aug · Feb",
  },
  {
    name: "Vietnam & Cambodia",
    blurb: "Hanoi down to the delta, then three days at Angkor before the heat.",
    length: "12–14 days",
    season: "Nov–Mar",
  },
  {
    name: "Portugal & Spain",
    blurb: "Lisbon, the Alentejo, and Seville, with the driving kept short.",
    length: "9–11 days",
    season: "Mar–Jun · Sep–Oct",
  },
  {
    name: "Peru",
    blurb: "Cusco, the Sacred Valley, and Machu Picchu with time to acclimatise.",
    length: "10–13 days",
    season: "May–Sep",
  },
] as const

export const destinationOptions = [
  "Not sure yet",
  ...destinations.map((d) => d.name),
] as const

export const faqs = [
  {
    q: "What is actually included?",
    a: "International flights, all accommodation, airport and intercity transfers, a local guide on scheduled touring days, and every activity named in the itinerary. Breakfast is always included; other meals are listed trip by trip so you can see exactly which evenings are your own.",
  },
  {
    q: "How far ahead should I book?",
    a: "Three to six months for most departures. Japan in cherry blossom season, Iceland in midsummer, and Peru in the dry season are the ones that close early — those are worth starting eight or nine months out.",
  },
  {
    q: "Can you change an itinerary?",
    a: "Yes. Every itinerary is a starting point, not a fixed menu. Adding days, swapping a city, upgrading hotels, or building in rest days are all normal requests. Tell us what you want different and we will re-cost it before you commit to anything.",
  },
  {
    q: "How large are the groups?",
    a: "Fourteen travellers maximum, and most departures run with eight to ten. If you would rather not travel with anyone else, every itinerary can be run privately for your own party.",
  },
  {
    q: "What if I need to cancel?",
    a: "Dates can be moved free of charge up to 60 days before departure. Inside 60 days the cancellation terms depend on what the airlines and hotels have already committed to, and we set those out in writing before you pay a deposit.",
  },
  {
    q: "Do you handle visas and insurance?",
    a: "We tell you exactly which visas your passport needs and when to apply, but you file them yourself. Travel insurance is required to travel with us and you buy it independently, so the cover is yours rather than ours.",
  },
] as const
