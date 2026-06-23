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

**URL base do GitHub Pages:** `https://lucasliachi.github.io/lucasliachi/`
(repositório `github.com/LucasLiachi/lucasliachi` — project page, não user page)

---

## Estrutura de Arquivos (estado atual)

```
lucasliachi/
├── index.html                  # Home — ponto de entrada
├── sitemap.xml                 # Sitemap para crawlers
├── robots.txt                  # Diretivas para crawlers
├── pages/
│   ├── about/                  # Sobre
│   ├── career/                 # Timeline profissional
│   ├── certificate/            # Biblioteca de certificações
│   ├── Projects/               # Catálogo de projetos (GitHub API + local)
│   ├── articles/               # Blog técnico
│   │   └── post.html           # Leitor de artigo individual
│   ├── academic/               # Histórico de formação acadêmica
│   ├── library/                # Biblioteca de conhecimento (materiais de estudo)
│   │   ├── viewer.html         # Leitor de material individual
│   │   └── content/            # Arquivos Markdown dos materiais
│   ├── dashboard/              # Dashboard profissional
│   └── search/                 # Busca global
├── assets/
│   ├── pdf/                    # PDFs de certificados e materiais
│   ├── perfil.jpeg             # Foto de perfil (og:image)
│   └── (ícones: linkedin.png, medium.png, github.png, favicon.ico)
├── css/
│   ├── main.css                # Estilos globais + CSS variables + tema .dark
│   └── components.css          # Componentes reutilizáveis
├── js/
│   ├── main.js                 # Sistema de tradução (Translations) + i18n
│   ├── modules.js              # Módulos de funcionalidade
│   ├── utils.js                # Utilitários + DarkMode (localStorage key: 'theme')
│   └── fuse.min.js             # Fuse.js local (busca fuzzy)
├── data/                       # Banco de dados estático (JSON)
│   ├── carreira.json           # Experiências profissionais
│   ├── projetos.json           # Projetos locais (merge com GitHub API)
│   ├── certificados.json       # Certificados (49 entradas)
│   ├── artigos.json            # Índice do blog (5 artigos)
│   └── biblioteca.json         # Índice da biblioteca de conhecimento (7 materiais)
└── blog/
    └── posts/                  # Artigos em Markdown (5 posts)
```

**Convenções:**
- Novos dados → JSON em `data/`
- Novas páginas → pasta em `pages/` com `index.html`
- Conteúdo de blog → `.md` em `blog/posts/`
- Materiais da biblioteca → `.md` em `pages/library/content/`
- Certificados em PDF → `assets/pdf/`
- Novos conteúdos são adicionados **via commits no GitHub**, nunca por upload ou formulário online

---

## Bibliotecas CDN em uso (versões fixadas)

| Biblioteca | Uso | CDN |
|---|---|---|
| Fuse.js | Busca fuzzy | local `js/fuse.min.js` |
| Marked.js 9.1.6 | Renderização Markdown | `cdn.jsdelivr.net/npm/marked@9.1.6/marked.min.js` |
| Chart.js 4.4.9 | Gráficos do dashboard | `cdn.jsdelivr.net/npm/chart.js@4.4.9/dist/chart.umd.min.js` |

Regra: sempre pinar versão no CDN. Nunca usar `latest` ou sem versão.

---

## Sistema de Temas (Dark Mode)

- Classe aplicada: `.dark` no `<html>` (seletor CSS: `.dark { ... }`)
- **Não usar** `[data-theme="dark"]` — o sistema inteiro usa `.dark`
- Persistência: `localStorage` com chave `'theme'`
- Detecção automática: `prefers-color-scheme: dark` via `window.matchMedia`
- Anti-FOUC: script inline logo após `<meta charset>` em TODAS as páginas:
  ```html
  <script>(function(){var t=localStorage.getItem('theme');if(t==='dark'||(t==null&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}());</script>
  ```
- Módulo: `DarkMode` em `js/utils.js` — não duplicar lógica

---

## Roadmap de Implementação

### ✅ Concluídas

#### Fase 1 — Reestruturação da Navegação ✓
Menu 9 seções, URLs amigáveis, breadcrumbs, layout responsivo.

#### Fase 2 — Timeline Profissional ✓
Linha do tempo vertical de `carreira.json`, alternância esquerda/direita.

#### Fase 3 — Biblioteca de Certificações ✓
49 certificados em grid, busca Fuse.js, filtros por categoria, botão PDF.

#### Fase 4 — Catálogo de Projetos ✓
GitHub API + merge com `projetos.json`, cache `sessionStorage`, filtros por categoria.

#### Fase 5 — Blog Técnico ✓
5 artigos em Markdown, Marked.js, filtros por categoria, Fuse.js, Schema.org Article dinâmico.

#### Fase 6 — Dashboard Profissional ✓
6 KPIs animados, doughnut (certificados/categoria), bar (top 8 tecnologias), Chart.js 4.4.9.

#### Fase 7 — Busca Global ✓
Fuse.js indexando todos os JSONs, resultados agrupados por tipo, highlight, URL `?q=`.

