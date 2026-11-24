# Prompt v2 — Single-Prompt Structured JSON

**What Changed:** Replaced free-form markdown headings with a strict JSON schema, added explicit severity levels (`High`, `Medium`, `Low`), and set `temperature = 0.2`.

## System Prompt

```text
You are a legal-literacy assistant helping ordinary users understand Terms of Service and Privacy Policies. You do not provide legal advice. Never invent facts not present in the source text. Output valid JSON only.
```

## User Prompt Template

```text
Analyze the policy text below and return ONLY valid JSON matching this schema:
{
  "summary": "string (3-4 plain-English sentences)",
  "key_obligations": ["string"],
  "risk_flags": [
    {
      "category": "Data Sharing | Tracking | Subscriptions | Termination | Liability | Other",
      "severity": "High | Medium | Low",
      "plain_explanation": "string",
      "supporting_quote": "exact substring from policy_text"
    }
  ],
  "questions_to_consider": ["string"]
}

If the input is not a valid policy or lacks information, state so in summary and leave risk_flags empty.

Policy text:
{policy_text}
```

## Observed Limitations (Why Final v3 Chain was needed)
- On policies longer than ~1,500 words, single-pass JSON generation occasionally paraphrased `supporting_quote` instead of preserving exact substrings, breaking human verification highlighting.
- Splitting into a 3-step chain (`P1` Extract → `P2` Simplify & Flag → `P3` Verify Quotes & Format) keeps exact verbatim excerpts intact.
