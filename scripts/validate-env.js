#!/usr/bin/env node
// scripts/validate-env.js
// Valida se todas as variáveis de ambiente obrigatórias estão definidas
// Uso: npm run validate:env

'use strict';

const path = require('path');
const fs = require('fs');

// Carrega .env se existir (ambiente de desenvolvimento)
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
}

const REQUIRED_VARS = [
  'EMAILJS_PUBLIC_KEY',
  'EMAILJS_SERVICE_ID',
  'EMAILJS_TEMPLATE_ID',
  'CALLMEBOT_PHONE',
  'CALLMEBOT_APIKEY',
  'WHATSAPP_NUMBER',
];

const OPTIONAL_VARS = [
  'GA_MEASUREMENT_ID',
  'GTM_CONTAINER_ID',
  'SENTRY_DSN',
  'ASSETS_CDN_URL',
];

console.log('\nNIE · Validando variáveis de ambiente...\n');

let hasErrors = false;

// Verificar obrigatórias
REQUIRED_VARS.forEach((varName) => {
  const value = process.env[varName];
  if (!value || value.trim() === '') {
    console.error(`  OBRIGATÓRIA ausente: ${varName}`);
    hasErrors = true;
  } else {
    const masked = value.slice(0, 4) + '****';
    console.log(`  [OK] ${varName} = ${masked}`);
  }
});

// Verificar opcionais (sem erro, apenas aviso)
console.log('\nVariáveis opcionais:');
OPTIONAL_VARS.forEach((varName) => {
  const value = process.env[varName];
  if (!value || value.trim() === '') {
    console.log(`  ⬜ ${varName} = (não definida)`);
  } else {
    const masked = value.slice(0, 4) + '****';
    console.log(`  [OK] ${varName} = ${masked}`);
  }
});

if (hasErrors) {
  console.error('\nValidação falhou. Configure as variáveis obrigatórias no .env\n');
  console.error('   Consulte .env.example para referência.\n');
  process.exit(1);
} else {
  console.log('\nTodas as variáveis obrigatórias estão definidas.\n');
  process.exit(0);
}