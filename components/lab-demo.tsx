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

const careJourneys = [
  { label: "New concern", person: "Morgan L.", reason: "New concern · first visit", step: "2 of 4", question: "What would make this appointment useful for you?", answer: "A short description helps the clinic prepare. You can skip anything you would rather discuss with the clinician.", readiness: "Needs two details", handoff: "Confirm preferred appointment window and any access needs", status: "In progress" },
  { label: "Follow-up", person: "Alex R.", reason: "Follow-up · existing patient", step: "3 of 4", question: "Has anything changed since your last visit?", answer: "The care team can review your note alongside your previous appointment. This does not replace clinical advice.", readiness: "Ready for review", handoff: "Staff review requested changes before confirming", status: "Ready" },
  { label: "Family booking", person: "Jamie K.", reason: "Family booking · guardian", step: "1 of 4", question: "Who is this appointment for?", answer: "We’ll collect only the practical details the team needs to arrange the right next step.", readiness: "Start intake", handoff: "Confirm guardian contact and appointment type", status: "New" },
];

const stockSignals = [
  { label: "High priority", product: "Cloudline carry-on", sku: "CL-24 / navy", stock: "06", velocity: "18 sold · 7 days", coverage: "2.3 days", reason: "Downtown sales accelerated after the weekend feature.", recommendation: "Move 10 units from Riverside and review a 24-unit supplier order", impact: "Prevents an empty shelf during the next peak", stores: ["Downtown · 6 on hand", "Riverside · 18 on hand", "Online · 9 reserved"] },
  { label: "Watch", product: "Everyday sling", sku: "ES-11 / stone", stock: "14", velocity: "11 sold · 7 days", coverage: "6.1 days", reason: "Demand is steady, but the next delivery is not yet confirmed.", recommendation: "Ask the buyer to confirm the delivery date before reordering", impact: "Keeps cash and shelf space in balance", stores: ["Downtown · 14 on hand", "Riverside · 11 on hand", "Online · 4 reserved"] },
  { label: "Review", product: "Weekender duffel", sku: "WD-08 / black", stock: "22", velocity: "04 sold · 7 days", coverage: "38 days", reason: "Current availability exceeds the recent demand pattern.", recommendation: "Hold the next replenishment and review the display placement", impact: "Avoids buying stock that will wait", stores: ["Downtown · 22 on hand", "Riverside · 19 on hand", "Online · 2 reserved"] },
];

const fieldExceptions = [
  { label: "Travel delay", job: "Aster Lane · boiler service", time: "10:30–11:15", technician: "Maya R.", customer: "Aster Lane", detail: "Traffic adds an estimated 24 minutes to the previous visit.", suggestion: "Offer a 30-minute later arrival window and protect the afternoon install slot.", impact: "Keeps two later appointments on track", status: "Needs review" },
  { label: "Parts check", job: "Cedar Street · repair", time: "12:00–12:45", technician: "Jon B.", customer: "Cedar Street", detail: "The assigned part has not been marked ready at the depot.", suggestion: "Ask dispatch to confirm the part before the technician leaves the prior job.", impact: "Avoids a wasted customer visit", status: "Check depot" },
  { label: "Customer request", job: "Northfield · annual visit", time: "3:00–3:45", technician: "Priya S.", customer: "Northfield", detail: "The customer requested a later arrival, but the schedule needs a human trade-off.", suggestion: "Review a same-day swap with the nearby 4:00 PM booking.", impact: "Makes the change visible to everyone", status: "Review change" },
];

const guestMoments = [
  { label: "Arrival rhythm", guest: "Avery L.", stay: "Today · 2 nights", preference: "Quiet arrival · room near lift avoided", detail: "A pre-arrival note says Avery would value a low-friction check-in after a late flight.", suggestion: "Prepare a concise arrival brief and ask the host to offer the quietest available welcome route.", timeline: ["Pre-arrival · preference noted", "Check-in · host review", "During stay · optional local ideas"], owner: "Front-of-house host" },
  { label: "Celebration stay", guest: "Sam & Riley", stay: "Tomorrow · 1 night", preference: "Dinner enquiry · celebration noted", detail: "The guests asked whether a relaxed dinner option is available after check-in, without requesting a reservation yet.", suggestion: "Give the duty host two suitable dinner options to discuss if the guests choose to ask.", timeline: ["Pre-arrival · enquiry captured", "Check-in · confirm interest", "During stay · team-owned follow-through"], owner: "Duty host" },
  { label: "Local discovery", guest: "Jordan P.", stay: "Friday · 3 nights", preference: "Accessible neighbourhood ideas", detail: "Jordan’s planning note asks for a calm, accessible way to explore the neighbourhood at their own pace.", suggestion: "Review a short accessible local guide with the concierge before making it available to the guest.", timeline: ["Pre-arrival · interests noted", "Check-in · ask permission", "During stay · concierge review"], owner: "Concierge" },
];

