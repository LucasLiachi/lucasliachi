<!-- translated from PT -->
---
id: github-pages-portfolio
titulo: Cómo Crear un Portafolio Profesional con GitHub Pages
resumo: Guía paso a paso para publicar un portafolio técnico estático en GitHub Pages, con dominio personalizado, estructura de archivos y buenas prácticas de contenido.
categorias: [Dados, Processos]
tags: [github pages, portafolio, html, css, javascript, github, carrera, sitio estático]
data: 2026-06-23
tempo_leitura: 8
---

# Cómo Crear un Portafolio Profesional con GitHub Pages

> Una guía directa al punto para poner tu portafolio en línea de forma gratuita, con control total sobre el código y el contenido.

## Lo que aprenderás

- Por qué GitHub Pages es la mejor opción para portafolios técnicos
- Estructura de archivos recomendada
- Cómo configurar el repositorio y publicar
- Buenas prácticas de contenido para reclutadores
- Dominio personalizado y configuración de DNS

---

## ¿Por qué GitHub Pages?

Antes de llegar al cómo, vale entender el porqué.

| Criterio | GitHub Pages | WordPress | Plataformas de portafolio |
|---|---|---|---|
| Costo | Gratuito | De pago (hosting) | Freemium con limitaciones |
| Control del código | Total | Limitado | Ninguno |
| Velocidad | Muy alta (CDN global) | Variable | Variable |
| Prueba de habilidades | Sí — el repositorio es el portafolio | No | No |
| Versionamiento | Git nativo | Plugins | No |
| Dependencias | Ninguna | PHP, MySQL, plugins | Runtime propietario |

GitHub Pages sirve archivos estáticos (HTML, CSS, JS, JSON, Markdown) directamente desde un repositorio. Para profesionales de datos y TI, el propio repositorio funciona como evidencia de habilidades técnicas.

---

## Estructura de archivos recomendada

```
mi-portafolio/
├── index.html              # Página inicial
├── pages/
│   ├── sobre/
│   │   └── index.html      # URL: /pages/sobre/
│   ├── carrera/
│   │   └── index.html
│   ├── proyectos/
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
│       └── foto-perfil.webp  # Mantener por debajo de 500 KB
├── data/
│   ├── proyectos.json
│   ├── carrera.json
│   └── certificados.json
└── blog/
    └── posts/
        └── mi-primer-articulo.md
```

Usar `index.html` dentro de subcarpetas permite URLs limpias (`/pages/sobre/` en vez de `/pages/sobre.html`), lo que mejora el SEO y la apariencia.

---

## Paso a paso: publicar en GitHub Pages

### 1. Crear el repositorio

El nombre del repositorio determina la URL:

- `tuusuario.github.io` → URL será `https://tuusuario.github.io` (repositorio raíz)
- `cualquier-nombre` → URL será `https://tuusuario.github.io/cualquier-nombre`

Para portafolio principal, usa el repositorio raíz.

```bash
# Clonar el repositorio nuevo localmente
git clone https://github.com/tuusuario/tuusuario.github.io
cd tuusuario.github.io
```

### 2. Crear la estructura inicial

```bash
# Crear la estructura de directorios
mkdir -p pages/sobre pages/carrera pages/proyectos
mkdir -p assets/css assets/js assets/img
mkdir -p data blog/posts

# Crear el index.html inicial
touch index.html
```

### 3. index.html mínimo funcional

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Portafolio de [Tu Nombre] — Analista de Datos y Especialista en TI">
  <title>[Tu Nombre] | Portafolio</title>
  <link rel="stylesheet" href="assets/css/main.css">
</head>
<body>
  <header>
    <nav>
      <a href="/">Inicio</a>
      <a href="/pages/sobre/">Sobre mí</a>
      <a href="/pages/proyectos/">Proyectos</a>
      <a href="/pages/blog/">Blog</a>
    </nav>
  </header>

  <main>
    <section class="hero">
      <h1>[Tu Nombre]</h1>
      <p>Analista de Datos | Python | Estadística | ITIL</p>
    </section>
  </main>

  <script src="assets/js/main.js"></script>
</body>
</html>
```

### 4. Activar GitHub Pages

En el repositorio de GitHub:

1. Ve a **Settings** > **Pages**
2. En **Source**, selecciona **Deploy from a branch**
3. Branch: `main` (o `master`), carpeta: `/ (root)`
4. Haz clic en **Save**

En hasta 2 minutos, el sitio estará disponible en `https://tuusuario.github.io`.

### 5. Hacer el primer deploy

```bash
git add .
git commit -m "feat: estructura inicial del portafolio"
git push origin main
```

Cada push a `main` activa el rebuild automático. El pipeline tarda menos de 1 minuto.

---

## Dominio personalizado (opcional)

Si tienes un dominio propio (ej: `tunombre.dev`):

### En GitHub Pages

1. Settings > Pages > Custom domain
2. Escribe tu dominio y haz clic en Save
3. GitHub crea automáticamente un archivo `CNAME` en el repositorio

### En tu proveedor de DNS

Agrega los siguientes registros A apuntando a las IPs de GitHub Pages:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

O un registro CNAME para subdominio:

```
www  CNAME  tuusuario.github.io
```

La propagación DNS tarda de algunos minutos a 48 horas.

---

## Qué incluir en el portafolio

### Secciones esenciales para reclutadores

1. **Home:** nombre, título profesional, tecnologías principales, enlaces a LinkedIn y GitHub
2. **Sobre mí:** trayectoria en 2-3 párrafos, enfocado en impacto, no en lista de tareas
3. **Proyectos:** 3 a 5 proyectos relevantes con descripción, tecnologías y enlaces
4. **Carrera:** línea de tiempo con empresas, cargos y principales entregas
5. **Certificaciones:** evidencias concretas de capacitación
6. **Blog o Artículos:** demuestra comunicación técnica y profundidad de conocimiento

### Lo que NO incluir

- Foto de baja calidad o informal
- Proyectos escolares genéricos sin diferencial
- "En construcción" en secciones vacías (mejor no mostrar la sección)
- Más de 5 ítems en el menú de navegación (usa submenús si es necesario)
- Textos largos sin jerarquía visual

---

## Buenas prácticas técnicas

```bash
# Verificar tamaño de imágenes antes de commitear
find assets/img -size +500k -name "*.png" -o -name "*.jpg"

# Convertir imágenes a WebP (mejor compresión)
# En sistemas con ImageMagick instalado:
convert foto.png -quality 85 foto.webp
```

- Usa `loading="lazy"` en imágenes fuera del viewport inicial
- Minifica CSS y JS para producción (herramientas: cssnano, terser)
- Agrega `rel="noopener noreferrer"` en enlaces externos
- Configura `robots.txt` y `sitemap.xml` para mejorar la indexación en Google

---

## Conclusión

Un portafolio en GitHub Pages es al mismo tiempo tu producto y tu vitrina — el repositorio público demuestra organización de código, versionamiento y cuidado con la calidad, mientras el sitio muestra tu trayectoria profesional. El costo es cero; el retorno potencial es alto.

Próximos pasos: agrega un `sitemap.xml` en la raíz, configura meta tags Open Graph para que LinkedIn muestre vista previa al compartir el enlace, y documenta cada sección con commits semánticos para que el historial del repositorio refleje tu evolución.
