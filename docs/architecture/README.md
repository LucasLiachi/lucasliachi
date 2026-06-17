# Arquitetura do Antigravity

Este documento define os padrões de desenvolvimento, convenções de pasta e princípios de design para o projeto Antigravity (Portfólio Pessoal do Lucas Liachi).

## 1. Princípios de Design
- **Simplicidade:** Priorizamos HTML/CSS nativos e JavaScript Vanilla sem dependências pesadas no front-end, alinhado ao uso do GitHub Pages.
- **Separation of Concerns:** 
  - Estrutura (HTML) separada de Estilo (CSS) e Lógica (JS).
  - Lógica de negócio isolada de manipulação do DOM.
  - Scripts de automação (Node.js) separados da lógica client-side.
- **Responsividade:** Mobile-first, garantindo acessibilidade e boa leitura em qualquer dispositivo.
- **Governança:** Manter registros de decisões arquiteturais (ADRs) para documentar o histórico e o porquê de cada escolha tecnológica.

## 2. Estrutura de Diretórios
```text
/
├── .github/           # Workflows e automações do GitHub Actions
├── docs/              # Documentações técnicas do projeto
│   └── architecture/  # ADRs, diagramas e este documento
├── scripts/           # Scripts utilitários e de automação (Node.js)
├── assets/            # Imagens, ícones e gráficos (assets visuais)
├── css/               # Estilos CSS modularizados
├── js/                # Lógica JavaScript (client-side)
├── static/            # Arquivos estáticos consumidos pela aplicação (ex: JSONs)
├── pages/             # Diretório centralizado de conteúdos
│   ├── about/         # Seções sobre a trajetória pessoal
│   ├── academic/      # Páginas sobre trajetória acadêmica
│   ├── career/        # Páginas detalhando o histórico de carreira
│   ├── certificate/   # Certificados e comprovações
│   └── Projects/      # Portfólio de projetos
├── index.html         # Página principal da aplicação
├── package.json       # Gerenciamento de scripts locais e dependências (Node)
└── README.md          # Documentação de apresentação e introdução
```

## 3. Padrões Técnicos

* **CSS:** Utilizar variáveis (`:root`) no CSS para cores e tipografia, garantindo consistência na identidade visual. Manter estilos modulares sempre que viável.
* **JavaScript:** Utilizar módulos ES6 (`import`/`export`) na pasta `js/` para manter o código organizado, testável e reutilizável.
* **GitHub Pages:** A estrutura é otimizada para ser servida de forma estática sem etapa complexa de build de front-end.
* **Dados Estáticos:** Dados como índices de projetos devem ficar na pasta `static/`, sendo muitas vezes populados por rotinas localizadas em `scripts/`.

## 4. Fluxo de Decisão e Evolução

1. **Decisões Arquiteturais:** Para mudar um componente central ou propor uma alteração profunda na estrutura, crie um arquivo na pasta `docs/architecture/decisions/` seguindo o template de ADR (Architecture Decision Record).
2. **Nova Feature:** Criar e atuar em branches dedicadas (ex: `feat/nome-da-feature`) para manter a `main` estável.
3. **Componentização:** Se um elemento se repete ou a lógica fica complexa, transforme-o em um módulo independente, isolando JS e CSS.
4. **Revisão:** Garantir que o código siga as convenções estabelecidas neste documento antes da integração final.