const projectSignals = [
  { label: "Client decision", project: "Harbour House fit-out", milestone: "Design sign-off · Friday", detail: "The layout is ready for a client choice between the two approved reception approaches.", recommendation: "Prepare a side-by-side decision brief and ask the project lead to review it before it is shared.", owner: "Project lead", status: "Decision needed" },
  { label: "Delivery watch", project: "Northline workspace", milestone: "Joinery delivery · 8 days", detail: "The supplier timeline is still on track, but a material confirmation is needed to protect the install window.", recommendation: "Ask the delivery coordinator to confirm the final material release before the next client update.", owner: "Delivery coordinator", status: "Watch item" },
  { label: "Change request", project: "Cedar retail refresh", milestone: "Scope review · Monday", detail: "A late lighting request affects budget and sequencing, so it needs a clear trade-off rather than a hidden change.", recommendation: "Draft the cost-and-timing impact for the project manager to review with the client.", owner: "Project manager", status: "Review change" },
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
  const [careJourney, setCareJourney] = useState(careJourneys[0]);
  const [careReady, setCareReady] = useState(false);
  const [stockSignal, setStockSignal] = useState(stockSignals[0]);
  const [stockApproved, setStockApproved] = useState(false);
  const [fieldException, setFieldException] = useState(fieldExceptions[0]);
  const [fieldApproved, setFieldApproved] = useState(false);
  const [guestMoment, setGuestMoment] = useState(guestMoments[0]);
  const [guestApproved, setGuestApproved] = useState(false);
  const [projectSignal, setProjectSignal] = useState(projectSignals[0]);
  const [projectApproved, setProjectApproved] = useState(false);
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

  if (lab.slug === "stockroom") {
    return (
      <section className="lab-demo lab-demo-navy stockroom-demo" aria-label={`${lab.title} interactive demonstration`}>
        <div className="lab-demo-chrome"><span /><span /><span /><p>Stockroom / reorder signal dashboard</p></div>
        <div className="stockroom-layout">
          <aside className="stockroom-queue">
            <p className="eyebrow">Reorder signals · 03</p>
            {stockSignals.map((signal) => <button className={stockSignal.product === signal.product ? "is-active" : ""} key={signal.product} onClick={() => { setStockSignal(signal); setStockApproved(false); }} type="button"><span>{signal.label}</span><strong>{signal.product}</strong><small>{signal.coverage} of cover</small></button>)}
            <p className="stockroom-note">Simulated stock, sales, and supplier signals only. Nothing is transferred, ordered, or changed by this concept.</p>
          </aside>
          <div className="stockroom-main" aria-live="polite">
            <div className="stockroom-overview"><p className="eyebrow">Inventory decision · review required</p><h2>{stockSignal.product} needs a deliberate next step.</h2><p>{stockSignal.reason}</p><div className="stockroom-metrics"><article><span>On hand</span><strong>{stockSignal.stock}</strong><small>units across the network</small></article><article><span>Recent velocity</span><strong>{stockSignal.velocity}</strong><small>illustrative sales signal</small></article><article><span>Estimated cover</span><strong>{stockSignal.coverage}</strong><small>not a demand guarantee</small></article></div></div>
            <div className="stockroom-decision"><div className="stockroom-locations"><p className="eyebrow">Location view</p>{stockSignal.stores.map((store) => <p key={store}><span>•</span>{store}</p>)}</div><div className="stockroom-recommendation"><p className="eyebrow">Explainable recommendation</p><h3>{stockSignal.recommendation}</h3><p>{stockSignal.impact}</p><button className={stockApproved ? "is-approved" : ""} disabled={stockApproved} onClick={() => setStockApproved(true)} type="button">{stockApproved ? "Owner review recorded in this demo" : "Approve for buyer review"}</button><small>Simulation only · this never sends a supplier order, moves inventory, or changes product availability.</small></div></div>
          </div>
        </div>
      </section>
    );
  }

  if (lab.slug === "fieldlink") {
    return (
      <section className="lab-demo lab-demo-blue fieldlink-demo" aria-label={`${lab.title} interactive demonstration`}>
        <div className="lab-demo-chrome"><span /><span /><span /><p>FieldLink / dispatch coordination</p></div>
        <div className="fieldlink-layout">
          <aside className="fieldlink-day"><p className="eyebrow">Tuesday · route pulse</p><div className="fieldlink-route"><span>08:30</span><strong>Depot start</strong><i /><span>09:00</span><strong>Service visit</strong><i /><span>10:30</span><strong className="is-alert">Route exception</strong><i /><span>12:00</span><strong>Repair visit</strong><i /><span>15:00</span><strong>Annual visit</strong></div><p>Simulated schedule only · no customer or technician is contacted from this concept.</p></aside>
          <div className="fieldlink-main" aria-live="polite">
            <p className="eyebrow">Dispatch exceptions · 03</p><h2>Keep the day clear when the plan changes.</h2>
            <div className="fieldlink-exception-list">{fieldExceptions.map((exception) => <button className={fieldException.job === exception.job ? "is-active" : ""} key={exception.job} onClick={() => { setFieldException(exception); setFieldApproved(false); }} type="button"><span>{exception.status}</span><strong>{exception.job}</strong><small>{exception.time} · {exception.technician}</small></button>)}</div>
            <div className="fieldlink-decision"><div><p className="eyebrow">Suggested coordination step</p><h3>{fieldException.suggestion}</h3><p>{fieldException.detail}</p><small>{fieldException.impact}</small></div><aside><span>Customer</span><strong>{fieldException.customer}</strong><span>Assigned technician</span><strong>{fieldException.technician}</strong><button className={fieldApproved ? "is-approved" : ""} disabled={fieldApproved} onClick={() => setFieldApproved(true)} type="button">{fieldApproved ? "Dispatcher review recorded" : "Approve for dispatcher review"}</button><small>Simulation only · approval does not change a booking or message anyone.</small></aside></div>
          </div>
        </div>
      </section>
    );
  }

  if (lab.slug === "guestsignal") {
    return (
      <section className="lab-demo lab-demo-bone guestsignal-demo" aria-label={`${lab.title} interactive demonstration`}>
        <div className="lab-demo-chrome"><span /><span /><span /><p>GuestSignal / stay planning concierge</p></div>
        <div className="guestsignal-layout">
          <aside className="guestsignal-queue"><p className="eyebrow">Arrivals to consider · 03</p>{guestMoments.map((moment) => <button className={guestMoment.guest === moment.guest ? "is-active" : ""} key={moment.guest} onClick={() => { setGuestMoment(moment); setGuestApproved(false); }} type="button"><span>{moment.label}</span><strong>{moment.guest}</strong><small>{moment.stay}</small></button>)}<p>Fictional preferences only · this concept does not access a booking system or contact a guest.</p></aside>
          <div className="guestsignal-main" aria-live="polite"><p className="eyebrow">Guest brief · staff-owned moment</p><h2>A considered stay starts with a useful handoff.</h2><div className="guestsignal-overview"><div><span>Stay</span><strong>{guestMoment.stay}</strong></div><div><span>Stated preference</span><strong>{guestMoment.preference}</strong></div></div><p className="guestsignal-detail">{guestMoment.detail}</p><div className="guestsignal-timeline">{guestMoment.timeline.map((item, index) => <div key={item}><i>{String(index + 1).padStart(2, "0")}</i><span>{item}</span></div>)}</div><div className="guestsignal-review"><div><p className="eyebrow">Suggested preparation</p><h3>{guestMoment.suggestion}</h3></div><aside><span>Suggested owner</span><strong>{guestMoment.owner}</strong><button className={guestApproved ? "is-approved" : ""} disabled={guestApproved} onClick={() => setGuestApproved(true)} type="button">{guestApproved ? "Host review recorded" : "Mark ready for host review"}</button><small>Simulation only · no reservation, message, or service promise is changed.</small></aside></div></div>
        </div>
      </section>
    );
  }

  if (lab.slug === "projectpulse") {
    return (
      <section className="lab-demo lab-demo-navy projectpulse-demo" aria-label={`${lab.title} interactive demonstration`}>
        <div className="lab-demo-chrome"><span /><span /><span /><p>ProjectPulse / delivery clarity workspace</p></div>
        <div className="projectpulse-layout">
          <aside className="projectpulse-queue"><p className="eyebrow">Project pulse · 03</p>{projectSignals.map((signal) => <button className={projectSignal.project === signal.project ? "is-active" : ""} key={signal.project} onClick={() => { setProjectSignal(signal); setProjectApproved(false); }} type="button"><span>{signal.status}</span><strong>{signal.project}</strong><small>{signal.milestone}</small></button>)}<p>Fictional project signals only · this concept does not update plans, send documents, or contact clients.</p></aside>
          <div className="projectpulse-main" aria-live="polite"><p className="eyebrow">Shared project view · human review required</p><h2>Make the next useful decision clear before the status meeting.</h2><div className="projectpulse-milestones"><div><span>01</span><strong>Scope aligned</strong></div><div className="is-current"><span>02</span><strong>Decision ready</strong></div><div><span>03</span><strong>Delivery protected</strong></div></div><div className="projectpulse-decision"><div><p className="eyebrow">{projectSignal.label}</p><h3>{projectSignal.recommendation}</h3><p>{projectSignal.detail}</p></div><aside><span>Suggested owner</span><strong>{projectSignal.owner}</strong><span>Next milestone</span><strong>{projectSignal.milestone}</strong><button className={projectApproved ? "is-approved" : ""} disabled={projectApproved} onClick={() => setProjectApproved(true)} type="button">{projectApproved ? "Project review recorded" : "Prepare for project lead review"}</button><small>Simulation only · no plan, budget, document, or client update changes from this demo.</small></aside></div></div>
        </div>
      </section>
    );
  }

  if (lab.slug === "careroute") {
    return (
      <section className="lab-demo lab-demo-bone careroute-demo" aria-label={`${lab.title} interactive demonstration`}>
        <div className="lab-demo-chrome"><span /><span /><span /><p>CareRoute / patient intake navigator</p></div>
        <div className="careroute-layout">
          <aside className="careroute-queue">
            <p className="eyebrow">Today’s intake queue</p>
            {careJourneys.map((journey) => <button className={careJourney.label === journey.label ? "is-active" : ""} key={journey.label} onClick={() => { setCareJourney(journey); setCareReady(false); }} type="button"><span>{journey.status}</span><strong>{journey.person}</strong><small>{journey.reason}</small></button>)}
            <p className="careroute-queue-note">Fictional people and simulated intake only. This is not a medical service or clinical decision tool.</p>
          </aside>
          <div className="careroute-main" aria-live="polite">
            <div className="careroute-patient-view">
              <div className="careroute-progress"><p className="eyebrow">Patient view · {careJourney.step}</p><span><i style={{ width: careJourney.step === "1 of 4" ? "25%" : careJourney.step === "2 of 4" ? "50%" : "75%" }} /></span></div>
              <p className="careroute-welcome">Welcome, {careJourney.person.split(" ")[0]}.</p>
              <h2>{careJourney.question}</h2>
              <p>{careJourney.answer}</p>
              <div className="careroute-field"><span>Your note</span><strong>Example response shown for demonstration</strong></div>
              <div className="careroute-actions"><button type="button">Save and continue</button><small>You can pause, ask for support, or discuss details privately with the care team.</small></div>
            </div>
            <div className="careroute-handoff">
              <p className="eyebrow">Staff handoff · human review</p>
              <h3>A concise, respectful preparation brief.</h3>
              <div><span>Appointment context</span><strong>{careJourney.reason}</strong></div>
              <div><span>Readiness</span><strong>{careReady ? "Prepared for staff review" : careJourney.readiness}</strong></div>
              <div><span>Useful next step</span><strong>{careJourney.handoff}</strong></div>
              <button className={careReady ? "is-ready" : ""} disabled={careReady} onClick={() => setCareReady(true)} type="button">{careReady ? "Marked ready in this demo" : "Mark intake ready for staff review"}</button>
              <small>Staff confirm appointments and handle urgent, sensitive, or unclear situations. No health data is stored or sent.</small>
            </div>
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
