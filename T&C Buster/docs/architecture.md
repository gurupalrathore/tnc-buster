# Architecture & Prompt Workflow Diagrams

These diagrams support **Section 2(b)** of the Milestone 2 report for **T&C Buster (AI-Powered Terms and Conditions Simplifier, C18)**.

## 1. Prompt Workflow (3-Step Chaining)

```mermaid
flowchart LR
    U["User Pastes Policy Text"] --> P1["Prompt 1: Clause Extractor & Classifier"]
    P1 -->|"Structured Clause JSON"| P2["Prompt 2: Plain-Language Simplifier & Risk Flagger"]
    P2 -->|"Simplified Risks + Quoted Evidence"| P3["Prompt 3: Structured Output & Human Check Formatter"]
    P3 -->|"Validated JSON Output"| UI["Web UI + Human Verification Panel"]
```

## 2. Task Decomposition

```mermaid
flowchart TD
    Root["Simplify Terms / Privacy Policy"] --> T1["1. Input Hygiene & Segmentation"]
    Root --> T2["2. Thematic Clause Extraction"]
    Root --> T3["3. Risk Assessment & Plain-Language Rewrite"]
    Root --> T4["4. Grounding & Human Reading Verification"]
    T2 --> T2a["Data Collection & Tracking"]
    T2 --> T2b["Third-Party Sharing"]
    T2 --> T2c["Subscriptions & Auto-Renewal"]
    T2 --> T2d["Termination & Liability"]
    T4 --> T4a["Exact Quote Matching"]
    T4 --> T4b["User Verification Checklist"]
```

## 3. Input–Output Flow

```mermaid
flowchart LR
    In["Raw Policy Text (String)"] --> Clean["Length & Validity Check"]
    Clean -->|"Valid Policy"| Chain["3-Step Prompt Chain (P1 -> P2 -> P3)"]
    Clean -->|"Empty / Non-Policy Input"| Err["Structured Fallback Message"]
    Chain --> Out["Structured JSON: Summary, Obligations, Risk Flags with Quotes, Questions"]
    Out --> Human["Human Accuracy Check (Side-by-Side Excerpt Highlighting)"]
```

## 4. System Architecture (v0.1 Placeholder vs Full Release)

```mermaid
flowchart TD
    Browser["Static Web App (index.html + app.js)"] -->|"v0.1 Placeholder Mode"| Demo["Built-in Sample Policies & Client-Side Heuristic Preview"]
    Browser -->|"Full Release Mode"| Backend["API Gateway / Serverless Function"]
    Backend --> LLM["LLM Provider (Gemini / OpenAI via Env Key)"]
    LLM --> Schema["JSON Schema Validator"]
    Schema --> Browser
```
