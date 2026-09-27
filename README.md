# Projeto Frontend - Avaliação Fafire

Este repositório contém a entrega da **Atividade - Avaliação** referente ao curso de **Frontend da Fafire**.

**Aluno(a):** [Seu Nome Aqui]
**Tema Escolhido:** [Professor Allocation / Tema Livre com CRUD]

## Sobre o Projeto

Esta aplicação web foi desenvolvida como requisito obrigatório para a avaliação da disciplina. O projeto atende aos critérios estabelecidos e consiste em uma interface web desenvolvida em **React**, contendo:

- Uma **Landing Page** com uma breve introdução ao projeto.
- Um sistema com operações de CRUD (Create, Read, Update, Delete) envolvendo pelo menos 2 entidades distintas.
- Navegação fluida entre as páginas.

## Tecnologias Utilizadas

A aplicação foi construída com base nas sugestões da disciplina, utilizando ferramentas modernas e eficientes:

- **Framework:** React 19
- **Build Tool:** Vite (React Client-side)
- **Roteamento:** TanStack Router
- **Interface e Estilização:** Chakra UI & Tailwind CSS (Interface amigável)
- **Gerenciamento de Formulários:** React Hook Form & Zod
- **Mock de API Local:** JSON Server

## Como Executar o Projeto Localmente

Para rodar a aplicação e testar o funcionamento, siga as instruções abaixo:

1. **Pré-requisitos:** Certifique-se de ter o Node.js instalado (v20+ recomendado). A aplicação utiliza preferencialmente o gerenciador de pacotes `bun` (mas também funciona com `npm`).

2. **Instalação das dependências:**
   ```bash
   bun install
   ```

3. **Iniciando a aplicação e a API Mockada:**
   ```bash
   bun run dev
   ```
   > Este comando executará de forma paralela o frontend (Vite) na porta `3000` e a API local (JSON Server) na porta `3333`.

## Estrutura do Sistema

O sistema de rotas foi pensado para cobrir as exigências da atividade, englobando:
- A tela inicial (**Landing Page**) para apresentação.
- Telas de gerenciamento para as entidades selecionadas para o escopo do projeto (como Departamentos, Cursos, Professores e Alocações - de acordo com o tema escolhido).

## Cloud / Deploy (Opcional)

Este projeto contém em sua raiz um arquivo `vercel.json`, estando devidamente preparado para a publicação em plataformas de Cloud como a **Vercel** (deploy opcional, porém encorajado).

---
*Projeto entregue dentro do prazo final (04 de Outubro de 2026), para o professor Keven Leone ([kevenleone.me@gmail.com](mailto:kevenleone.me@gmail.com)).*
