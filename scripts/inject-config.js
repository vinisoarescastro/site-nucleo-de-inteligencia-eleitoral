#!/usr/bin/env node
// scripts/inject-config.js
// Injeta variáveis de ambiente em src/js/config.js
// Uso: npm run inject:config
//
// SEGURANÇA: Este arquivo NUNCA deve ser commitado com valores reais.
// O arquivo src/js/config.js gerado está no .gitignore.

'use strict';

const path = require('path');
const fs = require('fs');

// Carrega .env
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
} else {
  console.warn('[ ! ] .env não encontrado. Usando variáveis do ambiente do sistema.');
}

const config = {
  EMAILJS_PUBLIC_KEY:  process.env.EMAILJS_PUBLIC_KEY  || '',
  EMAILJS_SERVICE_ID:  process.env.EMAILJS_SERVICE_ID  || '',
  EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID || '',
  CALLMEBOT_PHONE:     process.env.CALLMEBOT_PHONE     || '',
  CALLMEBOT_APIKEY:    process.env.CALLMEBOT_APIKEY    || '',
  WHATSAPP_NUMBER:     process.env.WHATSAPP_NUMBER     || '',
};

const output = `// ============================================================
// ARQUIVO GERADO AUTOMATICAMENTE — NÃO EDITAR MANUALMENTE
// Execute: npm run inject:config
// Gerado em: ${new Date().toISOString()}
// ============================================================
/* eslint-disable */
'use strict';

const NIE_CONFIG = Object.freeze({
  EMAILJS_PUBLIC_KEY:  '${config.EMAILJS_PUBLIC_KEY}',
  EMAILJS_SERVICE_ID:  '${config.EMAILJS_SERVICE_ID}',
  EMAILJS_TEMPLATE_ID: '${config.EMAILJS_TEMPLATE_ID}',
  CALLMEBOT_PHONE:     '${config.CALLMEBOT_PHONE}',
  CALLMEBOT_APIKEY:    '${config.CALLMEBOT_APIKEY}',
  WHATSAPP_NUMBER:     '${config.WHATSAPP_NUMBER}',
});
`;

const outputPath = path.resolve(__dirname, '../src/js/config.js');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, output, 'utf8');

console.log('[OK] src/js/config.js gerado com sucesso.');