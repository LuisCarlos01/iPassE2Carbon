# iPass E2Carbon - Compensação de CO₂ para o STL Festival

Aplicação que permite aos usuários calcularem e compensarem as emissões de CO₂ da viagem até o STL Festival, com design baseado na identidade visual oficial da iPass.

![iPass E2Carbon](public/assets/logos/Ipass_logo.png)

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

## Visão Geral

O iPass E2Carbon é uma aplicação web que permite aos usuários calcular e compensar as emissões de CO₂ geradas em suas viagens para o STL Festival. Com uma interface amigável e intuitiva, o usuário pode informar sua cidade de origem, meio de transporte e outras informações relevantes para calcular a pegada de carbono da viagem e realizar a compensação ambiental.

## Tecnologias Utilizadas

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

### Fluxo da Aplicação

1. **Login** - Autenticação do usuário com nome, CPF e celular (ícones posicionados à direita dos campos para melhor visualização)
2. **Origem** - Seleção da cidade de origem, com suporte para cidades personalizadas
3. **Transporte** - Seleção do meio de transporte, tipo de combustível e número de passageiros
4. **Cálculo** - Cálculo automático ou manual da distância e da emissão de CO₂
5. **Resultado** - Exibição do resultado da emissão e valor da compensação
6. **Pagamento** - Realização da compensação ambiental via PIX
7. **Sucesso** - Confirmação da compensação com certificado e opções de compartilhamento

## Como Executar o Projeto

### Pré-requisitos

- Node.js 18+
- npm 9+

### Passos para rodar localmente

```bash
# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

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

- Integração com gateways de pagamento adicionais
- Dashboard do usuário para histórico de compensações
- Internacionalização (i18n)
- Mais opções de transporte e cálculo

## Contribuição

Sinta-se à vontade para abrir issues e pull requests para sugerir melhorias ou corrigir bugs!

## Licença

MIT
