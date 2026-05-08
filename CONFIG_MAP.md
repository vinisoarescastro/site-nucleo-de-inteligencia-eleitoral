# CONFIG_MAP.md — Mapa de Configuração e Itens de Configuração (ICs)

> **NIE · Núcleo de Dados**  
> Versão do documento: 1.0.0  
> Última atualização: 2026-05-07  
> Responsável: Vinicius Soares Castro (VSC)

---

## Índice

1. [Itens de Configuração (ICs)](#1-itens-de-configuração-ics)
2. [Bibliotecas e Dependências](#2-bibliotecas-e-dependências)
3. [Serviços Externos](#3-serviços-externos)
4. [Ambientes](#4-ambientes)
5. [Arquivos Críticos e Sensíveis](#5-arquivos-críticos-e-sensíveis)
6. [Scripts Disponíveis](#6-scripts-disponíveis)
7. [Política de Versionamento (SemVer)](#7-política-de-versionamento-semver)
8. [Convenções de Nomenclatura](#8-convenções-de-nomenclatura)
9. [Estratégia de Branches](#9-estratégia-de-branches)
10. [Processo de Release](#10-processo-de-release)
11. [Critérios de Mudança de Versão](#11-critérios-de-mudança-de-versão)

---

## 1. Itens de Configuração (ICs)

Itens de configuração são todos os elementos do sistema que devem ser controlados, versionados e auditados.

### 1.1 Arquivos Fonte (Código)

| ID | Arquivo | Tipo | Criticidade | Observação |
|---|---|---|---|---|
| IC-001 | `index.html` | Markup | Alta | Página principal; estrutura do site |
| IC-002 | `src/css/style.css` | Estilo | Alta | Stylesheet único; tema e layout |
| IC-003 | `src/js/main.js` | Script | Alta | Entry point de JavaScript |
| IC-004 | `src/js/config.js` | Configuração | Alta | Constantes de runtime; NÃO versionar valores reais |
| IC-005 | `src/js/modules/form.js` | Script | Alta | Lógica de formulário e integração com EmailJS/CallMeBot |
| IC-006 | `src/js/modules/animations.js` | Script | Média | Observers de Intersection API |
| IC-007 | `src/js/modules/navigation.js` | Script | Média | Menu mobile e rolagem suave |
| IC-008 | `src/js/modules/counters.js` | Script | Baixa | Animação de contadores numéricos |
| IC-009 | `src/js/modules/territory-bars.js` | Script | Baixa | Animação das barras de território |
| IC-010 | `src/js/modules/tilt.js` | Script | Baixa | Efeito de inclinação nos cartões |
| IC-011 | `src/js/modules/whatsapp.js` | Script | Média | Injeção dinâmica de links WhatsApp |
| IC-012 | `src/js/modules/notifications.js` | Script | Baixa | Toast de notificações |
| IC-013 | `favicon.svg` | Asset | Média | Ícone do site (marca NIE) |

### 1.2 Arquivos de Configuração de Projeto

| ID | Arquivo | Tipo | Criticidade | Observação |
|---|---|---|---|---|
| IC-014 | `.env.example` | Configuração | Alta | Template de variáveis; deve ser mantido atualizado |
| IC-015 | `.env` | Segredo | Alta | **NÃO versionar**; contém credenciais reais |
| IC-016 | `package.json` | Build | Alta | Dependências de dev e scripts npm |
| IC-017 | `netlify.toml` | Deploy | Alta | Configuração de build e headers de segurança |
| IC-018 | `.gitignore` | Controle | Média | Arquivos excluídos do versionamento |
| IC-019 | `.eslintrc.json` | Qualidade | Média | Regras de lint JavaScript |
| IC-020 | `.stylelintrc.json` | Qualidade | Média | Regras de lint CSS |
| IC-021 | `.prettierrc` | Qualidade | Baixa | Configuração de formatação |
| IC-022 | `config/site.config.js` | Configuração | Média | Configurações centralizadas do site |

### 1.3 Documentação

| ID | Arquivo | Tipo | Criticidade | Observação |
|---|---|---|---|---|
| IC-023 | `README.md` | Documentação | Média | Guia principal do projeto |
| IC-024 | `CONFIG_MAP.md` | Documentação | Média | Este arquivo |
| IC-025 | `docs/CHANGELOG.md` | Documentação | Média | Histórico de versões |
| IC-026 | `docs/CONTRIBUTING.md` | Documentação | Baixa | Guia de contribuição |
| IC-027 | `docs/ARCHITECTURE.md` | Documentação | Média | Decisões arquiteturais |
| IC-028 | `docs/services/emailjs.md` | Documentação | Média | Guia de setup EmailJS |
| IC-029 | `docs/services/callmebot.md` | Documentação | Média | Guia de setup CallMeBot |

### 1.4 CI/CD

| ID | Arquivo | Tipo | Criticidade | Observação |
|---|---|---|---|---|
| IC-030 | `.github/workflows/ci.yml` | Pipeline | Alta | Lint e validação em PRs |
| IC-031 | `.github/workflows/deploy.yml` | Pipeline | Alta | Deploy automático na branch main |

---

## 2. Bibliotecas e Dependências

### 2.1 Dependências de Runtime (CDN)

| Biblioteca | Versão | Finalidade | Fonte | Fallback |
|---|---|---|---|---|
| EmailJS Browser SDK | `^4.x` | Envio de formulário de contato | `cdn.jsdelivr.net` | Sem fallback — feature degrada graciosamente |

### 2.2 Fontes (Google Fonts CDN)

| Fonte | Pesos | Uso |
|---|---|---|
| Syne | 400, 600, 700, 800 | Logo "NIE" e elementos de marca |
| Poppins | 300, 400, 500, 600, 700, 800, 400i | Títulos, botões e destaques |
| Plus Jakarta Sans | 300, 400, 500, 600 | Corpo de texto |
| JetBrains Mono | 400, 700 | Labels monospace, etiquetas, código |

> **Risco:** dependência de CDN externo. Plano de mitigação: hospedar fontes localmente em `src/assets/fonts/` para produção. Veja [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md#performance).

### 2.3 Dependências de Desenvolvimento (npm)

| Pacote | Versão | Finalidade |
|---|---|---|
| `live-server` ou `vite` | `latest` | Servidor de dev com live reload |
| `eslint` | `^8.x` | Lint de JavaScript |
| `stylelint` | `^15.x` | Lint de CSS |
| `prettier` | `^3.x` | Formatação de código |
| `stylelint-config-standard` | `latest` | Regras base para Stylelint |
| `dotenv` | `^16.x` | Leitura de `.env` nos scripts Node.js |

> Todas as dependências de dev ficam em `devDependencies` no `package.json` e são instaladas via `npm install`. **Não são enviadas para produção.**

---

## 3. Serviços Externos

| Serviço | Função | Variáveis | Plano | SLA / Limite |
|---|---|---|---|---|
| **EmailJS** | Envio do formulário de contato por e-mail | `EMAILJS_PUBLIC_KEY`, `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID` | Free tier | 200 e-mails/mês |
| **CallMeBot** | Notificação de novo lead via WhatsApp | `CALLMEBOT_PHONE`, `CALLMEBOT_APIKEY` | Gratuito | ~50 mensagens/dia |
| **WhatsApp Web** | Canal comercial direto (botões e formulário) | `WHATSAPP_NUMBER` | — | — |
| **Google Fonts** | Tipografia via CDN | — | Gratuito | Sujeito a disponibilidade CDN |
| **Netlify / Vercel** | Hospedagem e CI/CD | Secrets configurados no painel | Free tier | 100 GB banda/mês |
| **Google Analytics 4** | Análise de tráfego (opcional) | `GA_MEASUREMENT_ID` | Gratuito | — |
| **Sentry** | Monitoramento de erros (opcional) | `SENTRY_DSN` | Free tier | 5k erros/mês |

### Dependências de serviço críticas

```
Formulário funcional = EmailJS (obrigatório) + CallMeBot (degradação suave)
Site no ar = CDN de fontes (degradação suave — fontes fallback no CSS)
Deploy automático = Netlify / Vercel (obrigatório para CI/CD)
```

---

## 4. Ambientes

| Ambiente | Branch | URL | Variáveis |
|---|---|---|---|
| **Development** | qualquer (local) | `http://localhost:3000` | `.env` local |
| **Staging** | `release/*` | `https://staging.nie.com.br` | Painel Netlify (staging) |
| **Production** | `main` | `https://nie.com.br` | Painel Netlify (produção) |

### Promoção entre ambientes

```
feature/* → release/* (QA + revisão) → main (auto-deploy produção)
```

---

## 5. Arquivos Críticos e Sensíveis

### NUNCA versionar

| Arquivo | Motivo |
|---|---|
| `.env` | Contém API keys e credenciais reais |
| Qualquer `*.key`, `*.pem` | Certificados e chaves privadas |
| `secrets.json` | Segredos genéricos |

### SEMPRE versionar

| Arquivo | Motivo |
|---|---|
| `.env.example` | Template documentado sem valores reais |
| `netlify.toml` | Configuração de deploy sem segredos |
| `package.json` | Declaração de dependências |
| Todos os arquivos `src/` | Código-fonte da aplicação |

### Rotação de credenciais

Em caso de vazamento de qualquer credencial:

1. Revogar imediatamente no painel do serviço (EmailJS / CallMeBot)
2. Gerar nova credencial
3. Atualizar nas variáveis de ambiente do Netlify/Vercel
4. Atualizar `.env` local
5. Registrar incidente em `docs/CHANGELOG.md`

---

## 6. Scripts Disponíveis

```bash
npm run dev          # Inicia servidor local com live reload (porta 3000)
npm run build        # Build de produção (copia e minifica para dist/)
npm run lint:js      # Verifica estilo do JavaScript com ESLint
npm run lint:css     # Verifica estilo do CSS com Stylelint
npm run lint         # Executa lint:js + lint:css
npm run format       # Formata todo o código com Prettier
npm run format:check # Verifica formatação sem alterar arquivos
npm run validate:env # Verifica se todas as variáveis obrigatórias existem no .env
npm run inject:config # Injeta variáveis do .env em src/js/config.js (dev only)
npm run check        # lint + format:check + validate:env (usado no CI)
```

---

## 7. Política de Versionamento (SemVer)

Este projeto adota o **Versionamento Semântico 2.0.0** ([semver.org](https://semver.org/lang/pt-BR/)).

### Formato

```
MAJOR.MINOR.PATCH[-PRERELEASE][+BUILD]

Exemplos:
  1.0.0          → Baseline inicial (estável)
  1.1.0          → Nova seção ou funcionalidade adicionada
  1.1.1          → Correção de bug ou ajuste visual
  2.0.0          → Redesign completo ou quebra de compatibilidade
  1.2.0-beta.1   → Pré-release para staging
  1.0.0+20260507 → Metadado de build (data)
```

### Histórico de versões

| Versão | Data | Tipo | Descrição |
|---|---|---|---|
| `v1.0.0` | 2026-05-07 | Baseline | Versão estável inicial do site NIE · Núcleo de Dados |

---

## 8. Convenções de Nomenclatura

### Arquivos e diretórios

| Contexto | Convenção | Exemplo |
|---|---|---|
| Arquivos HTML | `kebab-case` | `index.html`, `politica-privacidade.html` |
| Arquivos CSS | `kebab-case` | `style.css`, `components.css` |
| Arquivos JS (módulos) | `kebab-case` | `form.js`, `territory-bars.js` |
| Arquivos JS (config) | `kebab-case` | `site.config.js` |
| Assets (imagens/ícones) | `kebab-case` | `og-image.jpg`, `icon-territory.svg` |
| Diretórios | `kebab-case` | `src/`, `assets/`, `css/` |
| Documentação | `UPPER_SNAKE_CASE.md` | `README.md`, `CONFIG_MAP.md`, `CHANGELOG.md` |

### CSS (classes e variáveis)

| Tipo | Convenção | Exemplo |
|---|---|---|
| Classes de componente | `kebab-case` (BEM suave) | `.heroi-cartao`, `.zona-linha-azul` |
| Variáveis CSS | `--kebab-case` prefixado por contexto | `--cor-fundo`, `--azul-destaque`, `--fonte-titulo` |
| Classes de estado | `kebab-case` com prefixo de estado | `.campo-invalido`, `.menu-aberto`, `.revelar.visivel` |
| Modificadores | sufixo descritivo | `.botao-primario`, `.botao-secundario`, `.pacote-cartao.destaque` |

### JavaScript

| Tipo | Convenção | Exemplo |
|---|---|---|
| Variáveis e funções | `camelCase` | `animarContador`, `validarCampo`, `exibirNotificacao` |
| Constantes globais | `UPPER_SNAKE_CASE` | `EMAILJS_PUBLIC_KEY`, `CALLMEBOT_PHONE` |
| Funções de módulo | `camelCase` descritivo | `inicializarFormulario()`, `observarContadores()` |
| IDs de elementos HTML | `kebab-case` | `formulario-contato`, `heroi-cartao`, `cabecalho` |
| Data attributes | `data-kebab-case` | `data-contagem`, `data-largura`, `data-whatsapp` |

### Git

| Tipo | Convenção | Exemplo |
|---|---|---|
| Commits | Conventional Commits | `feat: adiciona seção de depoimentos` |
| Branches | `tipo/descricao-curta` | `feature/secao-depoimentos`, `fix/formulario-mobile` |
| Tags | `vMAJOR.MINOR.PATCH` | `v1.0.0`, `v1.1.0`, `v2.0.0` |

#### Prefixos de commit (Conventional Commits)

| Prefixo | Quando usar |
|---|---|
| `feat:` | Nova funcionalidade (gera MINOR) |
| `fix:` | Correção de bug (gera PATCH) |
| `docs:` | Apenas documentação |
| `style:` | Formatação/estilo sem mudança de lógica |
| `refactor:` | Refatoração sem nova feature ou fix |
| `perf:` | Melhoria de performance |
| `chore:` | Tarefas de manutenção (deps, configs) |
| `ci:` | Mudanças em pipelines CI/CD |
| `BREAKING CHANGE:` | Mudança incompatível (gera MAJOR) |

---

## 9. Estratégia de Branches

```
main
│   Branch de produção. Sempre estável.
│   Deploy automático para nie.com.br.
│   Protegida: requer PR + aprovação.
│
├── release/v1.x.x
│   Preparação de release. QA e ajustes finais.
│   Mergeada em main quando aprovada.
│   Deploy automático para staging.nie.com.br.
│
├── feature/nome-da-feature
│   Desenvolvimento de novas funcionalidades.
│   Criada a partir de main (ou release ativa).
│   Mergeada via PR para release/* ou main.
│
├── fix/descricao-do-bug
│   Correções planejadas de bugs.
│   Fluxo igual ao de feature.
│
└── hotfix/descricao-urgente
    Correções críticas em produção.
    Criada a partir de main.
    Mergeada diretamente em main (com tag de PATCH).
    Cherry-pick para release/* ativa se existir.
```

### Regras de proteção da branch `main`

- Requer PR com pelo menos 1 aprovação
- Requer CI passing (lint + validação)
- Push direto desabilitado
- Force push desabilitado

---

## 10. Processo de Release

```
1. Criar branch: git checkout -b release/v1.1.0

2. Atualizar versão:
   - package.json → "version": "1.1.0"
   - docs/CHANGELOG.md → adicionar seção [1.1.0]
   - CONFIG_MAP.md → tabela de histórico de versões

3. Commit de release:
   git commit -m "chore: bump version to 1.1.0"

4. PR para main com label "release"

5. Após merge em main, criar tag:
   git tag -a v1.1.0 -m "Release v1.1.0 — [resumo das mudanças]"
   git push origin v1.1.0

6. Deploy automático é acionado pelo push em main

7. Verificar deploy em nie.com.br

8. Fechar milestone no GitHub (se aplicável)
```

---

## 11. Critérios de Mudança de Versão

### MAJOR (X.0.0) — Mudanças incompatíveis

Situações que geram nova versão MAJOR:

- Redesign completo de identidade visual ou layout
- Mudança de stack tecnológica (ex: migração para framework)
- Reestruturação completa de URLs ou rotas
- Remoção de seções ou funcionalidades existentes
- Mudança de provedores de serviço críticos com alteração de contrato de interface
- Qualquer mudança que torne inválidas integrações existentes

**Requer:** aprovação do responsável técnico + comunicação prévia

### MINOR (0.X.0) — Novas funcionalidades compatíveis

Situações que geram nova versão MINOR:

- Adição de novas seções ao site
- Novos produtos no portfólio
- Novas integrações de serviço (analytics, chat, etc.)
- Adição de novas páginas
- Novos componentes visuais (carrosséis, modais, etc.)
- Expansão do formulário com novos campos

**Requer:** PR revisado + deploy em staging confirmado

### PATCH (0.0.X) — Correções e ajustes

Situações que geram nova versão PATCH:

- Correção de bugs visuais ou de comportamento
- Ajustes de responsividade
- Atualização de textos e conteúdo editorial
- Atualização de preços ou informações de produto
- Correção de links quebrados
- Ajuste de performance (otimização de imagem, lazy load)
- Atualização de dependências de segurança
- Correção de erros de ortografia

**Requer:** PR ou commit direto em `hotfix/` conforme urgência