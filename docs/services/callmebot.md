# Setup CallMeBot — NIE · Núcleo de Dados

## O que é o CallMeBot?

O [CallMeBot](https://www.callmebot.com) é uma API gratuita que permite enviar mensagens WhatsApp via HTTP. O site NIE usa como canal secundário de alerta de novo lead (o canal primário é o EmailJS).

---

## Ativação (obrigatória — 1 vez por número)

O CallMeBot exige uma ativação manual via WhatsApp antes de aceitar requisições:

1. Salve o número **+34 644 68 27 71** nos seus contatos como "CallMeBot"
2. Envie a mensagem exata: `I allow callmebot to send me messages`
3. Aguarde a resposta com sua **API Key** (ex: `1512332`)
4. Anote a API Key — ela será usada em `.env`

> ⚠️ A ativação é vinculada ao número. Se mudar o número, repita o processo.

---

## Variáveis necessárias

```env
CALLMEBOT_PHONE=5562999504750   # Número destino (sem + ou espaços)
CALLMEBOT_APIKEY=1512332        # API Key recebida na ativação
```

---

## Como funciona no projeto

Após envio bem-sucedido pelo EmailJS, o código dispara uma requisição GET para a API CallMeBot:

```
https://api.callmebot.com/whatsapp.php
  ?phone=5562999504750
  &text=*Novo Lead NIE*...
  &apikey=1512332
```

A mensagem inclui todos os dados do lead formatados em Markdown WhatsApp.

### Degradação suave

O `fetch()` para CallMeBot é feito com `.catch()` silencioso:

```js
fetch(urlCallMeBot).catch(() => {
  console.warn('CallMeBot indisponível. E-mail enviado normalmente.');
});
```

Isso garante que uma falha no CallMeBot **não impede** o envio do lead por e-mail.

---

## Limites

| Limite | Valor |
|---|---|
| Mensagens por dia | ~50 (não documentado oficialmente) |
| Custo | Gratuito |
| Garantia de SLA | Nenhuma (serviço não-oficial) |

---

## Alternativas para alto volume

| Serviço | Custo | SLA |
|---|---|---|
| **Twilio WhatsApp API** | Pago (por mensagem) | Enterprise |
| **WhatsApp Business Cloud API** | Gratuito até 1k/mês | Oficial Meta |
| **Z-API / WPPConnect** | Pago (SaaS) | Não-oficial |

---

## Troubleshooting

| Sintoma | Causa provável | Solução |
|---|---|---|
| Mensagem não chega | Número não ativado | Repetir ativação com o bot |
| `apikey invalid` | API Key incorreta | Verificar `.env` e reativar se necessário |
| Silêncio total (sem erro) | CallMeBot fora do ar | Verificar status no Twitter @callmebot |
| Limite diário atingido | ~50 mensagens/dia | Aguardar reset ou migrar para Twilio |