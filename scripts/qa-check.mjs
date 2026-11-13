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

for (const file of ['styles.css', 'app.js', 'spanixpress.html', 'spanixpress.css', 'spanixpress.js', 'concierge.html', 'concierge.css', 'concierge.js', 'manifest.webmanifest', 'sw.js', 'assets/icon.svg', 'docs/PWA-INSTALLATION.md', 'docs/SPANI-XPRESS-PUBLISHING-ASSISTANT.md']) {
  assert(existsSync(file), 'Required local asset or guide missing: ' + file);
}
assert.equal(manifest.lang, 'en-ZA');
assert.equal(manifest.display, 'standalone');
assert(manifest.icons.some(icon => icon.purpose === 'maskable'), 'Maskable app icon missing');
assert(sw.includes('baccu-ambition-v5'), 'Service worker cache version was not updated for the Concierge release');
assert(sw.includes('./spanixpress.html') && sw.includes('./spanixpress.js'), 'SpaniXpress assistant must be cached for offline use');
assert(sw.includes('./concierge.html') && sw.includes('./concierge.css') && sw.includes('./concierge.js'), 'Ecosystem Concierge app shell must be cached for offline use');
const spanixHtml = readFileSync('spanixpress.html', 'utf8');
const spanixJs = readFileSync('spanixpress.js', 'utf8');
for (const id of ['spanix-form', 'verification-confirm', 'facebook-caption', 'copy-caption', 'copy-application', 'download-image', 'mark-shared']) assert(spanixHtml.includes('id="' + id + '"'), 'SpaniXpress control missing: ' + id);
assert(spanixHtml.includes('https://www.facebook.com/share/g/1Q8yaPsWVt/'), 'SpaniXpress group destination missing');
assert(spanixJs.includes('const buildCaption='), 'SpaniXpress caption builder missing');
assert(spanixJs.includes('protocol===\'https:\''), 'SpaniXpress HTTPS URL guard missing');
assert(spanixJs.includes('confirmCheck.checked'), 'SpaniXpress source attestation missing');
assert(spanixJs.includes('canvas.toBlob'), 'SpaniXpress PNG export missing');
assert(spanixHtml.includes('Direct third-party group publishing is not available'), 'Facebook group publishing boundary missing');

const conciergeHtml = readFileSync('concierge.html', 'utf8');
const conciergeJs = readFileSync('concierge.js', 'utf8');
const conciergeCss = readFileSync('concierge.css', 'utf8');
for (const id of ['source-search', 'source-grid', 'source-empty', 'source-status']) assert(conciergeHtml.includes('id="' + id + '"'), 'Concierge control missing: ' + id);
assert(/id="source-status"[^>]*role="status"[^>]*aria-live="polite"/.test(conciergeHtml), 'Concierge search status must be announced accessibly');
assert(conciergeJs.includes("status.textContent=count===0?"), 'Concierge must announce empty search results');
assert(conciergeCss.includes('.concierge-search input:focus-visible'), 'Concierge search input needs a visible keyboard focus indicator');
assert(conciergeHtml.includes('data-keywords="learnership learnerships"'), 'SA Youth must be searchable by learnership terms');
assert(conciergeHtml.includes('data-keywords="bursaries"'), 'Funza Lushaka must be searchable by bursaries');
assert(conciergeJs.includes('dataset.keywords'), 'Concierge search must include keyword aliases');
for (const url of ['https://www.gov.za/government-jobs-week', 'https://www.labour.gov.za/Vacancies/Pages/Vacancies-List.aspx', 'https://sayouth.mobi/', 'https://rems.ekurhuleni.gov.za/eRecruitment/', 'https://www.nyda.gov.za/', 'https://www.nsfas.org.za/', 'https://www.funzalushaka.doe.gov.za/']) assert(conciergeHtml.includes(url), 'Concierge official source missing: ' + url);
assert(conciergeHtml.includes('target="_blank" rel="noopener noreferrer"'), 'Concierge must open original provider sites safely');
assert(conciergeHtml.includes('not a claim that every opportunity is open'), 'Concierge source verification disclaimer missing');
assert(conciergeJs.includes('function apply()') && conciergeJs.includes('dataset.sourceFilter'), 'Concierge search and filters missing');
assert(conciergeCss.includes('@media(max-width:760px)'), 'Concierge mobile layout missing');
assert(html.includes('class="platform-grid"') && html.includes('platform-card-featured'), 'Five-destination homepage layout missing');
assert(html.includes('href="concierge.html"'), 'Homepage Concierge gateway missing');
for (const id of ['opportunities', 'toolkit', 'connect', 'about']) assert(html.includes('id="' + id + '"'), 'Original homepage section removed: ' + id);
for (const label of ['Opportunity Hub', 'AI Toolkit', 'Youth Connect', 'About BACCU', 'SpaniXpress']) assert(html.includes(label), 'Original homepage destination missing: ' + label);

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

console.log('BACCU static QA passed: core platform, SpaniXpress publishing assistant, verification safeguards, PWA setup and one deployment workflow.');
