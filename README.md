# 🌱 iPass E2Carbon - Compensação de CO₂ para o STL Festival

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.5-blue?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-blue?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-14.x-brightgreen?style=for-the-badge&logo=node.js&logoColor=white)
![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
# iPass E2Carbon - Compensação de CO₂ para o STL Festival

Aplicação que permite aos usuários calcularem e compensarem as emissões de CO₂ da viagem até o STL Festival, com design baseado na identidade visual oficial da iPass.

---

## 📋 Índice
- [Visão Geral](#-visão-geral)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Funcionalidades](#-funcionalidades)
- [Como Executar o Projeto](#-como-executar-o-projeto)
- [Deploy no Netlify](#-deploy-no-netlify)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Melhorias Implementadas](#-melhorias-implementadas)
- [Melhorias Futuras](#-melhorias-futuras)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

---
## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Como Executar o Projeto](#como-executar-o-projeto)
- [Deploy no Netlify](#deploy-no-netlify)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Melhorias Implementadas](#melhorias-implementadas)
- [Melhorias Futuras](#melhorias-futuras)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 👀 Visão Geral
## Visão Geral

O iPass E2Carbon é uma aplicação web que permite aos usuários calcular e compensar as emissões de CO₂ geradas em suas viagens para o STL Festival. Com uma interface amigável e intuitiva, o usuário pode informar sua cidade de origem, meio de transporte e outras informações relevantes para calcular a pegada de carbono da viagem e realizar a compensação ambiental.

---

## Tecnologias Utilizadas

### Frontend:
- **React 18** – Biblioteca JavaScript para construir interfaces de usuário
- **TypeScript** – Superset do JavaScript para tipagem estática
- **Vite** – Build tool para desenvolvimento rápido
- **TailwindCSS** – Framework CSS utilitário para estilização
- **React Hook Form** – Gerenciamento de formulários
- **Yup** – Validação de formulários
- **React Input Mask** – Máscaras de input para campos como CPF
- **React Toastify** – Notificações interativas
- **Wouter** – Biblioteca de roteamento leve

### Backend:
- **Node.js** – Ambiente de execução JavaScript
- **Express** – Framework web para Node.js
- **TypeScript** – Tipagem estática para maior segurança
- **API RESTful** – Arquitetura para comunicação entre frontend e backend

---
- **Frontend**:
  - React 18
  - TypeScript
  - Vite (para build e desenvolvimento)
  - TailwindCSS (para estilização)
  - React Hook Form (para formulários)
  - Yup (para validação de formulários)
  - React Input Mask (para máscaras de input)
  - React Toastify (para notificações)
  - Wouter (para navegação)
  - Framer Motion (para animações)
  - React Icons (para ícones)
  - Canvas Confetti (para efeitos visuais)

- **Backend**:
  - Node.js
  - Express
  - TypeScript
  - API RESTful

## Funcionalidades

- **Fluxo da Aplicação**
  - 📋 **Login**: Autenticação do usuário com nome, CPF e celular
  - 🌍 **Origem**: Seleção da cidade de origem, com suporte para cidades personalizadas
  - 🚗 **Transporte**: Seleção do meio de transporte, tipo de combustível e número de passageiros
  - ⚡ **Cálculo**: Cálculo automático ou manual da distância e da emissão de CO₂
  - 📊 **Resultado**: Exibição do resultado da emissão e valor da compensação
  - 💳 **Pagamento**: Realização da compensação ambiental via PIX

---
### Fluxo da Aplicação

1. **Login** - Autenticação do usuário com nome, CPF e celular (ícones posicionados à direita dos campos para melhor visualização)
2. **Origem** - Seleção da cidade de origem, com suporte para cidades personalizadas
3. **Transporte** - Seleção do meio de transporte, tipo de combustível e número de passageiros
4. **Cálculo** - Cálculo automático ou manual da distância e da emissão de CO₂
5. **Resultado** - Exibição do resultado da emissão e valor da compensação
6. **Pagamento** - Realização da compensação ambiental via PIX
7. **Sucesso** - Confirmação da compensação com certificado e opções de compartilhamento

## Como Executar o Projeto

### Pré-requisitos:
- **Node.js >= 14.x**
- **NPM ou Yarn**
### Pré-requisitos

- Node.js 18+
- npm 9+

### Instalação:
1. Clone o repositório:
### Passos para rodar localmente

```bash
git clone https://github.com/LuisCarlos01/iPass-E2Carbon.git
cd iPass-E2Carbon
```

2. Instale as dependências:

```bash
npm install
# ou
yarn
```
```bash
# Instale as dependências
npm install

3. Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```
# Execute o servidor de desenvolvimento
npm run dev
```

4. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deploy no Netlify

Para fazer o deploy da aplicação no Netlify, siga os passos abaixo:

1. Crie uma conta no [Netlify](https://www.netlify.com/).
2. Faça o build do projeto localmente:

```bash
npm run build
# ou
yarn build
```

3. Deploy via interface do Netlify:
   - Acesse o dashboard do Netlify
   - Clique em "New site from Git"
   - Conecte com seu repositório GitHub
   - Selecione o repositório `iPass-E2Carbon`
   - Configure as opções de build:
     - **Build command**: `npm run build` ou `yarn build`
     - **Publish directory**: `dist`
   - Clique em "Deploy site"

4. Configurações adicionais:
   - Em "Site settings" > "Build & deploy" > "Continuous Deployment", adicione as variáveis de ambiente necessárias.
   - Configure o redirecionamento para SPA em "Site settings" > "Build & deploy" > "Redirects", adicionando:  
     `/ *    /index.html   200`

---

## 📁 Estrutura do Projeto

```
iPass-E2Carbon/
├── client/                   # Frontend da aplicação
│   ├── public/               # Arquivos estáticos
│   │   └── assets/           # Imagens, logos, etc.
│   ├── src/                  # Código fonte
│   │   ├── components/       # Componentes React
│   │   ├── context/          # Contextos React
│   │   ├── pages/            # Páginas da aplicação
│   │   ├── styles/           # Estilos CSS
│   │   ├── utils/            # Funções utilitárias
│   │   ├── App.tsx           # Componente principal
│   │   └── main.tsx          # Ponto de entrada
├── server/                   # Backend da aplicação
│   ├── controllers/          # Controladores da API
│   ├── models/               # Modelos de dados
│   ├── routes/               # Rotas da API
│   └── index.ts              # Ponto de entrada do servidor
├── package.json              # Dependências e scripts
└── README.md                 # Documentação
```

---

## ✨ Melhorias Implementadas

### 🎨 Design e Interface:
- **Identidade Visual da iPass**: Aplicação das cores e estilos oficiais da iPass em toda a interface
- **Layout Responsivo**: Interface adaptada para diferentes tamanhos de tela
- **Cards e Componentes**: Estilo moderno com cards, sombras e elementos visuais consistentes
- **Tema Personalizado**: Sistema de tema com variáveis CSS para facilitar a manutenção

### 🔒 Autenticação e Segurança:
- **Validação de Formulários**: Implementação de validação robusta em todos os formulários
- **Máscaras de Input**: Campos como CPF e telefone com máscaras para facilitar o preenchimento
- **Feedback Visual**: Mensagens de erro e sucesso claras para o usuário

### 🧩 Funcionalidades:
- **Cidades Personalizadas**: Suporte para cidades que não estão na lista predefinida
- **Cálculo Automático/Manual**: Opção para cálculo automático da distância ou entrada manual
- **Persistência de Dados**: Dados do usuário mantidos entre as etapas do processo
- **Navegação Intuitiva**: Barra de progresso e botões de navegação claros

### 🛠️ Técnicas:
- **Componentização**: Código organizado em componentes reutilizáveis
- **Context API**: Gerenciamento de estado global com Context API
- **TypeScript**: Tipagem estática para maior segurança e autocompletar
- **Hooks Personalizados**: Lógica complexa extraída para hooks reutilizáveis

---

## 🔮 Melhorias Futuras
Acesse http://localhost:3000 para visualizar a aplicação.

## Deploy no Netlify

O projeto está pronto para deploy no Netlify, com configuração em `netlify.toml`:
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **SPA redirect:** configurado para `index.html`
- **Segurança:** headers de segurança adicionados

**Para fazer o deploy:**
1. Faça login no Netlify e crie um novo site apontando para este repositório.
2. Certifique-se de que as configurações de build e publish estejam corretas.
3. O deploy automático será feito a cada push na branch principal.

A aplicação estará disponível em: https://ipass-e2carbon.windsurf.build

## Estrutura do Projeto

- `/client` - Código fonte do frontend (React)
- `/server` - Código fonte do backend (Express)
- `/public` - Arquivos estáticos e imagens
- `/attached_assets` - Documentação e assets auxiliares

## Melhorias Implementadas

- **Login Moderno:** Ícones de usuário, CPF e celular posicionados à direita dos campos de input para melhor visualização e experiência do usuário.
- **Header Responsivo:** Menu adaptável a mobile e desktop, com animações, saudação ao usuário, botões de navegação (Início, Ajuda) e logo maior.
- **Footer Moderno:** Três colunas, redes sociais, contato com ícones, informações organizadas e elementos decorativos, mantendo a identidade visual da marca.
- **Design e Interface:**
  - Identidade visual oficial da iPass aplicada em toda a interface
  - Layout responsivo para mobile e desktop
  - Cards e componentes modernos com animações visuais
- **Experiência do Usuário:**
  - Animações com Framer Motion
  - Feedback visual em todas as etapas
  - Certificado de compensação disponível para download
  - Opções de compartilhamento social
- **Segurança:**
  - Headers de segurança configurados no Netlify

## Melhorias Futuras

- **Integração com APIs de Geolocalização**: Para cálculo mais preciso de distâncias
- **Histórico de Compensações**: Permitir que usuários vejam suas compensações anteriores
- **Certificado Digital**: Gerar certificado de compensação de carbono
- **Múltiplos Métodos de Pagamento**: Adicionar mais opções além do PIX
- **Modo Offline**: Suporte para funcionamento offline com sincronização posterior
- **Internacionalização**: Suporte para múltiplos idiomas
- **Testes Automatizados**: Implementação de testes unitários e de integração
- **PWA**: Transformar em Progressive Web App para instalação nos dispositivos

---

## 👥 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

Desenvolvido com ❤️ por Luis Carlos para a iPass e E2Carbon.
- Integração com gateways de pagamento adicionais
- Dashboard do usuário para histórico de compensações
- Internacionalização (i18n)
- Mais opções de transporte e cálculo

## Contribuição

Sinta-se à vontade para abrir issues e pull requests para sugerir melhorias ou corrigir bugs!

## Licença

MIT
