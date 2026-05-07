# CHANGELOG

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/)
e este projeto adota [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [Não publicado]

> Mudanças planejadas que ainda não foram lançadas em produção.

---

## [1.0.0] — 2026-05-07

### Baseline — Versão estável inicial

Esta é a primeira versão oficial documentada e tagueada do site NIE · Núcleo de Dados.

#### Adicionado
- Página institucional completa com seções: Herói, Clientes, Sobre, Metodologia, Serviços, Diferenciais, Pacotes, Perfis, Contato e Rodapé
- Framework metodológico GRID™ apresentado visualmente
- Dashboard territorial simulado com gauge SVG e barras animadas
- Formulário de contato com validação client-side
- Integração com EmailJS para envio de leads por e-mail
- Integração com CallMeBot para notificação de leads via WhatsApp
- Botão flutuante de WhatsApp com tooltip
- Links WhatsApp pré-preenchidos em múltiplos CTAs
- Sistema de toast de notificações
- Animações de entrada via IntersectionObserver
- Animação de contadores numéricos
- Efeito de inclinação (tilt) nos cartões de serviço
- Cabeçalho com efeito de scroll (transparente → sólido)
- Menu mobile com animação hamburguer
- Rolagem suave corrigida (compatível com links WhatsApp)
- Design responsivo (320px — 1920px)
- Seção de segmentos atendidos com lista numerada (redesign editorial)
- Ícones SVG inline em substituição a emojis (ícones de valores, pontos de contato, sucesso)
- Favicon SVG com identidade NIE
- 12 produtos organizados em 5 linhas estratégicas
- Tabela de diferenciais NIE vs. mercado convencional
- 3 pacotes de campanha + 5 modalidades de retainer
- 6 perfis de clientes com avatares
- Seção PDCA Político para clientes de mandato

#### Infraestrutura
- Estrutura de repositório reorganizada seguindo boas práticas de mercado
- `.gitignore` configurado para stack HTML/CSS/JS + Node.js tooling
- `.env.example` com todas as variáveis documentadas
- `README.md` completo com guia de instalação, configuração e deploy
- `CONFIG_MAP.md` com todos os ICs, política de versionamento e estratégia de branches
- `docs/CONTRIBUTING.md` com guia de contribuição
- `docs/ARCHITECTURE.md` com decisões arquiteturais
- `docs/services/emailjs.md` com guia de setup
- `docs/services/callmebot.md` com guia de setup
- `netlify.toml` com headers de segurança e configuração de build
- `package.json` com scripts de lint, format e build
- `.eslintrc.json`, `.stylelintrc.json`, `.prettierrc`
- Workflows GitHub Actions: `ci.yml` e `deploy.yml`

---

[Não publicado]: https://github.com/seu-usuario/nie-nucleo-dados/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/seu-usuario/nie-nucleo-dados/releases/tag/v1.0.0