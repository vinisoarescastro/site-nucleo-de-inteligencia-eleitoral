#!/usr/bin/env node
// scripts/build.js
// Build de produção: valida env, injeta config, copia arquivos para dist/
// Uso: npm run build

'use strict';

const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

// ─── Utilitários ────────────────────────────────────────────
function log(msg) { console.log(`  ${msg}`); }
function err(msg) { console.error(`  ❌ ${msg}`); }

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) { return; }
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath  = path.join(src,  entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

// ─── Build ──────────────────────────────────────────────────
console.log('\n  NIE · Build de produção\n');

// 1. Limpar dist/
if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true, force: true });
  log('[ LIXEIRA ]  dist/ limpo');
}
fs.mkdirSync(DIST, { recursive: true });

// 2. Injetar configuração
try {
  require('./inject-config');
} catch (e) {
  err('Falha ao injetar configuração: ' + e.message);
  process.exit(1);
}

// 3. Copiar arquivos para dist/
const filesToCopy = [
  ['index.html', 'index.html'],
  ['favicon.svg', 'favicon.svg'],
  ['src/css/style.css', 'src/css/style.css'],
  ['src/js/config.js', 'src/js/config.js'],
  ['src/js/main.js', 'src/js/main.js'],
];

filesToCopy.forEach(([src, dest]) => {
  const srcPath  = path.join(ROOT, src);
  const destPath = path.join(DIST, dest);
  if (fs.existsSync(srcPath)) {
    copyFile(srcPath, destPath);
    log(`[ FILE ] ${dest}`);
  } else {
    log(`[ ! ]  ${src} não encontrado, ignorado`);
  }
});

// Copiar módulos JS
copyDir(path.join(ROOT, 'src/js/modules'), path.join(DIST, 'src/js/modules'));
log('[ PASTA ] src/js/modules/');

// Copiar utils JS
copyDir(path.join(ROOT, 'src/js/utils'), path.join(DIST, 'src/js/utils'));
log('[ PASTA ]  src/js/utils/');

// Copiar assets
copyDir(path.join(ROOT, 'src/assets'), path.join(DIST, 'src/assets'));
log('[ PASTA ]  src/assets/');

// 4. Substituir referências de scripts no index.html (script.js → src/js/main.js)
const indexPath = path.join(DIST, 'index.html');
if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, 'utf8');
  html = html.replace(/<script src="script\.js(\?v=\d+)?"><\/script>/g,
    '<script src="src/js/config.js"></script>\n<script src="src/js/main.js" type="module"></script>');
  fs.writeFileSync(indexPath, html, 'utf8');
  log('🔧 Referências de script atualizadas no index.html');
}

console.log('\n✅ Build concluído! Arquivos em dist/\n');