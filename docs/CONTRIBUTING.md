# Guia de Contribuição — NIE · Núcleo de Dados

Obrigado pelo interesse em contribuir! Este documento define o processo para propor mudanças, reportar problemas e submeter código.

---

## Código de Conduta

Todos os contribuidores devem respeitar a confidencialidade do projeto. Informações sobre clientes, estratégias comerciais e credenciais não devem ser expostas em commits, issues ou PRs públicos.

---

## Antes de começar

1. Leia o [README.md](../README.md)
2. Leia o [CONFIG_MAP.md](../CONFIG_MAP.md)
3. Configure o ambiente local (veja [Instalação](../README.md#instalação))
4. Verifique se já existe uma issue aberta para o que você quer fazer

---

## Reportar um bug

Use o template em `.github/ISSUE_TEMPLATE/bug_report.md`.

Inclua obrigatoriamente:
- Versão do site afetado (`v1.0.0`, etc.)
- Navegador e versão
- Passos para reproduzir
- Comportamento esperado vs. observado
- Screenshot ou gravação de tela (se aplicável)

---

## Propor uma melhoria

Use o template em `.github/ISSUE_TEMPLATE/feature_request.md`.

---

## Fluxo de trabalho

```bash
# 1. Crie sua branch a partir de main
git checkout main
git pull origin main
git checkout -b feature/nome-da-sua-feature

# 2. Faça seus commits seguindo Conventional Commits
git commit -m "feat: adiciona seção de depoimentos de clientes"
git commit -m "fix: corrige alinhamento do menu mobile em iOS"

# 3. Execute as verificações locais antes do PR
npm run check

# 4. Envie sua branch
git push origin feature/nome-da-sua-feature

# 5. Abra um Pull Request para main (ou release/* ativa)
```

---

## Convenções de commit

Seguimos [Conventional Commits](https://www.conventionalcommits.org/pt-br/):

```
tipo(escopo-opcional): descrição curta em português

Corpo opcional com mais detalhes.

Rodapé opcional (ex: Closes #123)
```

**Tipos aceitos:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `chore`, `ci`

**Exemplos válidos:**
```
feat: adiciona animação de entrada na seção de pacotes
fix: corrige scroll suave em Safari 14
docs: atualiza guia de setup do CallMeBot
style: normaliza espaçamento nas classes de formulário
chore: atualiza eslint para v9
```

---

## Checklist do Pull Request

Antes de solicitar revisão, confirme:

- [ ] `npm run check` passa sem erros
- [ ] Testado em Chrome, Firefox e Safari (desktop)
- [ ] Testado em mobile (320px e 768px)
- [ ] Nenhuma credencial ou segredo foi commitado
- [ ] `docs/CHANGELOG.md` atualizado (se for feature ou fix relevante)
- [ ] Título do PR segue Conventional Commits

---

## Padrões de código

### HTML
- Indentação: 2 espaços
- Atributos em ordem: `id`, `class`, `type`, `href`/`src`, `data-*`, `aria-*`
- Usar `aria-label` em elementos interativos sem texto visível

### CSS
- Usar variáveis CSS do `:root` sempre que possível
- Não adicionar valores mágicos (usar variáveis ou comentários explicativos)
- Mobile-first: base → `@media (min-width: 768px)` → `@media (min-width: 1024px)`

### JavaScript
- Sem `var`; usar `const` por padrão, `let` quando necessário
- Sem dependências adicionais sem aprovação
- Funções descritivas em português (padrão do projeto)
- Comentários em português

---

## Dúvidas?

Abra uma issue com a label `question` ou entre em contato diretamente via WhatsApp comercial.