---
id: github-pages-portfolio
titulo: Como Criar um Portfólio Profissional com GitHub Pages
resumo: Guia passo a passo para publicar um portfólio técnico estático no GitHub Pages, com domínio customizado, estrutura de arquivos e boas práticas de conteúdo.
categorias: [Dados, Processos]
tags: [github pages, portfólio, html, css, javascript, github, carreira, site estático]
data: 2026-06-23
tempo_leitura: 8
---

# Como Criar um Portfólio Profissional com GitHub Pages

> Um guia direto ao ponto para colocar seu portfólio no ar gratuitamente, com controle total sobre o código e o conteúdo.

## O que você vai aprender

- Por que GitHub Pages é a melhor opção para portfólios técnicos
- Estrutura de arquivos recomendada
- Como configurar o repositório e publicar
- Boas práticas de conteúdo para recrutadores
- Domínio customizado e configuração de DNS

---

## Por que GitHub Pages?

Antes de chegar ao como, vale entender o porquê.

| Critério | GitHub Pages | WordPress | Plataformas de portfólio |
|---|---|---|---|
| Custo | Gratuito | Pago (hospedagem) | Freemium com limitações |
| Controle do código | Total | Limitado | Nenhum |
| Velocidade | Muito alta (CDN global) | Variável | Variável |
| Prova de habilidades | Sim — o repositório é o portfólio | Não | Não |
| Versionamento | Git nativo | Plugins | Não |
| Dependências | Nenhuma | PHP, MySQL, plugins | Runtime proprietário |

O GitHub Pages serve arquivos estáticos (HTML, CSS, JS, JSON, Markdown) diretamente de um repositório. Para profissionais de dados e TI, o próprio repositório funciona como evidência de habilidades técnicas.

---

## Estrutura de arquivos recomendada

```
meu-portfolio/
├── index.html              # Página inicial
├── pages/
│   ├── sobre/
│   │   └── index.html      # URL: /pages/sobre/
│   ├── carreira/
│   │   └── index.html
│   ├── projetos/
│   │   └── index.html
│   └── blog/
│       └── index.html
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   └── components.css
│   ├── js/
│   │   └── main.js
│   └── img/
│       └── foto-perfil.webp  # Manter abaixo de 500 KB
├── data/
│   ├── projetos.json
│   ├── carreira.json
│   └── certificados.json
└── blog/
    └── posts/
        └── meu-primeiro-artigo.md
```

Usar `index.html` dentro de subpastas permite URLs limpas (`/pages/sobre/` em vez de `/pages/sobre.html`), o que melhora SEO e aparência.

---

## Passo a passo: publicar no GitHub Pages

### 1. Criar o repositório

O nome do repositório determina a URL:

- `seuusuario.github.io` → URL será `https://seuusuario.github.io` (repositório raiz)
- `qualquer-nome` → URL será `https://seuusuario.github.io/qualquer-nome`

Para portfólio principal, use o repositório raiz.

```bash
# Clonar o repositório novo localmente
git clone https://github.com/seuusuario/seuusuario.github.io
cd seuusuario.github.io
```

### 2. Criar a estrutura inicial

```bash
# Criar a estrutura de diretórios
mkdir -p pages/sobre pages/carreira pages/projetos
mkdir -p assets/css assets/js assets/img
mkdir -p data blog/posts

# Criar o index.html inicial
touch index.html
```

### 3. index.html mínimo funcional

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Portfólio de [Seu Nome] — Analista de Dados e Especialista em TI">
  <title>[Seu Nome] | Portfólio</title>
  <link rel="stylesheet" href="assets/css/main.css">
</head>
<body>
  <header>
    <nav>
      <a href="/">Início</a>
      <a href="/pages/sobre/">Sobre</a>
      <a href="/pages/projetos/">Projetos</a>
      <a href="/pages/blog/">Blog</a>
    </nav>
  </header>

  <main>
    <section class="hero">
      <h1>[Seu Nome]</h1>
      <p>Analista de Dados | Python | Estatística | ITIL</p>
    </section>
  </main>

  <script src="assets/js/main.js"></script>
</body>
</html>
```

### 4. Ativar o GitHub Pages

No repositório do GitHub:

1. Acesse **Settings** > **Pages**
2. Em **Source**, selecione **Deploy from a branch**
3. Branch: `main` (ou `master`), pasta: `/ (root)`
4. Clique em **Save**

Em até 2 minutos, o site estará disponível em `https://seuusuario.github.io`.

### 5. Fazer o primeiro deploy

```bash
git add .
git commit -m "feat: estrutura inicial do portfólio"
git push origin main
```

Cada push para `main` aciona o rebuild automático. O pipeline leva menos de 1 minuto.

---

## Domínio customizado (opcional)

Se você tem um domínio próprio (ex: `lucasliachi.dev`):

### No GitHub Pages

1. Settings > Pages > Custom domain
2. Digite seu domínio e clique em Save
3. O GitHub cria automaticamente um arquivo `CNAME` no repositório

### No seu provedor de DNS

Adicione os seguintes registros A apontando para os IPs do GitHub Pages:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Ou um registro CNAME para subdomínio:

```
www  CNAME  seuusuario.github.io
```

A propagação DNS leva de alguns minutos a 48 horas.

---

## O que incluir no portfólio

### Seções essenciais para recrutadores

1. **Home:** nome, título profissional, tecnologias principais, links para LinkedIn e GitHub
2. **Sobre:** trajetória em 2-3 parágrafos, foco em impacto, não em lista de tarefas
3. **Projetos:** 3 a 5 projetos relevantes com descrição, tecnologias e links
4. **Carreira:** linha do tempo com empresas, cargos e principais entregas
5. **Certificações:** evidências concretas de capacitação
6. **Blog ou Artigos:** demonstra comunicação técnica e profundidade de conhecimento

### O que NÃO incluir

- Foto com baixa qualidade ou informal
- Projetos escolares genéricos sem diferencial
- "Em construção" em seções vazias (prefira não exibir a seção)
- Mais de 5 itens no menu de navegação (use submenus se necessário)
- Textos longos sem hierarquia visual

---

## Boas práticas técnicas

```bash
# Verificar tamanho de imagens antes de commitar
find assets/img -size +500k -name "*.png" -o -name "*.jpg"

# Converter imagens para WebP (melhor compressão)
# Em sistemas com ImageMagick instalado:
convert foto.png -quality 85 foto.webp
```

- Use `loading="lazy"` em imagens fora do viewport inicial
- Minifique CSS e JS para produção (ferramentas: cssnano, terser)
- Adicione `rel="noopener noreferrer"` em links externos
- Configure `robots.txt` e `sitemap.xml` para melhorar indexação no Google

---

## Conclusão

Um portfólio no GitHub Pages é ao mesmo tempo seu produto e sua vitrine — o repositório público demonstra organização de código, versionamento e cuidado com qualidade, enquanto o site mostra sua trajetória profissional. O custo é zero; o retorno potencial é alto.

Próximos passos: adicione um `sitemap.xml` na raiz, configure meta tags Open Graph para que o LinkedIn exiba preview ao compartilhar o link, e documente cada seção com commits semânticos para que o histórico do repositório reflita sua evolução.