#### Fase 8 — Biblioteca de Conhecimento ✓
7 materiais em `pages/library/`, viewer com Marked.js, filtros tipo/nível, Schema.org LearningResource.

#### Fase 9 — SEO e Presença Profissional ✓
`sitemap.xml`, `robots.txt`, Open Graph + Twitter Card + Schema.org em todas as páginas.

#### Fase 10 — Modernização Visual ✓
Anti-FOUC, CSS tokens unificados, WCAG 2.5.5 touch targets, `prefers-reduced-motion`.

---

### 🔧 Em andamento

#### Fase 11 — Correções e Manutenção
**Objetivo:** corrigir bugs visuais e funcionais identificados na revisão do site ao vivo.
**Agente:** `page-builder` + `data-manager`

##### Bugs de alta prioridade

**Bug 1 — Footer fundo branco em tema escuro**
- **Problema:** o `<footer>` em todas as páginas mantém fundo branco quando `.dark` está ativo
- **Causa:** `css/main.css` não tem override `.dark footer { background: var(--background); color: var(--foreground); }`
- **Correção:** adicionar regra `.dark footer` em `css/main.css`
- **Páginas afetadas:** todas

**Bug 2 — Projetos trava em "Loading..." quando GitHub API falha**
- **Problema:** `pages/Projects/index.html` fica em skeleton infinito se a API falhar ou demorar
- **Causa:** o fallback para `data/projetos.json` não exibe os projetos locais quando a API retorna erro
- **Correção:** garantir que `projetos.json` seja exibido como fallback imediato; a API deve enriquecer os dados, não substituí-los
- **Critério:** a página deve mostrar projetos em até 3s mesmo sem internet

**Bug 3 — Dashboard: contadores ficam em zero quando GitHub API falha**
- **Problema:** indicadores "Total de Projetos" e "Repositórios Públicos" ficam vazios/skeleton
- **Causa:** os valores dependem exclusivamente da API; sem resposta, não há fallback
- **Correção:** calcular Total de Projetos só com `projetos.json` como base; "Repositórios Públicos" mostrar `--` quando API indisponível (não skeleton)

**Bug 4 — Busca Global inacessível pela navbar**
- **Problema:** nenhuma página tem link para `pages/search/` na navbar principal
- **Causa:** o item "Search/Busca" não foi adicionado ao menu global durante a Fase 7
- **Correção:** adicionar ícone de lupa (🔍) ou item "Busca" na navbar de todas as páginas, linkando para `../../pages/search/` (ou `pages/search/` da raiz)

##### Bugs de prioridade média

**Bug 5 — Tags da carreira sem espaços**
- **Problema:** tags como `ProcessosE2E`, `GestãoDeMudanças`, `TransformaçãoDigital` aparecem sem espaços
- **Causa:** campo `technologies` em `data/carreira.json` tem strings concatenadas sem espaço
- **Correção:** editar `carreira.json` para separar com espaços ou hífens (`Processos E2E`, `Gestão de Mudanças`)

**Bug 6 — Dashboard: seção "Dashboard" duplicada**
- **Problema:** aparece "Dashboard" como título H1 da página e novamente como título H2 da seção de KPIs
- **Causa:** o título da seção `<h2 data-i18n="...">Dashboard</h2>` repete o título da página
- **Correção:** renomear o H2 interno para "Indicadores" / "Indicators" via chave i18n

**Bug 7 — Certificates: category pills em branco em alguns cards**
- **Problema:** alguns cards mostram pills de categoria sem texto
- **Causa provável:** campo `categories` vazio ou `undefined` em entradas de `certificados.json`
- **Correção:** adicionar verificação `if (categories && categories.length)` antes de renderizar pills; ou auditar e completar as entradas sem categoria no JSON

##### Bugs de baixa prioridade

**Bug 8 — Copyright fixo em 2025**
- **Problema:** footer exibe "© 2025 Lucas Liachi" — ano desatualizado
- **Causa:** string hardcoded no HTML em vez de gerada por JS
- **Correção:** substituir por `<span id="footer-year"></span>` + `document.getElementById('footer-year').textContent = new Date().getFullYear()`

---

### 🆕 Próximas melhorias (pós-fase 11)

#### Fase 12 — Página de Contato
**Objetivo:** criar página de contato funcional sem backend.
- Formulário com link `mailto:` ou integração com Formspree (serviço externo permitido — não requer backend próprio)
- Links para LinkedIn, GitHub, Medium e email
- Mapa de localização via Google Maps embed (iframe)
- **Agente:** `page-builder`

#### Fase 13 — Internacionalização completa do conteúdo
**Objetivo:** traduzir os Markdowns do blog e da biblioteca para EN e ES.
- Para cada post em `blog/posts/`: criar versão `{slug}-en.md` e `{slug}-es.md`
- Para cada material em `pages/library/content/`: criar versão EN e ES
- O viewer deve detectar o idioma e carregar o arquivo correspondente
- **Agente:** `content-writer`

