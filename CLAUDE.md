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
├── index.html                  # Home — ponto de entrada, Busca global e Dashboard profissional
├── sitemap.xml                 # Sitemap para crawlers
├── robots.txt                  # Diretivas para crawlers
├── pages/
│   ├── about/                  # Sobre — perfil pessoal + formação acadêmica unificados
│   │   ├── index.html          # Página principal (cards de formação carregados via academico.json)
│   │   ├── EN.md / PT.md / ES.md  # Texto de apresentação pessoal traduzido
│   │   ├── 2014-01-TECPUC-Controle-Qualidade/   # Subpasta por formação acadêmica
│   │   ├── 2015-01-UFPR-TGQ/
│   │   ├── 2016-11-UFPR-Quality-Managment/
│   │   ├── 2018-01-UNIARA-MBA-CMMI/
│   │   ├── 2022-02-FIA-Business-School/
│   │   └── 2022-03-Universidade-Anhembi-Morumbi/
│   │       └── EN.md / PT.md / ES.md  # Detalhes de cada formação (+ arquivos de certificado)
│   ├── career/                 # Timeline profissional detalhada
│   │   ├── index.html          # Lista de posições (carregadas via carreira.json)
│   │   ├── viewer.html         # Visualizador de detalhes por posição
│   │   ├── index.json          # Índice local das posições (slug → path)
│   │   ├── EN.md / PT.md / ES.md  # Introdução da seção
│   │   └── YYYY-MM-slug/       # Subpasta por posição profissional
│   │       └── EN.md / PT.md / ES.md  # Descrição detalhada de cada cargo
│   ├── certificate/            # Biblioteca de certificações
│   ├── articles/               # Blog técnico
│   │   └── post.html           # Leitor de artigo individual
│   └── Projects/               # Catálogo de projetos (GitHub API + local)
├── assets/                     # Arquivos estáticos (ícones, foto de perfil)
│   ├── perfil.jpeg             # Foto de perfil (og:image)
│   └── linkedin.png / medium.png / github.png / favicon.ico
├── static/
│   └── projects-index.json     # Índice estático de projetos (fallback do GitHub API)
├── css/
│   ├── main.css                # Estilos globais + CSS variables + tema .dark
│   └── components.css          # Componentes reutilizáveis
├── js/
│   ├── main.js                 # Sistema de tradução (Translations) + i18n
│   ├── modules.js              # Módulos de funcionalidade
│   ├── utils.js                # Utilitários + DarkMode (localStorage key: 'theme')
│   └── fuse.min.js             # Fuse.js local (busca fuzzy)
├── data/                       # Banco de dados estático (JSON)
│   ├── academico.json          # Formações acadêmicas (fonte de verdade para pages/about/)
│   ├── carreira.json           # Experiências profissionais
│   ├── projetos.json           # Projetos locais (merge com GitHub API)
│   ├── certificados.json       # Certificados (49 entradas)
│   ├── artigos.json            # Índice do blog (5 artigos)
│   └── biblioteca.json         # Índice da biblioteca de conhecimento (7 materiais)
└── blog/
    └── posts/                  # Artigos em Markdown — um arquivo por idioma por post
        ├── slug.md             # Versão PT (padrão)
        ├── slug-EN.md          # Versão EN
        └── slug-ES.md          # Versão ES
```

**Convenções:**
- Novos dados → JSON em `data/`
- Novas páginas → pasta em `pages/` com `index.html`
- Conteúdo de blog → `.md` em `blog/posts/` com sufixo de idioma (`-EN.md`, `-ES.md`, `.md` para PT)
- Materiais da biblioteca → `.md` em `pages/library/content/`
- Detalhes de formação acadêmica → subpasta em `pages/about/YYYY-MM-slug/` com `EN.md`, `PT.md`, `ES.md`
- Detalhes de cargo profissional → subpasta em `pages/career/YYYY-MM-slug/` com `EN.md`, `PT.md`, `ES.md`
- Certificados e suplementos → na subpasta da formação em `pages/about/` (PDF, JPG, JPEG)
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

Estratégias de alterações do conteúdo e implementação de melhorias no site, contendo um roadmap com base no template abaixo, criando a cada proposta uma primeira especificação com os tópicos orientadores, respeitando as boas práticas e arquitetura do projeto.

#### TEMPLATE DE Fase X — 

**Objetivo:** 

**Parte 1**

**Parte 2**

**Parte ...**

**Critérios de aceitação:**

**Agentes:** 

#### Fase 1 — Substituição do link Medium pelo Hashnode na homepage

**Objetivo:** Remover o link e ícone do Medium da homepage e substituí-lo pelo link do Hashnode, mantendo consistência visual com os demais links sociais do hero.

**Parte 1 — Atualizar o HTML da homepage**
Em `index.html`, localizar o botão/link do Medium na seção hero (área de links sociais) e substituir:
- `href` apontando para o perfil Medium → `href` para o perfil Hashnode (`https://hashnode.com/@lucasliachi` ou URL equivalente confirmada com o usuário)
- Ícone `assets/medium.png` → ícone do Hashnode (baixar SVG oficial ou PNG do Hashnode em resolução adequada ≤ 500 KB e salvar em `assets/hashnode.png`)
- Texto/aria-label `"Medium"` → `"Hashnode"`

