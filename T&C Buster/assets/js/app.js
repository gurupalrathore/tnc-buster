/* T&C Buster v0.1 Placeholder Web App
 * Demonstrates:
 *  1) 3-Step Prompt Chaining (P1 Extract -> P2 Simplify & Risk -> P3 Ground & Format)
 *  2) Structured JSON Output
 *  3) Human Accuracy Verification with exact source-quote highlighting
 */

const SAMPLES = {
  T01: {
    title: "Social Photo App Privacy & Terms",
    policy_text:
      "Welcome to SnapCircle. By creating an account, you agree to be at least 13 years old and responsible for keeping your password confidential. We collect your name, email address, device identifiers, precise GPS location when the app is active, and contacts if you enable friend discovery. We may share aggregated or personally identifiable usage data with third-party advertising networks, analytics vendors, and affiliated companies to deliver personalized ads. By uploading photos or videos, you grant SnapCircle a worldwide, royalty-free, sublicensable license to host, display, modify, and distribute your content across partner platforms. SnapCircle reserves the right to suspend or terminate your account at any time, with or without notice, if we believe you violated these terms. Any disputes arising from these terms shall be resolved exclusively through binding individual arbitration, and you waive your right to participate in a class-action lawsuit.",
    result: {
      is_valid_policy: true,
      summary:
        "SnapCircle collects personal details, precise GPS location, and optional contacts, and can share identifiable usage data with ad networks. Uploading media grants the company a broad license to reuse and distribute your content across partner platforms. The company may terminate accounts without notice, and legal disputes must go through private individual arbitration instead of court.",
      key_obligations: [
        "Confirm you are at least 13 years old.",
        "Keep your account password confidential.",
        "Follow SnapCircle usage rules or risk immediate account suspension."
      ],
      risk_flags: [
        {
          id: "R1",
          title: "Identifiable Data Shared With Ad Networks",
          category: "Data Sharing",
          severity: "High",
          why_it_matters:
            "Not just anonymous stats — personally identifiable usage data may be shared with third-party ad networks and affiliates.",
          supporting_quote:
            "We may share aggregated or personally identifiable usage data with third-party advertising networks, analytics vendors, and affiliated companies to deliver personalized ads.",
          human_check_prompt: "Check whether the policy provides an opt-out for personalized ad sharing."
        },
        {
          id: "R2",
          title: "Broad Reusable License Over Your Photos",
          category: "Other",
          severity: "Medium",
          why_it_matters:
            "You allow the company to modify and distribute your uploaded photos and videos across partner platforms without paying royalties.",
          supporting_quote:
            "By uploading photos or videos, you grant SnapCircle a worldwide, royalty-free, sublicensable license to host, display, modify, and distribute your content across partner platforms.",
          human_check_prompt: "Verify whether deleting your account ends this license."
        },
        {
          id: "R3",
          title: "Account Termination Without Prior Notice",
          category: "Termination",
          severity: "Medium",
          why_it_matters:
            "Your account and stored media can be suspended or closed at any time without advance warning.",
          supporting_quote:
            "SnapCircle reserves the right to suspend or terminate your account at any time, with or without notice, if we believe you violated these terms.",
          human_check_prompt: "Confirm if there is an appeal process mentioned anywhere else."
        },
        {
          id: "R4",
          title: "Mandatory Arbitration & Class-Action Waiver",
          category: "Liability",
          severity: "High",
          why_it_matters:
            "You give up the right to sue in a regular court or join a group lawsuit if a dispute happens.",
          supporting_quote:
            "Any disputes arising from these terms shall be resolved exclusively through binding individual arbitration, and you waive your right to participate in a class-action lawsuit.",
          human_check_prompt: "Check whether small-claims court or a 30-day opt-out exists."
        }
      ],
      questions_to_consider: [
        "Can you turn off precise GPS location and still use core app features?",
        "How do you opt out of third-party advertising data sharing?",
        "What happens to your uploaded photos after account deletion?"
      ]
    }
  },
  T02: {
    title: "Cloud SaaS Subscription Terms",
    policy_text:
      "CloudNotes Pro offers a 7-day free trial followed by a paid monthly or annual subscription. Unless you cancel at least 48 hours before the end of your current billing period, your subscription will automatically renew at the then-current rate, and your stored payment method will be charged automatically. Subscription fees are non-refundable once a billing cycle begins, except where required by local law. We reserve the right to modify subscription pricing upon 15 days' notice posted within your account settings. Upon cancellation, your workspace enters read-only mode, and stored files may be permanently deleted 30 days after account closure. We use automated telemetry to monitor feature usage and improve service reliability.",
    result: {
      is_valid_policy: true,
      summary:
        "CloudNotes Pro converts its 7-day free trial into an auto-renewing paid plan unless you cancel at least 48 hours early. Payments are non-refundable once charged, prices can change with 15 days of in-app notice, and files may be permanently deleted 30 days after closing your account.",
      key_obligations: [
        "Cancel at least 48 hours before the trial or billing cycle ends to avoid being charged.",
        "Monitor in-account settings for pricing updates.",
        "Export important files within 30 days after closing your account."
      ],
      risk_flags: [
        {
          id: "R1",
          title: "Auto-Renewal With 48-Hour Cutoff",
          category: "Subscriptions",
          severity: "High",
          why_it_matters:
            "Canceling on the last day may still trigger a full renewal charge at the latest rate.",
          supporting_quote:
            "Unless you cancel at least 48 hours before the end of your current billing period, your subscription will automatically renew at the then-current rate, and your stored payment method will be charged automatically.",
          human_check_prompt: "Verify the exact cancellation deadline and where the cancel button lives."
        },
        {
          id: "R2",
          title: "No Refunds After Billing Begins",
          category: "Subscriptions",
          severity: "Medium",
          why_it_matters:
            "Even if you forget to cancel right after renewal, fees are non-refundable unless local law requires it.",
          supporting_quote:
            "Subscription fees are non-refundable once a billing cycle begins, except where required by local law.",
          human_check_prompt: "Check if your region grants mandatory cooling-off refunds."
        },
        {
          id: "R3",
          title: "Files Deleted 30 Days After Closure",
          category: "Termination",
          severity: "Low",
          why_it_matters:
            "Closed accounts lose stored files permanently after a 30-day window.",
          supporting_quote:
            "Upon cancellation, your workspace enters read-only mode, and stored files may be permanently deleted 30 days after account closure.",
          human_check_prompt: "Verify whether 'cancellation' and 'account closure' mean the same step."
        }
      ],
      questions_to_consider: [
        "Does CloudNotes send an email reminder before the 7-day trial converts?",
        "Can you export all notes in an open format before closing the account?"
      ]
    }
  },
  T03: {
    title: "Minimal Ambiguous Clause (Edge Case)",
    policy_text:
      "By using QuickDrop, you allow us to process your uploaded files and share necessary metadata with service partners as needed. We may update these rules whenever necessary.",
    result: {
      is_valid_policy: true,
      summary:
        "This short excerpt gives QuickDrop broad permission to process uploaded files, share metadata with unspecified partners, and change its rules at any time without defining retention or notice periods.",
      key_obligations: [
        "Accept ongoing rule changes if you continue using QuickDrop."
      ],
      risk_flags: [
        {
          id: "R1",
          title: "Vague 'Service Partners' & Unilateral Changes",
          category: "Data Sharing",
          severity: "Medium",
          why_it_matters:
            "Important details — what metadata is shared, who the partners are, and how you are notified of changes — are missing.",
          supporting_quote:
            "share necessary metadata with service partners as needed. We may update these rules whenever necessary.",
          human_check_prompt: "Look for a full privacy policy link before uploading sensitive files."
        }
      ],
      questions_to_consider: [
        "Missing information: How long are uploaded files kept?",
        "Missing information: Who are the 'service partners' and where are they located?"
      ]
    }
  },
  T04: {
    title: "Non-Policy Input (Invalid Case)",
    policy_text: "Hey can you write a Python script for bubble sort?",
    result: {
      is_valid_policy: false,
      summary:
        "The submitted text does not appear to be a Terms of Service or Privacy Policy. No clauses were extracted or flagged.",
      key_obligations: [],
      risk_flags: [],
      questions_to_consider: [
        "Please paste an actual Terms of Service, End User License Agreement, or Privacy Policy excerpt."
      ]
    }
  }
};

