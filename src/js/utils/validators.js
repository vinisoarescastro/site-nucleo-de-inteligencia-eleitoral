/* ============================================
   NIE · src/js/utils/validators.js
   Funções puras de validação
   (sem side effects, sem acesso ao DOM)
   ============================================ */
'use strict';

/**
 * Valida formato de e-mail (RFC 5322 simplificado)
 * @param {string} valor
 * @returns {boolean}
 */
export function validarEmail(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

/**
 * Valida número de telefone brasileiro
 * Aceita: (99) 9999-9999, (99) 99999-9999, +55...
 * @param {string} valor
 * @returns {boolean}
 */
export function validarTelefone(valor) {
  return /^[\d\s\(\)\-\+]{8,}$/.test(valor);
}

/**
 * Verifica se uma string não está vazia após trim
 * @param {string} valor
 * @returns {boolean}
 */
export function naoVazio(valor) {
  return typeof valor === 'string' && valor.trim().length > 0;
}

/**
 * Verifica se um valor está dentro de um conjunto de opções permitidas
 * @param {string} valor
 * @param {string[]} opcoes
 * @returns {boolean}
 */
export function opcaoValida(valor, opcoes) {
  return opcoes.includes(valor);
}