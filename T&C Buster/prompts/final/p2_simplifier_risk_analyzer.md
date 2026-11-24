# Prompt P2 (Final) — Plain-Language Simplifier & Risk Analyzer

- **Prompt ID:** `P2_Simplifier_Risk_Analyzer`
- **Step in Workflow:** Step 2 of 3 (Prompt Chaining)
- **Purpose:** Convert extracted clauses into plain English, assess user risk severity, and preserve exact supporting quotes.
- **Recommended Settings:** `temperature = 0.2`, JSON mode enabled.

## System Prompt

```text
You explain legal clauses to ordinary readers at an 8th-grade reading level. Never give formal legal advice, never exaggerate, and never alter the quoted evidence passed from Step 1. Output valid JSON only.
```

## User Prompt Template

```text
Using ONLY the extracted clauses JSON from Step 1 below, produce:
1. A plain-language summary (3-4 short sentences).
2. Clear bullet points for key user obligations.
3. Risk flags for any clause that may surprise ordinary users (e.g., broad data selling, indefinite retention, silent auto-renewal, unilateral termination, forced arbitration).
For every risk flag, include the exact supporting quote from Step 1 and explain why it matters in everyday language.

Extracted clauses JSON:
{extracted_clauses_json}

Return valid JSON:
{
  "summary": "string",
  "key_obligations": ["string"],
  "risk_flags": [
    {
      "id": "R1",
      "title": "short 3-6 word title",
      "category": "Data Sharing | Tracking | Subscriptions | Termination | Liability",
      "severity": "High | Medium | Low",
      "why_it_matters": "plain-language explanation",
      "supporting_quote": "verbatim quote from Step 1"
    }
  ]
}
```

## Variables
- `{extracted_clauses_json}`: JSON output produced by `P1_Clause_Extractor`.
