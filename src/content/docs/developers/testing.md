---
title: Testing
description: How Lokus is tested — the AI-QA harness that drives the real app, plus unit tests.
---

Lokus has two layers of tests, and they are not equal: **the QA harness is the gate**. Unit tests check pure logic; the harness drives the real frontend against real temp vaults on disk and reports what actually breaks.

## The QA harness (`qa/`)

```bash
npm run qa              # everything: scripted journeys + AI user + monkey pass
npm run qa:journeys     # deterministic journeys only
npm run qa:ai           # AI user + monkey only
node qa/run.js --filter 10   # one journey
node qa/run.js --headed      # watch it drive the app
```

The harness starts the real Vite frontend with a disk-backed Tauri mock: every file operation hits a **real temp folder**, so persistence, autosave, and data-loss behavior are tested for real, not mocked away.

Each *journey* is a scripted user story with screenshots and expected-vs-actual assertions:

| Journey | What it proves |
|---|---|
| 00 | The client bundle imports no Node builtins (a past crash) |
| 01 | Typed text survives a crash/quit without manual save |
| 02–05 | Heading input rules, save-to-disk, slash menu, wiki links |
| 06 | Split panes keep unsaved content and undo history |
| 07–09 | Graph hotkey, window lifecycle, tab isolation |
| 10 | **Plugin system v3 end-to-end**: discovery → Ask Screen → activation → slash/palette/panel slots → worker RPC round-trip → marketplace handling |

Results land in `qa/reports/run-<timestamp>/` as a self-contained `report.html` with screenshots per step. Known-broken behavior is listed in `qa/baseline.json`; **any new failure exits non-zero**, so the harness is CI-wireable.

### Writing a journey

A journey is `{ id, title, expected, run(d, t) }` where `d` is the driver (`createVault`, `newNote`, `type`, `openSlashMenu`, `click`, `screenshot`, …) and `t.expect(cond, name, expected, actual, shot)` records a finding. Prefer journeys over unit tests for anything a user can touch.

## Unit tests (Vitest)

```bash
npx vitest run
```

~2,000 tests over pure logic: manifest validation, the plugin capability gate, RPC protocol, shortcut registry, markdown pipeline pieces, stores. They run in jsdom with the same Tauri mock philosophy.

## What we don't test with unit tests, on purpose

Tests that only exercise mocks against themselves give false confidence — the suite was once fully green while the app had eight real bugs. If a behavior matters, it gets a journey.

## Rust side

`cargo check` gates the backend in CI; release builds compile on all three platforms per tag.