const PROMPT_DOCS = {
  p1: `PROMPT P1 (Final) — Clause Extractor & Classifier
Temperature: 0.1 | Output: JSON

System:
You are a precise legal text segmenter. Extract verbatim clauses from the user's policy without paraphrasing or summarizing. Preserve exact wording in quotes so downstream human verification remains accurate. Respond with valid JSON only.

User Template:
Read the policy text below and extract verbatim clauses into categories:
- data_collection_and_tracking
- third_party_sharing
- subscriptions_and_billing
- termination_and_suspension
- liability_and_disputes
- user_obligations

Policy text:
{policy_text}`,

  p2: `PROMPT P2 (Final) — Plain-Language Simplifier & Risk Analyzer
Temperature: 0.2 | Output: JSON

System:
You explain legal clauses to ordinary readers at an 8th-grade reading level. Never give formal legal advice, never exaggerate, and never alter the quoted evidence passed from Step 1.

User Template:
Using ONLY {extracted_clauses_json} from Step 1:
1. Write a 3-4 sentence plain-language summary.
2. List key user obligations.
3. Flag risky or surprising clauses with severity (High/Medium/Low), everyday explanation, and exact supporting_quote.`,

  p3: `PROMPT P3 (Final) — Grounding Check & Human Verification Formatter
Temperature: 0.0 | Output: UI-Ready JSON

System:
You are an accuracy auditor. Compare the simplified analysis against {policy_text}. Flag any claim whose supporting_quote does not appear verbatim.

User Template:
For each risk flag in {step2_analysis_json}:
- Set quote_match: "exact" | "partial" | "missing"
- Add 1 concrete human_check_prompt for the reader
- Generate 3-5 questions_to_consider tailored to missing or ambiguous details.`,

  v1: `PROMPT v1 (Milestone 1 Baseline — Superseded)

You are an assistant that simplifies terms of service and privacy policies for ordinary users. Analyze the policy text provided below.
1. Summarize the policy in simple English.
2. Identify clauses concerning personal data collection, sharing, subscriptions, automatic renewals, and account termination.
3. Flag potentially risky or unclear clauses and explain why they matter.
4. Quote the relevant text as evidence.
5. Do not invent facts or provide definitive legal advice.

Return the results under these headings: Summary, Key Obligations, Potential Risks, Evidence, and Questions to Consider.
Policy text: {policy_text}`
};

