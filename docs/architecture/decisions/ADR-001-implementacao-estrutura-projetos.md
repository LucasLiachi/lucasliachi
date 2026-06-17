# ADR-001: Implementação de Estrutura de Projetos e Padrões Arquiteturais

**Status:** Aceito
**Data:** 2026-06-16

## Contexto
O projeto "Antigravity" atua como um repositório central de portfólio, gestão do conhecimento, publicações e projetos. Para manter a qualidade e prevenir a desorganização (evitando "código espaguete"), é necessário estabelecer diretrizes claras sobre a arquitetura de pastas e o gerenciamento das decisões técnicas, refletindo um alto nível de maturidade em governança e processos.

## Decisão
Estabeleceremos a pasta `docs/architecture` como a "fonte única de verdade" da arquitetura do repositório, incluindo este diretório de ADRs (`decisions/`). 
Adotaremos uma **Arquitetura de Componentes Modular** baseada na separação de responsabilidades:
- O frontend utilizará **JavaScript Vanilla, HTML e CSS** sem dependências de bibliotecas complexas, alinhado à hospedagem no GitHub Pages.
- O código CSS usará variáveis globais para temas e identidade visual.
- Os scripts de automação e dados estáticos ficarão separados (em `scripts/` e `static/` respectivamente), não misturados ao código web de visualização (`src/`).

## Consequências
- Aumenta a governança sobre o projeto e reflete expertise de gestão e boas práticas no portfólio.
- Facilita a manutenção, escalabilidade (como adições futuras de bibliotecas de estatística como Chart.js ou D3.js) e entendimento por qualquer desenvolvedor ou recrutador.
- Introduz uma leve "fricção" benéfica: mudanças significativas exigirão a criação de novos ADRs, garantindo reflexão estruturada antes do desenvolvimento.
