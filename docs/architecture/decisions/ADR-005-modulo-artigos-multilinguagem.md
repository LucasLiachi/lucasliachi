# ADR-005: Implementação do Módulo de Artigos Multilinguagem

**Status:** Aceito
**Data:** 2026-06-17

## Contexto
Deseja-se introduzir um espaço dedicado à publicação de artigos autorais de Lucas Liachi no portfólio. Para manter a consistência com as demais seções e assegurar uma experiência integrada, o gerenciamento de artigos deve se assemelhar ao módulo de **Formação Acadêmica** (`academic profile`), utilizando arquivos markdown locais organizados por pastas e com suporte completo a três idiomas (Português, Inglês e Espanhol).

Para garantir a estabilidade do sistema, a implementação deste novo recurso deve ser isolada, não influenciando ou alterando o comportamento das funcionalidades já existentes (Carreira, Projetos, Formação Acadêmica e Certificados).

## Decisão
Criaremos um módulo de **Artigos** isolado e estruturado a partir da arquitetura modular do projeto. A decisão envolve as seguintes definições:

1. **Estrutura de Diretórios (`pages/articles/`):**
   Os arquivos físicos dos artigos serão estruturados sob um novo diretório na pasta `pages/`:
   ```text
   pages/
   └── articles/
       ├── EN.md                      # Índice de artigos em Inglês
       ├── PT.md                      # Índice de artigos em Português
       ├── ES.md                      # Índice de artigos em Espanhol
       ├── artigo-exemplo-governanca/ # Pasta de um artigo específico
       │   ├── EN.md                  # Artigo detalhado em Inglês
       │   ├── PT.md                  # Artigo detalhado em Português
       │   └── ES.md                  # Artigo detalhado em Espanhol
       └── outro-artigo-exemplo/
           ├── EN.md
           ├── PT.md
           └── ES.md
   ```

2. **Interface e Lógica de Renderização (`ArticleShowcase`):**
   * Criaremos a classe/componente `ArticleShowcase` dedicada a carregar o índice correspondente ao idioma ativo (ex: `pages/articles/PT.md`), realizando o parseamento de títulos e caminhos.
   * O componente renderizará uma grid de cards mínimos para cada artigo no contêiner dedicado `#articles-container`.
   * Ao clicar no link de leitura do card, o sistema buscará o arquivo de detalhe correspondente ao idioma ativo (ex: `pages/articles/artigo-exemplo-governanca/PT.md`) e o exibirá dinamicamente em uma janela modal de leitura.

3. **Garantia de Isolamento de Recursos:**
   * **Namespace exclusivo:** Todas as variáveis de classe, seletores do DOM, traduções (em `Translations`) e contêineres de renderização serão nomeados com o prefixo ou identificador `article` (ex: `article-link`, `article-card`), prevenindo colisão com elementos do currículo acadêmico ou projetos.
   * **Rotas restritas:** As rotas processadas de candidatos no parser de índices serão validadas estritamente sob o escopo `/pages/articles/` e `/articles/`.

## Consequências
- **Positivas:**
  - **Manutenibilidade simples:** Novos artigos podem ser publicados apenas adicionando pastas e arquivos markdown sem necessidade de alterar código JavaScript/React.
  - **Segurança de Regressão:** Por utilizar um namespace, rotas e componentes totalmente isolados, garante-se risco zero de impactar o comportamento do currículo acadêmico, carreira ou certificados.
  - **Coesão visual e UX:** Mantém o comportamento e a UI familiares de modais de leitura já utilizados no portfólio.
- **Negativas:**
  - Duplicação de parte da lógica estrutural de carregamento assíncrono (Showcase), que no futuro poderá ser refatorada para um componente genérico no Next.js (conforme ADR-003).
