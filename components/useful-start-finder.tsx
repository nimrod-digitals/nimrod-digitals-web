"use client";

import Link from "next/link";
import { useState } from "react";

const paths = [
  {
    label: "Make enquiries easier to handle",
    lab: "SignalDesk",
    href: "/labs/signaldesk/",
    outcome: "A clear lead brief, suggested owner, and a human decision before any follow-up.",
    subject: "Useful start: enquiry workflow",
  },
  {
    label: "Make a restaurant run with less friction",
    lab: "TableFlow + KitchenPulse",
    href: "/labs/tableflow/",
    outcome: "A consent-led guest conversation and an owner-reviewed operating picture for the shift.",
    subject: "Useful start: restaurant workflow",
  },
  {
    label: "Turn service signals into better action",
    lab: "FieldLink",
    href: "/labs/fieldlink/",
    outcome: "A focused dispatch view that makes exceptions and responsible next steps visible.",
    subject: "Useful start: service operations",
  },
  {
    label: "Make a complex project easier to steer",
    lab: "ProjectPulse",
    href: "/labs/projectpulse/",
    outcome: "A decision-ready project brief before a lead changes a plan, budget, or client update.",
    subject: "Useful start: project clarity",
  },
];

export function UsefulStartFinder() {
  const [selected, setSelected] = useState(0);
  const path = paths[selected];
  const emailBody = encodeURIComponent(`I would like to explore: ${path.label.toLowerCase()}.\n\nWhat is changing:\n\nWhat feels stuck:\n\nWhat a useful outcome would look like:`);

  return (
    <section className="page-shell pb-20 md:pb-28" aria-label="Find a useful start">
      <div className="useful-start-finder border-y border-mist py-10 md:grid md:grid-cols-12 md:gap-10 md:py-14">
        <div className="md:col-span-4">
          <p className="eyebrow">Find a useful start</p>
          <h2 className="brand-headline mt-4 text-4xl leading-[.96] md:text-5xl">Start with the problem, not the platform.</h2>
          <p className="mt-5 max-w-sm leading-relaxed text-quiet-ink">Choose the closest situation. This private, on-page guide will point to a relevant Nimrod Lab pattern—nothing is recorded or sent.</p>
        </div>
        <div className="mt-9 md:col-span-8 md:mt-0">
          <div className="grid gap-2" role="list">
            {paths.map((item, index) => (
              <button className={`useful-start-option ${selected === index ? "is-active" : ""}`} key={item.lab} onClick={() => setSelected(index)} type="button">
                <span>0{index + 1}</span><strong>{item.label}</strong><i aria-hidden="true">↗</i>
              </button>
            ))}
          </div>
          <div className="useful-start-result mt-5" aria-live="polite">
            <p className="eyebrow">Relevant pattern · {path.lab}</p>
            <p className="brand-subhead mt-3 text-2xl leading-tight md:text-3xl">{path.outcome}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="action-link action-link-secondary" href={path.href}>View the concept <span>↗</span></Link>
              <a className="action-link action-link-primary" href={`mailto:hello@nimroddigitals.com?subject=${encodeURIComponent(path.subject)}&body=${emailBody}`}>Use this as a starting point <span>↗</span></a>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-quiet-ink">The email link opens your own mail app with an optional draft. Nimrod Digitals does not collect any answer from this guide.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
