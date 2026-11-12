import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const js = readFileSync('app.js', 'utf8');
const manifest = JSON.parse(readFileSync('manifest.webmanifest', 'utf8'));
const sw = readFileSync('sw.js', 'utf8');
const css = readFileSync('styles.css', 'utf8');

const requiredSections = ['home', 'opportunities', 'toolkit', 'connect', 'about'];
const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1]);
assert.equal(ids.length, new Set(ids).size, 'HTML contains duplicate IDs');

for (const id of requiredSections) {
  assert(ids.includes(id), 'Missing required section id: ' + id);
}
for (const id of ['primary-nav', 'opportunity-search', 'opportunity-grid', 'no-results', 'prompt-role', 'prompt-experience', 'generated-prompt', 'toast', 'year']) {
  assert(ids.includes(id), 'Missing JavaScript/UI target: ' + id);
}

assert.match(html, /<html lang="en-ZA">/, 'Document language must be en-ZA');
assert.match(html, /<meta name="viewport"/, 'Viewport meta tag is required');
assert.match(html, /<link rel="manifest" href="manifest.webmanifest"/, 'Manifest link is missing');
assert.match(html, /<script src="app.js" defer><\/script>/, 'App script must be deferred');
assert.match(html, /BACCU shares information for educational purposes\. Opportunities remain subject to provider requirements, eligibility and selection decisions\. BACCU does not guarantee employment, funding or earnings\./, 'Trust disclaimer is missing or changed');

const localRefs = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)].map(match => match[1]);
for (const ref of localRefs) {
  if (/^(https?:|mailto:|tel:|#|data:|javascript:)/i.test(ref)) continue;
  const path = ref.split(/[?#]/)[0].replace(/^\.\//, '');
  if (path) assert(existsSync(path), 'Missing local asset referenced by HTML: ' + ref);
}

const externalAnchors = [...html.matchAll(/<a\b[^>]*href=["']https?:\/\/[^"']+["'][^>]*>/gi)].map(match => match[0]);
for (const anchor of externalAnchors) {
  assert.match(anchor, /rel=["'][^"']*noopener[^"']*["']/, 'External link missing rel=noopener: ' + anchor);
  assert.match(anchor, /target=["']_blank["']/, 'External link should open in a new tab consistently: ' + anchor);
}

assert.equal(manifest.lang, 'en-ZA', 'Manifest language should be en-ZA');
assert.equal(manifest.display, 'standalone', 'PWA display should be standalone');
for (const icon of manifest.icons ?? []) {
  assert(existsSync(icon.src), 'Manifest icon does not exist: ' + icon.src);
}

const shellMatch = sw.match(/const APP_SHELL=\[([^\]]*)\]/);
assert(shellMatch, 'Service worker app shell list is missing');
const shellPaths = [...shellMatch[1].matchAll(/['"]([^'"]+)['"]/g)].map(match => match[1]);
for (const path of shellPaths) {
  const localPath = path.replace(/^\.\//, '');
  if (localPath) assert(existsSync(localPath), 'Service worker cache asset is missing: ' + path);
}

const sourceDirectory = html.match(/<div class="resource-list">([\\s\\S]*?)<\\/div>/);
assert(sourceDirectory, 'Official source directory is missing');
const requiredOfficialSources = [
  'https://bursaries.ekurhuleni.gov.za/',
  'https://sayouth.mobi/',
  'https://www.nyda.gov.za/',
  'https://www.sedfa.org.za/',
  'https://mict.org.za/',
  'https://www.dhet.gov.za/',
  'https://www.gov.za/',
  'https://www.gov.za/issues/government-and-opportunities-youth',
  'https://www.nsfas.org.za/',
  'https://www.funzalushaka.doe.gov.za/',
  'https://rems.ekurhuleni.gov.za/eRecruitment/',
  'https://gptaf.ekurhuleni.gov.za/',
  'https://www.ekurhuleni.gov.za/category/press-releases/youth/'
];
for (const source of requiredOfficialSources) {
  assert(sourceDirectory[1].includes('href="' + source + '"'), 'Missing official source link: ' + source);
}
const sourceCards = [...sourceDirectory[1].matchAll(/<a class="resource"\\b/g)];
assert.equal(sourceCards.length, requiredOfficialSources.length, 'Official source directory count changed; review before release');
assert.match(sourceDirectory[1], /City of Ekurhuleni — Community Bursary/, 'Local Ekurhuleni source must remain first');
assert.match(sourceDirectory[1], /SA Youth/, 'National SA Youth channel must remain in the directory');

assert.match(js, /function filterOpportunities\(/, 'Opportunity filtering function is missing');
assert.match(js, /navigator\.serviceWorker\.register/, 'Service worker registration is missing');
assert.match(css, /@media\(max-width:680px\)/, 'Mobile breakpoint is missing');
assert.match(css, /prefers-reduced-motion:reduce/, 'Reduced-motion support is missing');
assert(!/<script[^>]+src=["']https?:\/\//i.test(html), 'Unexpected third-party script dependency found');

console.log('BACCU static release checks passed.');
console.log('Sections: ' + requiredSections.join(', '));
console.log('External links checked for safe target attributes: ' + externalAnchors.length);
console.log('Service-worker shell assets checked: ' + shellPaths.length);
