import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

class ElementMock {
  constructor(text = '') {
    this._textContent = text;
    this.value = '';
    this.hidden = false;
    this.dataset = {};
    this.attributes = {};
    this.events = {};
    this.classes = new Set();
    this.children = [];
    this.style = {};
    this.classList = {
      add: name => this.classes.add(name),
      remove: name => this.classes.delete(name),
      contains: name => this.classes.has(name),
      toggle: (name, force) => {
        const enabled = force === undefined ? !this.classes.has(name) : force;
        enabled ? this.classes.add(name) : this.classes.delete(name);
        return enabled;
      }
    };
  }
  get textContent() { return this._textContent + this.children.map(child => child.textContent || '').join(''); }
  set textContent(value) { this._textContent = String(value); this.children = []; }
  addEventListener(type, handler) { (this.events[type] ||= []).push(handler); }
  setAttribute(name, value) { this.attributes[name] = value; }
  getAttribute(name) { return this.attributes[name]; }
  append(...nodes) { this.children.push(...nodes); }
  appendChild(node) { this.children.push(node); return node; }
  replaceChildren(...nodes) { this.children = [...nodes]; }
  querySelectorAll() { return []; }
  focus() {}
  select() {}
  remove() {}
  async fire(type, event = {}) {
    for (const handler of this.events[type] || []) await handler(event);
  }
}

const menu = new ElementMock();
const nav = new ElementMock();
const search = new ElementMock();
const empty = new ElementMock();
const grid = new ElementMock();
const loading = new ElementMock();
const filters = ['all', 'learnerships', 'grants', 'entrepreneurship', 'ai-digital'].map(value => {
  const button = new ElementMock(value);
  button.dataset.filter = value;
  return button;
});
const prompts = Array.from({ length: 4 }, (_, index) => {
  const button = new ElementMock('Copy Prompt');
  button.dataset.prompt = 'Ready prompt ' + (index + 1);
  return button;
});
const role = new ElementMock();
const experience = new ElementMock();
const generated = new ElementMock();
const build = new ElementMock();
const copyBuilt = new ElementMock();
const toast = new ElementMock();
const install = new ElementMock();
const year = new ElementMock();
const ids = new Map([
  ['.menu-toggle', menu], ['#primary-nav', nav], ['#year', year],
  ['#opportunity-search', search], ['#opportunity-grid', grid],
  ['#opportunity-loading', loading], ['#no-results', empty],
  ['#prompt-role', role], ['#prompt-experience', experience],
  ['#generated-prompt', generated], ['#build-prompt', build],
  ['#copy-built-prompt', copyBuilt], ['#toast', toast], ['#install-app', install],
  ['#install-banner', new ElementMock()], ['#install-message', new ElementMock()],
  ['#dismiss-install', new ElementMock()]
]);
const document = {
  baseURI: 'https://example.test/',
  body: new ElementMock(),
  querySelector: selector => ids.get(selector) || null,
  querySelectorAll: selector => selector === '.filter' ? filters : selector === '.prompt-button' ? prompts : [],
  addEventListener() {},
  createElement: () => new ElementMock(),
  createElementNS: () => new ElementMock()
};
const copied = [];
const sampleOpportunities = [
  { title: 'Ekurhuleni Bursary', summary: 'Local support', category: 'grants', provider: 'City', opportunity_type: 'Grant', eligibility: 'Youth', location: 'Ekurhuleni', application_status: 'Open', closing_date: '30 Nov 2026', last_verified_date: '2026-11-14', source_url: 'https://example.test/source', apply_url: 'https://example.test/apply' },
  { title: 'Learnership Pathway', summary: 'Skills and work', category: 'learnerships', provider: 'Provider', opportunity_type: 'Learnership', eligibility: 'Youth', location: 'National', application_status: 'Guidance', closing_date: 'Not stated', last_verified_date: '2026-11-14', source_url: 'https://example.test/source', apply_url: 'https://example.test/apply' },
  { title: 'Digital Skills', summary: 'Online learning', category: 'ai-digital', provider: 'Provider', opportunity_type: 'Learning', eligibility: 'Youth', location: 'National', application_status: 'Guidance', closing_date: 'Not stated', last_verified_date: '2026-11-14', source_url: 'https://example.test/source', apply_url: 'https://example.test/apply' },
  { title: 'Small Enterprise Support', summary: 'Business planning', category: 'entrepreneurship', provider: 'Provider', opportunity_type: 'Support', eligibility: 'Youth', location: 'National', application_status: 'Guidance', closing_date: 'Not stated', last_verified_date: '2026-11-14', source_url: 'https://example.test/source', apply_url: 'https://example.test/apply' }
];
const context = {
  document,
  window: { isSecureContext: true, addEventListener() {} },
  navigator: { clipboard: { writeText: async value => copied.push(value) }, serviceWorker: { register: async () => ({}) } },
  location: { protocol: 'https:', href: 'https://example.test/' },
  fetch: async () => ({ ok: true, json: async () => ({ opportunities: sampleOpportunities }) }),
  setTimeout: () => 1,
  clearTimeout() {},
  console,
  Promise
};
vm.runInNewContext(readFileSync('app.js', 'utf8'), context);
await new Promise(resolve => setImmediate(resolve));

await filters[1].fire('click');
assert.equal(grid.children.filter(card => !card.hidden).length, 1, 'Learnership filter should show one matching card');
assert.equal(filters[1].getAttribute('aria-pressed'), 'true');
search.value = 'Ekurhuleni';
await search.fire('input');
assert.equal(grid.children.filter(card => !card.hidden).length, 0, 'Search should combine with the selected category');
search.value = '';
await search.fire('input');
assert.equal(grid.children.filter(card => !card.hidden).length, 1, 'Clearing search should restore the category result');
await filters[0].fire('click');
assert.equal(grid.children.filter(card => !card.hidden).length, 4, 'All filter should restore every card');
search.value = 'nothing matches';
await search.fire('input');
assert.equal(grid.children.filter(card => !card.hidden).length, 0);
assert.equal(empty.hidden, false, 'No-results message should appear');
search.value = '';
await search.fire('input');
assert.equal(empty.hidden, true, 'No-results message should clear');

role.value = 'Retail assistant';
experience.value = 'Customer service, till operations';
await build.fire('click');
assert.match(generated.value, /Retail assistant/);
assert.match(generated.value, /Customer service, till operations/);
assert.match(generated.value, /without inventing qualifications/);
await copyBuilt.fire('click');
assert.equal(copied[0], generated.value, 'Builder prompt copy button should copy generated prompt');

await prompts[0].fire('click');
assert.equal(copied[1], prompts[0].dataset.prompt);
assert.equal(prompts[0].textContent, 'Copied!', 'Toolkit Copy Prompt button should confirm with Copied!');
assert.equal(prompts[0].classList.contains('copied'), true);

console.log('BACCU interaction QA passed: current category filters, combined search, empty state, prompt builder and Copy Prompt confirmation.');
