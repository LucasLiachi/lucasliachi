<!-- translated from PT -->
---
title: "Cheatsheet — IT Governance and COBIT"
section: Governança
type: cheatsheet
level: intermediário
updated: 2026-06-23
tags: [IT governance, COBIT, ISO 38500, frameworks, controls, risks, compliance]
---

# Cheatsheet — IT Governance and COBIT

## What is IT Governance

**IT Governance** is the set of practices, policies, structures, and processes that ensure alignment between IT and business objectives, managing risks and delivering value.

**Do not confuse:**
- **Governance** = direct, monitor, be accountable (strategic/board level)
- **Management** = plan, build, run, monitor (operational/management level)

## Main Frameworks

| Framework | Focus | Owner | Typical use |
|---|---|---|---|
| **COBIT 2019** | IT governance and management | ISACA | Compliance, audit, corporate governance |
| **ITIL 4** | Service management | Axelos | IT operations, service desk, SLA |
| **ISO/IEC 38500** | Corporate IT governance | ISO | Principles for board/directors |
| **ISO/IEC 27001** | Information security | ISO | ISMS, asset protection |
| **TOGAF** | Enterprise architecture | The Open Group | Strategic architecture planning |
| **PMBOK / Prince2** | Project management | PMI / Axelos | Project delivery |
| **DevOps / SAFe** | Agile delivery | — | Speed, continuous integration |

## COBIT 2019 — Core Structure

### Governance Objectives (EDM)
```
EDM01 — Ensure governance framework setting and maintenance
EDM02 — Ensure benefits delivery
EDM03 — Ensure risk optimization
EDM04 — Ensure resource optimization
EDM05 — Ensure stakeholder engagement
```

### Management Objectives — 4 domains

| Domain | Acronym | Focus |
|---|---|---|
| Align, Plan and Organize | APO | Strategy, portfolio, architecture, HR, risks |
| Build, Acquire and Implement | BAI | Projects, changes, assets, quality |
| Deliver, Service and Support | DSS | Operations, incidents, problems, continuity |
| Monitor, Evaluate and Assess | MEA | Performance, compliance, internal audit |

### COBIT 2019 Principles (6)

1. Provide value to stakeholders
2. Holistic approach
3. Dynamic governance system
4. Governance distinct from management
5. Tailored to enterprise needs
6. End-to-end governance system

## ISO/IEC 38500 — Six Principles

| Principle | Description |
|---|---|
| **Responsibility** | Everyone takes responsibility for their actions |
| **Strategy** | Business plans account for IT capabilities and possibilities |
| **Acquisition** | Based on adequate analysis, clear decision and transparent reasons |
| **Performance** | IT fit to support the organization |
| **Conformance** | IT in compliance with laws and regulations |
| **Human behaviour** | IT respects the needs of people |

## Process Capability Model (COBIT)

| Level | Description |
|---|---|
| 0 — Incomplete | Process not implemented or does not achieve its objective |
| 1 — Performed | Process achieves its objective |
| 2 — Managed | Process planned, monitored and adjusted |
| 3 — Established | Process defined, standardized and documented |
| 4 — Predictable | Process operates within defined limits |
| 5 — Optimizing | Process continually improved |

## Controls by Risk Area

| Risk | Typical controls |
|---|---|
| Unauthorized access | IAM, MFA, periodic access review, PAM |
| Continuity | BCP/DRP, backup, defined RTO/RPO, regular testing |
| Unauthorized changes | CAB, change freeze, risk-based approval |
| Data leakage | DLP, encryption, information classification |
| Compliance | Control mapping, audit trail, immutable logs |
| Third parties | Due diligence, SLA, security contract clauses |

## Common KPIs in IT Governance

| Indicator | Formula / Definition |
|---|---|
| Availability | (Available time / Total time) × 100 |
| MTTR | Mean Time to Repair — average recovery time |
| MTBF | Mean Time Between Failures — average time between failures |
| Emergency change rate | Emergency changes / Total changes |
| SLA compliance | Tickets resolved on time / Total × 100 |
| Control coverage | Controls implemented / Controls required |
| Process maturity | Average capability level of audited processes |

## RACI — Responsibility Model

| Role | Meaning |
|---|---|
| **R** — Responsible | Who performs the task |
| **A** — Accountable | Who approves and is answerable for the outcome (only 1 per task) |
| **C** — Consulted | Who provides input (two-way communication) |
| **I** — Informed | Who is kept informed (one-way communication) |

## Business–IT Alignment — Checkpoints

- Are IT goals derived from corporate goals?
- Is the project portfolio prioritized by business value?
- Are IT risks on the corporate risk register?
- Does the board have visibility into IT performance?
- Is there a formal post-incident review (PIR) process?
- Does internal/external audit cover IT controls?

## Key Terms

| Term | Definition |
|---|---|
| **Control objective** | Statement of the desired outcome of a control |
| **Control** | Policy, procedure or mechanism that reduces risk |
| **Risk appetite** | Level of risk the organization accepts in pursuit of its goals |
| **Risk tolerance** | Acceptable variation around the risk appetite |
| **Residual risk** | Risk remaining after controls are applied |
| **Audit trail** | Chronological record of activities for audit purposes |
| **Segregation of duties** | Division of critical tasks to prevent fraud or error |