**Parte 2 — Atualizar o JSON de dados (se aplicável)**
Se `data/` contiver algum JSON com referência ao link ou ícone do Medium (ex.: lista de redes sociais), atualizar a entrada correspondente para Hashnode.

**Parte 3 — Remover o asset Medium**
Verificar se `assets/medium.png` é referenciado em outros lugares do projeto (outras páginas, CSS, JS). Se for exclusivo da homepage, remover o arquivo após a substituição para evitar assets órfãos.

**Critérios de aceitação:**
- Nenhuma referência ao Medium visível na homepage
- Link do Hashnode abre o perfil correto em nova aba (`target="_blank" rel="noopener noreferrer"`)
- Ícone do Hashnode exibido com o mesmo estilo visual dos demais ícones sociais
- `assets/medium.png` removido ou substituído sem quebrar outras páginas
- i18n do `aria-label` atualizado nos três idiomas (se a chave existir em `js/main.js`)

**Agentes:** `[page-builder]` para editar `index.html` e atualizar assets; `[data-manager]` se houver JSON com links sociais; `[architect]` para validação final

---

#### Fase 2 — Botão de contato por e-mail na homepage

**Objetivo:** Adicionar um botão de contato por e-mail na seção de links sociais do hero da homepage, com o mesmo padrão visual dos links do GitHub e LinkedIn, usando `mailto:` para abrir o cliente de e-mail padrão do usuário com campos pré-preenchidos.

**Parte 1 — Adicionar o link `mailto:` no hero**
Em `index.html`, na área de links sociais do hero, adicionar um novo elemento `<a>` com:
```html
<a href="mailto:lucasliachi@gmail.com?subject=Contato%20via%20portf%C3%B3lio&body=Olá%20Lucas%2C"
   class="social-link"
   aria-label="Enviar e-mail"
   data-i18n-aria-label="hero.emailAriaLabel">
  <img src="assets/email.png" alt="E-mail" width="24" height="24">
</a>
```
- Não usar `target="_blank"` — `mailto:` não abre nova aba, abre o cliente de e-mail nativo
- `subject` pré-preenchido com texto neutro em inglês (funciona independente do idioma do OS)
- `body` com saudação opcional; manter curto para não poluir o cliente de e-mail
- Posicionar o botão após LinkedIn ou ao final do grupo de links sociais

**Parte 2 — Criar o ícone de e-mail**
Adicionar o asset `assets/email.png` (ou `assets/email.svg`):
- Usar ícone de envelope simples, monocromático, consistente com o estilo dos demais ícones sociais
- Resolução mínima 48×48 px, máximo 500 KB
- Aplicar o mesmo tratamento CSS (filtro de cor, hover) que os outros ícones sociais

**Parte 3 — Registrar chaves i18n**
Em `js/main.js`, adicionar a chave `aria-label` para o botão de e-mail nos três idiomas:
```js
en: { hero: { emailAriaLabel: 'Send email' } },
pt: { hero: { emailAriaLabel: 'Enviar e-mail' } },
es: { hero: { emailAriaLabel: 'Enviar correo electrónico' } }
```
Verificar se `hero` já existe como namespace em `Translations` e apenas adicionar a chave, sem duplicar o bloco.

