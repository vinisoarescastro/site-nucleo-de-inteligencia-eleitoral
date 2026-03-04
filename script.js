/* ============================================
   NIE · Núcleo de Inteligência Eleitoral
   JavaScript v2.1 — com EmailJS + CallMeBot
   ============================================ */
'use strict';

/* ============================================
   CONFIGURAÇÕES — PREENCHA ANTES DE PUBLICAR
   ============================================
   
   1. EMAILJS
      → Acesse: https://www.emailjs.com
      → Crie conta gratuita
      → Conecte seu Gmail (Email Services → Add New Service)
      → Crie um template (Email Templates → Create New Template)
        Use as variáveis: {{from_name}}, {{from_email}}, {{phone}},
        {{cargo}}, {{estado}}, {{produto}}, {{message}}
      → Copie: Public Key, Service ID e Template ID

   2. CALLMEBOT (WhatsApp)
      → No WhatsApp, adicione o contato: +34 644 60 49 23
      → Envie a mensagem: "I allow callmebot to send me messages"
      → Você receberá uma API key
      → Preencha CALLMEBOT_PHONE com seu número completo (ex: 5561999999999)

   3. WHATSAPP DIRETO (botão)
      → Preencha WHATSAPP_NUMERO com seu número (ex: 5561999999999)
   ============================================ */

const EMAILJS_PUBLIC_KEY  = 'NU6kVmZR88bXo7roX';        // ex: 'aBcDeFgHiJ...'
const EMAILJS_SERVICE_ID  = 'service_zf34jew';          // ex: 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'template_1xd5byr';         // ex: 'template_xyz789'
const CALLMEBOT_PHONE     = '5562999504750';            // ex: '5561999999999'
const CALLMEBOT_APIKEY    = '1512332';                  // ex: '123456'
const WHATSAPP_NUMERO     = '5562999504750';            // ex: '5561999999999'

/* ===== INICIALIZAÇÃO DO EMAILJS ===== */
(function inicializarEmailJS() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
})();

/* ===== INJETAR NÚMERO DE WHATSAPP NOS BOTÕES ===== */
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('[data-whatsapp]').forEach(function(el) {
    var texto = encodeURIComponent(el.dataset.whatsapp || 'Olá! Gostaria de conhecer os serviços do NIE.');
    el.href = 'https://wa.me/' + WHATSAPP_NUMERO + '?text=' + texto;
  });
});

/* ===== CABECALHO COM EFEITO DE ROLAGEM ===== */
const cabecalho = document.getElementById('cabecalho');
window.addEventListener('scroll', () => {
  cabecalho.classList.toggle('rolado', window.scrollY > 40);
});

/* ===== MENU MOBILE ===== */
const botaoMenuMobile = document.querySelector('.nav-menu-mobile');
const menuExpandido   = document.querySelector('.nav-menu-expandido');

botaoMenuMobile?.addEventListener('click', () => {
  botaoMenuMobile.classList.toggle('aberto');
  menuExpandido.classList.toggle('aberto');
});

document.querySelectorAll('.nav-menu-expandido a').forEach(link => {
  link.addEventListener('click', () => {
    botaoMenuMobile?.classList.remove('aberto');
    menuExpandido?.classList.remove('aberto');
  });
});

/* ===== ROLAGEM SUAVE PARA ANCORAS ===== */
document.querySelectorAll('a[href^="#"]').forEach(ancora => {
  ancora.addEventListener('click', evento => {
    const href = ancora.getAttribute('href');
    if (!href || href === '#') return; // ignora âncoras vazias
    evento.preventDefault();
    const alvo = document.querySelector(href);
    if (alvo) {
      const topoAlvo = alvo.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topoAlvo, behavior: 'smooth' });
    }
  });
});

/* ===== ANIMACAO DE ENTRADA (REVELAR) ===== */
const observadorReveal = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) entrada.target.classList.add('visivel');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.revelar').forEach(elemento => observadorReveal.observe(elemento));

/* ===== BARRAS DE TERRITORIO ===== */
const observadorBarras = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.querySelectorAll('.preenchimento-territorio').forEach(barra => {
        barra.style.width = barra.dataset.largura;
      });
      observadorBarras.unobserve(entrada.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.barras-territorio').forEach(elemento => observadorBarras.observe(elemento));

/* ===== ANIMACAO DE CONTADORES ===== */
function animarContador(elemento, valorAlvo, duracao) {
  duracao = duracao || 2000;
  const inicio       = performance.now();
  const temDecimal   = String(valorAlvo).includes('.');
  const sufixo       = elemento.dataset.sufixo  || '';
  const prefixo      = elemento.dataset.prefixo || '';

  const atualizar = function(tempo) {
    const decorrido  = tempo - inicio;
    const progresso  = Math.min(decorrido / duracao, 1);
    const suavizado  = 1 - Math.pow(1 - progresso, 3);
    const valorAtual = temDecimal
      ? (suavizado * valorAlvo).toFixed(1)
      : Math.round(suavizado * valorAlvo);

    elemento.textContent = prefixo + valorAtual + sufixo;
    if (progresso < 1) requestAnimationFrame(atualizar);
  };

  requestAnimationFrame(atualizar);
}

const observadorContador = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      animarContador(entrada.target, parseFloat(entrada.target.dataset.contagem));
      observadorContador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-contagem]').forEach(function(el) {
  observadorContador.observe(el);
});

