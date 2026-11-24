# T&C Buster — AI-Powered Terms and Conditions Simplifier (Problem C18)

> **Release Status:** `v0.1.0-alpha` — Initial Placeholder & Interactive Overview Release
> **Course:** SCSE4041 Prompt Engineering Mini Project

An accessible web tool designed for ordinary users to paste lengthy Terms of Service or Privacy Policies and receive a **plain-language summary**, **evidence-backed risk flags**, **structured output**, and a **human accuracy verification checklist**.

---

## Live Prototype Link

- **Deployed Preview (Placeholder):** `[Add your GitHub Pages / Vercel / Netlify URL after deploying]`

---

## What the Full Release Will Do

1. **Paste & Normalize Policy Text:** Users paste public Terms of Service or Privacy Policy text (with a reminder to remove personal details).
2. **3-Step Prompt Chaining:**
   - **Prompt 1 (`P1` — Clause Extractor):** Splits raw legal text into thematic sections (Data Collection, Third-Party Sharing, Subscriptions/Billing, Termination, Dispute Resolution).
   - **Prompt 2 (`P2` — Plain-Language Simplifier & Risk Flagger):** Rewrites obligations in simple English, flags risky/unclear clauses, and attaches exact quoted excerpts as evidence.
   - **Prompt 3 (`P3` — Structured Formatter & Verification Aid):** Outputs strict JSON matching the UI schema and generates targeted questions for human reading.
3. **Human Accuracy Verification:** Users inspect every AI-generated risk flag side-by-side with its exact highlighted quote from the original policy and mark items as verified.

---

## Repository Structure (Milestone 2 Ready)

```text
.
├── index.html                  # Deployable v0.1 placeholder web app (zero-build static site)
├── assets/
│   ├── css/style.css           # UI styling
│   └── js/app.js               # Interactive demo, sample policies, prompt chain inspector & verification UI
├── prompts/
│   ├── v1/                     # Milestone 1 baseline single prompt
│   ├── v2/                     # Intermediate structured JSON prompt
│   └── final/                  # Final 3-step chained prompts (P1, P2, P3)
├── code/
│   └── chain_runner_template.py # Python template for running the 3-step prompt chain (uses env vars, no keys stored)
├── test-data/
│   └── sample_policies.json    # Sample Normal, Edge, and Invalid policy test inputs
├── docs/
│   └── architecture.md         # Workflow, task decomposition, I/O flow & architecture Mermaid diagrams
├── CHANGELOG.md                # Dated progress log since Milestone 1
└── README.md                   # This file
```

---

## How to Open & Run Locally

### Option 1: Open the Static Web App Directly
Because v0.1 is a zero-build static site, you can run a local preview server using Python:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

### Option 2: Deploy Free as a Placeholder Site
- **GitHub Pages:** Push this repository to GitHub → **Settings → Pages → Deploy from a branch (`main` / `root`)**.
- **Netlify / Vercel:** Import the GitHub repository with no build command and publish directory `.` (root).

---

## Team Members

> Fill in your details before Milestone 2 submission:

| Enrollment No. | Name | Role |
|---|---|---|
| `[S24CSEUXXXX]` | `[Member 1]` | Prompt Design & Chaining |
| `[S24CSEUXXXX]` | `[Member 2]` | Frontend UI & Verification UX |
| `[S24CSEUXXXX]` | `[Member 3]` | Testing, Edge Cases & Documentation |
