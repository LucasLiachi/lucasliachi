# CLAUDE.md — Portfólio Lucas Liachi

## Objetivo do Projeto

Transformar o portfólio atual em uma plataforma profissional completa, centralizando currículo, experiência profissional, projetos, certificações, artigos técnicos, materiais de estudo e indicadores de carreira.

**Princípio fundamental:** o projeto é um **site estático avançado**. Todo conteúdo é entregue via HTML, CSS, JavaScript, JSON e Markdown, hospedado integralmente no GitHub Pages, sem servidores próprios.

**Regra de ouro:** antes de implementar qualquer funcionalidade, responder "sim" às 6 perguntas abaixo. Se qualquer resposta for "não", reavalie ou descarte.

1. Funciona apenas com HTML, CSS e JavaScript?
2. Pode ser armazenado em JSON ou Markdown?
3. Pode ser hospedado integralmente no GitHub Pages?
4. Não exige login?
5. Não exige banco de dados?
6. Não exige servidor?

---

## Arquitetura Obrigatória

| Camada | Permitido | Proibido |
|--------|-----------|----------|
| Frontend | HTML5, CSS3, JavaScript ES6+ | Node.js, Express, NestJS, Flask, Django, FastAPI, Laravel, Spring Boot |
| Dados | JSON, Markdown, PDF | MySQL, PostgreSQL, SQL Server, Oracle, MongoDB |
| Hospedagem | GitHub Pages | VPS, servidor Linux, hospedagem compartilhada, Node Server, PHP Server |
| Integrações | GitHub API, LinkedIn (links), Google Drive (share), YouTube, Spotify, Google Maps (links) | APIs que exijam backend próprio ou armazenem credenciais no browser |
| Autenticação | Nenhuma — site público | Login, cadastro, recuperação de senha, perfis de usuário |
| Administração | Edição via commits no GitHub | CMS próprio, painel administrativo, área de edição online |

**Limite de performance:** carregamento < 3 segundos. Imagens ≤ 500 KB. Sem vídeos autoplay. Sem frameworks excessivamente grandes ou bibliotecas desnecessárias.

---

## Estrutura de Arquivos

```
lucasliachi/
├── index.html                  # Home — ponto de entrada
├── pages/
│   ├── about/                  # Sobre (EN.md, PT.md, ES.md)
│   ├── career/                 # Timeline profissional (EN.md, PT.md, ES.md)
│   ├── certificate/            # Biblioteca de certificações (EN.md, PT.md, ES.md)
│   ├── Projects/               # Catálogo de projetos
│   ├── articles/               # Blog técnico (EN.md, PT.md, ES.md)
│   ├── academic/               # Biblioteca de conhecimento (EN.md, PT.md, ES.md)
│   ├── dashboard/              # Dashboard profissional (a criar)
│   └── search/                 # Busca global (a criar)
├── assets/
│   ├── pdf/                    # PDFs de certificados e materiais
│   └── (imagens, ícones)
├── css/
│   ├── main.css                # Estilos globais
│   └── components.css          # Componentes reutilizáveis
├── js/
│   ├── main.js                 # Lógica principal + sistema de tradução (Translations)
│   ├── modules.js              # Módulos de funcionalidade
│   └── utils.js                # Utilitários + tema claro/escuro
├── data/                       # Banco de dados estático (JSON)
│   ├── carreira.json
│   ├── projetos.json
│   ├── certificados.json
│   └── artigos.json
└── blog/
    └── posts/                  # Artigos em Markdown
```

**Convenções:** novos dados → JSON em `data/`. Novas páginas → pasta em `pages/` com `index.html`. Conteúdo de blog → `.md` em `blog/posts/`. Certificados em PDF → `assets/pdf/`. Novos certificados, artigos e projetos são adicionados **via commits no GitHub**, nunca por upload ou formulário online.

---

## Roadmap de Implementação

### Prioridade Alta

#### Fase 1 — Reestruturação da Navegação
**Objetivo:** melhorar a experiência do usuário e facilitar a navegação para recrutadores.
- Menu principal com as seções: Home, Sobre, Carreira, Projetos, Certificações, Blog, Biblioteca, Dashboard, Contato
- URLs amigáveis (subpastas com `index.html`, sem `.html` exposto)
- Breadcrumbs em todas as páginas internas
- Layout responsivo (mobile-first)
- **Agente:** `page-builder`

#### Fase 2 — Timeline Profissional
**Objetivo:** apresentar a trajetória profissional de forma visual.
- Linha do tempo vertical lida de `data/carreira.json`
- Alternância esquerda/direita em desktop, coluna única em mobile
- Cada entrada exibe: empresa, cargo, período, tecnologias (pills), principais entregas
- **Agente:** `page-builder`

