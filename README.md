# 🌱 iPass E2Carbon - Compensação de CO₂ para o STL Festival

Aplicação que permite aos usuários calcularem e compensarem as emissões de CO₂ da viagem até o STL Festival, com design baseado na identidade visual oficial da iPass.

![iPass E2Carbon](public/assets/logos/Ipass_logo.png)

## 📋 Índice

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

O iPass E2Carbon é uma aplicação web que permite aos usuários calcular e compensar as emissões de CO₂ geradas em suas viagens para o STL Festival. Com uma interface amigável e intuitiva, o usuário pode informar sua cidade de origem, meio de transporte e outras informações relevantes para calcular a pegada de carbono da viagem e realizar a compensação ambiental.

## 💻 Tecnologias Utilizadas

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

- **Backend**:
  - Node.js
  - Express
  - TypeScript
  - API RESTful

## 🚀 Funcionalidades

### Fluxo da Aplicação

1. **Login** - Autenticação do usuário com nome, CPF e celular
2. **Origem** - Seleção da cidade de origem, com suporte para cidades personalizadas
3. **Transporte** - Seleção do meio de transporte, tipo de combustível e número de passageiros
4. **Cálculo** - Cálculo automático ou manual da distância e da emissão de CO₂
5. **Resultado** - Exibição do resultado da emissão e valor da compensação
6. **Pagamento** - Realização da compensação ambiental via PIX

## 🛠️ Como Executar o Projeto

### Pré-requisitos

- Node.js >= 14.x
- NPM ou Yarn

### Instalação

1. Clone o repositório

   ```bash
   git clone https://github.com/LuisCarlos01/iPass-E2Carbon.git
   cd iPass-E2Carbon
   ```

2. Instale as dependências

   ```bash
   npm install
   # ou
   yarn
   ```

3. Execute o projeto em modo de desenvolvimento

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

## 🌐 Deploy no Netlify

Para fazer o deploy da aplicação no Netlify, siga os passos abaixo:

1. Crie uma conta no [Netlify](https://www.netlify.com/) caso ainda não tenha

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
   - Selecione o repositório iPass-E2Carbon
   - Configure as opções de build:
     - Build command: `npm run build` ou `yarn build`
     - Publish directory: `dist`
   - Clique em "Deploy site"

4. Configurações adicionais:
   - Em "Site settings" > "Build & deploy" > "Continuous Deployment", adicione as variáveis de ambiente necessárias
   - Configure o redirecionamento para SPA em "Site settings" > "Build & deploy" > "Redirects", adicionando:
     ```
     /*    /index.html   200
     ```

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

## ✨ Melhorias Implementadas

### 🎨 Design e Interface

- **Identidade Visual da iPass**: Aplicação completa das cores e estilos oficiais da iPass em toda a interface
- **Layout Responsivo**: Interface adaptada para diferentes tamanhos de tela
- **Cards e Componentes**: Estilo moderno com cards, sombras e elementos visuais consistentes
- **Tema Personalizado**: Sistema de tema com variáveis CSS para facilitar a manutenção

### 🔒 Autenticação e Segurança

- **Validação de Formulários**: Implementação de validação robusta em todos os formulários
- **Máscaras de Input**: Campos como CPF e telefone com máscaras para facilitar o preenchimento
- **Feedback Visual**: Mensagens de erro e sucesso claras para o usuário

### 🧩 Funcionalidades

- **Cidades Personalizadas**: Suporte para cidades que não estão na lista predefinida
- **Cálculo Automático/Manual**: Opção para cálculo automático da distância ou entrada manual
- **Persistência de Dados**: Dados do usuário mantidos entre as etapas do processo
- **Navegação Intuitiva**: Barra de progresso e botões de navegação claros

### 🛠️ Técnicas

- **Componentização**: Código organizado em componentes reutilizáveis
- **Context API**: Gerenciamento de estado global com Context API
- **TypeScript**: Tipagem estática para maior segurança e autocompletar
- **Hooks Personalizados**: Lógica complexa extraída para hooks reutilizáveis

## 🔮 Melhorias Futuras

- **Integração com APIs de Geolocalização**: Para cálculo mais preciso de distâncias
- **Histórico de Compensações**: Permitir que usuários vejam suas compensações anteriores
- **Certificado Digital**: Gerar certificado de compensação de carbono
- **Múltiplos Métodos de Pagamento**: Adicionar mais opções além do PIX
- **Modo Offline**: Suporte para funcionamento offline com sincronização posterior
- **Internacionalização**: Suporte para múltiplos idiomas
- **Testes Automatizados**: Implementação de testes unitários e de integração
- **PWA**: Transformar em Progressive Web App para instalação nos dispositivos

## 👥 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

---

Desenvolvido com ❤️ por Luis Carlos para a iPass e E2Carbon.
