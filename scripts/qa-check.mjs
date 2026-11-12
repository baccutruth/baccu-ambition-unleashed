import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const js = readFileSync('app.js', 'utf8');
const css = readFileSync('styles.css', 'utf8');
const sw = readFileSync('sw.js', 'utf8');
const manifest = JSON.parse(readFileSync('manifest.webmanifest', 'utf8'));

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

for (const file of ['styles.css', 'app.js', 'manifest.webmanifest', 'sw.js', 'assets/icon.svg', 'docs/PWA-INSTALLATION.md']) {
  assert(existsSync(file), 'Required local asset or guide missing: ' + file);
}
assert.equal(manifest.lang, 'en-ZA');
assert.equal(manifest.display, 'standalone');
assert(manifest.icons.some(icon => icon.purpose === 'maskable'), 'Maskable app icon missing');
assert(sw.includes('baccu-ambition-v3'), 'Service worker cache version was not updated');

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

assert(html.includes('Links marked ↗ open official external websites'), 'External-link guidance missing');
assert(js.includes('navigator.onLine'), 'Offline link guard missing');
assert(js.includes('Reconnect to open official external websites'), 'Offline explanation missing');
assert(js.includes("a[target=\"_blank\"]"), 'External-link click handling missing');
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

console.log('BACCU static QA passed: page sections, local fallback, official links, PWA setup and one deployment workflow.');
