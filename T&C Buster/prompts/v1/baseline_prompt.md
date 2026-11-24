# Prompt v1 — Baseline Prompt (Milestone 1)

**Purpose:** Initial single-shot prompt from Milestone 1 Q18 before introducing prompt chaining or strict JSON output.

## Prompt Text

```text
You are an assistant that simplifies terms of service and privacy policies for ordinary users. Analyze the policy text provided below.

1. Summarize the policy in simple English.
2. Identify clauses concerning personal data collection, sharing, subscriptions, automatic renewals, and account termination.
3. Flag potentially risky or unclear clauses and explain why they matter.
4. Quote the relevant text as evidence.
5. Do not invent facts or provide definitive legal advice. If information is missing, say so.

Return the results under these headings: Summary, Key Obligations, Potential Risks, Evidence, and Questions to Consider.

Policy text: {policy_text}
```

## Observed Limitations (Why v2 was needed)
- Output was free-form markdown text, making programmatic UI rendering and automated verification difficult.
- Long policies caused the model to skip subtle auto-renewal or arbitration clauses when asked to do extraction, simplification, and formatting in a single prompt.