**Critérios de aceitação:**
- Botão de e-mail visível no hero com o mesmo estilo dos demais links sociais
- Clicar abre o cliente de e-mail nativo com `To`, `Subject` e `Body` pré-preenchidos
- `aria-label` traduzido nos três idiomas via `data-i18n-aria-label`
- Nenhum `target="_blank"` no link `mailto:` (comportamento correto)
- Ícone `assets/email.png` com ≤ 500 KB e estilo consistente

**Agentes:** `[page-builder]` para editar `index.html`, adicionar o asset e registrar as chaves i18n; `[architect]` para validação final

---

## Roadmap de Segurança

Fases dedicadas a hardening do site estático. Aplicáveis independentemente das fases de funcionalidade. **Todas as fases passam nas 6 perguntas da regra de ouro** — são exclusivamente HTML, meta tags, atributos, arquivos estáticos e JS client-side. Nenhuma fase exige servidor, build step, variável de ambiente ou configuração externa ao repositório.

### Compatibilidade com GitHub Pages

GitHub Pages serve arquivos estáticos sem suporte a cabeçalhos HTTP personalizados (não há `_headers`, `.htaccess` ou equivalente). Isso limita e condiciona como cada técnica de segurança é aplicada:

| Técnica | Funciona no GitHub Pages? | Mecanismo |
|---------|--------------------------|-----------|
| SRI (`integrity` em `<script>`) | Sim, totalmente | Atributo HTML — nenhum suporte de servidor necessário |
| CSP | Parcialmente — via `<meta http-equiv>` | Meta tag funciona para a maioria das diretivas; `frame-ancestors` é ignorado em meta |
| `X-Frame-Options` | Não como cabeçalho HTTP | Substituído por `frame-src 'none'` na CSP meta tag |
| `X-Content-Type-Options` | Não como cabeçalho HTTP | Sem alternativa em meta tag — apenas documentação de intenção |
| `Referrer-Policy` | Sim, via `<meta name="referrer">` | Meta tag suportada pelos browsers modernos |
| `security.txt` | Sim, totalmente | Arquivo estático servido normalmente pelo GitHub Pages |
| DOMPurify | Sim, totalmente | Biblioteca JS client-side |
| Auditoria de storage | Sim, totalmente | Revisão de código JS existente, sem impacto de deploy |

**Regra de validação antes de qualquer commit de segurança:** abrir TODAS as páginas alteradas no browser (Chrome + Firefox), verificar DevTools → Console (zero erros de CSP, SRI ou JS) e DevTools → Network (zero recursos bloqueados ou com erro 4xx). Só então commitar.

---

#### Fase S1 — Subresource Integrity (SRI) em todos os recursos CDN

**Objetivo:** Garantir que scripts carregados de CDNs externas sejam bloqueados pelo browser se o arquivo remoto for alterado, eliminando o vetor de ataque de supply chain via CDN comprometida. A proteção é 100% client-side via atributo HTML — não depende de nenhuma configuração do GitHub Pages.

**Como funciona:** o browser calcula o hash SHA-384 do arquivo baixado e compara com o valor no atributo `integrity`. Se diferirem, o script não executa. É transparente para o usuário quando os hashes estão corretos; quebra o recurso apenas se o CDN foi adulterado.

**Risco de quebra na publicação:** alto se o hash for gerado incorretamente. Um hash errado faz o browser bloquear o script, quebrando a funcionalidade da página silenciosamente. O hash deve ser gerado a partir do arquivo exato da versão pinada e validado localmente antes do commit.

**Parte 1 — Gerar hashes SRI**
Para cada recurso CDN em uso, gerar o hash SHA-384 usando `srihash.org` (cola a URL do CDN e obtém o atributo completo) ou via terminal:
```sh
curl -s https://cdn.jsdelivr.net/npm/chart.js@4.4.9/dist/chart.umd.min.js | openssl dgst -sha384 -binary | openssl base64 -A
```
Adicionar `integrity="sha384-<hash>"` e `crossorigin="anonymous"` nas seguintes páginas:
- `index.html` → Chart.js `@4.4.9`
- `pages/about/index.html` → Marked.js `@9.1.6`
- `pages/articles/index.html` → Marked.js `@9.1.6`
- `pages/articles/post.html` → Marked.js `@9.1.6`
- `pages/career/viewer.html` → Marked.js `@9.1.6`

**Parte 2 — Documentar hashes no CLAUDE.md**
Atualizar a tabela "Bibliotecas CDN em uso" adicionando coluna `Hash SRI` com os valores gerados. Ao atualizar qualquer versão no futuro, o hash deve ser regerado e o CLAUDE.md atualizado no mesmo commit.