#### Fase 14 — PWA e Experiência Offline
**Objetivo:** permitir acesso offline ao portfólio.
- `manifest.json` com nome, ícones e cores do tema
- Service Worker para cache de páginas HTML e JSONs (Cache-First para estáticos, Network-First para GitHub API)
- Ícone de instalação no mobile
- Sem push notifications (sem servidor)
- **Agente:** `page-builder`

#### Fase 15 — Modo de impressão / PDF do currículo
**Objetivo:** permitir que recrutadores imprimam o currículo diretamente do site.
- `@media print` em `css/main.css` ocultando navbar, footer, filtros e botões
- Página `pages/career/` formatada para impressão A4
- Botão "Imprimir currículo" acionando `window.print()`
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
2. Adicionar script anti-FOUC logo após `<meta charset>` (ver seção "Sistema de Temas")
3. Todo texto visível usar `data-i18n="chave"` — nunca hardcodar strings em nenhum idioma
4. Inputs com placeholder usar `data-i18n-placeholder="chave"`
5. Registrar novas chaves em `js/main.js` nos três idiomas (`en`, `pt`, `es`)
6. Incluir botões de idioma na navbar:
   ```html
   <div class="language-selector">
     <button class="language-option" data-language="en">EN</button>
     <button class="language-option" data-language="pt">PT</button>
     <button class="language-option" data-language="es">ES</button>
   </div>
   ```
7. Incluir botão de tema na navbar (após os botões de idioma):
   ```html
   <button id="dark-mode-toggle" class="theme-toggle" aria-label="Toggle dark mode">
     <span class="sun-icon">☀</span>
     <span class="moon-icon">☾</span>
   </button>
   ```
8. Para conteúdo Markdown: criar `EN.md`, `PT.md`, `ES.md` na pasta da página; se não houver tradução, copiar `EN.md` com `<!-- TODO: translate -->` no topo
9. `<html lang="">` não fixar — é gerenciado dinamicamente por `applyLanguageToDocument()`

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
- Script anti-FOUC imediatamente após `<meta charset>`
- Schema.org em páginas de conteúdo
- Navegação consistente com breadcrumb em páginas internas
- Copyright dinâmico: `new Date().getFullYear()` — nunca hardcodar o ano

### CSS
- Mobile-first. Breakpoints: `sm 640px`, `md 768px`, `lg 1024px`, `xl 1280px`
- Variáveis CSS em `:root` para cores e fontes; overrides em `.dark { ... }`
- Seletor de tema escuro: `.dark` (não `[data-theme]`)
- Todos os tokens de cor devem existir em `:root` — nunca usar `--color-*` inexistente
- Sem `!important` desnecessário

### JavaScript
- ES6+ (`const`, `let`, arrow functions, `async/await`, `fetch`)
- Sem dependências NPM em runtime — apenas CDN (versão pinada) ou arquivos locais em `js/`
- Fetch de JSON: sempre tratar erro com `try/catch`
- GitHub API: respeitar rate limit, cachear em `sessionStorage` com chave `'github_repos_cache'` (TTL 5min)
- APIs externas: sempre ter fallback para dados locais quando a API falha
- Sem `innerHTML` com dados externos não sanitizados (usar `textContent` ou `escapeHtml()`)

### JSON (dados)
- Datas no formato `YYYY-MM-DD`
- IDs únicos, kebab-case (`"id": "cert-itil-2024"`)
- Arrays ordenados do mais recente para o mais antigo
- `null` explícito para campos opcionais ausentes
- Tags: strings com espaços naturais (`"Gestão de Mudanças"`, não `"GestãoDeMudanças"`)

---

## Limitações Funcionais por Seção

| Seção | Permitido | Proibido |
|-------|-----------|----------|
| Blog | Posts Markdown/HTML, categorias, busca local | Comentários, curtidas, usuários, publicação online |
| Certificações | Pesquisa, filtros, categorias, tags, visualização PDF | Upload de arquivos, cadastro online, gerenciamento dinâmico |
| Catálogo de Projetos | Nome, descrição, tecnologias, links, última atualização | Edição online, cadastro de projetos pelo browser |
| Busca Global | Busca em JSON, Markdown e conteúdo local (browser) | Busca em banco de dados, sistemas externos, conteúdo privado |
| Dashboard | Indicadores calculados de JSON e GitHub API | Indicadores em tempo real de sistemas corporativos |
| Biblioteca | Materiais Markdown, filtros, busca local | Upload de arquivos, edição online |

---

## Convenções de Commit

```
feat(fase-N): descrição curta
fix(componente): descrição curta
fix(bug-N): descrição do bug corrigido
content(blog): título do artigo
content(library): título do material
data(certificados): nome do certificado adicionado
i18n(chave): chave de tradução adicionada
chore: descrição de tarefa de manutenção
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
- Não usar CDN sem versão pinada (sempre `@x.y.z`)
- Não hardcodar o ano no copyright — sempre `new Date().getFullYear()`
- Não usar `--color-surface`, `--color-border`, `--color-primary` ou qualquer token fora do sistema definido em `css/main.css`
- Não mudar o seletor de tema de `.dark` para `[data-theme]` — o sistema inteiro depende de `.dark`
- Não omitir o script anti-FOUC em páginas novas