/* ===== VALIDACAO DO FORMULARIO ===== */
const formulario          = document.getElementById('formulario-contato');
const formularioConteudo  = document.getElementById('formulario-conteudo');
const formularioResultado = document.getElementById('formulario-resultado');

function validarCampo(grupo, entrada) {
  var valor = entrada.value.trim();
  var tipo  = entrada.type || entrada.tagName.toLowerCase();
  var valido = true;

  if (entrada.required && !valor) {
    valido = false;
  } else if (tipo === 'email' && valor) {
    valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
  } else if (entrada.name === 'phone' && valor) {
    valido = /^[\d\s\(\)\-\+]{8,}$/.test(valor);
  }

  grupo.classList.toggle('campo-invalido', !valido);
  return valido;
}

if (formulario) {
  formulario.querySelectorAll('.campo-entrada, .campo-selecao, .campo-texto').forEach(function(entrada) {
    entrada.addEventListener('blur', function() {
      var grupo = entrada.closest('.campo-grupo');
      if (grupo) validarCampo(grupo, entrada);
    });
    entrada.addEventListener('input', function() {
      var grupo = entrada.closest('.campo-grupo');
      if (grupo && grupo.classList.contains('campo-invalido')) validarCampo(grupo, entrada);
    });
  });

  formulario.addEventListener('submit', async function(evento) {
    evento.preventDefault();
    var tudoValido = true;

    formulario.querySelectorAll(
      '.campo-entrada[required], .campo-selecao[required], .campo-texto[required]'
    ).forEach(function(entrada) {
      var grupo = entrada.closest('.campo-grupo');
      if (grupo && !validarCampo(grupo, entrada)) tudoValido = false;
    });

    if (!tudoValido) {
      exibirNotificacao('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    var botaoEnviar = formulario.querySelector('.botao-enviar');
    botaoEnviar.innerHTML = '<span class="spinner-envio"></span> Enviando...';
    botaoEnviar.disabled  = true;

    /* — Coleta dos dados — */
    var dados = {
      from_name : document.getElementById('nome').value.trim(),
      from_email: document.getElementById('email').value.trim(),
      phone     : document.getElementById('telefone').value.trim(),
      cargo     : document.getElementById('cargo').value,
      estado    : document.getElementById('estado').value,
      produto   : document.getElementById('produto').value || 'Não informado',
      message   : document.getElementById('mensagem').value.trim(),
    };

    try {
      /* ── 1. Envio do e-mail via EmailJS ── */
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, dados);

      /* ── 2. Notificação no WhatsApp via CallMeBot ── */
      var textoWA =
        '🗳️ *Novo Lead NIE*\n\n' +
        '👤 Nome: ' + dados.from_name + '\n' +
        '📧 Email: ' + dados.from_email + '\n' +
        '📱 Tel: ' + dados.phone + '\n' +
        '🏛️ Cargo: ' + dados.cargo + ' · ' + dados.estado + '\n' +
        '📦 Produto: ' + dados.produto + '\n\n' +
        '💬 Mensagem:\n' + dados.message.substring(0, 300) +
        (dados.message.length > 300 ? '...' : '');

      var urlCallMeBot =
        'https://api.callmebot.com/whatsapp.php' +
        '?phone='  + CALLMEBOT_PHONE +
        '&text='   + encodeURIComponent(textoWA) +
        '&apikey=' + CALLMEBOT_APIKEY;

      /* Dispara sem aguardar (não bloqueia o fluxo em caso de falha no CallMeBot) */
      fetch(urlCallMeBot).catch(function() {
        console.warn('NIE: CallMeBot não disponível. E-mail foi enviado normalmente.');
      });

      /* ── 3. Exibe sucesso ── */
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

/* ===== NOTIFICACAO (TOAST) ===== */
function exibirNotificacao(mensagem, duracao) {
  duracao = duracao || 4000;
  var notificacao = document.querySelector('.notificacao');
  if (!notificacao) {
    notificacao           = document.createElement('div');
    notificacao.className = 'notificacao';
    document.body.appendChild(notificacao);
  }
  notificacao.textContent = mensagem;
  notificacao.classList.add('visivel');
  setTimeout(function() { notificacao.classList.remove('visivel'); }, duracao);
}

/* ===== EFEITO DE INCLINACAO NOS CARTOES ===== */
document.querySelectorAll('.servico-cartao, .pacote-cartao, .perfil-cartao').forEach(function(cartao) {
  cartao.addEventListener('mousemove', function(evento) {
    var area = cartao.getBoundingClientRect();
    var x    = (evento.clientX - area.left) / area.width  - 0.5;
    var y    = (evento.clientY - area.top)  / area.height - 0.5;
    cartao.style.transform = 'perspective(800px) rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 6) + 'deg) translateY(-4px)';
  });
  cartao.addEventListener('mouseleave', function() {
    cartao.style.transform = '';
  });
});