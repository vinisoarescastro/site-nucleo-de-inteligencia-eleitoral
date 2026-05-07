# Arquitetura — NIE · Núcleo de Dados

> Decisões arquiteturais, trade-offs e guias técnicos do projeto.

---

## Visão arquitetural

O site NIE é uma **aplicação web estática de página única (SPA-like)** — um único `index.html` com navegação via âncoras e scroll suave. Não há servidor de aplicação, banco de dados ou processamento server-side.

```
┌─────────────────────────────────────────────────────┐
│                    Navegador (Client)                │
│                                                     │
│  index.html ──► style.css ──► script.js             │
│       │                           │                 │
│       │              ┌────────────┼──────────┐      │
│       │              ▼            ▼          ▼      │
│       │         EmailJS      CallMeBot   WhatsApp   │
│       │         (forms)      (alerts)    (links)    │
│       │                                             │
│  Google Fonts (CDN)                                 │
└─────────────────────────────────────────────────────┘
                         │
                ┌────────▼────────┐
                │  Netlify / CDN  │
                │  (hospedagem)   │
                └─────────────────┘
```

---

## Decisões arquiteturais

### ADR-001: Sem framework JavaScript

**Decisão:** Usar JavaScript vanilla (ES6+), sem React, Vue ou Angular.

**Contexto:** O site é primariamente conteúdo estático com animações e um formulário de contato.

**Razão:** Nenhuma framework era necessária para o escopo atual. Zero overhead de bundle, zero dependências de runtime, carregamento instantâneo.

**Trade-off:** Se o projeto crescer para um painel de administração ou área logada, será necessário reavaliar.

---

### ADR-002: EmailJS para envio de formulário

**Decisão:** Usar EmailJS client-side em vez de um backend proxy.

**Contexto:** Site estático sem servidor de aplicação.

**Razão:** Elimina necessidade de infraestrutura de backend para um caso de uso simples (enviar um e-mail por formulário).

**Risco:** API key exposta no client. Mitigação: chave pública do EmailJS é projetada para uso client-side; rate limiting e domínio autorizado configurados no painel EmailJS.

---

### ADR-003: CallMeBot como canal secundário

**Decisão:** CallMeBot para notificação WhatsApp, com degradação suave (`fetch().catch()`).

**Razão:** Custo zero, integração simples. Se falhar, o lead ainda é capturado via EmailJS.

**Risco:** Serviço gratuito com limite de ~50 mensagens/dia. Para alto volume, considerar Twilio ou API oficial WhatsApp Business.

---

### ADR-004: CSS com Custom Properties (sem preprocessador)

**Decisão:** CSS3 puro com variáveis CSS, sem Sass/Less.

**Razão:** As Custom Properties nativas oferecem reatividade no runtime (temas, overrides JS), que Sass não consegue. Para o escopo do projeto, um único arquivo CSS é maintível.

**Trade-off:** Sem nesting nativo (CSS nesting está chegando), sem mixins complexos. Mitigação: convenção de nomenclatura clara e comentários de seção.

---

## Módulos JavaScript

A partir da v1.1.0 (planejado), o `script.js` monolítico será refatorado em módulos ES6:

| Módulo | Responsabilidade |
|---|---|
| `config.js` | Constantes de configuração (geradas pelo pipeline) |
| `main.js` | Entry point — importa e inicializa todos os módulos |
| `modules/header.js` | Efeito de scroll no cabeçalho |
| `modules/navigation.js` | Menu mobile + rolagem suave corrigida |
| `modules/animations.js` | IntersectionObserver para revelar elementos |
| `modules/counters.js` | Animação de contadores numéricos |
| `modules/territory-bars.js` | Animação das barras territoriais |
| `modules/tilt.js` | Efeito de inclinação nos cartões |
| `modules/whatsapp.js` | Injeção de URLs WhatsApp nos botões |
| `modules/form.js` | Validação + envio + EmailJS + CallMeBot |
| `modules/notifications.js` | Toast de notificações |
| `utils/dom.js` | Helpers: `qs()`, `qsa()`, `on()` |
| `utils/validators.js` | Funções puras de validação |

---

## Performance

### Fontes (risco identificado)

As fontes são carregadas via Google Fonts CDN. Em caso de indisponibilidade do CDN, o site exibe as fontes de fallback definidas no CSS (`sans-serif`, `monospace`).

**Plano para v1.1.0:** hospedar as fontes localmente em `src/assets/fonts/` usando `@font-face` com `font-display: swap`.

### Imagens

O site não possui imagens rasterizadas — apenas SVG inline e CSS. Zero requisições de imagem.

### Critical CSS

O CSS atual (~1.200 linhas) não está separado em critical/non-critical. Para sites com requisitos de performance mais rígidos, extrair o CSS crítico (above-the-fold) para inline no `<head>`.

---

## Segurança

### Headers HTTP (Netlify)

Configurados em `netlify.toml`:

```
Content-Security-Policy: default-src 'self'; script-src 'self' cdn.jsdelivr.net; ...
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Variáveis sensíveis

Nenhuma credencial deve existir no código-fonte versionado. Toda configuração de runtime é injetada via variáveis de ambiente do provedor de hospedagem.

---

## Monitoramento (planejado v1.2.0)

| Ferramenta | Finalidade |
|---|---|
| Sentry | Captura de erros JavaScript em produção |
| Google Analytics 4 | Análise de tráfego e conversões |
| Netlify Analytics | Métricas de server-side sem cookies |
| UptimeRobot | Monitoramento de disponibilidade (alertas) |