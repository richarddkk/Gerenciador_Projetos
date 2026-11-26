# Ponto — Gerenciador de Projetos Pessoais

O **Ponto** é um gerenciador de projetos pessoais voltado para quem desenvolve aplicações, estuda programação ou quer organizar suas próprias ideias. A interface tem tema escuro e um quadro inspirado no Kanban, que reúne os projetos nas colunas **Planejado**, **Em andamento** e **Concluído**.

## Funcionalidades

- Cadastrar projetos com nome, estimativa de horas, status e uma opção de prioridade alta.
- Consultar os projetos em uma lista na página **Cadastro** e em um quadro por status na página **Início**.
- Acompanhar o total de projetos, quantos estão em andamento, quantos foram concluídos e a soma das horas estimadas.
- Validar nome, estimativa e status antes do envio. A estimativa deve ser maior que zero e a prioridade alta é opcional.
- Limpar o formulário e incluir o novo projeto na lista assim que a API confirmar o salvamento.

## Páginas

| Página | Descrição |
| --- | --- |
| **Início** | Resumo e quadro de projetos organizados por status. |
| **Cadastro** | Formulário para adicionar projetos e lista carregada pela API. |
| **Sobre** | Apresentação do projeto e das etapas de desenvolvimento. |
| **404** | Mensagem exibida ao acessar uma rota inexistente. |

## Etapas do projeto

### Etapa 1 — Cadastro e navegação

Foram criadas as páginas e o formulário com quatro campos controlados por `useState`: texto para o nome, número para as horas, seleção para o status e caixa de marcar para a prioridade. A etapa também incluiu validação dos campos e atualização da lista após o cadastro.

### Etapa 2 — Integração com a API

| Requisito | Implementação |
| --- | --- |
| Base com pelo menos 10 cadastros | O arquivo `db.json` vem com dez projetos iniciais na coleção `projetos`. |
| Consulta da lista | Um `fetch` dentro de `useEffect`, no `src/App.jsx`, faz o `GET /projetos`. Início e Cadastro usam a mesma lista. |
| Cadastro pela API | O formulário envia um `POST /projetos`. O item retornado pelo servidor é adicionado à lista. |
| Persistência | O JSON Server grava o cadastro no `db.json`, então ele continua disponível após recarregar a página. |
| Servidor desligado | Se a consulta falhar, o site mostra uma mensagem de erro e permite tentar novamente. Se o envio falhar, o formulário mantém os dados preenchidos. |

Na Etapa 2, o arquivo `db.json` substitui o armazenamento no navegador como fonte dos projetos. Cada cópia local do repositório usa seu próprio arquivo de dados.

## Tecnologias utilizadas

| Tecnologia | Uso |
| --- | --- |
| **React** | Componentes, formulário e controle de estado. |
| **React Router** | Navegação entre as páginas. |
| **Vite** | Servidor de desenvolvimento e build. |
| **CSS** | Estilo e adaptação do layout às telas. |
| **JSON Server** | API que consulta e grava projetos no `db.json`. |

## Como executar

Use **Node.js 22.12 ou superior** e abra o terminal na pasta que contém `package.json` e `db.json`.

1. Instale as dependências com `npm install`.
2. No **primeiro terminal**, rode `npm run api` para iniciar o JSON Server. A lista pode ser conferida em `http://localhost:3001/projetos`.
3. No **segundo terminal**, rode `npm run dev` para iniciar o React.
4. Com os dois terminais rodando, abra o endereço indicado pelo Vite, normalmente `http://localhost:5173`.

## Como testar a Etapa 2

1. Abra **Cadastro** e confira se os dez projetos iniciais aparecem na lista.
2. Preencha o formulário com um projeto válido, salve e confira se o cartão aparece e os campos são limpos.
3. Recarregue a página e verifique se o novo cadastro continua na lista. Ele também deve aparecer no `db.json`.
4. Pare a API com `Ctrl + C` no terminal do JSON Server e recarregue o site. Confira a mensagem de erro.
5. Inicie a API novamente com `npm run api` e clique em **Tentar novamente** para recarregar a lista.
