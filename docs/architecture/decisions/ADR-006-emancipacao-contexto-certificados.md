# ADR-006: Emancipação do Contexto de Certificados da Seção Resume

**Status:** Aceito
**Data:** 2026-06-18

## Contexto
Atualmente, as certificações profissionais e treinamentos especializados estão inseridos como uma aba interna (`Certificate`) na caixa tabulada centralizada (`tabbed-resume-box`) da seção `Resume` (Currículo), juntamente com Carreira Profissional e Formação Acadêmica.

Com o acúmulo de novos certificados e o aprimoramento dos mecanismos de busca e ordenação rápida aplicados a esse escopo (que contam com estados de busca específicos), manter essa estrutura compactada sob a seção Resume prejudica a experiência do usuário (UX), a escaneabilidade das qualificações e a hierarquia visual do portfólio.

Além disso, as seções de Projetos (ADR-004) e Artigos (ADR-005) já utilizam interfaces independentes, sugerindo a necessidade de emancipar os Certificados para torná-los uma seção standalone de mesmo nível hierárquico.

## Decisão
Emanciparemos o contexto de Certificados criando uma nova estrutura independente no portfólio. As ações específicas incluem:
1. **Nova Seção Standalone (#certificates):** Remover a aba "Certificate" da `tabbed-resume-box` e criar uma seção dedicada `#certificates` no mesmo nível hierárquico das seções de Projetos e Artigos.
2. **Navegação do Site:** Adicionar um link de navegação exclusivo para "Certificates" (ou "Certificados") no header principal (`#nav-certificates`).
3. **Isolamento de Estado de Busca e Ordenação:** A lógica de renderização e os componentes de busca e ordenação rápida (já presentes) serão acoplados diretamente à nova seção `#certificates`, mantendo o isolamento total de seus filtros em relação aos outros módulos do site.
4. **Namespace e Componentização:** Manter a nomenclatura exclusiva com o prefixo/sufixo `certificate` (ex: `CertificateShowcase`, `certificate-container`) para garantir consistência e evitar regressões.

## Consequências
- **Positivas:**
  - **UX/UI Consistente e Premium:** Melhora o fluxo de leitura das certificações do usuário, permitindo que a seção ocupe a largura completa da tela de forma limpa.
  - **Hierarquia Visual Clara:** A seção `Resume` volta a focar exclusivamente em trajetórias acadêmicas e profissionais, enquanto Certificados ganham maior destaque visual.
- **Negativas:**
  - Aumenta o número de itens na barra de navegação principal (de 3 para 5, incluindo Artigos e Certificados), exigindo atenção ao design responsivo de menus móveis.
