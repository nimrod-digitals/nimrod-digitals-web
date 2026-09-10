"use client";

import { useState } from "react";
import type { Lab } from "@/lib/labs";

const states = ["Overview", "Signals", "Next action"] as const;

const restaurantPrompts = [
  { label: "Book a table", customer: "Can I reserve a table for four this Saturday at 7pm?", answer: "I can help with that. I’ve captured a table for 4 at 7:00 PM on Saturday. Would you prefer indoor or outdoor seating?" },
  { label: "Dietary question", customer: "Which dishes can be made gluten-free?", answer: "I can share the gluten-free options and flag your request for the kitchen. Please tell your server about any allergy so the team can confirm safe preparation." },
  { label: "Private event", customer: "Do you host a birthday dinner for 18 people?", answer: "Yes. I’ve started a private-dining enquiry for 18 guests. What date, preferred time, and budget range should I include for the events team?" },
  { label: "Marketing opt-in", customer: "Can you send me your weekend specials?", answer: "Absolutely. I can send occasional weekend specials on WhatsApp. Reply YES to opt in, or STOP at any time to unsubscribe." },
];

const kitchenViews = [
  {
    label: "Start of shift",
    time: "4:30 PM",
    headline: "Saturday dinner service needs attention before the doors open.",
    pulse: { covers: "86", delta: "+18%", readiness: "76%", action: "02" },
    cards: [["Demand", "Higher than usual from 6:30–8:00 PM"], ["Prep", "Prioritise base sauces and grilled proteins"], ["Staffing", "Assign one floater for delivery handoff"]],
    recommendations: [
      { title: "Stage prep for the 6:30 PM surge", detail: "Forecast indicates 18 more covers than a typical Saturday peak.", action: "Prepare 12 extra portions of base sauces and grilled proteins", impact: "Reduces ticket-time risk" },
      { title: "Confirm delivery handoff coverage", detail: "Delivery volume may overlap with the first dine-in rush.", action: "Assign one cross-trained floater from 6:15–8:00 PM", impact: "Protects dine-in service" },
      { title: "Review low stock on calamansi dressing", detail: "Current projected use reaches the service threshold at 7:45 PM.", action: "Approve a limited-special note or 20-minute batch", impact: "Avoids an unplanned 86" },
    ],
  },
  {
    label: "Mid-service",
    time: "7:05 PM",
    headline: "Keep the rush visible, not chaotic.",
    pulse: { covers: "64", delta: "+11", readiness: "83%", action: "03" },
    cards: [["Order flow", "Delivery queue rising; dine-in remains on pace"], ["Stock risk", "One popular side is approaching its threshold"], ["Guest recovery", "Two delayed orders need a clear update"]],
    recommendations: [
      { title: "Hold delivery promise times at 45 minutes", detail: "A sudden delivery cluster is increasing the kitchen queue.", action: "Ask the shift lead to confirm a temporary delivery-time update", impact: "Sets clear guest expectations" },
      { title: "Protect the last calamansi side batch", detail: "Projected demand exceeds the current batch by eight orders.", action: "Approve a temporary 86 when the batch reaches six portions", impact: "Stops overselling" },
      { title: "Recover two delayed dine-in orders", detail: "Both tables have waited beyond the team’s service threshold.", action: "Review a staff-owned apology and recovery option", impact: "Keeps goodwill human" },
    ],
  },
  {
    label: "Close-up",
    time: "10:40 PM",
    headline: "Turn today’s service into a smarter tomorrow.",
    pulse: { covers: "102", delta: "+22%", readiness: "91%", action: "03" },
    cards: [["Demand signal", "Review tonight’s late surge before Monday prep"], ["Waste watch", "Compare prepared quantities with actual covers"], ["Owner brief", "Three operational decisions ready for review"]],
    recommendations: [
      { title: "Save the late-surge forecast for next Saturday", detail: "Covers rose after 8:30 PM, led by walk-ins and delivery.", action: "Approve a trial prep adjustment for the next comparable shift", impact: "Turns service into learning" },
      { title: "Review unused prepared proteins", detail: "Prepared quantity exceeded completed covers after the early rush eased.", action: "Ask the kitchen lead to annotate the waste reason before close", impact: "Improves the next forecast" },
      { title: "Read the owner brief before tomorrow", detail: "Service, stock, and staffing patterns are ready for a human decision.", action: "Choose which patterns should change next week’s operating plan", impact: "No automatic changes" },
    ],
  },
];

