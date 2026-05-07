/* ============================================
   NIE · Núcleo de Dados
   src/js/main.js — Entry Point v2.0
   
   Orquestra a inicialização de todos os módulos.
   Substitui o monolítico script.js da v1.x.
   
   Dependências externas carregadas via CDN:
   - EmailJS (window.emailjs)
   ============================================ */
'use strict';

import { inicializarEmailJS }    from './modules/form.js';
import { inicializarNavegacao }  from './modules/navigation.js';
import { inicializarCabecalho }  from './modules/header.js';
import { inicializarWhatsApp }   from './modules/whatsapp.js';
import { inicializarAnimacoes }  from './modules/animations.js';
import { inicializarContadores } from './modules/counters.js';
import { inicializarBarras }     from './modules/territory-bars.js';
import { inicializarTilt }       from './modules/tilt.js';
import { inicializarFormulario } from './modules/form.js';

/**
 * Ponto de entrada principal.
 * Todos os módulos são inicializados após o DOM estar pronto.
 */
document.addEventListener('DOMContentLoaded', () => {
  inicializarEmailJS();
  inicializarWhatsApp();
  inicializarCabecalho();
  inicializarNavegacao();
  inicializarAnimacoes();
  inicializarContadores();
  inicializarBarras();
  inicializarTilt();
  inicializarFormulario();
});