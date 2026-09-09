export type Lab = {
  slug: string;
  number: string;
  category: string;
  title: string;
  eyebrow: string;
  summary: string;
  problem: string;
  outcome: string;
  capabilities: string[];
  accent: "blue" | "bone" | "navy";
  imageAlt: string;
};

export const labs: Lab[] = [
  {
    slug: "signaldesk",
    number: "01",
    category: "Professional services",
    title: "SignalDesk",
    eyebrow: "AI lead triage workspace",
    summary: "A focused workspace that helps a growing service team turn messy inbound enquiries into a clear, human follow-up plan.",
    problem: "High-value enquiries arrive across forms, email, and calls; the team loses context before deciding who should respond and what happens next.",
    outcome: "A shared intake view, a transparent AI summary, and an owner-approved next action for every qualified opportunity.",
    capabilities: ["Lead intake", "AI-assisted brief", "Qualification rules", "Human approval"],
    accent: "blue",
    imageAlt: "Abstract project briefs connected by an electric-blue decision path",
  },
  {
    slug: "careroute",
    number: "02",
    category: "Health & wellness",
    title: "CareRoute",
    eyebrow: "Patient intake navigator",
    summary: "A reassuring digital front door that helps a clinic collect the right information before an appointment without overwhelming the person seeking care.",
    problem: "Generic forms create repeated questions, incomplete histories, and uncertainty about what a patient needs to do before they arrive.",
    outcome: "A progressive intake experience that routes people to the right next step and gives staff a concise, reviewable preparation brief.",
    capabilities: ["Progressive intake", "Appointment readiness", "Staff handoff", "Accessible content"],
    accent: "bone",
    imageAlt: "Calm bone-white care journey with blue wayfinding lights",
  },
  {
    slug: "stockroom",
    number: "03",
    category: "Independent retail",
    title: "Stockroom",
    eyebrow: "Reorder signal dashboard",
    summary: "A simple operating view for a multi-location retailer to see which products need attention before a customer encounters an empty shelf.",
    problem: "Inventory data exists, but reorder decisions are scattered across spreadsheets, memory, and last-minute messages between stores.",
    outcome: "Clear stock signals, an explainable recommendation, and a lightweight review queue for the person responsible for ordering.",
    capabilities: ["Stock signals", "Reorder queue", "Store comparison", "Decision history"],
    accent: "navy",
    imageAlt: "Abstract retail stockroom with electric-blue inventory signals",
  },
  {
    slug: "fieldlink",
    number: "04",
    category: "Home & field services",
    title: "FieldLink",
    eyebrow: "Dispatch coordination tool",
    summary: "A practical daily coordination surface that connects bookings, technician availability, customer updates, and the work that must happen next.",
    problem: "Dispatchers constantly reconcile changing schedules while technicians and customers receive incomplete or late updates.",
    outcome: "A calm dispatch board that makes the day’s exceptions visible and turns schedule changes into clear customer communication.",
    capabilities: ["Live schedule", "Exception handling", "Customer updates", "Team handoff"],
    accent: "blue",
    imageAlt: "Abstract service routes converging on a destination",
  },
  {
    slug: "guestsignal",
    number: "05",
    category: "Hospitality",
    title: "GuestSignal",
    eyebrow: "Stay planning concierge",
    summary: "A pre-arrival planning experience that helps a boutique hospitality team turn guest preferences into useful, timely recommendations.",
    problem: "Useful guest details live across booking notes and inboxes, making personal service dependent on staff memory and timing.",
    outcome: "A single guest brief that surfaces preferences, local options, and staff-owned moments that make a stay feel considered.",
    capabilities: ["Preference capture", "Stay timeline", "Local recommendations", "Team brief"],
    accent: "bone",
    imageAlt: "Boutique hospitality arrival space with a blue guidance line",
  },
  {
    slug: "projectpulse",
    number: "06",
    category: "Construction & trades",
    title: "ProjectPulse",
    eyebrow: "Client project clarity portal",
    summary: "A client-facing project view that replaces status-chasing with a shared picture of milestones, decisions, and the next useful action.",
    problem: "Clients do not need more updates; they need a reliable sense of progress, open decisions, and what the team needs from them.",
    outcome: "A straightforward project rhythm that reduces unnecessary calls and keeps approvals moving without hiding complexity.",
    capabilities: ["Milestone view", "Decision requests", "Document handoff", "Status clarity"],
    accent: "navy",
    imageAlt: "Architectural planning materials connected by an electric-blue milestone path",
  },
  {
    slug: "tableflow",
    number: "07",
    category: "Restaurants",
    title: "TableFlow",
    eyebrow: "AI WhatsApp restaurant concierge",
    summary: "An AI-first WhatsApp concierge that turns customer conversations into confirmed next actions: reservations, menu questions, catering leads, and permission-based repeat-visit marketing.",
    problem: "Restaurants answer the same high-intent questions all day across WhatsApp and social channels, while reservation details, dietary notes, and event enquiries are easily lost between messages.",
    outcome: "A reliable conversational front desk that responds immediately, captures structured details, confirms the right next step, and leaves the team only the exceptions that genuinely need judgement.",
    capabilities: ["AI reservations", "Menu & dietary guidance", "Catering lead capture", "Opt-in WhatsApp marketing"],
    accent: "blue",
    imageAlt: "Contemporary restaurant table with a subtle blue conversation signal",
  },
  {
    slug: "kitchenpulse",
    number: "08",
    category: "Restaurants",
    title: "KitchenPulse",
    eyebrow: "AI restaurant operating cockpit",
    summary: "An AI operating cockpit that turns demand, orders, stock, staffing, and guest feedback into a calm shift plan for a restaurant owner and kitchen team.",
    problem: "Restaurant teams make fast decisions with disconnected information: unpredictable covers, delivery spikes, ingredient shortages, hand-written prep lists, staffing gaps, and customer issues discovered too late.",
    outcome: "One explainable shift brief that forecasts demand, highlights risks, suggests the next best operational action, and keeps a human owner responsible for every decision that affects people, stock, price, or service.",
    capabilities: ["Demand & prep forecast", "Stock-risk signals", "Shift coordination", "Service recovery queue"],
    accent: "navy",
    imageAlt: "Restaurant kitchen flow with electric-blue operational signals",
  },
];

export function getLab(slug: string) {
  return labs.find((lab) => lab.slug === slug);
}
