# 🌱 iPass E2Carbon - Compensação de CO₂ para o STL Festival

Aplicação que permite aos usuários calcularem e compensarem as emissões de CO₂ da viagem até o STL Festival.

## 💻 Tecnologias Utilizadas

- React + Vite
- TailwindCSS para estilização
- React Router para navegação
- React Hook Form para formulários
- Toastify para notificações
- React QR Code para geração de QR Code Pix
- Framer Motion para animações

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js >= 14.x
- NPM ou Yarn

### Instalação

1. Clone o repositório

   ```bash
   git clone https://github.com/LuisCarlos01/iPass-E2carbon.git
   cd iPass-E2carbon
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

4. Acesse a aplicação em [http://localhost:5173](http://localhost:5173)

## 📱 Fluxo da Aplicação

1. **Login** - Autenticação do usuário na plataforma
2. **Origem** - Seleção da cidade de origem
3. **Transporte** - Visualização do trajeto
4. **Cálculo** - Cálculo da emissão de CO₂
5. **Resultado** - Exibição do resultado da emissão
6. **Pagamento** - Realização da compensação ambiental

## 🌐 Rotas

- `/` - Tela de Login
- `/origem` - Tela de Origem
- `/transporte` - Tela de Transporte
- `/calculo` - Tela de Cálculo
- `/resultado` - Tela de Resultado
- `/pagamento` - Tela de Pagamento
- `/sucesso` - Tela de Sucesso (após pagamento)

## 🧠 Melhorias Realizadas

A página de login foi aprimorada para oferecer uma experiência de usuário mais robusta e segura. As seguintes melhorias foram implementadas:

### Validações de Entrada

- **Máscaras de Input**: Os campos de CPF e celular agora utilizam máscaras para garantir que os dados sejam inseridos no formato correto:
  - CPF: `999.999.999-99`
  - Celular: `(99) 99999-9999`
- **Validações**: Implementamos validações para garantir que:
  - O CPF seja um número válido.
  - O celular siga o padrão brasileiro e tenha 11 dígitos úteis.

### Segurança

- **Armazenamento Seguro**: O token JWT é armazenado de forma segura no `localStorage`, evitando o armazenamento de dados sensíveis no front-end.
- **Autenticação**: O token JWT é incluído no cabeçalho `Authorization` de todas as requisições autenticadas.
- **Rate Limiting**: Um mecanismo de rate limiting foi implementado no backend para evitar tentativas excessivas de login.

### Interface e Usabilidade

- **Feedback Visual**: Adicionamos um spinner de carregamento enquanto o login está sendo processado e mensagens de erro claras caso o CPF ou celular estejam incorretos.
- **Design Responsivo**: A página foi adaptada para ser responsiva, seguindo um design mobile-first e alinhado com a identidade visual do iPass.

### Organização do Código

- **Componentes Reutilizáveis**: Criamos componentes reutilizáveis para os campos de CPF e celular, melhorando a organização e a manutenibilidade do código.
- **Separação de Responsabilidades**: As validações e a API de login foram isoladas em serviços e helpers, facilitando a manutenção e a escalabilidade do código.

Essas melhorias visam proporcionar uma experiência de login mais segura e amigável para os usuários do sistema.

## 🚚 Melhorias na Página de Origem

A página de origem foi completamente reformulada, trazendo recursos avançados para uma experiência de usuário superior:

### Integração com APIs Oficiais

- **API do IBGE**: Integração com o serviço oficial do IBGE para carregamento de estados e municípios brasileiros.
- **Dados Atualizados**: Informações geográficas atualizadas diretamente da fonte oficial.

### Interface Aprimorada

- **Componentes Acessíveis**: Uso de Headless UI para criar dropdowns totalmente acessíveis e personalizáveis.
- **Feedback Visual**: Exibição de estado de carregamento, validações em tempo real e resumo das informações selecionadas.
- **Design Responsivo**: Layout adaptado para diferentes tamanhos de tela, seguindo a abordagem mobile-first.

### Funcionalidades Especiais

- **Cidades Personalizadas**: Opção "Minha cidade não está na lista" para inserir manualmente cidades que não constam na base do IBGE.
- **Validações Inteligentes**: Sistema detecta automaticamente se todos os campos estão preenchidos corretamente antes de habilitar o botão de próximo.
- **Persistência de Dados**: As informações são armazenadas no localStorage, permitindo que o usuário continue de onde parou caso saia da aplicação.

### Otimizações Técnicas

- **Gerenciamento de Estado**: Uso eficiente de hooks do React e Context API para gerenciar o estado da aplicação.
- **Carregamento sob Demanda**: Municípios são carregados somente quando um estado é selecionado, melhorando a performance.
- **Tratamento de Erros**: Sistema robusto de captura e exibição de erros, com mensagens amigáveis para o usuário.

Essas melhorias transformaram completamente a experiência de seleção de origem, tornando-a mais intuitiva, confiável e agradável para os usuários.

## 🚗 Melhorias na Página de Transporte

A página de transporte foi completamente reformulada para oferecer uma experiência de usuário moderna e completa:

### Interface Visual Rica

- **Seleção Visual de Veículos**: Cards interativos com ícones para seleção do tipo de veículo (Moto, Carro, Van, Ônibus)
- **Seletor de Combustíveis**: Componente moderno e acessível para escolha opcional do tipo de combustível
- **Feedback Visual**: Estados ativos, hover e selecionados com animações suaves para melhor resposta visual

### Funcionalidades Inteligentes

- **Cálculo Automático de Distância**: Estimativa automática da distância total (ida e volta) baseada na origem
- **Alternância Manual/Automática**: Toggle para permitir que o usuário insira manualmente a distância quando preferir
- **Validação em Tempo Real**: Feedback instantâneo sobre a validade dos dados, com mensagens específicas de erro
- **Resumo Dinâmico**: Card de resumo que atualiza em tempo real conforme o usuário faz suas seleções

### Melhorias Técnicas

- **Validação Robusta com Yup**: Schema de validação completo para garantir a integridade dos dados
- **Integração com React Hook Form**: Gerenciamento avançado de estado do formulário
- **Componentização**: Componentes reutilizáveis para seleção de veículos e combustíveis
- **Persistência de Dados**: Armazenamento no localStorage para recuperação em caso de atualização da página
- **Tratamento de Erros**: Sistema abrangente de captura e exibição de erros com mensagens amigáveis

### UX/UI Aprimorada

- **Acessibilidade**: Componentes totalmente acessíveis via teclado e leitores de tela usando Headless UI
- **Design Responsivo**: Layout que se adapta perfeitamente a diferentes tamanhos de tela
- **Microinterações**: Feedbacks sutis como spinners durante carregamento e ícones para confirmação de seleção
- **Estados Contextuais**: Botões desabilitados quando necessário, com explicações claras sobre o motivo

Essas melhorias tornaram a seleção de transporte uma experiência muito mais completa e agradável, permitindo aos usuários informar dados precisos para o cálculo de emissões de CO₂ de forma intuitiva.

## 🚩 Melhorias na Página de Pagamento

A página de pagamento foi significativamente aprimorada para oferecer uma experiência de pagamento moderna, segura e acessível através do PIX:

### Geração de QR Code PIX

- **QR Code Dinâmico**: Implementação de um gerador de QR Code PIX usando a biblioteca `react-qr-code`
- **Formato EMV**: QR Code seguindo o padrão EMV do Banco Central, garantindo compatibilidade com aplicativos bancários
- **Identificador Único**: Cada transação PIX inclui um identificador único para rastreamento e confirmação do pagamento

### Interface Moderna e Intuitiva

- **Experiência Visual Rica**: Design com gradientes suaves, elementos com sombras e detalhes visuais que destacam informações importantes
- **Animações Fluidas**: Transições suaves entre diferentes estados do pagamento (formulário → processando → QR Code → sucesso)
- **Feedback Contínuo**: Spinners de carregamento, mensagens claras e indicadores visuais em cada etapa do processo

### Fluxo de Pagamento Completo

- **Processo em Etapas**: Fluxo dividido em:
  1. Tela inicial com resumo e explicação
  2. Exibição do QR Code para escaneamento
  3. Confirmação do pagamento
  4. Sucesso e redirecionamento
- **Alternativas de Pagamento**: Além do QR Code, disponibilização da chave PIX para cópia e colagem
- **Botão de Cópia**: Funcionalidade para copiar a chave PIX diretamente para a área de transferência

### Melhorias Técnicas e de Acessibilidade

- **Estados Gerenciados com Elegância**: Uso de `useState` e `AnimatePresence` para gerenciar os diferentes estados da interface
- **Formulários Otimizados**: Integração com React Hook Form para validação e manipulação de dados
- **Atributos de Acessibilidade**: Implementação completa de atributos ARIA para leitores de tela
- **Navegação por Teclado**: Garantia de que todos os elementos sejam navegáveis e acionáveis via teclado

### Segurança e Experiência do Usuário

- **Simulação Realista**: Embora seja uma demonstração, o sistema simula com precisão como uma transação PIX real funcionaria
- **Indicadores de Segurança**: Selos e mensagens que reforçam a segurança da transação
- **Confirmação Intuitiva**: O usuário tem controle para confirmar o pagamento após realizá-lo em seu aplicativo bancário
- **Mensagens Contextuais**: Instruções claras em cada etapa, reduzindo a possibilidade de confusão

Estas melhorias criaram uma experiência de pagamento simplificada e moderna, focada exclusivamente no PIX como forma de compensação das emissões de carbono, alinhando-se às melhores práticas de mercado para pagamentos digitais no Brasil.

## 🎯 Melhorias na Página de Resultado

A página de resultado foi aprimorada para fornecer uma experiência de usuário mais clara e informativa:

### Detalhes do Cálculo

- **Informações Detalhadas**: Adicionamos mais detalhes sobre o cálculo da emissão de CO₂, incluindo o tipo de veículo, combustível e distância percorrida.
- **Análise Comparativa**: Adicionamos uma seção para comparar o resultado do cálculo com outras opções de transporte.

### Interface Aprimorada

- **Design Responsivo**: A página foi adaptada para ser responsiva, seguindo um design mobile-first e alinhado com a identidade visual do iPass.
- **Microinterações**: Feedbacks sutis como ícones de confirmação e animações suaves para melhorar a experiência do usuário.

### Organização do Código

- **Componentes Reutilizáveis**: Criamos componentes reutilizáveis para exibir os detalhes do cálculo, melhorando a organização e a manutenibilidade do código.
- **Separação de Responsabilidades**: As informações do cálculo foram isoladas em um serviço, facilitando a manutenção e a escalabilidade do código.

Essas melhorias visam proporcionar uma experiência de resultado mais clara e informativa para os usuários do sistema.

## 🧠 Melhorias Futuras

- Integração real com gateway de pagamento
- Geração de certificado PDF
- Integração com Google Maps API
- Cadastro de usuários pelo app
- Sistema de notificações para confirmação via webhook
- Histórico de compensações realizadas pelo usuário

## 👤 Desenvolvido por

**Luiz Carlos (Netinho)** – Front-End Jr na iPass
