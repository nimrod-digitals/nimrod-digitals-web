---
title: "Give Your AI Agent a Job Description Before You Give It Access"
slug: "give-your-ai-agent-a-job-description-before-you-give-it-access"
status: "Outline approved; full draft prepared"
proposed_publish_date: "2026-10-05"
content_pillar: "Enterprise AI governance and safeguards"
---

# Give Your AI Agent a Job Description Before You Give It Access

## Proposed excerpt

An AI agent should not inherit a person’s access and improvise from there. Define its job, authority, evidence requirements, and stopping points before it touches a business system.

## Editorial thesis

The practical unit of enterprise AI governance is not a broad policy or a model choice. It is a well-defined agent role. Before an agent receives data or tool access, the organisation should specify the outcome it owns, the minimum permissions it needs, the evidence it must preserve, the decisions it may make, and the conditions that require a person to take over.

## Why this topic now

- OpenAI’s September 1 workflow guidance explicitly recommends writing an agent job description covering triggers, outcomes, context, tools, permissions, persistence, evidence, and human review.
- OpenAI Presence describes production agents as beginning with a specific job and receiving only the knowledge and system access required for that job.
- NIST’s August 27 identity guidance warns that shared credentials create accountability gaps and highlights granular authorisation and least privilege for agents.
- The topic extends the September 21 article naturally: after redesigning human judgment and review, the next question is how to bound the agent itself.

## Article outline

### 1. Access is not a job description

Opening problem: many organisations connect an agent to email, files, CRM, finance, or support systems before defining exactly what it is responsible for. Technical access answers what the agent *can* reach; it does not define what the agent *should* do.

### 2. Treat the agent as a role, not a feature

Introduce the core idea: a dependable agent needs an operating role with a named outcome. Its instructions should cover:

- the event that starts the work;
- the outcome it is responsible for;
- the approved context and tools;
- how long and how persistently it may work;
- what evidence it must return;
- where its authority ends.

### 3. Give it its own identity and minimum authority

Explain why an agent should not quietly borrow a person’s account or broad permissions. Connect separate identity, least privilege, time-bounded access, and auditable actions to clearer accountability. Keep the treatment practical rather than deeply technical.

### 4. Define stopping points before launch

Distinguish three operating zones:

1. Actions the agent may complete automatically.
2. Actions it may prepare but a person must approve.
3. Actions it must refuse or escalate.

Use a simple business example—such as handling a billing request—to show how identity checks, policy limits, approved actions, and escalation work together.

### 5. Require evidence, not confidence

Recommend that consequential agent output include source records, applied rules, actions taken, unresolved uncertainty, and the reason for escalation. Confidence language alone is not an audit trail.

### 6. Expand authority only after evidence

Frame autonomy as something earned through observed performance. Begin with a narrow role, test common and adverse cases, monitor exceptions and review load, then expand permissions only when the workflow meets defined acceptance criteria.

### 7. A five-part agent job description

Close with a reusable checklist:

1. **Outcome:** What business result is this agent accountable for?
2. **Scope:** What starts and ends the assignment?
3. **Authority:** Which data, tools, and actions are permitted?
4. **Evidence:** What must be recorded or presented for review?
5. **Escalation:** When must the agent stop, and who takes over?

Final point: trustworthy autonomy comes from explicit boundaries and feedback, not from granting a capable model broad access and hoping policy fills the gaps.

## Source set

- OpenAI, [“How AI-native companies turn workflows into operating capability”](https://openai.com/index/ai-native-company-workflows/), September 1, 2026.
- OpenAI, [“Introducing OpenAI Presence”](https://openai.com/index/introducing-openai-presence/), July 22, 2026.
- NIST, [“Back to the Future: Why Agentic AI Needs a Strong Identity Foundation”](https://www.nist.gov/blogs/cybersecurity-insights/back-future-why-agentic-ai-needs-strong-identity-foundation), August 27, 2026.
- NIST NCCoE, [“Accelerating the Adoption of Software and AI Agent Identity and Authorization”](https://www.nccoe.nist.gov/projects/software-and-ai-agent-identity-and-authorization), 2026.

## Drafting guardrails

- Target 850–1,050 words.
- Use British/Philippine business English consistent with existing AI Insights articles.
- Do not imply that an agent is an employee or legal person.
- Do not invent client results, benchmarks, or implementation evidence.
- Keep security concepts accessible to business and operations leaders.
