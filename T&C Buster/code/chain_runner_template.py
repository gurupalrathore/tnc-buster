"""
Prompt Chaining Runner Template (v0.1)
T&C Buster — AI-Powered Terms and Conditions Simplifier (Problem C18)

Demonstrates the 3-step prompt chain:
  P1: Extract verbatim clauses by category
  P2: Simplify into plain language & flag potential risks
  P3: Verify supporting quotes against source text & format final JSON

Usage:
  Set LLM_API_KEY in your local environment (never commit API keys to Git).
  This template includes a local offline check for exact quote matching.
"""

from __future__ import annotations

import json
import os
from dataclasses import dataclass
from typing import Any


@dataclass
class ChainResult:
    """Container for the final structured analysis and human verification metrics."""

    summary: str
    key_obligations: list[str]
    risk_flags: list[dict[str, Any]]
    questions_to_consider: list[str]
    exact_quote_ratio: float


def verify_quotes_against_source(policy_text: str, risk_flags: list[dict[str, Any]]) -> tuple[list[dict[str, Any]], float]:
    """
    Deterministic grounding check for human reading accuracy.
    Verifies whether each supporting_quote exists verbatim in policy_text.
    """
    normalized_source = " ".join(policy_text.split()).lower()
    verified_count = 0

    updated_flags: list[dict[str, Any]] = []
    for flag in risk_flags:
        quote = flag.get("supporting_quote", "")
        normalized_quote = " ".join(quote.split()).lower()
        if normalized_quote and normalized_quote in normalized_source:
            match_status = "exact"
            verified_count += 1
        elif normalized_quote and any(
            part in normalized_source for part in normalized_quote.split(",") if len(part.strip()) > 18
        ):
            match_status = "partial"
        else:
            match_status = "missing"

        updated_flags.append({**flag, "quote_match": match_status})

    ratio = verified_count / len(risk_flags) if risk_flags else 1.0
    return updated_flags, round(ratio, 2)


def run_placeholder_chain(policy_text: str) -> dict[str, Any]:
    """
    Offline placeholder demonstrating the expected structured output contract
    when no LLM API key is configured.
    """
    api_key = os.getenv("LLM_API_KEY")
    if api_key:
        raise NotImplementedError(
            "Connect your preferred SDK (google-genai or openai) here using os.getenv('LLM_API_KEY')."
        )

    if len(policy_text.strip()) < 40:
        return {
            "is_valid_policy": False,
            "summary": "Input text is too short to be a valid Terms of Service or Privacy Policy.",
            "key_obligations": [],
            "risk_flags": [],
            "questions_to_consider": ["Please paste the full section or policy text you want simplified."],
        }

    return {
        "is_valid_policy": True,
        "summary": "Placeholder mode active. Set LLM_API_KEY and connect an LLM client for live 3-step prompt chaining.",
        "key_obligations": ["Read highlighted excerpts directly using the human verification checklist."],
        "risk_flags": [],
        "questions_to_consider": ["Are there automatic renewal or third-party data-sharing clauses in the full text?"],
    }


if __name__ == "__main__":
    sample = "We automatically renew your annual subscription unless you cancel 7 days before the billing date."
    demo = run_placeholder_chain(sample)
    print(json.dumps(demo, indent=2))
