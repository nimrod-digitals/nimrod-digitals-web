---
title: "Give Your AI Agent a Job Description Before You Give It Access"
slug: "give-your-ai-agent-a-job-description-before-you-give-it-access"
date: "2026-10-05"
status: "Scheduled in WordPress"
proposed_publish_date: "2026-10-05"
cms_post_id: 22
cms_url: "https://cms.nimroddigitals.com/give-your-ai-agent-a-job-description-before-you-give-it-access/"
excerpt: "An AI agent should not inherit a person’s access and improvise from there. Define its job, authority, evidence requirements, and stopping points before it touches a business system."
---

# Give Your AI Agent a Job Description Before You Give It Access

The fastest way to make an AI agent look useful is to connect it to the systems where work already happens. Give it access to email, documents, customer records, finance tools, or a service desk, and it can move from producing suggestions to completing tasks.

That is also where the design problem changes.

Access tells an agent what it *can* reach. It does not tell the agent what it *should* do, which outcome it owns, or when its authority ends. If those boundaries remain implicit, the organisation has not created a dependable workflow. It has created a capable system with room to improvise.

Before an agent receives access, give it a job description.

## Treat the agent as a role, not a feature

OpenAI’s recent guidance for AI-native workflows recommends defining an agent’s trigger, outcome, context, tools, permissions, persistence, evidence, and points of human review. Its production system, Presence, applies the same pattern: each deployment begins with a specific job, and the agent receives only the knowledge and system access required for that job.

This is a more useful starting point than asking where the business can “add AI.” A feature can be switched on. A role sits inside an operating system of responsibilities, handoffs, controls, and measures.

Consider a customer-service agent. “Help with billing” is not a sufficient role. A workable definition might say that the agent may receive authenticated billing questions, retrieve the customer’s current plan and payment history, apply published adjustment rules, and resolve eligible requests up to a defined limit. It must show the policy used, record the action taken, and transfer exceptions to a named team.

That description turns a broad capability into bounded work.

## Give the agent its own identity

An agent should not quietly inherit a person’s account simply because that is the easiest way to connect a system.

NIST has highlighted the accountability gaps created when humans or agents share credentials. If several people and automated systems act through the same identity, it becomes harder to establish who or what accessed a record, initiated a change, or approved an action.

A distinct identity allows the organisation to give the agent only the permissions its role requires. It also makes those permissions easier to review, revoke, and audit.

This is the practical meaning of least privilege: do not give an agent everything a helpful employee could theoretically use. Give it the smallest set of data and actions needed to complete the defined job. Limit access by system, record type, action, value, time, or customer state where appropriate.

The question is not whether the agent is generally trustworthy. The question is whether its authority matches this particular responsibility.

## Define stopping points before launch

Human oversight becomes clearer when each possible action belongs to one of three operating zones:

1. **Complete automatically.** The action is routine, reversible, and covered by explicit rules.
2. **Prepare for approval.** The agent may gather evidence and recommend or stage an action, but a named person must authorise it.
3. **Refuse or escalate.** The request is prohibited, outside the role, unusually consequential, or too uncertain to continue safely.

Return to the billing example. The agent might correct a small duplicate fee automatically when identity and eligibility checks pass. It might prepare a larger credit for a supervisor’s approval. It should refuse a request to alter historical records and escalate a suspected account takeover.

These boundaries should be designed before deployment, not discovered one incident at a time. Testing should include ordinary requests, ambiguous cases, policy conflicts, attempts to bypass controls, and situations where required information is missing.

## Require evidence, not confidence

An agent saying it is confident does not make its work auditable.

For consequential tasks, define the evidence the agent must preserve or present. That may include the records it consulted, the policy or rule it applied, the action it took, any uncertainty it could not resolve, and the reason it stopped or escalated.

This evidence serves two purposes. It helps a reviewer make a better decision in the moment, and it creates the feedback needed to improve the workflow later.

Repeated escalations may reveal that a policy is unclear. Frequent corrections may show that the agent lacks context. Clean performance in a narrow category may support reducing review or expanding authority. Without structured evidence, these lessons remain anecdotal.

## Let autonomy be earned

Teams often discuss autonomy as a setting: supervised or autonomous. In practice, authority should expand as a workflow demonstrates that it can meet its acceptance criteria.

Begin with one valuable, repeatable job. Give the agent limited permissions and visible review points. Measure the result, exception rate, review load, reversals, and policy failures. Improve the role, instructions, context, and controls as real cases expose gaps.

Then, if the evidence supports it, allow the agent to complete more cases, work with less frequent review, or use an additional action. If performance deteriorates or the operating environment changes, narrow the role again.

This approach treats autonomy as an operational decision rather than a statement of faith in the model.

## A five-part job description for an AI agent

Before connecting an agent to a business system, write down five things:

1. **Outcome:** What business result is the agent responsible for producing?
2. **Scope:** What triggers the work, and what marks it complete?
3. **Authority:** Which data, tools, and actions may it use—and under what limits?
4. **Evidence:** What must it record or present so its work can be reviewed?
5. **Escalation:** When must it stop, and who is responsible for taking over?

These questions do not remove every risk. They make responsibility visible enough to test, operate, and improve.

As AI systems become more capable, organisations will be tempted to unlock value by widening access. The stronger path is to define the work first. Trustworthy autonomy does not begin with an all-access account or a broad policy statement. It begins with a specific job, explicit authority, clear evidence, and a reliable way to hand judgment back to people.

## Sources

- OpenAI, [“How AI-native companies turn workflows into operating capability”](https://openai.com/index/ai-native-company-workflows/), September 1, 2026.
- OpenAI, [“Introducing OpenAI Presence”](https://openai.com/index/introducing-openai-presence/), July 22, 2026.
- NIST, [“Back to the Future: Why Agentic AI Needs a Strong Identity Foundation”](https://www.nist.gov/blogs/cybersecurity-insights/back-future-why-agentic-ai-needs-strong-identity-foundation), August 27, 2026.
- NIST NCCoE, [“Software and AI Agent Identity and Authorization”](https://www.nccoe.nist.gov/projects/software-and-ai-agent-identity-and-authorization), 2026.
