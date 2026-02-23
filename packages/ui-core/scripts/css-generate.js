import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const systemName = process.argv[2];
if (!systemName) {
  console.error('Usage: node css-generate.js <system-name>');
  process.exit(1);
}

const ROOT = path.resolve(__dirname, '..');
const TOKEN_PATH = path.join(ROOT, 'src', 'tokens', `${systemName}.token.json`);
const STYLES_DIR = path.join(ROOT, 'src', 'styles', systemName);
const THEME_PREFIX = systemName;

if (!fs.existsSync(TOKEN_PATH)) {
  console.error(`Token file not found: ${TOKEN_PATH}`);
  console.error(
    `Expected: src/tokens/${systemName}.token.json (e.g. custom.token.json for "custom")`
  );
  process.exit(1);
}

const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));

console.log(`Generating CSS from tokens (${systemName})...`);
console.log(`  Token file: ${path.resolve(TOKEN_PATH)}`);

function jsonToCssVars(obj, prefix = '-') {
  let css = '';
  for (const key in obj) {
    const value = obj[key];
    const newPrefix = `${prefix}-${key}`;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      if ('value' in value) {
        css += `  ${newPrefix}: ${value.value};\n`;
      } else {
        css += jsonToCssVars(value, newPrefix);
      }
    } else if (Array.isArray(value)) {
      css += `  ${newPrefix}: ${value.join(', ')};\n`;
    } else if (typeof value === 'number' || typeof value === 'string') {
      css += `  ${newPrefix}: ${value};\n`;
    }
  }
  return css;
}

let baseCssBody = jsonToCssVars(tokens.global);
if (tokens.components) {
  baseCssBody += jsonToCssVars(tokens.components);
}

const baseCssContent = `:root[data-theme^="${THEME_PREFIX}-"] {\n${baseCssBody}\n}\n`;
const baseCssPath = path.join(STYLES_DIR, 'base.css');

if (!fs.existsSync(STYLES_DIR)) {
  fs.mkdirSync(STYLES_DIR, { recursive: true });
}

fs.writeFileSync(baseCssPath, baseCssContent);
console.log(`Generated ${baseCssPath}`);

const themes = tokens.schemes || tokens.themes || {};
const themeNames = Object.keys(themes);
themeNames.forEach(themeName => {
  const themeTokens = themes[themeName];
  const cssContent = `:root[data-theme="${THEME_PREFIX}-${themeName}"] {\n${jsonToCssVars(themeTokens)}\n}\n`;
  const filePath = path.join(STYLES_DIR, `${themeName}.css`);
  fs.writeFileSync(filePath, cssContent);
  console.log(`Generated ${filePath}`);
});

// 진입 CSS 생성: import '@ui-system/core/styles/<systemName>.css' 한 번에 로드
const STYLES_ROOT = path.join(ROOT, 'src', 'styles');
const entryLines = [
  `/* ${systemName} 테마: base + 테마별 CSS 한 번에 로드 (build:tokens:${systemName}로 생성) */`,
  `@import './${systemName}/base.css';`,
  ...themeNames.map(name => `@import './${systemName}/${name}.css';`),
];
const entryPath = path.join(STYLES_ROOT, `${systemName}.css`);
fs.writeFileSync(entryPath, entryLines.join('\n') + '\n');
console.log(`Generated ${entryPath}`);

console.log('CSS generation complete.');
