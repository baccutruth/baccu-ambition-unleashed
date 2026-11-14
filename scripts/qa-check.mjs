import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const js = readFileSync('app.js', 'utf8');
const css = readFileSync('styles.css', 'utf8');
const sw = readFileSync('sw.js', 'utf8');
const manifest = JSON.parse(readFileSync('manifest.webmanifest', 'utf8'));
const manifestJson = JSON.parse(readFileSync('manifest.json', 'utf8'));

for (const id of ['home', 'opportunities', 'toolkit', 'connect', 'about', 'primary-nav', 'opportunity-search', 'opportunity-grid', 'no-results', 'prompt-role', 'prompt-experience', 'generated-prompt', 'install-app']) {
  assert(html.includes('id="' + id + '"'), 'Required page element missing: ' + id);
}
assert(html.includes('lang="en-ZA"'), 'South African English document language missing');
assert(html.includes('assets/icon.svg'), 'App icon reference missing');
assert(html.includes('rel="apple-touch-icon"'), 'Home-screen icon reference missing');
assert(html.includes('<strong>Android:</strong>'), 'Android install guidance missing');
assert(html.includes('<strong>iPhone:</strong>'), 'iPhone install guidance missing');
assert(html.includes('currently reporting an error'), 'Ekurhuleni portal warning missing');
assert(html.includes('Applications close 30 November 2026'), 'Ekurhuleni notice deadline missing');
const coverArtTag = html.match(/<img\\b[^>]*src="assets\\/cover-art\\.webp"[^>]*>/)?.[0] || '';
assert(coverArtTag.includes('width="220"'), 'Hero cover art width missing');
assert(coverArtTag.includes('height="220"'), 'Hero cover art height missing');
assert(coverArtTag.includes('alt="BACCU Ambition Unleashed Royal Crest"'), 'Hero cover art alt text missing');
for (const title of ['CV &amp; Cover Letter Builder', 'Interview Preparation', 'Small Business &amp; Side-Hustle Planning', 'Personal Budgeting']) assert(html.includes('<h3>' + title + '</h3>'), 'AI Toolkit card missing: ' + title);
assert.equal((html.match(/class="prompt-button"/g) || []).length, 4, 'All four AI Toolkit cards must have a Copy Prompt button');

for (const file of ['styles.css', 'app.js', 'spanixpress.html', 'spanixpress.css', 'spanixpress.js', 'manifest.webmanifest', 'manifest.json', 'sw.js', 'assets/icon.svg', 'assets/cover-art.webp', 'assets/icon-192.png', 'assets/icon-512.png', 'docs/PWA-INSTALLATION.md', 'docs/SPANI-XPRESS-PUBLISHING-ASSISTANT.md']) {
  assert(existsSync(file), 'Required local asset or guide missing: ' + file);
}
assert.equal(manifest.lang, 'en-ZA');
assert.equal(manifest.display, 'standalone');
for (const currentManifest of [manifest, manifestJson]) {
  assert(currentManifest.icons.some(icon => icon.src === 'assets/icon-192.png' && icon.sizes === '192x192' && icon.type === 'image/png'), '192px PNG app icon missing');
  assert(currentManifest.icons.some(icon => icon.src === 'assets/icon-512.png' && icon.sizes === '512x512' && icon.type === 'image/png' && icon.purpose.includes('maskable')), '512px maskable PNG app icon missing');
}
assert(sw.includes("CACHE_NAME = 'baccu-ambition-v8'"), 'Service worker cache version must be v8');
for (const asset of ['./assets/cover-art.webp', './assets/icon-192.png', './assets/icon-512.png']) assert(sw.includes(asset), 'PWA precache asset missing: ' + asset);
assert(sw.includes('./spanixpress.html') && sw.includes('./spanixpress.js'), 'SpaniXpress assistant must be cached for offline use');
const spanixHtml = readFileSync('spanixpress.html', 'utf8');
const spanixJs = readFileSync('spanixpress.js', 'utf8');
for (const id of ['spanix-form', 'verification-confirm', 'facebook-caption', 'copy-caption', 'copy-application', 'download-image', 'mark-shared']) assert(spanixHtml.includes('id="' + id + '"'), 'SpaniXpress control missing: ' + id);
assert(spanixHtml.includes('https://www.facebook.com/share/g/1Q8yaPsWVt/'), 'SpaniXpress group destination missing');
assert(spanixJs.includes('const buildCaption='), 'SpaniXpress caption builder missing');
assert(spanixJs.includes('protocol===\'https:\''), 'SpaniXpress HTTPS URL guard missing');
assert(spanixJs.includes('confirmCheck.checked'), 'SpaniXpress source attestation missing');
assert(spanixJs.includes('canvas.toBlob'), 'SpaniXpress PNG export missing');
assert(spanixHtml.includes('Direct third-party group publishing is not available'), 'Facebook group publishing boundary missing');

const officialSources = [
  'https://www.ekurhuleni.gov.za/campaigns/applications-for-the-2027-community-bursary-programme-now-open/',
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
for (const url of officialSources) assert(html.includes(url), 'Official source link missing: ' + url);
assert(html.indexOf(officialSources[0]) < html.indexOf('https://sayouth.mobi/'), 'Ekurhuleni notice must appear before national directory links');

assert(js.includes('function filterOpportunities()'), 'Search/filter function missing');
assert(js.includes("dataset.filter"), 'Category filter wiring missing');
assert(js.includes('generatedPrompt.value='), 'Prompt builder output missing');
assert(js.includes('beforeinstallprompt'), 'Install prompt handler missing');
assert(js.includes('navigator.serviceWorker.register'), 'Service worker registration missing');
assert(css.includes('@media(max-width:680px)'), 'Mobile breakpoint missing');
assert(css.includes('prefers-reduced-motion:reduce'), 'Reduced-motion support missing');

assert(existsSync('.github/workflows/static.yml'), 'Canonical Pages deployment workflow missing');
assert(existsSync('.github/workflows/release-checks.yml'), 'Release checks workflow missing');
assert(!existsSync('.github/workflows/jekyll-gh-pages.yml'), 'Duplicate Jekyll deployment workflow remains');
assert(!existsSync('.github/workflows/deploy-pages.yml'), 'Duplicate manual deployment workflow remains');
assert(readFileSync('.github/workflows/static.yml', 'utf8').includes('Deploy BACCU Ambition Unleashed to GitHub Pages'));

console.log('BACCU static QA passed: core platform, v8 PWA shell assets and manifests, AI Toolkit cards, SpaniXpress safeguards and deployment workflow.');