#### Fase 3 — Biblioteca de Certificações
**Objetivo:** transformar a seção de certificados em uma biblioteca pesquisável.
- Grid de cards carregados de `data/certificados.json`
- Pesquisa por palavra-chave (Fuse.js nos campos título, emissor, tags)
- Filtros por categoria: Dados, Estatística, Python, Inteligência Artificial, Gestão, ITIL, Desenvolvimento, Cloud
- Ordenação por data (mais recente primeiro)
- Tags de conhecimento em cada card
- Botão "Ver PDF" abrindo `assets/pdf/arquivo.pdf` em nova aba
- **Agente:** `page-builder` + `data-manager`

#### Fase 4 — Catálogo Inteligente de Projetos
**Objetivo:** automatizar a exibição dos projetos do GitHub.
- Fetch para GitHub API (`https://api.github.com/users/lucasliachi/repos`) com cache em `sessionStorage`
- Merge com dados locais de `data/projetos.json` para projetos não no GitHub
- Exibição de: nome, descrição, tecnologias, última atualização, links para repositório e demo
- Filtros por categoria: Dados, Estatística, Python, Desenvolvimento Web, Inteligência Artificial, MVP/GOAT Basketball
- **Agente:** `page-builder` + `data-manager`

---

### Prioridade Média

#### Fase 5 — Blog Técnico
**Objetivo:** construir autoridade profissional através de conteúdo técnico.
- Índice lido de `data/artigos.json`; conteúdo dos posts em Markdown renderizado via Marked.js
- Categorias: Estatística, Python, Dados, Inteligência Artificial, Processos, Governança, ITIL
- Filtros por categoria e busca por título/tag
- Artigos iniciais a criar:
  - Guia de ANOVA
  - Testes de Hipóteses
  - Probabilidade Bayesiana
  - Introdução ao ITIL
  - GitHub Pages para Portfólio Profissional
- Sem comentários, curtidas, usuários ou publicação online — novos posts via commit
- **Agente:** `content-writer` + `page-builder`

#### Fase 6 — Dashboard Profissional
**Objetivo:** apresentar indicadores da carreira em tempo real calculados localmente.
- Indicadores calculados dos JSONs e GitHub API:
  - Total de projetos
  - Total de certificados
  - Total de artigos
  - Tecnologias dominadas
  - Anos de experiência
  - Repositórios públicos
- Visualizações: cards com contadores animados, gráficos Chart.js (bar ou doughnut)
- Sem indicadores de sistemas corporativos externos
- **Agente:** `page-builder` + `data-manager`

#### Fase 7 — Busca Global
**Objetivo:** permitir pesquisa unificada em todo o portal, 100% no browser.
- Fuse.js indexando todos os JSONs ao carregar a página de busca
- Busca em: projetos, certificados, experiências, artigos e materiais de estudo
- Resultados agrupados por tipo com highlight do termo buscado
- Sem busca em banco de dados, sistemas externos ou conteúdo privado
- **Agente:** `page-builder`

---

### Prioridade Baixa

#### Fase 8 — Biblioteca de Conhecimento
**Objetivo:** centralizar materiais de estudo e consulta.
- Seções: Estatística, Álgebra Linear, Probabilidade, Python, Inteligência Artificial, Processos, Governança
- Tipos de conteúdo: resumos, cheatsheets, fórmulas, PDFs, guias de estudo
- **Agente:** `content-writer`

#### Fase 9 — SEO e Presença Profissional
**Objetivo:** melhorar posicionamento no Google, Bing e LinkedIn.
- Sitemap XML (`sitemap.xml` na raiz)
- `robots.txt` na raiz
- Open Graph em todas as páginas (og:title, og:description, og:image, og:url)
- LinkedIn preview (og:locale, og:type)
- Schema.org Person (Home) e Article (posts do blog)
- Meta tags estruturadas (description, keywords, canonical, author)
- **Agente:** `seo-optimizer`

#### Fase 10 — Modernização Visual
**Objetivo:** atualizar a identidade visual do portal.
- Toggle tema claro/escuro (persistido em `localStorage`)
- Respeitar `prefers-color-scheme` como padrão inicial
- CSS variables em `:root` e `[data-theme="dark"]`
- Layout responsivo aprimorado
- Cards modernos e animações suaves
- Acessibilidade WCAG AA
- **Agente:** `page-builder`

---

## Fluxo de Desenvolvimento Agêntico

Para cada fase, seguir este fluxo em ordem:

```
1. [architect]      → Valida se a funcionalidade passa nas 6 perguntas da regra de ouro
2. [data-manager]   → Cria ou atualiza os JSONs necessários (se aplicável)
3. [page-builder]   → Gera ou atualiza HTML/CSS/JS da funcionalidade
4. [content-writer] → Produz conteúdo Markdown (se aplicável)
5. [seo-optimizer]  → Atualiza meta tags e structured data da página nova
6. [architect]      → Revisão final de conformidade antes do commit
```

Não pular a validação do `architect` no início e no fim de cada fase.

---

## Sistema de Internacionalização (i18n)

O portal suporta **três idiomas**: `en` (inglês, padrão), `pt` (português), `es` (espanhol). Sistema 100% client-side, sem biblioteca externa.

### Mecanismos