// DOM Elements
const policyInput = document.getElementById("policy-input");
const readerView = document.getElementById("reader-view");
const editView = document.getElementById("edit-view");
const charCount = document.getElementById("char-count");
const modeIndicator = document.getElementById("mode-indicator");
const cardsView = document.getElementById("cards-view");
const jsonView = document.getElementById("json-view");
const verificationCount = document.getElementById("verification-count");
const verificationProgress = document.getElementById("verification-progress");
const promptPreview = document.getElementById("prompt-preview");

const tabEdit = document.getElementById("tab-edit");
const tabReader = document.getElementById("tab-reader");
const tabCards = document.getElementById("tab-cards");
const tabJson = document.getElementById("tab-json");

let currentSampleKey = "T01";
let currentOutput = null;
let verifiedSet = new Set();

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeSpace(text) {
  return text.replace(/\s+/g, " ").trim().toLowerCase();
}

function checkQuoteMatch(sourceText, quote) {
  if (!quote) return "missing";
  if (normalizeSpace(sourceText).includes(normalizeSpace(quote))) {
    return "exact";
  }
  return "missing";
}

function buildHeuristicPreview(rawText) {
  const trimmed = rawText.trim();
  const legalHints = /(terms|privacy|policy|collect|data|personal|cookies|subscribe|renewal|cancel|terminate|arbitration|liability|account|consent|third[- ]party)/i;

  if (trimmed.length < 40 || !legalHints.test(trimmed)) {
    return {
      is_valid_policy: false,
      summary:
        "This input looks too short or does not contain recognizable Terms of Service or Privacy Policy language.",
      key_obligations: [],
      risk_flags: [],
      questions_to_consider: [
        "Paste a full clause or policy section mentioning data use, accounts, billing, or legal terms."
      ]
    };
  }

  const sentences = trimmed
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const rules = [
    {
      pattern: /(third[- ]party|advertis|affiliat|sell|share.*data|analytics)/i,
      title: "Potential Third-Party Data Sharing",
      category: "Data Sharing",
      severity: "High",
      why: "Detected language mentioning sharing data or working with external partners or advertisers.",
      check: "Confirm exactly which data is shared and whether you can opt out."
    },
    {
      pattern: /(auto[- ]?renew|automatically renew|non[- ]?refundable|billing|subscription|charge)/i,
      title: "Billing or Auto-Renewal Terms",
      category: "Subscriptions",
      severity: "High",
      why: "Detected billing or automatic renewal phrasing that can lead to unexpected recurring charges.",
      check: "Check the cancellation deadline and refund policy."
    },
    {
      pattern: /(terminat|suspend|without notice|delete.*account|close)/i,
      title: "Account Suspension or Termination",
      category: "Termination",
      severity: "Medium",
      why: "Detected language allowing service suspension, termination, or data deletion.",
      check: "Look for notice periods and ways to export your data."
    },
    {
      pattern: /(arbitration|class[- ]action|waive|liable|liability)/i,
      title: "Dispute or Liability Limitation",
      category: "Liability",
      severity: "Medium",
      why: "Detected terms that may restrict legal remedies or require arbitration.",
      check: "Check whether court claims or opt-outs are allowed."
    }
  ];

  const flags = [];
  rules.forEach((rule) => {
    const matchSentence = sentences.find((s) => rule.pattern.test(s));
    if (matchSentence) {
      flags.push({
        id: `R${flags.length + 1}`,
        title: rule.title,
        category: rule.category,
        severity: rule.severity,
        why_it_matters: rule.why,
        supporting_quote: matchSentence,
        human_check_prompt: rule.check
      });
    }
  });

  return {
    is_valid_policy: true,
    summary:
      flags.length > 0
        ? `Client-side preview scanned ${sentences.length} sentence(s) and highlighted ${flags.length} clause(s) matching common risk patterns. Full LLM plain-language synthesis will run in the next release.`
        : `Client-side preview scanned ${sentences.length} sentence(s). No high-risk keyword patterns triggered automatically; review the text directly to confirm.`,
    key_obligations: [
      "Review highlighted excerpts directly against the original text.",
      "Check for missing details such as data retention length or cancellation instructions."
    ],
    risk_flags: flags,
    questions_to_consider: [
      "Are third-party sharing or tracking practices clearly named?",
      "How do you cancel or delete your data if you stop using the service?"
    ]
  };
}