**Validação obrigatória antes do commit:**
1. Abrir cada página alterada no browser
2. DevTools → Network → selecionar o script CDN → verificar que status é `200` (não bloqueado)
3. DevTools → Console → confirmar zero erros com texto "integrity" ou "SRI"
4. Se houver erro de SRI, o hash está errado — regenerar, não prosseguir

**Critérios de aceitação:**
- Toda tag `<script src="https://cdn...">` possui `integrity="sha384-..."` e `crossorigin="anonymous"`
- Hashes documentados na tabela de bibliotecas do CLAUDE.md
- Nenhuma página apresenta erro de SRI no console após o deploy
- Versões de biblioteca permanecem pinadas (nenhum `@latest` ou sem versão)

**Agentes:** `[page-builder]` para editar os HTMLs; `[architect]` para validação final

---

#### Fase S2 — Content Security Policy (CSP) via meta tag

**Objetivo:** Restringir quais origens podem executar scripts, carregar estilos e fazer requisições `fetch`, reduzindo a superfície de XSS e injeção de conteúdo. No GitHub Pages não é possível definir cabeçalhos HTTP personalizados, portanto a CSP é aplicada via `<meta http-equiv="Content-Security-Policy">` — mecanismo suportado pelos browsers modernos com algumas limitações conhecidas e documentadas abaixo.

**Limitações específicas do GitHub Pages que devem ser entendidas antes de implementar:**
- `frame-ancestors` **não funciona em meta CSP** (é ignorado pelos browsers) — a proteção contra clickjacking via `frame-src 'none'` protege recursos embutidos, mas não impede que outra página embuta este site em um `<iframe>`. Isso é uma limitação arquitetural do GitHub Pages, não um erro de implementação.
- `'unsafe-inline'` em `script-src` é necessário pelo script anti-FOUC inline presente em todas as páginas. Remover o `'unsafe-inline'` sem primeiro mover o anti-FOUC para um arquivo externo quebraria o tema escuro (FOUC visível no carregamento).
- A diretiva `connect-src` deve incluir **todos** os domínios chamados por `fetch()` no JS. Esquecer qualquer um quebra funcionalidade em produção.

**Parte 1 — Mapear todos os fetch() antes de escrever a política**
Antes de definir `connect-src`, executar `grep -r "fetch(" js/ pages/` para listar todos os domínios externos chamados:
- `api.github.com` — projetos (já identificado)
- Verificar se há outros (CDNs de dados, APIs de terceiros)

**Parte 2 — Definir e adicionar a política**
Adicionar em todas as páginas HTML, imediatamente após `<meta charset>` e antes do script anti-FOUC:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://api.github.com; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'none';">
```

**Parte 3 — Testar página por página no browser**
Para cada página HTML com a nova meta tag:
1. Abrir no browser (Chrome e Firefox)
2. DevTools → Console → filtrar por "Content Security Policy" — deve ser zero erros
3. Verificar que gráficos (Chart.js), Markdown renderizado, projetos do GitHub e imagens carregam normalmente
4. Se algum recurso for bloqueado, adicionar a origem faltante em `connect-src` ou `img-src` antes de commitar

**Critérios de aceitação:**
- Todas as páginas possuem a meta CSP
- Zero erros de CSP no console do browser em todas as páginas
- Funcionalidades existentes (Chart.js, Markdown, GitHub API, imagens) funcionam normalmente após o deploy
- `frame-src 'none'` e `object-src 'none'` presentes
- A limitação do `frame-ancestors` está documentada (nesta seção) — não é um critério de falha

**Agentes:** `[page-builder]` para inserir as meta tags; `[architect]` para revisão

---

#### Fase S3 — Sanitização de HTML dinâmico com DOMPurify

**Objetivo:** Eliminar o risco de XSS nas ocorrências de `innerHTML = marked.parse(...)` em `js/utils.js` e `js/modules.js`. Mesmo que os arquivos Markdown sejam conteúdo controlado via commits, um arquivo Markdown comprometido no repositório ou injeção via parâmetro de URL poderia inserir tags `<script>` que o Marked.js renderizaria sem filtragem. A proteção é 100% client-side via biblioteca JS — sem impacto na hospedagem ou no deploy.

**Como funciona:** DOMPurify recebe o HTML gerado pelo Marked.js e remove qualquer tag ou atributo que possa executar código (ex.: `<script>`, `onerror=`, `javascript:`). O resultado é HTML seguro para atribuição via `innerHTML`.

**Dependência com Fase S1:** DOMPurify deve ser carregado com atributo `integrity` (SRI). Se S1 não tiver sido implementada, gerar o hash de DOMPurify nesta fase e documentar na tabela de bibliotecas.

**Parte 1 — Adicionar DOMPurify via CDN com SRI**
Incluir em todas as páginas que carregam Marked.js, imediatamente após a tag do Marked.js:
```html
<script src="https://cdn.jsdelivr.net/npm/dompurify@3.1.6/dist/purify.min.js"
        integrity="sha384-<hash-gerado-em-S1-ou-nesta-fase>"
        crossorigin="anonymous"></script>
