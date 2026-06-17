# ADR-002: Higienização e Adequação do Repositório à Arquitetura Funcional

**Status:** Substituído pelo ADR-003 (Superseded by ADR-003)
**Data:** 2026-06-16

## Contexto
Atualmente, o diretório raiz do repositório mistura arquivos e pastas de infraestrutura/arquitetura funcional (como `src/`, `scripts/`, `static/`, `package.json`) com pastas de conteúdo e rotas do portfólio (como `about/`, `academic/`, `career/`, `certificate/`, `Projects/`). 
Com o crescimento do projeto e a adoção das diretrizes de governança (estabelecidas no ADR-001), essa mistura causa "poluição visual" na raiz do projeto, dificultando a distinção entre o que é o "motor" (arquitetura funcional) do site e o que é apenas conteúdo de páginas adicionais.

## Decisão
Faremos uma higienização estrutural no repositório com o objetivo de isolar a arquitetura funcional. A decisão envolve as seguintes ações:
1. **Criação da pasta `pages/` (ou `content/`)**: Todas as pastas que representam páginas adicionais (`about/`, `academic/`, `career/`, `certificate/`, `Projects/`) serão movidas para dentro deste novo diretório.
2. **Restrição da Raiz**: O diretório raiz será estritamente reservado para a configuração do projeto, documentação core e arquivos de entrada (`index.html`, `package.json`, `README.md`, `src/`, `docs/`, `scripts/`, `static/`).
3. **Limpeza de Arquivos Obsoletos**: Quaisquer recursos estáticos, estilos ou scripts que não estão sendo efetivamente utilizados pela aplicação deverão ser removidos durante esse processo.

## Consequências
- **Positivas:** A raiz do projeto ficará extremamente limpa e focada na arquitetura de software. Desenvolvedores e recrutadores entenderão imediatamente a estrutura funcional. A governança do repositório aumenta significativamente.
- **Negativas / Atenção:** Será necessário atualizar e revisar todos os links relativos (tags `<a>`, `<link href="..." />` e `<script src="...">`) dentro dos arquivos HTML que forem movidos, para garantir que os caminhos de assets e navegação continuem funcionando corretamente no GitHub Pages.
