<!-- translated from PT -->
---
id: github-pages-portfolio
titulo: How to Create a Professional Portfolio with GitHub Pages
resumo: A step-by-step guide to publishing a static technical portfolio on GitHub Pages, with custom domain, file structure, and content best practices.
categorias: [Dados, Processos]
tags: [github pages, portfolio, html, css, javascript, github, career, static site]
data: 2026-06-23
tempo_leitura: 8
---

# How to Create a Professional Portfolio with GitHub Pages

> A straight-to-the-point guide to launching your portfolio for free, with full control over code and content.

## What you will learn

- Why GitHub Pages is the best option for technical portfolios
- Recommended file structure
- How to configure the repository and publish
- Content best practices for recruiters
- Custom domain and DNS configuration

---

## Why GitHub Pages?

Before getting to the how, it's worth understanding the why.

| Criterion | GitHub Pages | WordPress | Portfolio platforms |
|---|---|---|---|
| Cost | Free | Paid (hosting) | Freemium with limitations |
| Code control | Full | Limited | None |
| Speed | Very high (global CDN) | Variable | Variable |
| Proof of skills | Yes — the repository is the portfolio | No | No |
| Versioning | Native Git | Plugins | No |
| Dependencies | None | PHP, MySQL, plugins | Proprietary runtime |

GitHub Pages serves static files (HTML, CSS, JS, JSON, Markdown) directly from a repository. For data and IT professionals, the repository itself serves as evidence of technical skills.

---

## Recommended file structure

```
my-portfolio/
├── index.html              # Home page
├── pages/
│   ├── about/
│   │   └── index.html      # URL: /pages/about/
│   ├── career/
│   │   └── index.html
│   ├── projects/
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
│       └── profile-photo.webp  # Keep below 500 KB
├── data/
│   ├── projects.json
│   ├── career.json
│   └── certificates.json
└── blog/
    └── posts/
        └── my-first-article.md
```

Using `index.html` inside subdirectories enables clean URLs (`/pages/about/` instead of `/pages/about.html`), improving SEO and appearance.

---

## Step by step: publish on GitHub Pages

### 1. Create the repository

The repository name determines the URL:

- `yourusername.github.io` → URL will be `https://yourusername.github.io` (root repository)
- `any-name` → URL will be `https://yourusername.github.io/any-name`

For a main portfolio, use the root repository.

```bash
# Clone the new repository locally
git clone https://github.com/yourusername/yourusername.github.io
cd yourusername.github.io
```

### 2. Create the initial structure

```bash
# Create the directory structure
mkdir -p pages/about pages/career pages/projects
mkdir -p assets/css assets/js assets/img
mkdir -p data blog/posts

# Create the initial index.html
touch index.html
```

### 3. Minimal functional index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Portfolio of [Your Name] — Data Analyst and IT Specialist">
  <title>[Your Name] | Portfolio</title>
  <link rel="stylesheet" href="assets/css/main.css">
</head>
<body>
  <header>
    <nav>
      <a href="/">Home</a>
      <a href="/pages/about/">About</a>
      <a href="/pages/projects/">Projects</a>
      <a href="/pages/blog/">Blog</a>
    </nav>
  </header>

  <main>
    <section class="hero">
      <h1>[Your Name]</h1>
      <p>Data Analyst | Python | Statistics | ITIL</p>
    </section>
  </main>

  <script src="assets/js/main.js"></script>
</body>
</html>
```

### 4. Enable GitHub Pages

In the GitHub repository:

1. Go to **Settings** > **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Branch: `main` (or `master`), folder: `/ (root)`
4. Click **Save**

Within 2 minutes, the site will be available at `https://yourusername.github.io`.

### 5. Make the first deploy

```bash
git add .
git commit -m "feat: initial portfolio structure"
git push origin main
```

Each push to `main` triggers an automatic rebuild. The pipeline takes less than 1 minute.

---

## Custom domain (optional)

If you have your own domain (e.g., `yourname.dev`):

### On GitHub Pages

1. Settings > Pages > Custom domain
2. Enter your domain and click Save
3. GitHub automatically creates a `CNAME` file in the repository

### At your DNS provider

Add the following A records pointing to GitHub Pages IPs:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Or a CNAME record for a subdomain:

```
www  CNAME  yourusername.github.io
```

DNS propagation takes from a few minutes to 48 hours.

---

## What to include in your portfolio

### Essential sections for recruiters

1. **Home:** name, professional title, main technologies, links to LinkedIn and GitHub
2. **About:** trajectory in 2-3 paragraphs, focus on impact, not task lists
3. **Projects:** 3 to 5 relevant projects with description, technologies, and links
4. **Career:** timeline with companies, roles, and main deliveries
5. **Certifications:** concrete evidence of qualification
6. **Blog or Articles:** demonstrates technical communication and depth of knowledge

### What NOT to include

- Low quality or informal photo
- Generic school projects without differentiators
- "Under construction" in empty sections (better to not display the section)
- More than 5 items in the navigation menu (use submenus if necessary)
- Long texts without visual hierarchy

---

## Technical best practices

```bash
# Check image sizes before committing
find assets/img -size +500k -name "*.png" -o -name "*.jpg"

# Convert images to WebP (better compression)
# On systems with ImageMagick installed:
convert photo.png -quality 85 photo.webp
```

- Use `loading="lazy"` on images outside the initial viewport
- Minify CSS and JS for production (tools: cssnano, terser)
- Add `rel="noopener noreferrer"` to external links
- Configure `robots.txt` and `sitemap.xml` to improve Google indexing

---

## Conclusion

A portfolio on GitHub Pages is both your product and your showcase — the public repository demonstrates code organization, versioning, and quality care, while the site shows your professional trajectory. The cost is zero; the potential return is high.

Next steps: add a `sitemap.xml` to the root, configure Open Graph meta tags so LinkedIn displays a preview when sharing the link, and document each section with semantic commits so the repository history reflects your evolution.
