# NIE · Núcleo de Dados

> **"Transformando dados em votos."**  
> Inteligência eleitoral baseada em dados públicos, georreferenciamento e modelagem preditiva.

---

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Desenvolvimento](#desenvolvimento)
- [Build e Deploy](#build-e-deploy)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Serviços Externos](#serviços-externos)
- [Contribuição](#contribuição)
- [Versionamento](#versionamento)
- [Licença](#licença)

---

## Visão Geral

O NIE (Núcleo de Dados) é a plataforma institucional do principal serviço brasileiro de inteligência eleitoral. O site apresenta os produtos, metodologia GRID™ e canais de conversão (formulário de contato + WhatsApp) para candidatos e mandatários em todos os níveis do sistema político brasileiro.

### Funcionalidades principais

| Funcionalidade | Descrição |
|---|---|
| Landing page institucional | Apresentação de produtos e metodologia |
| Formulário de contato | Captação de leads com validação client-side |
| Notificação de lead por e-mail | Integração com EmailJS |
| Notificação de lead por WhatsApp | Integração com CallMeBot |
| Botão flutuante WhatsApp | Acesso direto ao canal comercial |
| Animações territoriais | Dashboard simulado com barras e gauge SVG |
| Design responsivo | Mobile-first, testado em 320px–1920px |

---

## Tecnologias

| Camada | Tecnologia | Versão |
|---|---|---|
| Markup | HTML5 | — |
| Estilo | CSS3 + Custom Properties | — |
| Interatividade | JavaScript (ES6+) | — |
| Fontes | Google Fonts (Syne, Poppins, Plus Jakarta Sans, JetBrains Mono) | — |
| E-mail | EmailJS Browser SDK | `^4.x` |
| WhatsApp API | CallMeBot Free API | — |
| Hospedagem | Netlify / Vercel (recomendado) | — |

> Projeto **sem framework** e **sem dependências de build** por padrão. Tooling opcional via Node.js — veja [Desenvolvimento](#desenvolvimento).

---

## Pré-requisitos

- Navegador moderno (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- [Node.js](https://nodejs.org) `>=18.x` — apenas para tooling local opcional
- Conta no [EmailJS](https://emailjs.com) — para envio de formulários
- Número WhatsApp ativado no [CallMeBot](https://www.callmebot.com) — para alertas de lead

---

## Instalação

```bash
# 1. clonar o repositório
git clone https://github.com/seu-usuario/nie-nucleo-dados.git
cd nie-nucleo-dados

# 2. copiar as variáveis de ambiente
cp .env.example .env

# 3. preencha o .env com suas credenciais

# 4. instale as ferramentas de desenvolvimento
npm install

# 5. inicie o servidor de desenvolvimento
npm run dev
# → http://localhost:3000
```

---

## Configuração

### 1. Variáveis de ambiente

Edite o arquivo `.env` com as credenciais reais:

```env
EMAILJS_PUBLIC_KEY=sua_chave_publica
EMAILJS_SERVICE_ID=service_xxxxxxx
EMAILJS_TEMPLATE_ID=template_xxxxxxx
CALLMEBOT_PHONE=5562999504750
CALLMEBOT_APIKEY=seu_apikey
WHATSAPP_NUMBER=5562999504750
```

Consulte [docs/services/emailjs.md](docs/services/emailjs.md) e [docs/services/callmebot.md](docs/services/callmebot.md) para guias passo a passo.

### 2. Injeção de configuração

Em produção, as constantes em `src/js/config.js` são populadas pelo pipeline de CI/CD via variáveis de ambiente do serviço de hospedagem (Netlify / Vercel). Para desenvolvimento local, o arquivo `.env` é lido pelo script `scripts/inject-config.js`.

---

## Estrutura do Projeto

```
nie-nucleo-dados/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml               # Lint + validação em PRs
│   │   └── deploy.yml           # Deploy automático em main
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md
│       └── feature_request.md
│
├── config/
│   └── site.config.js           # Configurações centralizadas do site
│
├── docs/
│   ├── ARCHITECTURE.md          # Decisões arquiteturais
│   ├── CHANGELOG.md             # Histórico de versões
│   ├── CONTRIBUTING.md          # Guia de contribuição
│   └── services/
│       ├── emailjs.md           # Setup do EmailJS
│       └── callmebot.md         # Setup do CallMeBot
│
├── scripts/
│   ├── inject-config.js         # Injeta .env nas constantes JS
│   └── validate-env.js          # Valida variáveis obrigatórias
│
├── src/
│   ├── assets/
│   │   ├── fonts/               # Fontes auto-hospedadas (fallback)
│   │   ├── icons/               # Ícones SVG standalone
│   │   └── images/              # Imagens e OG image
│   ├── css/
│   │   └── style.css            # Stylesheet principal
│   └── js/
│       ├── config.js            # Constantes de configuração (geradas)
│       ├── main.js              # Entry point (orquestra módulos)
│       ├── modules/
│       │   ├── analytics.js     # Inicialização de analytics
│       │   ├── animations.js    # Observers de animação
│       │   ├── counters.js      # Animação de contadores
│       │   ├── form.js          # Formulário + validação + envio
│       │   ├── header.js        # Comportamento do cabeçalho
│       │   ├── navigation.js    # Rolagem suave + menu mobile
│       │   ├── notifications.js # Toast de notificações
│       │   ├── territory-bars.js# Animação das barras territoriais
│       │   ├── tilt.js          # Efeito de inclinação nos cartões
│       │   └── whatsapp.js      # Injeção de links WhatsApp
│       └── utils/
│           ├── dom.js           # Helpers de DOM
│           └── validators.js    # Funções de validação
│
├── .env.example                 # Template de variáveis de ambiente
├── .gitignore
├── .eslintrc.json               # Configuração de lint JS
├── .stylelintrc.json            # Configuração de lint CSS
├── .prettierrc                  # Formatação de código
├── CONFIG_MAP.md                # Mapa de configuração e ICs
├── index.html                   # Página principal
├── favicon.svg
├── netlify.toml                 # Configuração de deploy (Netlify)
├── package.json                 # Dependências de desenvolvimento
└── README.md
```

---

## Desenvolvimento

```bash
# servidor local
npm run dev

# lint js
npm run lint:js

# lint CSS
npm run lint:css

# formatar código
npm run format

# validação de variaveis de ambiente
npm run validate:env

# verificação total 
npm run check
```

---

## Build e Deploy

### Netlify (recomendado)

1. Conecte o repositório no painel Netlify
2. Configure as variáveis de ambiente no painel (Settings → Environment Variables)
3. O arquivo `netlify.toml` já define as configurações de build e headers de segurança

```toml
# netlify.toml (resumo)
[build]
  command   = "npm run build"
  publish   = "dist/"
```

### Vercel

```bash
vercel --prod
```

### Deploy manual

```bash
npm run build
# Copie o conteúdo de dist/ para seu servidor
```

---

## Variáveis de Ambiente

Consulte o arquivo [`.env.example`](.env.example) para a lista completa e documentada de todas as variáveis.

| Variável | Obrigatória | Descrição |
|---|---|---|
| `EMAILJS_PUBLIC_KEY` | OK | Chave pública EmailJS |
| `EMAILJS_SERVICE_ID` | OK | ID do serviço EmailJS |
| `EMAILJS_TEMPLATE_ID` | OK | ID do template EmailJS |
| `CALLMEBOT_PHONE` | OK | Telefone destino (CallMeBot) |
| `CALLMEBOT_APIKEY` | OK | API Key do CallMeBot |
| `WHATSAPP_NUMBER` | OK | Número WhatsApp comercial |
| `GA_MEASUREMENT_ID` | ! | Google Analytics 4 |
| `SENTRY_DSN` | ! | Monitoramento de erros |

---

## Serviços Externos

| Serviço | Finalidade | Documentação |
|---|---|---|
| [EmailJS](https://emailjs.com) | Envio de formulário de contato | [docs/services/emailjs.md](docs/services/emailjs.md) |
| [CallMeBot](https://callmebot.com) | Alerta de lead por WhatsApp | [docs/services/callmebot.md](docs/services/callmebot.md) |
| [Google Fonts](https://fonts.google.com) | Tipografia | CDN externo |
| [Netlify](https://netlify.com) | Hospedagem e CI/CD | [netlify.toml](netlify.toml) |

---

## Contribuição

Consulte [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) para o guia completo.

**Resumo do fluxo:**

```
main  ←  release/*  ←  feature/*
                    ←  fix/*
                    ←  hotfix/*
```

---

## Versionamento

Este projeto segue [Versionamento Semântico (SemVer)](https://semver.org/lang/pt-BR/).  
Consulte o [CONFIG_MAP.md](CONFIG_MAP.md) para a política completa de versionamento e [docs/CHANGELOG.md](docs/CHANGELOG.md) para o histórico.

**Versão atual:** `v1.0.0`

---

## Licença

Proprietário — NIE · Núcleo de Dados · by VSC. Todos os direitos reservados.  
Uso, cópia ou distribuição não autorizada é expressamente proibida.