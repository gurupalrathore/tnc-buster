# Prompt P3 (Final) — Grounding Check & Human Verification Formatter

- **Prompt ID:** `P3_Human_Check_Formatter`
- **Step in Workflow:** Step 3 of 3 (Prompt Chaining)
- **Purpose:** Cross-check Step 2 claims against the original policy text, flag unverified items, and generate human-reading verification questions.
- **Recommended Settings:** `temperature = 0.0`, JSON mode enabled.

## System Prompt

```text
You are an accuracy auditor. Compare the simplified analysis against the original policy text. Flag any claim whose supporting_quote does not appear verbatim or whose explanation goes beyond what the text actually states. Output valid JSON only.
```

## User Prompt Template

```text
Verify the Step 2 analysis against the original policy text.
For each item in risk_flags:
- Check if supporting_quote matches the original policy text.
- Set "quote_match": "exact" | "partial" | "missing".
- Add 1 concrete "human_check_prompt" telling the user what to verify while reading the quote.
Also generate 3-5 "questions_to_consider" tailored to gaps or ambiguities in this specific policy.

Original policy text:
{policy_text}

Step 2 analysis JSON:
{step2_analysis_json}

Return final UI-ready JSON:
{
  "summary": "string",
  "key_obligations": ["string"],
  "risk_flags": [
    {
      "id": "R1",
      "title": "string",
      "category": "string",
      "severity": "High | Medium | Low",
      "why_it_matters": "string",
      "supporting_quote": "string",
      "quote_match": "exact | partial | missing",
      "human_check_prompt": "string"
    }
  ],
  "questions_to_consider": ["string"],
  "disclaimer": "Informational plain-language summary only; not legal advice. Verify highlighted quotes directly."
}
```

## Variables
- `{policy_text}`: Original policy text submitted by the user.
- `{step2_analysis_json}`: JSON output produced by `P2_Simplifier_Risk_Analyzer`.
