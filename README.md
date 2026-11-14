# Ponto — Gerenciador de Projetos Pessoais

O **Ponto** é um gerenciador de projetos pessoais voltado para quem desenvolve aplicações, estuda programação ou quer organizar suas próprias ideias.

A proposta é reunir os projetos em um só lugar e facilitar o acompanhamento de cada um, desde o planejamento até a conclusão. A interface utiliza um quadro visual inspirado no Kanban, com tema escuro e organização por status.

## Funcionalidades

Na versão atual, é possível:

- Cadastrar projetos com nome, estimativa de horas, status e indicação de prioridade alta.
- Consultar todos os projetos cadastrados em uma lista.
- Visualizar os projetos em três colunas: **Planejado**, **Em andamento** e **Concluído**.
- Acompanhar a quantidade total de projetos, os projetos em andamento, os concluídos e a soma das horas estimadas.
- Manter os cadastros ao fechar ou recarregar a página, usando o armazenamento local do navegador.

O formulário apresenta mensagens quando um campo obrigatório não é preenchido ou quando a estimativa de horas é igual ou inferior a zero. Após um cadastro válido, o projeto aparece na lista e todos os campos são limpos automaticamente.

## Páginas

| Página | Descrição |
| --- | --- |
| **Início** | Resumo dos projetos e quadro organizado por status. |
| **Cadastro** | Formulário para adicionar projetos e lista dos cadastros existentes. |
| **Sobre** | Apresentação da proposta e das etapas de desenvolvimento. |
| **404** | Mensagem para endereços que não correspondem a uma página da aplicação. |

## Tecnologias utilizadas

- **React:** componentes, estado e atualização da interface.
- **React Router:** navegação entre as páginas.
- **Vite:** ambiente de desenvolvimento e geração do build.
- **CSS:** identidade visual e adaptação do layout a diferentes tamanhos de tela.
- **localStorage:** persistência dos projetos no navegador.

## Etapa 1

Esta versão foi desenvolvida para atender aos requisitos da primeira etapa do projeto acadêmico:

| Requisito | Implementação |
| --- | --- |
| Menu de navegação | Início, Cadastro e Sobre. |
| Página para endereço inexistente | Rota de página não encontrada. |
| Campo de texto ligado ao estado | Nome do projeto. |
| Campo numérico ligado ao estado | Estimativa em horas. |
| Lista de opções ligada ao estado | Status do projeto. |
| Caixa de marcar ligada ao estado | Prioridade alta. |
| Validação de campos obrigatórios | Nome, estimativa e status. |
| Validação do número | A estimativa deve ser maior que zero. |
| Listagem após salvar | Inclusão imediata do projeto na lista. |
| Limpeza do formulário | Restauração dos quatro campos após o cadastro. |

A marcação de prioridade alta é opcional. Os campos do formulário são controlados com `useState`, utilizando `value`, `checked` e `onChange`.