| Mecanismo | Localização | Descrição |
|-----------|-------------|-----------|
| `window.currentLanguage` | `js/main.js` | Estado global do idioma ativo |
| `localStorage('language')` | browser | Persiste a preferência do usuário |
| `Translations.get('chave')` | `js/main.js` | Retorna string traduzida para o idioma ativo |
| `data-i18n="chave"` | HTML | Marca elementos cujo `innerHTML` será substituído |
| `data-i18n-placeholder="chave"` | HTML | Marca `placeholder`, `aria-label` e `title` de inputs |
| `applyLanguageToDocument(lang)` | `js/main.js` | Aplica todas as traduções ao DOM |
| `changeLanguage(lang)` | `js/main.js` | Muda idioma, persiste e reaplica ao DOM |

### Regras obrigatórias para toda nova página

1. Carregar `main.js` e `utils.js` como últimos scripts do `<body>`
2. Todo texto visível usar `data-i18n="chave"` — nunca hardcodar strings em nenhum idioma
3. Inputs com placeholder usar `data-i18n-placeholder="chave"`
4. Registrar novas chaves em `js/main.js` nos três idiomas (`en`, `pt`, `es`)
5. Incluir botões de idioma na navbar:
   ```html
   <div class="language-selector">
     <button class="language-option" data-language="en">EN</button>
     <button class="language-option" data-language="pt">PT</button>
     <button class="language-option" data-language="es">ES</button>
   </div>
   ```
6. Para conteúdo Markdown: criar `EN.md`, `PT.md`, `ES.md` na pasta da página; se não houver tradução, copiar `EN.md` com `<!-- TODO: translate -->` no topo
7. `<html lang="">` não fixar — é gerenciado dinamicamente por `applyLanguageToDocument()`

### Padrão de fetch localizado

```js
const lang = (window.currentLanguage || localStorage.getItem('language') || 'en').toUpperCase();
const candidates = [`pages/secao/${lang}.md`, 'pages/secao/EN.md'];
```

### Adicionar chaves ao objeto Translations (`js/main.js`)

```js
// Adicionar nos três blocos do objeto:
en: { nomePagina: { title: 'Title', noResults: 'No results' } },
pt: { nomePagina: { title: 'Título', noResults: 'Sem resultados' } },
es: { nomePagina: { title: 'Título', noResults: 'Sin resultados' } }
```

---

## Padrões de Código

### HTML
- `lang` do `<html>` gerenciado dinamicamente pelo sistema i18n
- Meta charset, viewport e description em todas as páginas
- Schema.org em páginas de conteúdo
- Navegação consistente com breadcrumb em páginas internas

### CSS
- Mobile-first. Breakpoints: `sm 640px`, `md 768px`, `lg 1024px`, `xl 1280px`
- Variáveis CSS em `:root` para cores e fontes
- Sem `!important` desnecessário

### JavaScript
- ES6+ (`const`, `let`, arrow functions, `async/await`, `fetch`)
- Sem dependências NPM em runtime — apenas CDN ou arquivos locais em `js/`
- Fetch de JSON: sempre tratar erro com `try/catch`
- GitHub API: respeitar rate limit, cachear resposta em `sessionStorage`
- Sem `innerHTML` com dados externos não sanitizados

### JSON (dados)
- Datas no formato `YYYY-MM-DD`
- IDs únicos, kebab-case (`"id": "cert-itil-2024"`)
- Arrays ordenados do mais recente para o mais antigo
- `null` explícito para campos opcionais ausentes

---

## Limitações Funcionais por Seção

| Seção | Permitido | Proibido |
|-------|-----------|----------|
| Blog | Posts Markdown/HTML, categorias, busca local | Comentários, curtidas, usuários, publicação online |
| Certificações | Pesquisa, filtros, categorias, tags, visualização PDF | Upload de arquivos, cadastro online, gerenciamento dinâmico |
| Catálogo de Projetos | Nome, descrição, tecnologias, links, última atualização | Edição online, cadastro de projetos pelo browser |
| Busca Global | Busca em JSON, Markdown e conteúdo local (browser) | Busca em banco de dados, sistemas externos, conteúdo privado |
| Dashboard | Indicadores calculados de JSON e GitHub API | Indicadores em tempo real de sistemas corporativos |

---

## Convenções de Commit

```
feat(fase-N): descrição curta
fix(componente): descrição curta
content(blog): título do artigo
data(certificados): nome do certificado adicionado
i18n(chave): chave de tradução adicionada
```

---

## O que NÃO fazer

- Não criar rotas server-side ou APIs próprias
- Não introduzir dependências de runtime no `package.json`
- Não armazenar credenciais ou tokens no código
- Não implementar autenticação de nenhum tipo
- Não usar `localStorage` para dados sensíveis
- Não carregar imagens acima de 500 KB
- Não carregar vídeos automaticamente (autoplay)
- Não adicionar frameworks que tornem o build obrigatório (Next.js, Vite em produção, etc.)
- Não incluir bibliotecas desnecessárias que prejudiquem performance
