# ADR-007: Revisão de Anexos e Exibição de Certificados em Modal

**Status:** Aceito
**Data:** 2026-06-21

## Contexto
Atualmente, os arquivos físicos das certificações (arquivos PDF, imagens JPG/PNG) encontram-se centralizados em uma pasta genérica em `docs/architecture/certificados/`. Essa arquitetura centralizada gera os seguintes problemas:
1. Dificuldade de manutenção: os arquivos de anexo não estão fisicamente próximos aos metadados em markdown do certificado (que ficam em `pages/certificate/<pasta-do-certificado>/`).
2. Nomenclatura inconsistente: os nomes dos arquivos PDF e imagens variam em datas, formatos e prefixos, dificultando automações e buscas programáticas.
3. Experiência de visualização limitada: ao clicar no link do card de um certificado (ex: "View certificate"), o sistema atualmente abre um modal genérico que lê apenas o markdown descritivo. O usuário não consegue ver diretamente o arquivo digitalizado (PDF/Imagem) do certificado na tela.

## Decisão
Implementaremos uma revisão completa de anexos e aprimoramento do modal de exibição de certificados. As ações envolvem:
1. **Padrão de Localização:** Mover cada arquivo de anexo (PDF ou imagem) da pasta genérica `docs/architecture/certificados/` para dentro da respectiva pasta dedicada do certificado sob `pages/certificate/<pasta-do-certificado>/`.
2. **Nomenclatura Padronizada dos Anexos:** Adotar um padrão uniforme de nomenclatura para os anexos dentro das subpastas (ex: `certificate.pdf`, `certificate.png` ou `certificado.pdf`).
3. **Metadados de Anexo em Markdown:** Incluir a chave `attachment` nos metadados dos arquivos markdown de cada certificado indicando o caminho relativo do arquivo de anexo (ex: `pages/certificate/2025-04-ITIL-4-Foundation/certificate.pdf`).
4. **Exibição do Anexo no Modal:** Refatorar a classe `CertificateShowcase` e o modal de leitura para que, ao clicar em "View certificate", o sistema renderize um iframe (para PDFs) ou um elemento de imagem (para PNG/JPG) exibindo o certificado real diretamente no popup, mantendo também a descrição em markdown abaixo.

## Consequências
- **Positivas:**
  - **Organização Modular:** Cada certificado passa a ser um pacote autocontido (markdown em múltiplos idiomas + anexo digitalizado na mesma pasta), facilitando a manutenção e portabilidade.
  - **Experiência Visual Interativa (Showcase):** Recrutadores e visitantes podem visualizar o certificado digitalizado imediatamente no portfólio, sem precisar fazer download ou ser redirecionados a outra página.
- **Negativas:**
  - Trabalho manual inicial para mover os arquivos da pasta centralizada para suas respectivas pastas e atualizar as referências nos arquivos markdown.
  - A renderização de PDFs em navegadores móveis por meio de iframe pode requerer cuidados extras de CSS para garantir a responsividade e rolagem suave.
