/* ============================================
   NIE · config/site.config.js
   Configurações centralizadas do site
   (sem segredos — apenas metadados e textos)
   ============================================ */
'use strict';

const SITE_CONFIG = Object.freeze({
  // identidade
  nome:        'NIE · Núcleo de Dados',
  tagline:     'Transformando dados em votos.',
  descricao:   'Inteligência eleitoral baseada em dados públicos, georreferenciamento e modelagem preditiva.',
  url:         'https://nie.com.br',
  autor:       'Vinicius Soares Castro',
  ano:         2026,

  // versão
  versao: '1.0.0',

  // contato 
  respostaHoras: 24,

  // produtos
  totalProdutos: 12,
  linhasProduto: 5,

  // estatisticas
  estatisticas: {
    candidatosBrasil: 500,    // em milhar (k+)
    municipiosMapeados: 5570,
    totalProdutos: 12,
  },
});

module.exports = SITE_CONFIG;