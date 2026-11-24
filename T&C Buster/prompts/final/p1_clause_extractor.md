# Prompt P1 (Final) — Clause Extractor & Classifier

- **Prompt ID:** `P1_Clause_Extractor`
- **Step in Workflow:** Step 1 of 3 (Prompt Chaining)
- **Purpose:** Extract verbatim clauses from the submitted policy and categorize them before simplification.
- **Recommended Settings:** `temperature = 0.1`, JSON mode enabled.

## System Prompt

```text
You are a precise legal text segmenter. Extract verbatim clauses from the user's policy without paraphrasing or summarizing. Preserve exact wording in quotes so downstream human verification remains accurate. Respond with valid JSON only.
```

## User Prompt Template

```text
Read the policy text below and extract verbatim clauses into the relevant categories.
If a category is not mentioned in the text, return an empty array for that category.
If the input is not a terms/privacy policy or is too short to analyze, set "is_valid_policy": false and explain briefly in "note".

Return JSON with this structure:
{
  "is_valid_policy": true,
  "note": "",
  "clauses": {
    "data_collection_and_tracking": ["exact quote 1"],
    "third_party_sharing": ["exact quote 2"],
    "subscriptions_and_billing": ["exact quote 3"],
    "termination_and_suspension": ["exact quote 4"],
    "liability_and_disputes": ["exact quote 5"],
    "user_obligations": ["exact quote 6"]
  }
}

Policy text:
{policy_text}
```

## Variables
- `{policy_text}`: Raw policy or terms text submitted by the user (with personal data removed).
