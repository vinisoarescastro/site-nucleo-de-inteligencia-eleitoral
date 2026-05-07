/* ============================================
   NIE · src/js/modules/form.js
   Módulo: Formulário de contato
   - Inicialização do EmailJS
   - Validação de campos
   - Envio via EmailJS + notificação CallMeBot
   ============================================ */
'use strict';

import { validarEmail, validarTelefone } from '../utils/validators.js';
import { qs } from '../utils/dom.js';
import { exibirNotificacao } from './notifications.js';

// Configuração injetada pelo pipeline (ver src/js/config.js)
const {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  CALLMEBOT_PHONE,
  CALLMEBOT_APIKEY,
} = window.NIE_CONFIG || {};

/**
 * Inicializa o SDK do EmailJS com a chave pública.
 * Chamada antes de qualquer envio.
 */
export function inicializarEmailJS() {
  if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
}

/**
 * Valida um campo individualmente e aplica/remove classe de erro.
 * @param {HTMLElement} grupo - .campo-grupo pai
 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} entrada
 * @returns {boolean}
 */
function validarCampo(grupo, entrada) {
  const valor = entrada.value.trim();
  const tipo  = entrada.type || entrada.tagName.toLowerCase();
  let valido  = true;

  if (entrada.required && !valor) {
    valido = false;
  } else if (tipo === 'email' && valor) {
    valido = validarEmail(valor);
  } else if (entrada.name === 'phone' && valor) {
    valido = validarTelefone(valor);
  }

  grupo.classList.toggle('campo-invalido', !valido);
  return valido;
}

/**
 * Constrói e envia a notificação WhatsApp via CallMeBot.
 * Falha silenciosa: não bloqueia o fluxo principal.
 * @param {object} dados
 */
function notificarCallMeBot(dados) {
  if (!CALLMEBOT_PHONE || !CALLMEBOT_APIKEY) {
    console.warn('NIE: CallMeBot não configurado — notificação WhatsApp ignorada.');
    return;
  }

  const textoWA =
    '🗳️ *Novo Lead NIE*\n\n' +
    `👤 Nome: ${dados.from_name}\n` +
    `📧 Email: ${dados.from_email}\n` +
    `📱 Tel: ${dados.phone}\n` +
    `🏛️ Cargo: ${dados.cargo} · ${dados.estado}\n` +
    `📦 Produto: ${dados.produto}\n\n` +
    `💬 Mensagem:\n${dados.message.substring(0, 300)}` +
    (dados.message.length > 300 ? '...' : '');

  const url =
    'https://api.callmebot.com/whatsapp.php' +
    `?phone=${CALLMEBOT_PHONE}` +
    `&text=${encodeURIComponent(textoWA)}` +
    `&apikey=${CALLMEBOT_APIKEY}`;

  fetch(url).catch(() => {
    console.warn('NIE: CallMeBot indisponível. E-mail foi enviado normalmente.');
  });
}

/**
 * Inicializa o formulário de contato:
 * - Validação em blur/input
 * - Envio via EmailJS
 * - Notificação via CallMeBot (secundário)
 * - Estado de sucesso
 */
export function inicializarFormulario() {
  const formulario          = qs('#formulario-contato');
  const formularioConteudo  = qs('#formulario-conteudo');
  const formularioResultado = qs('#formulario-resultado');

  if (!formulario) { return; }

  // Validação em tempo real
  formulario.querySelectorAll('.campo-entrada, .campo-selecao, .campo-texto').forEach((entrada) => {
    entrada.addEventListener('blur', () => {
      const grupo = entrada.closest('.campo-grupo');
      if (grupo) { validarCampo(grupo, entrada); }
    });

    entrada.addEventListener('input', () => {
      const grupo = entrada.closest('.campo-grupo');
      if (grupo && grupo.classList.contains('campo-invalido')) {
        validarCampo(grupo, entrada);
      }
    });
  });

  // Envio do formulário
  formulario.addEventListener('submit', async(evento) => {
    evento.preventDefault();
    let tudoValido = true;

    formulario.querySelectorAll(
      '.campo-entrada[required], .campo-selecao[required], .campo-texto[required]',
    ).forEach((entrada) => {
      const grupo = entrada.closest('.campo-grupo');
      if (grupo && !validarCampo(grupo, entrada)) { tudoValido = false; }
    });

    if (!tudoValido) {
      exibirNotificacao('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const botaoEnviar = formulario.querySelector('.botao-enviar');
    botaoEnviar.innerHTML = '<span class="spinner-envio"></span> Enviando...';
    botaoEnviar.disabled  = true;

    const dados = {
      from_name : qs('#nome').value.trim(),
      from_email: qs('#email').value.trim(),
      phone     : qs('#telefone').value.trim(),
      cargo     : qs('#cargo').value,
      estado    : qs('#estado').value,
      produto   : qs('#produto').value || 'Não informado',
      message   : qs('#mensagem').value.trim(),
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, dados);

      notificarCallMeBot(dados);

      formularioConteudo.style.display = 'none';
      formularioResultado.classList.add('visivel');
      exibirNotificacao('Mensagem enviada com sucesso!');

    } catch (erro) {
      console.error('NIE: Erro no envio —', erro);
      botaoEnviar.innerHTML = 'Enviar solicitação →';
      botaoEnviar.disabled  = false;
      exibirNotificacao('Erro ao enviar. Verifique sua conexão e tente novamente.', 6000);
    }
  });
}