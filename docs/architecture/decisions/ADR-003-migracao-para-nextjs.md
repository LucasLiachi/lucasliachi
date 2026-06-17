# ADR-003: Migração do Portfólio para Next.js

**Status:** Aceito
**Data:** 2026-06-17

## Contexto
O portfólio pessoal cresceu em complexidade e volume de dados (seções sobre trajetórias, múltiplos idiomas, portfólio de projetos, formação acadêmica e dezenas de certificados). A arquitetura anterior (estabelecida no ADR-002 e baseada em HTML/CSS nativos e JavaScript Vanilla) começou a apresentar dificuldades de manutenção, tais como:
- Necessidade de lidar manualmente com rotas relativas complexas e resoluções de paths no client-side.
- Necessidade de adicionar cache-busters manuais para garantir que os navegadores atualizassem o código Javascript modificado.
- Falta de um sistema nativo de componentização reutilizável, o que exigia manipulação intensiva e propensa a erros do DOM.

Para modernizar o portfólio, melhorar o SEO dinâmico e simplificar a estrutura de dados, é necessária a migração para um framework web consolidado.

## Decisão
Migraremos a arquitetura do portfólio para **Next.js** (com suporte a TypeScript e App Router). As principais ações de design incluem:
1. **SSG (Static Site Generation):** As páginas e os índices em formato Markdown (sob a pasta `pages/` ou similar) serão convertidos de forma estática no momento de build, gerando páginas HTML pré-renderizadas e otimizadas.
2. **Componentização com React:** Elementos recorrentes (modais, seções de navegação, cards de certificados e barras de busca) serão convertidos em componentes React tipados, eliminando a dependência do script de manipulação manual `js/modules.js`.
3. **Eliminação de Rotas Manuais:** A estrutura de rotas do Next.js gerenciará de forma automática a navegação da aplicação.

## Consequências
- **Positivas:**
  - Desempenho superior de carregamento e melhor pontuação no Core Web Vitals (LCP, FCP).
  - Facilidade de desenvolvimento e componentização altamente reutilizável e legível.
  - Otimização automática de assets (imagens, fontes) e eliminação de cache-busters manuais.
  - Manutenção facilitada e extensibilidade robusta para novos recursos.
- **Negativas:**
  - Introduz a necessidade de build local e configuração de um pipeline de deploy (ex: GitHub Actions para static export).
  - Exige conhecimento prévio de React e TypeScript para futuras contribuições.