```

**Parte 2 — Criar wrapper centralizado em `js/utils.js`**
Adicionar a função e substituir todos os usos diretos de `marked.parse()` atribuídos a `innerHTML`:
```js
function safeHtml(markdownText) {
  const raw = window.marked ? window.marked.parse(markdownText) : markdownText;
  return window.DOMPurify ? DOMPurify.sanitize(raw) : raw;
}
```
Substituir todos os padrões `element.innerHTML = marked.parse(...)` e `element.innerHTML = window.marked.parse(...)` por `element.innerHTML = safeHtml(...)`.

**Parte 3 — Revisar innerHTML com dados não-Markdown**
Para atribuições de `innerHTML` que montam HTML a partir de dados de JSON próprio (template literals), verificar se campos de texto livre passam por `escapeHtml()`. Campos com HTML estrutural hardcoded (tags fixas no código) não precisam de sanitização.

**Validação obrigatória antes do commit:**
1. Abrir uma página que renderiza Markdown (ex.: `pages/career/viewer.html`, `pages/articles/post.html`)
2. Confirmar que o conteúdo renderiza corretamente (nenhuma quebra visual)
3. No console: `DOMPurify.version` deve retornar a versão (confirma que a lib carregou)
4. Executar `grep -r "innerHTML = marked\|innerHTML = window.marked" js/` — deve retornar zero resultados

**Critérios de aceitação:**
- DOMPurify carregado em todas as páginas que usam Marked.js, com SRI
- Zero ocorrências de `innerHTML = marked.parse(` ou `innerHTML = window.marked.parse(` no codebase
- `safeHtml()` em `js/utils.js` é o único ponto de entrada para renderização de Markdown
- Conteúdo Markdown existente renderiza visualmente idêntico ao estado anterior
- Fallback gracioso: se DOMPurify não carregar (ex.: CDN offline), a função retorna o HTML sem sanitização em vez de quebrar a página

**Agentes:** `[page-builder]` para editar JS e HTMLs; `[architect]` para validação

---

#### Fase S4 — security.txt e política de referrer

**Objetivo:** Criar canal formal de divulgação responsável de vulnerabilidades (`security.txt`) e aplicar política de referrer em todas as páginas. Ambas as ações são puramente arquivos estáticos e meta tags — sem impacto no deploy no GitHub Pages.

**O que NÃO será implementado nesta fase e por quê:**
- `X-Content-Type-Options: nosniff` e `X-Frame-Options: DENY` são **cabeçalhos HTTP** que o GitHub Pages não permite customizar. Meta tags `<meta http-equiv="X-Content-Type-Options">` e `<meta http-equiv="X-Frame-Options">` **não têm efeito funcional em nenhum browser** — são ignoradas. Não serão adicionadas para evitar falsa sensação de segurança. A proteção equivalente contra clickjacking já é coberta por `frame-src 'none'` na CSP (Fase S2).

**Parte 1 — Criar `.well-known/security.txt`**
Criar o arquivo na raiz do repositório em `.well-known/security.txt` (o GitHub Pages serve este caminho normalmente como arquivo estático):
```
Contact: mailto:lucasliachi@gmail.com
Expires: 2027-01-01T00:00:00.000Z
Preferred-Languages: pt, en, es
Canonical: https://lucasliachi.github.io/lucasliachi/.well-known/security.txt
Policy: https://lucasliachi.github.io/lucasliachi/.well-known/security.txt
```
O campo `Expires` deve ser atualizado anualmente via commit. Adicionar lembrete no CLAUDE.md para renovação.

**Parte 2 — Adicionar meta tag de política de referrer**
Adicionar em todas as páginas HTML, na seção `<head>`, após as metas de charset e viewport:
```html
<meta name="referrer" content="strict-origin-when-cross-origin">
```
Esta meta tag é suportada pelos browsers modernos (Chrome, Firefox, Safari, Edge) e instrui o browser a enviar apenas a origem (sem path) ao navegar para domínios externos — impede que URLs internas com parâmetros vazem via cabeçalho `Referer`.

**Parte 3 — Auditar robots.txt**
Verificar que `robots.txt` não lista caminhos sensíveis no `Disallow` (o que paradoxalmente expõe sua existência para crawlers maliciosos). O robots.txt deve conter apenas diretivas necessárias e a entrada `Sitemap:` apontando para `sitemap.xml`.

**Validação obrigatória antes do commit:**
1. Após o deploy, acessar `https://lucasliachi.github.io/lucasliachi/.well-known/security.txt` no browser — deve exibir o conteúdo do arquivo em texto puro (não 404)
2. Em qualquer página, inspecionar `<head>` → confirmar presença de `<meta name="referrer">`
3. Acessar `https://lucasliachi.github.io/lucasliachi/robots.txt` → confirmar conteúdo esperado

**Critérios de aceitação:**
- `/.well-known/security.txt` acessível na URL pública do GitHub Pages (retorna 200, não 404)
- Meta tag `referrer` presente em todas as páginas
- `robots.txt` revisado e sem exposição de paths internos
- Nenhuma meta tag de efeito nulo (`X-Frame-Options`, `X-Content-Type-Options`) adicionada

**Agentes:** `[page-builder]` para meta tags e robots.txt; `[architect]` para validação

---

#### Fase S5 — Auditoria de armazenamento client-side e exposição de dados

**Objetivo:** Garantir que `localStorage` e `sessionStorage` não armazenem dados sensíveis, que o cache da GitHub API tenha TTL rigoroso e que nenhum `console.log` em produção exponha informações desnecessárias. Esta fase é uma **auditoria e ajuste de código JS existente** — sem novas dependências, sem novos arquivos, sem impacto de deploy no GitHub Pages.

**Parte 1 — Inventariar uso de storage**
Executar `grep -rn "localStorage\|sessionStorage" js/ pages/` e mapear todas as chaves encontradas. Estado esperado e aceitável:
- `localStorage`: `'theme'` (preferência visual), `'language'` (preferência de idioma) — dados de UI, não sensíveis
- `sessionStorage`: `'github_repos_cache'` — cache de resposta da GitHub API pública

Qualquer chave não listada acima deve ser documentada e avaliada. Chaves que armazenem dados pessoais ou de sessão são uma violação da arquitetura e devem ser removidas.

**Parte 2 — Validar e reforçar TTL do cache GitHub**
Localizar o código que escreve em `'github_repos_cache'` e confirmar:
- O objeto armazenado contém `{ data: [...], timestamp: Date.now() }`
- Na leitura, o código verifica `Date.now() - cache.timestamp < 5 * 60 * 1000` (5 minutos)
- Adicionar guarda de tamanho: `if (JSON.stringify(data).length > 500_000) return;` antes de gravar (evita poluir o storage com resposta anormalmente grande)

**Parte 3 — Verificar exposição em console e URLs**
- Executar `grep -rn "console\.log" js/` e revisar cada ocorrência: remover ou converter para `console.debug` qualquer log que imprima dados de usuário, respostas de API completas ou parâmetros de URL
- Verificar que nenhuma URL interna usa query params com dados pessoais (ex.: `?email=`, `?nome=`)
- Confirmar que todas as chamadas `fetch("https://api.github.com/...")` usam endpoints públicos (sem `Authorization` header no código)

**Critérios de aceitação:**
- Inventário de todas as chaves de storage documentado abaixo neste CLAUDE.md (seção "Armazenamento Client-Side")
- Cache GitHub com TTL de 5 minutos e limite de 500 KB implementados
- Zero `console.log` com dados além de mensagens de debug de desenvolvimento
- Todos os fetches para `api.github.com` usam endpoints públicos sem token no código-fonte
- Nenhuma nova dependência adicionada — apenas ajustes no JS existente

**Agentes:** `[architect]` para auditoria e revisão de código; `[page-builder]` para correções no JS

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
