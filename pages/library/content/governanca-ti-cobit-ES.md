<!-- translated from PT -->
---
title: "Cheatsheet — Gobernanza de TI y COBIT"
section: Governança
type: cheatsheet
level: intermediário
updated: 2026-06-23
tags: [gobernanza de TI, COBIT, ISO 38500, frameworks, controles, riesgos, conformidad]
---

# Cheatsheet — Gobernanza de TI y COBIT

## Qué es la Gobernanza de TI

**La Gobernanza de TI** es el conjunto de prácticas, políticas, estructuras y procesos que garantizan la alineación entre TI y los objetivos del negocio, gestionando riesgos y entregando valor.

**No confundir:**
- **Gobernanza** = dirigir, monitorear, rendir cuentas (nivel estratégico/consejo)
- **Gestión** = planificar, construir, ejecutar, monitorear (nivel operacional/gerencia)

## Principales Frameworks

| Framework | Foco | Propietario | Uso típico |
|---|---|---|---|
| **COBIT 2019** | Gobernanza y gestión de TI | ISACA | Compliance, auditoría, gobernanza corporativa |
| **ITIL 4** | Gestión de servicios | Axelos | Operaciones de TI, service desk, SLA |
| **ISO/IEC 38500** | Gobernanza corporativa de TI | ISO | Principios para consejo/dirección |
| **ISO/IEC 27001** | Seguridad de la información | ISO | SGSI, protección de activos |
| **TOGAF** | Arquitectura empresarial | The Open Group | Planificación estratégica de arquitectura |
| **PMBOK / Prince2** | Gestión de proyectos | PMI / Axelos | Entrega de proyectos |
| **DevOps / SAFe** | Entrega ágil | — | Velocidad, integración continua |

## COBIT 2019 — Estructura Central

### Objetivos de Gobernanza (EDM)
```
EDM01 — Asegurar el establecimiento y mantenimiento del framework de gobernanza
EDM02 — Asegurar la entrega de beneficios
EDM03 — Asegurar la optimización de riesgos
EDM04 — Asegurar la optimización de recursos
EDM05 — Asegurar el involucramiento de las partes interesadas
```

### Objetivos de Gestión — 4 dominios

| Dominio | Sigla | Foco |
|---|---|---|
| Alinear, Planificar y Organizar | APO | Estrategia, portafolio, arquitectura, RRHH, riesgos |
| Construir, Adquirir e Implementar | BAI | Proyectos, cambios, activos, calidad |
| Entregar, Servicios y Soporte | DSS | Operaciones, incidentes, problemas, continuidad |
| Monitorear, Evaluar y Verificar | MEA | Rendimiento, compliance, auditoría interna |

### Principios de COBIT 2019 (6)

1. Proporcionar valor a las partes interesadas
2. Enfoque holístico
3. Sistema de gobernanza dinámico
4. Separación de gobernanza y gestión
5. Adecuado a las necesidades de la empresa
6. Sistema de gobernanza de extremo a extremo

## ISO/IEC 38500 — Seis Principios

| Principio | Descripción |
|---|---|
| **Responsabilidad** | Todos asumen responsabilidad por sus acciones |
| **Estrategia** | Los planes de negocio consideran las capacidades y posibilidades de TI |
| **Adquisición** | Basada en análisis adecuado, decisión clara y motivos transparentes |
| **Desempeño** | TI adecuada para soportar la organización |
| **Conformidad** | TI en conformidad con leyes y regulaciones |
| **Comportamiento humano** | TI respeta las necesidades de las personas |

## Modelo de Capacidad de Procesos (COBIT)

| Nivel | Descripción |
|---|---|
| 0 — Incompleto | Proceso no implementado o no alcanza el objetivo |
| 1 — Ejecutado | Proceso alcanza su objetivo |
| 2 — Gestionado | Proceso planificado, monitoreado y ajustado |
| 3 — Establecido | Proceso definido, estandarizado y documentado |
| 4 — Predecible | Proceso opera dentro de límites definidos |
| 5 — Optimizando | Proceso continuamente mejorado |

## Controles por Área de Riesgo

| Riesgo | Controles típicos |
|---|---|
| Acceso no autorizado | IAM, MFA, revisión periódica de accesos, PAM |
| Continuidad | BCP/DRP, backup, RTO/RPO definidos, pruebas regulares |
| Cambios no autorizados | CAB, change freeze, aprobación por riesgos |
| Fuga de datos | DLP, cifrado, clasificación de la información |
| Conformidad | Mapeo de controles, audit trail, logs inmutables |
| Terceros | Due diligence, SLA, cláusulas contractuales de seguridad |

## KPIs comunes en Gobernanza de TI

| Indicador | Fórmula / Definición |
|---|---|
| Disponibilidad | (Tiempo disponible / Tiempo total) × 100 |
| MTTR | Mean Time to Repair — tiempo promedio de recuperación |
| MTBF | Mean Time Between Failures — tiempo promedio entre fallas |
| Tasa de cambios de emergencia | Cambios de emergencia / Total de cambios |
| SLA cumplido | Tickets resueltos en plazo / Total × 100 |
| Cobertura de controles | Controles implementados / Controles requeridos |
| Madurez de procesos | Promedio del nivel de capacidad de los procesos auditados |

## RACI — Modelo de Responsabilidad

| Rol | Significado |
|---|---|
| **R** — Responsible | Quien ejecuta la tarea |
| **A** — Accountable | Quien aprueba y responde por el resultado (solo 1 por tarea) |
| **C** — Consulted | Quien provee input (comunicación bidireccional) |
| **I** — Informed | Quien es mantenido informado (comunicación unidireccional) |

## Alineación Negocio–TI — Puntos de verificación

- ¿Existen metas de TI derivadas de metas corporativas?
- ¿El portafolio de proyectos está priorizado por valor al negocio?
- ¿Los riesgos de TI están en el registro corporativo de riesgos?
- ¿El consejo tiene visibilidad sobre el desempeño de TI?
- ¿Hay proceso formal de revisión post-incidente (PIR)?
- ¿La auditoría interna/externa cubre los controles de TI?

## Términos clave

| Término | Definición |
|---|---|
| **Objetivo de control** | Declaración del resultado deseado de un control |
| **Control** | Política, procedimiento o mecanismo que reduce el riesgo |
| **Apetito de riesgo** | Nivel de riesgo que la organización acepta perseguir |
| **Tolerancia al riesgo** | Variación aceptable en torno al apetito de riesgo |
| **Riesgo residual** | Riesgo remanente tras la aplicación de controles |
| **Audit trail** | Registro cronológico de actividades para fines de auditoría |
| **Segregación de funciones** | División de tareas críticas para evitar fraude o error |