const signalLeads = [
  { company: "Northline Studio", source: "Website enquiry", need: "Needs a client portal and a clearer delivery workflow before a growth push.", score: "High fit · 86%", owner: "Nimrod", action: "Book a 30-minute discovery call", context: "Service business · 14-person team · delivery friction named clearly" },
  { company: "Aster & Co.", source: "Referral email", need: "Exploring an AI-assisted intake process for a growing advisory team.", score: "Strong signal · 74%", owner: "Nimrod", action: "Ask two qualification questions", context: "Warm referral · timing and decision owner need confirmation" },
  { company: "Cedar Works", source: "Contact form", need: "Looking for help improving a website without a defined commercial or operational problem yet.", score: "Needs review · 42%", owner: "Human review", action: "Send a useful scoping note", context: "Broad request · avoid an automated sales response" },
];

export function LabDemo({ lab }: { lab: Lab }) {
  const [active, setActive] = useState<(typeof states)[number]>("Overview");
  const [restaurantPrompt, setRestaurantPrompt] = useState(restaurantPrompts[0]);
  const [tableFlowView, setTableFlowView] = useState<"concierge" | "service">("concierge");
  const [reservationConfirmed, setReservationConfirmed] = useState(false);
  const [kitchenView, setKitchenView] = useState(kitchenViews[0]);
  const [kitchenRecommendation, setKitchenRecommendation] = useState(kitchenViews[0].recommendations[0]);
  const [kitchenApproved, setKitchenApproved] = useState(false);
  const [signalLead, setSignalLead] = useState(signalLeads[0]);
  const [signalApproved, setSignalApproved] = useState(false);
  const current = active === "Overview"
    ? { label: "Current focus", title: lab.problem, detail: "A useful digital product starts by making the real decision visible." }
    : active === "Signals"
      ? { label: "What the team can see", title: lab.capabilities.slice(0, 2).join(" + "), detail: "Signals are organised to support judgement, not replace it." }
      : { label: "A useful next step", title: lab.outcome, detail: "The person responsible remains in control of what happens next." };

  if (lab.slug === "tableflow") {
    return (
      <section className="lab-demo lab-demo-blue tableflow-demo" aria-label={`${lab.title} interactive demonstration`}>
        <div className="lab-demo-chrome"><span /><span /><span /><p>TableFlow / WhatsApp AI concierge</p></div>
        <div className="tableflow-tabs" role="tablist" aria-label="TableFlow demo views">
          <button aria-selected={tableFlowView === "concierge"} className={tableFlowView === "concierge" ? "is-active" : ""} onClick={() => setTableFlowView("concierge")} role="tab" type="button">Concierge</button>
          <button aria-selected={tableFlowView === "service"} className={tableFlowView === "service" ? "is-active" : ""} onClick={() => setTableFlowView("service")} role="tab" type="button">Service board <span>{reservationConfirmed ? "15" : "14"}</span></button>
        </div>
        {tableFlowView === "concierge" ? (
          <div className="tableflow-layout">
            <div className="tableflow-chat" aria-live="polite">
              <p className="tableflow-chat-head">WhatsApp · TableFlow concierge <span>AI online</span></p>
              <div className="tableflow-message tableflow-customer">{restaurantPrompt.customer}</div>
              <div className="tableflow-message tableflow-ai"><span className="tableflow-ai-mark">N</span>{restaurantPrompt.answer}</div>
              {restaurantPrompt.label === "Book a table" && <button className={reservationConfirmed ? "tableflow-confirm is-done" : "tableflow-confirm"} disabled={reservationConfirmed} onClick={() => setReservationConfirmed(true)} type="button">{reservationConfirmed ? "Reservation added to service board" : "Confirm 7:00 PM reservation"}</button>}
              <p className="tableflow-guardrail">Autonomous for routine requests. Escalates uncertainty, complaints, payments, and allergy-risk questions.</p>
            </div>
            <div className="tableflow-controls">
              <p className="eyebrow">Try a customer request</p>
              <h2>Respond instantly. Capture the right details. Keep the team in control of exceptions.</h2>
              <div className="tableflow-prompt-list">
                {restaurantPrompts.map((prompt) => <button className={restaurantPrompt.label === prompt.label ? "is-active" : ""} key={prompt.label} onClick={() => { setRestaurantPrompt(prompt); setTableFlowView("concierge"); }} type="button">{prompt.label}<span aria-hidden="true">↗</span></button>)}
              </div>
              <p className="tableflow-note">Concept simulation only · no WhatsApp account, customer data, booking, or marketing message is sent.</p>
            </div>
          </div>
        ) : (
          <div className="tableflow-board" aria-live="polite">
            <div className="tableflow-board-intro"><p className="eyebrow">Saturday dinner · live concept view</p><h2>One calm picture of what needs the team’s attention.</h2><p>Every item is a simulated example. The shift lead remains responsible for confirmation and exceptions.</p></div>
            <div className="tableflow-stats"><article><span>0{reservationConfirmed ? "15" : "14"}</span><p>Confirmed bookings</p></article><article><span>03</span><p>Dietary notes to review</p></article><article><span>01</span><p>Private dining lead</p></article></div>
            <div className="tableflow-queue"><p className="eyebrow">Team queue</p><div><span className={reservationConfirmed ? "tableflow-status is-new" : "tableflow-status"}>{reservationConfirmed ? "New" : "Ready"}</span><strong>{reservationConfirmed ? "Table for 4 · 7:00 PM" : "Kitchen dietary confirmation"}</strong><small>{reservationConfirmed ? "Indoor/outdoor preference still needed" : "Gluten-free options need staff review"}</small></div><div><span className="tableflow-status">Follow up</span><strong>Birthday dinner · 18 guests</strong><small>Events team needs date and budget range</small></div></div>
          </div>
        )}
      </section>
    );
  }

  if (lab.slug === "signaldesk") {
    return (
      <section className="lab-demo lab-demo-blue signaldesk-demo" aria-label={`${lab.title} interactive demonstration`}>
        <div className="lab-demo-chrome"><span /><span /><span /><p>SignalDesk / AI lead triage</p></div>
        <div className="signaldesk-layout">
          <aside className="signaldesk-inbox">
            <p className="eyebrow">New enquiries · 03</p>
            {signalLeads.map((lead) => <button className={signalLead.company === lead.company ? "is-active" : ""} key={lead.company} onClick={() => { setSignalLead(lead); setSignalApproved(false); }} type="button"><strong>{lead.company}</strong><span>{lead.source}</span><small>{lead.score}</small></button>)}
            <p className="signaldesk-note">Simulated enquiries only · no client data is collected, enriched, or contacted.</p>
          </aside>
          <div className="signaldesk-brief" aria-live="polite">
            <p className="eyebrow">AI-assisted brief · review required</p>
            <h2>{signalLead.company} has a decision worth clarifying.</h2>
            <p className="signaldesk-need">{signalLead.need}</p>
            <div className="signaldesk-context"><p><span>Why it surfaced</span>{signalLead.context}</p><p><span>Suggested owner</span>{signalLead.owner}</p></div>
            <div className="signaldesk-action"><div><span>Recommended next action</span><strong>{signalLead.action}</strong></div><button className={signalApproved ? "is-approved" : ""} disabled={signalApproved} onClick={() => setSignalApproved(true)} type="button">{signalApproved ? "Human approval recorded" : "Approve next action"}</button></div>
          </div>
        </div>
      </section>
    );
  }

  if (lab.slug === "kitchenpulse") {
    return (
      <section className="lab-demo lab-demo-navy kitchenpulse-demo" aria-label={`${lab.title} interactive demonstration`}>
        <div className="lab-demo-chrome"><span /><span /><span /><p>KitchenPulse / AI shift intelligence</p></div>
        <div className="kitchenpulse-layout">
          <div className="kitchenpulse-side">
            <p className="eyebrow">Saturday · shift pulse</p>
            {kitchenViews.map((view) => <button className={kitchenView.label === view.label ? "is-active" : ""} key={view.label} onClick={() => { setKitchenView(view); setKitchenRecommendation(view.recommendations[0]); setKitchenApproved(false); }} type="button">{view.label}<span>{view.time}</span></button>)}
            <div className="kitchenpulse-live"><span /><p>Concept signal feed</p><strong>{kitchenView.pulse.action} owner reviews due</strong></div>
            <p className="kitchenpulse-disclaimer">Simulated operating signals only. No staff, stock, pricing, guest, or supplier action can change without a restaurant owner’s approval.</p>
          </div>
          <div className="kitchenpulse-main" aria-live="polite">
            <p className="eyebrow">AI shift brief · {kitchenView.label}</p>
            <h2>{kitchenView.headline}</h2>
            <div className="kitchenpulse-metrics" aria-label="Simulated shift metrics">
              <article><span>Forecast covers</span><strong>{kitchenView.pulse.covers}</strong><small>{kitchenView.pulse.delta} vs typical</small></article>
              <article><span>Shift readiness</span><strong>{kitchenView.pulse.readiness}</strong><small>team-confirmed inputs</small></article>
              <article><span>Owner review</span><strong>{kitchenView.pulse.action}</strong><small>decisions awaiting judgement</small></article>
            </div>
            <div className="kitchenpulse-cards">
              {kitchenView.cards.map(([label, copy], index) => <article key={label}><span>0{index + 1}</span><p className="eyebrow">{label}</p><strong>{copy}</strong></article>)}
            </div>
            <div className="kitchenpulse-review">
              <div className="kitchenpulse-review-list"><p className="eyebrow">Review recommendations</p>{kitchenView.recommendations.map((recommendation, index) => <button className={kitchenRecommendation.title === recommendation.title ? "is-active" : ""} key={recommendation.title} onClick={() => { setKitchenRecommendation(recommendation); setKitchenApproved(false); }} type="button"><span>0{index + 1}</span><strong>{recommendation.title}</strong><small>{recommendation.impact}</small></button>)}</div>
              <div className="kitchenpulse-decision"><p className="eyebrow">Owner decision · required</p><h3>{kitchenRecommendation.title}</h3><p>{kitchenRecommendation.detail}</p><div><span>Suggested action</span><strong>{kitchenRecommendation.action}</strong></div><button className={kitchenApproved ? "is-approved" : ""} disabled={kitchenApproved} onClick={() => setKitchenApproved(true)} type="button">{kitchenApproved ? "Owner approval recorded in this demo" : "Approve proposed plan"}</button><small>Simulation only · approval does not contact staff, adjust stock, or message guests.</small></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`lab-demo lab-demo-${lab.accent}`} aria-label={`${lab.title} interactive demonstration`}>
      <div className="lab-demo-chrome">
        <span /><span /><span />
        <p>{lab.title} / concept workspace</p>
      </div>
      <div className="lab-demo-tabs" role="tablist" aria-label="Demo views">
        {states.map((state) => (
          <button aria-selected={active === state} className={active === state ? "is-active" : ""} key={state} onClick={() => setActive(state)} role="tab" type="button">
            {state}
          </button>
        ))}
      </div>
      <div className="lab-demo-body">
        <p className="eyebrow">{current.label}</p>
        <h2>{current.title}</h2>
        <p>{current.detail}</p>
        <div className="lab-demo-signals" aria-hidden="true">
          <span /><span /><span /><span />
        </div>
      </div>
      <p className="lab-demo-note">Interactive concept only · no client data or automated decisions</p>
    </section>
  );
}