function switchInputTab(mode) {
  const showReader = mode === "reader";
  editView.classList.toggle("hidden", showReader);
  readerView.classList.toggle("hidden", !showReader);
  tabEdit.classList.toggle("is-active", !showReader);
  tabReader.classList.toggle("is-active", showReader);
  tabEdit.setAttribute("aria-selected", String(!showReader));
  tabReader.setAttribute("aria-selected", String(showReader));
  if (showReader && !readerView.innerHTML) {
    readerView.textContent = policyInput.value;
  }
}

function switchOutputTab(mode) {
  const showJson = mode === "json";
  cardsView.classList.toggle("hidden", showJson);
  jsonView.classList.toggle("hidden", !showJson);
  tabCards.classList.toggle("is-active", !showJson);
  tabJson.classList.toggle("is-active", showJson);
  tabCards.setAttribute("aria-selected", String(!showJson));
  tabJson.setAttribute("aria-selected", String(showJson));
}

function highlightQuoteInReader(quote) {
  const text = policyInput.value;
  switchInputTab("reader");

  const idx = text.toLowerCase().indexOf(quote.toLowerCase());
  if (idx === -1) {
    readerView.textContent = text;
    return;
  }

  const before = escapeHtml(text.slice(0, idx));
  const match = escapeHtml(text.slice(idx, idx + quote.length));
  const after = escapeHtml(text.slice(idx + quote.length));
  readerView.innerHTML = `${before}<mark class="quote-highlight" id="active-highlight">${match}</mark>${after}`;

  const markEl = document.getElementById("active-highlight");
  if (markEl) {
    markEl.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function updateVerificationProgress() {
  const total = currentOutput?.risk_flags?.length || 0;
  const done = verifiedSet.size;
  verificationCount.textContent =
    total === 0 ? "No risk clauses to verify" : `${done} of ${total} risk clauses verified`;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  verificationProgress.style.width = `${pct}%`;
}

function renderOutput(data, sourceText) {
  verifiedSet = new Set();
  const enrichedFlags = (data.risk_flags || []).map((flag) => ({
    ...flag,
    quote_match: checkQuoteMatch(sourceText, flag.supporting_quote)
  }));

  currentOutput = {
    ...data,
    risk_flags: enrichedFlags,
    disclaimer: "Informational plain-language summary only; not legal advice. Verify highlighted quotes directly."
  };

  jsonView.textContent = JSON.stringify(currentOutput, null, 2);

  const obligationsHtml =
    currentOutput.key_obligations.length > 0
      ? `<ul>${currentOutput.key_obligations.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
      : `<p class="muted">No user obligations extracted.</p>`;

  const risksHtml =
    enrichedFlags.length > 0
      ? `<div class="risk-list">${enrichedFlags
          .map((flag) => {
            const sevClass = `sev-${flag.severity.toLowerCase()}`;
            const matchText =
              flag.quote_match === "exact"
                ? "Quote check: Exact match in source"
                : "Quote check: Verify manually";
            return `
              <article class="risk-card ${sevClass}">
                <div class="risk-top">
                  <span class="risk-title">${escapeHtml(flag.id)} · ${escapeHtml(flag.title)}</span>
                  <span class="sev-badge">${escapeHtml(flag.severity)} · ${escapeHtml(flag.category)}</span>
                </div>
                <p>${escapeHtml(flag.why_it_matters)}</p>
                <blockquote class="quote-box">“${escapeHtml(flag.supporting_quote)}”</blockquote>
                <p class="small-label muted"><strong>Human check:</strong> ${escapeHtml(flag.human_check_prompt)} (${matchText})</p>
                <div class="risk-actions">
                  <label class="verify-check">
                    <input type="checkbox" data-verify-id="${escapeHtml(flag.id)}" />
                    <span>I verified this clause</span>
                  </label>
                  <button type="button" class="locate-btn" data-locate-quote="${escapeHtml(flag.supporting_quote)}">
                    Locate Quote in Policy
                  </button>
                </div>
              </article>`;
          })
          .join("")}</div>`
      : `<p class="muted">No risk flags returned for this input.</p>`;

  const questionsHtml =
    currentOutput.questions_to_consider.length > 0
      ? `<ul>${currentOutput.questions_to_consider.map((q) => `<li>${escapeHtml(q)}</li>`).join("")}</ul>`
      : `<p class="muted">None.</p>`;

  cardsView.innerHTML = `
    <section class="result-block">
      <h4>Plain-Language Summary</h4>
      <p>${escapeHtml(currentOutput.summary)}</p>
    </section>
    <section class="result-block">
      <h4>Key Obligations</h4>
      ${obligationsHtml}
    </section>
    <section class="result-block">
      <h4>Risk Flags &amp; Evidence</h4>
      ${risksHtml}
    </section>
    <section class="result-block">
      <h4>Questions to Consider</h4>
      ${questionsHtml}
    </section>
  `;

  cardsView.querySelectorAll("input[data-verify-id]").forEach((cb) => {
    cb.addEventListener("change", (e) => {
      const id = e.target.getAttribute("data-verify-id");
      if (e.target.checked) verifiedSet.add(id);
      else verifiedSet.delete(id);
      updateVerificationProgress();
    });
  });

  cardsView.querySelectorAll("button[data-locate-quote]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const quote = e.currentTarget.getAttribute("data-locate-quote");
      highlightQuoteInReader(quote);
    });
  });

  updateVerificationProgress();
}

function updateCharCount() {
  charCount.textContent = `${policyInput.value.length} characters`;
}

function loadSample(sampleKey) {
  currentSampleKey = sampleKey;
  const sample = SAMPLES[sampleKey];
  policyInput.value = sample.policy_text;
  readerView.textContent = sample.policy_text;
  switchInputTab("edit");
  updateCharCount();
  modeIndicator.textContent = `Showing pre-generated 3-step chain output for sample ${sampleKey} (${sample.title})`;

  document.querySelectorAll(".sample-pills .pill-btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.getAttribute("data-sample") === sampleKey);
  });

  renderOutput(sample.result, sample.policy_text);
}

// Event Listeners
document.querySelectorAll(".sample-pills .pill-btn").forEach((btn) => {
  btn.addEventListener("click", () => loadSample(btn.getAttribute("data-sample")));
});

document.querySelectorAll(".prompt-tabs .pill-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.getAttribute("data-prompt");
    document.querySelectorAll(".prompt-tabs .pill-btn").forEach((b) => {
      b.classList.toggle("is-active", b === btn);
    });
    promptPreview.textContent = PROMPT_DOCS[key];
  });
});

tabEdit.addEventListener("click", () => switchInputTab("edit"));
tabReader.addEventListener("click", () => switchInputTab("reader"));
tabCards.addEventListener("click", () => switchOutputTab("cards"));
tabJson.addEventListener("click", () => switchOutputTab("json"));

policyInput.addEventListener("input", () => {
  currentSampleKey = null;
  updateCharCount();
  readerView.textContent = policyInput.value;
});

document.getElementById("clear-btn").addEventListener("click", () => {
  currentSampleKey = null;
  policyInput.value = "";
  readerView.textContent = "";
  updateCharCount();
  switchInputTab("edit");
  modeIndicator.textContent = "Input cleared. Paste policy text or select a sample above.";
  renderOutput(
    {
      is_valid_policy: false,
      summary: "Paste a Terms of Service or Privacy Policy on the left and click 'Run Simplifier Preview'.",
      key_obligations: [],
      risk_flags: [],
      questions_to_consider: []
    },
    ""
  );
});

document.getElementById("analyze-btn").addEventListener("click", () => {
  const text = policyInput.value.trim();
  const matchedSampleKey = Object.keys(SAMPLES).find(
    (key) => SAMPLES[key].policy_text.trim() === text
  );

  if (matchedSampleKey) {
    loadSample(matchedSampleKey);
    return;
  }

  modeIndicator.textContent =
    "Client-side keyword preview (v0.1 placeholder mode — live 3-step LLM chaining planned for full release)";
  const heuristic = buildHeuristicPreview(text);
  renderOutput(heuristic, policyInput.value);
});

// Initialize default view
promptPreview.textContent = PROMPT_DOCS.p1;
loadSample("T01");
