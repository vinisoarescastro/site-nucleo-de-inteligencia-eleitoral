# Setup EmailJS — NIE · Núcleo de Dados

## O que é o EmailJS?

O [EmailJS](https://www.emailjs.com) permite enviar e-mails diretamente do JavaScript client-side, sem servidor. O site NIE usa para notificar sobre novos leads do formulário de contato.

---

## Configuração passo a passo

### 1. Criar conta
Acesse [emailjs.com](https://www.emailjs.com) e crie uma conta gratuita.
O plano free permite **200 e-mails por mês**.

### 2. Adicionar serviço de e-mail
1. No painel, vá em **Email Services** → **Add New Service**
2. Escolha o provedor (Gmail, Outlook, SMTP customizado, etc.)
3. Autorize o acesso
4. Copie o **Service ID** gerado (ex: `service_zf34jew`)
5. Cole em `.env`: `EMAILJS_SERVICE_ID=service_xxxxxxx`

### 3. Criar template de e-mail
1. Vá em **Email Templates** → **Create New Template**
2. Configure o assunto e corpo do e-mail usando variáveis:

```
Assunto: Novo Lead NIE — {{from_name}}

De: {{from_name}} <{{from_email}}>
Telefone: {{phone}}
Cargo: {{cargo}} · {{estado}}
Produto: {{produto}}

Mensagem:
{{message}}
```

3. Copie o **Template ID** (ex: `template_1xd5byr`)
4. Cole em `.env`: `EMAILJS_TEMPLATE_ID=template_xxxxxxx`

### 4. Obter a Public Key
1. Vá em **Account** → **General** → **Public Key**
2. Cole em `.env`: `EMAILJS_PUBLIC_KEY=xxxxxxxxxx`

### 5. Configurar domínio autorizado (segurança)
1. Vá em **Account** → **Security**
2. Adicione o domínio do site: `nie.com.br`
3. Isso impede que outras origens usem sua Public Key

---

## Variáveis necessárias

```env
EMAILJS_PUBLIC_KEY=sua_public_key
EMAILJS_SERVICE_ID=service_xxxxxxx
EMAILJS_TEMPLATE_ID=template_xxxxxxx
```

---

## Variáveis de template disponíveis

O código em `src/js/modules/form.js` envia estas variáveis:

| Variável | Origem | Exemplo |
|---|---|---|
| `from_name` | Campo "Nome completo" | João Silva |
| `from_email` | Campo "E-mail" | joao@exemplo.com |
| `phone` | Campo "Telefone" | (62) 99999-9999 |
| `cargo` | Select "Cargo / situação" | Deputado(a) Estadual |
| `estado` | Select "Estado" | GO |
| `produto` | Select "Produto de interesse" | NIE-01 · Diagnóstico Territorial |
| `message` | Campo "Descreva seu cenário" | Texto livre |

---

## Limite do plano gratuito

- 200 e-mails/mês
- Para mais volume: upgrade em emailjs.com/pricing

---

## Troubleshooting

| Sintoma | Causa provável | Solução |
|---|---|---|
| Formulário retorna erro | Public Key inválida | Verificar `.env` e console do navegador |
| E-mail não chega | Serviço de e-mail desconectado | Reconectar no painel EmailJS |
| "Unauthorized" | Domínio não autorizado | Adicionar domínio nas configurações de segurança |
| Limite excedido | 200 e-mails/mês atingidos | Upgrade de plano |