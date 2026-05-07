/* ============================================
   NIE · src/js/utils/dom.js
   Helpers de manipulação do DOM
   ============================================ */
'use strict';

/**
 * Atalho para document.querySelector
 * @param {string} seletor
 * @param {Element} [contexto=document]
 * @returns {Element|null}
 */
export function qs(seletor, contexto = document) {
  return contexto.querySelector(seletor);
}

/**
 * Atalho para document.querySelectorAll (retorna Array)
 * @param {string} seletor
 * @param {Element} [contexto=document]
 * @returns {Element[]}
 */
export function qsa(seletor, contexto = document) {
  return Array.from(contexto.querySelectorAll(seletor));
}

/**
 * Adiciona event listener com retorno da função de remoção
 * @param {Element} elemento
 * @param {string} evento
 * @param {Function} handler
 * @param {object} [opcoes]
 * @returns {Function} — chame para remover o listener
 */
export function on(elemento, evento, handler, opcoes) {
  if (!elemento) { return () => {}; }
  elemento.addEventListener(evento, handler, opcoes);
  return () => elemento.removeEventListener(evento, handler, opcoes);
}

/**
 * Aguarda o DOM estar pronto
 * @param {Function} callback
 */
export function pronto(callback) {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback, { once: true });
  }
}