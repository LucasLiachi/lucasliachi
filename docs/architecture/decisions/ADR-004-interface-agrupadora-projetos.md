# ADR-004: Implementação de Interface Agrupadora para o Portfólio de Projetos

**Status:** Aceito
**Data:** 2026-06-17

## Contexto
Atualmente, a seção de "Projetos" exibe seus elementos em contêineres separados na mesma seção vertical ou controlados por um dropdown de filtro de categoria. Essa abordagem destoa da experiência de usuário (UX) adotada na seção "Resume" (Currículo), que utiliza uma caixa tabulada centralizada (`tabbed-resume-box`) para dividir as trajetórias de carreira, acadêmica e certificados de forma mais fluida.

Além disso, a aba de "Certificados" estabeleceu um excelente padrão de usabilidade ao integrar um mecanismo de buscas rápidas e ordenação (por data e ordem alfabética) aplicados especificamente ao seu escopo. 

Para unificar o padrão visual, melhorar a escaneabilidade dos projetos e garantir um design premium e consistente, é necessária a refatoração do módulo de exibição de projetos para seguir esse modelo aglutinador.

## Decisão
Implementaremos um componente de **Interface Agrupadora para Projetos** baseado no modelo de abas e gerenciamento de buscas do currículo. As ações específicas incluem:
1. **Layout de Abas de Projetos:** Agrupar visualmente as categorias de projetos (Processos, Tecnologia, Estatística, etc.) em abas clicáveis no topo da seção, seguindo a estética de design da `tabbed-resume-box`.
2. **Mecanismo de Busca e Ordenação Isolado:** Criar uma barra de buscas e um dropdown de ordenação exclusivos para os projetos. Esse mecanismo será totalmente independente da busca de certificados e outros inputs globais do site, garantindo o isolamento do estado.
3. **Padrão de Visualização (Cards):** Renderizar os projetos como cards minimalistas uniformes (conforme o modelo do showcase de certificados), contendo links para os arquivos detalhados em markdown.
4. **Alinhamento com a Nova Arquitetura:** A lógica de renderização e gerência desse estado será componentizada no Next.js/React (conforme estabelecido no ADR-003).

## Consequências
- **Positivas:**
  - **Consistência de UX/UI:** Unifica a navegação interativa do site, fazendo com que a seção de Projetos se comporte de maneira homóloga à de Currículo.
  - **Organização Visual:** Reduz a altura total da página ao não renderizar múltiplas grids simultaneamente na vertical.
  - **Isolamento de Estado:** Impede que buscas de projetos afetem a filtragem de certificados ou vice-versa, melhorando a modularidade do frontend.
- **Negativas:**
  - Aumenta levemente a complexidade no controle de estados de busca e filtros do React (necessidade de manter múltiplos estados de filtros e termos de pesquisa independentes para certificados e projetos).
