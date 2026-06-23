<!-- translated from PT -->
---
id: introducao-itil
titulo: What is ITIL and Why It Still Matters in 2026
resumo: An objective introduction to the ITIL 4 framework, its core concepts, and how it integrates with modern Agile and DevOps environments.
categorias: [ITIL, Processos, Governança]
tags: [itil, itil4, it service management, itsm, devops, sla, it governance]
data: 2026-06-23
tempo_leitura: 8
---

# What is ITIL and Why It Still Matters in 2026

> An objective introduction to the world's most widely adopted IT service management framework — and how it coexists with Agile and DevOps.

## What you will learn

- What ITIL is and what problem it solves
- The evolution from ITIL 3 to ITIL 4
- The four core concepts of ITIL 4
- Most relevant practices for analysts and process specialists
- How ITIL integrates with Agile and DevOps in practice

---

## The problem ITIL solves

Imagine an organization where every IT team resolves incidents however they please, with no logging, no prioritization, no standardized communication. A server goes down on Friday night and no one knows who is responsible. A critical system receives an unplanned change that takes down three other services.

ITIL (Information Technology Infrastructure Library) was created to solve exactly that: **how to deliver IT services consistently, predictably, and aligned with the business**.

Developed in the 1980s by the British government, ITIL became the most globally adopted ITSM (IT Service Management) framework, with over 2 million certified professionals.

---

## ITIL 3 vs. ITIL 4: what changed

ITIL 3 (2007–2019) organized the service lifecycle into five phases (Strategy, Design, Transition, Operation, Continual Improvement) with well-defined and rigid processes.

**ITIL 4** (2019) represents a major shift:

| Aspect | ITIL 3 | ITIL 4 |
|---|---|---|
| Structure | 5-phase lifecycle | Service Value System (SVS) |
| Processes | 26 prescribed processes | 34 flexible practices |
| Integration | Little reference to Agile/DevOps | Agile, Lean and DevOps are native |
| Focus | Processes and roles | Value, collaboration and improvement |
| Operational model | Waterfall-oriented | Flexible and holistic |

---

## The four core concepts of ITIL 4

### 1. Service Value System (SVS)

The SVS describes how all components and activities of an organization work together to create value. It includes:

- **Service Value Chain (SVC):** six interconnected activities (Plan, Improve, Engage, Design & Transition, Obtain/Build, Deliver & Support)
- **Practices:** 34 management practices organized into three categories
- **Guiding Principles:** seven principles that guide decisions
- **Governance:** organizational oversight and direction
- **Continual Improvement:** at all levels

### 2. The Seven Guiding Principles

```
1. Focus on value
2. Start where you are
3. Progress iteratively with feedback
4. Collaborate and promote visibility
5. Think and work holistically
6. Keep it simple and practical
7. Optimize and automate
```

These principles are intentionally generic — applicable to both an infrastructure change and a digital transformation project.

### 3. The Four Dimensions

Every practice and every service must be analyzed across four dimensions to ensure no critical perspective is overlooked:

1. **Organizations and People** — structure, culture, roles and responsibilities
2. **Information and Technology** — data, tools, automation, AI
3. **Partners and Suppliers** — contracts, integrations, third parties
4. **Value Streams and Processes** — how work flows and creates value

### 4. The 34 Practices

Practices replace the "processes" of ITIL 3, with more implementation flexibility. The most relevant in practice:

| Practice | Purpose |
|---|---|
| Incident Management | Restore service as quickly as possible |
| Problem Management | Eliminate root causes to prevent future incidents |
| Change Management | Control changes to minimize risks |
| Configuration Management (CMDB) | Maintain an updated inventory of IT assets |
| Service Desk | Single point of contact between IT and users |
| Service Level Management (SLA) | Define and monitor service commitments |
| Continual Improvement | Identify and implement improvements systematically |

---

## ITIL and DevOps: complementary, not competing

A common misconception is believing that ITIL and DevOps are incompatible. ITIL 4 was explicitly designed to coexist with DevOps and Agile.

### How they complement each other

- **DevOps:** focuses on accelerating the software delivery cycle
- **ITIL:** ensures that what is delivered is managed and supported with quality

In practice, ITIL's Change Management can be adapted to approve automated deployments via CI/CD pipelines, without manual bureaucracy. The Service Desk integrates tickets with Kanban boards. Problem Management uses observability data to identify patterns.

```
DevOps Pipeline:
  Code → Build → Test → Deploy → Monitor

ITIL in the same line:
  Backlog → Standard change → Controlled deploy → Operation → Incident management
```

---

## Why data professionals should know ITIL

For data analysts and engineers, understanding ITIL brings concrete benefits:

- **Data SLAs:** define and monitor service level agreements for pipelines and reports
- **Model change management:** version control for ML models in production with traceability
- **Stakeholder communication:** speak the language of both business and IT simultaneously
- **Data governance:** ITIL provides structure for data quality and availability policies

---

## Conclusion

ITIL 4 is not a list of processes to follow blindly — it is a thinking system for creating, delivering, and improving IT services with a focus on value. In a market where Agile, DevOps, and governance must coexist, ITIL provides the vocabulary and structure to do so without unnecessary bureaucracy.

Next steps: explore the ITIL 4 Foundation certification (official Axelos/PeopleCert exam) as an entry point, then deepen your knowledge in the High Velocity IT (HVIT) service management practices for continuous delivery contexts.
