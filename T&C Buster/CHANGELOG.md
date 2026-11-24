# Changelog

All notable progress since **Milestone 1** is documented in this file.

## [0.1.0-alpha] - 2026-11-24
### Added
- Initial repository structure aligned with SCSE4041 Milestone 2 guidelines (`prompts/`, `code/`, `test-data/`, `docs/`, `README.md`, `CHANGELOG.md`).
- Deployed placeholder static web application (`index.html`, `assets/css/style.css`, `assets/js/app.js`) illustrating the full-release layout:
  - Policy input workspace with privacy warning and built-in sample policies.
  - Interactive plain-language summary, key obligations, risk flags, and JSON structured output preview.
  - Human Accuracy Check panel allowing users to verify risk flags against highlighted source quotes.
  - Built-in Prompt Chain Inspector displaying `P1`, `P2`, and `P3`.
- Added prompt iteration history (`prompts/v1/baseline_prompt.md`, `prompts/v2/structured_prompt.md`, `prompts/final/p1..p3`).
- Added `code/chain_runner_template.py` for API-backed prompt chaining without hardcoded secrets.
- Added Mermaid workflow and system architecture diagrams in `docs/architecture.md`.

## [0.0.1] - Milestone 1
### Added
- Defined Problem C18: *AI-Powered Terms and Conditions Simplifier*.
- Documented real-world background (Pew Research Center 2023 survey) and existing solution gaps (`tosdr.org`).
- Authored initial single-step baseline prompt (`v1`) and illustrative output.
