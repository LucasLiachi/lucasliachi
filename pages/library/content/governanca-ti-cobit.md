---
title: "Cheatsheet — Governança de TI e COBIT"
section: Governança
type: cheatsheet
level: intermediário
updated: 2026-06-23
tags: [governança de TI, COBIT, ISO 38500, frameworks, controles, riscos, conformidade]
---

# Cheatsheet — Governança de TI e COBIT

## O que é Governança de TI

**Governança de TI** é o conjunto de práticas, políticas, estruturas e processos que garantem o alinhamento entre TI e os objetivos do negócio, gerenciando riscos e entregando valor.

**Não confundir:**
- **Governança** = direcionar, monitorar, prestar contas (nível estratégico/conselho)
- **Gestão** = planejar, construir, executar, monitorar (nível operacional/gerência)

## Principais Frameworks

| Framework | Foco | Proprietário | Uso típico |
|---|---|---|---|
| **COBIT 2019** | Governança e gestão de TI | ISACA | Compliance, auditoria, governança corporativa |
| **ITIL 4** | Gerenciamento de serviços | Axelos | Operações de TI, service desk, SLA |
| **ISO/IEC 38500** | Governança corporativa de TI | ISO | Princípios para conselho/diretoria |
| **ISO/IEC 27001** | Segurança da informação | ISO | SGSI, proteção de ativos |
| **TOGAF** | Arquitetura empresarial | The Open Group | Planejamento estratégico de arquitetura |
| **PMBOK / Prince2** | Gestão de projetos | PMI / Axelos | Entrega de projetos |
| **DevOps / SAFe** | Entrega ágil | — | Velocidade, integração contínua |

## COBIT 2019 — Estrutura Central

### Objetivos de Governança (EDM)
```
EDM01 — Garantir o estabelecimento e manutenção do framework de governança
EDM02 — Garantir a entrega de benefícios
EDM03 — Garantir a otimização de riscos
EDM04 — Garantir a otimização de recursos
EDM05 — Garantir o engajamento das partes interessadas
```

### Objetivos de Gestão — 4 domínios

| Domínio | Sigla | Foco |
|---|---|---|
| Alinhar, Planejar e Organizar | APO | Estratégia, portfólio, arquitetura, RH, riscos |
| Construir, Adquirir e Implementar | BAI | Projetos, mudanças, ativos, qualidade |
| Entregar, Serviços e Suporte | DSS | Operações, incidentes, problemas, continuidade |
| Monitorar, Avaliar e Verificar | MEA | Performance, compliance, auditoria interna |

### Princípios do COBIT 2019 (6)

1. Fornecer valor às partes interessadas
2. Abordagem holística
3. Sistema de governança dinâmico
4. Separação da governança da gestão
5. Adequado às necessidades da empresa
6. Sistema de governança de ponta a ponta

## ISO/IEC 38500 — Seis Princípios

| Princípio | Descrição |
|---|---|
| **Responsabilidade** | Todos assumem responsabilidade por suas ações |
| **Estratégia** | Planos de negócio consideram capacidades e possibilidades de TI |
| **Aquisição** | Baseada em análise adequada, decisão clara e motivos transparentes |
| **Desempenho** | TI adequada para suportar a organização |
| **Conformidade** | TI em conformidade com leis e regulamentos |
| **Comportamento humano** | TI respeita as necessidades das pessoas |

## Modelo de Capacidade de Processos (COBIT)

| Nível | Descrição |
|---|---|
| 0 — Incompleto | Processo não implementado ou não atinge objetivo |
| 1 — Executado | Processo atinge seu objetivo |
| 2 — Gerenciado | Processo planejado, monitorado e ajustado |
| 3 — Estabelecido | Processo definido, padronizado e documentado |
| 4 — Previsível | Processo opera dentro de limites definidos |
| 5 — Otimizado | Processo continuamente aprimorado |

## Controles por Área de Risco

| Risco | Controles típicos |
|---|---|
| Acesso indevido | IAM, MFA, revisão periódica de acessos, PAM |
| Continuidade | BCP/DRP, backup, RTO/RPO definidos, testes regulares |
| Mudanças não autorizadas | CAB, change freeze, aprovação por riscos |
| Vazamento de dados | DLP, criptografia, classificação da informação |
| Conformidade | Mapeamento de controles, audit trail, logs imutáveis |
| Terceiros | Due diligence, SLA, cláusulas contratuais de segurança |

## KPIs comuns em Governança de TI

| Indicador | Fórmula / Definição |
|---|---|
| Disponibilidade | (Tempo disponível / Tempo total) × 100 |
| MTTR | Mean Time to Repair — tempo médio de recuperação |
| MTBF | Mean Time Between Failures — tempo médio entre falhas |
| Taxa de mudanças emergenciais | Mudanças emergenciais / Total de mudanças |
| SLA cumprido | Chamados resolvidos no prazo / Total × 100 |
| Cobertura de controles | Controles implementados / Controles requeridos |
| Maturidade de processos | Média do nível de capacidade dos processos auditados |

## RACI — Modelo de Responsabilidade

| Papel | Significado |
|---|---|
| **R** — Responsible | Quem executa a tarefa |
| **A** — Accountable | Quem aprova e responde pelo resultado (apenas 1 por tarefa) |
| **C** — Consulted | Quem fornece input (comunicação bidirecional) |
| **I** — Informed | Quem é mantido informado (comunicação unidirecional) |

## Alinhamento Negócio–TI — Pontos de verificação

- Existem metas de TI derivadas de metas corporativas?
- O portfólio de projetos está priorizado por valor ao negócio?
- Riscos de TI estão no registro corporativo de riscos?
- O board tem visibilidade sobre o desempenho de TI?
- Há processo formal de revisão pós-incidente (PIR)?
- Auditoria interna/externa cobre controles de TI?

## Termos-chave

| Termo | Definição |
|---|---|
| **Objetivo de controle** | Declaração do resultado desejado de um controle |
| **Controle** | Política, procedimento ou mecanismo que reduz risco |
| **Apetite de risco** | Nível de risco que a organização aceita perseguir |
| **Tolerância ao risco** | Variação aceitável em torno do apetite de risco |
| **Residual risk** | Risco remanescente após aplicação de controles |
| **Audit trail** | Registro cronológico de atividades para fins de auditoria |
| **Segregação de funções** | Divisão de tarefas críticas para evitar fraude ou erro |
