import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = p => readFileSync(resolve(root, p), 'utf8');
const sections = ['Sources', 'Scope', 'Outcomes', 'State', 'Actions', 'Maintenance'];

test('the standalone starter and example use the same public source and six-section handoff', () => {
  assert.ok(existsSync(resolve(root, 'README.md')), 'the standalone specification must exist');
  for (const path of ['template/answerworthy.md', 'examples/acme/answerworthy.md']) {
    const text = read(path);
    assert.deepEqual([...text.matchAll(/^## (.+)$/gm)].map(m => m[1]), sections);
    assert.ok(text.includes('standard: "https://raw.githubusercontent.com/answerworthy/answerworthy.md/main/README.md"'));
    assert.ok(text.includes('answerworthy: "1.0"'));
  }
});
test('the example carries real prepared material and names the next operation', () => {
  assert.ok(existsSync(resolve(root, 'examples/acme/answerworthy.md')), 'a worked continuation is required');
  const text = read('examples/acme/answerworthy.md');
  const actions = text.split('## Actions\n')[1].split('## Maintenance')[0];
  assert.ok(actions.includes('operation:'));
  assert.ok(actions.includes('#### Prepared material'));
  assert.ok(actions.includes('prerequisites: []'));
  assert.ok(actions.includes('state: done'));
  assert.ok(actions.includes('state: ready'));
  assert.ok(actions.includes('state: waiting-human'));
  assert.ok(existsSync(resolve(root, 'examples/acme/materials.md')));
});
test('public offer definitions keep the Standard independent and the Plan wider', () => {
  assert.ok(existsSync(resolve(root, 'surface-contract.json')), 'one public offer definition must exist');
  const c = JSON.parse(read('surface-contract.json'));
  assert.equal(c.standard.requiresPaidPlan, false);
  assert.equal(c.read.includesActions, true);
  assert.equal(c.plan.purchase, 'one-time');
  assert.equal(c.plan.requiresStandardDefect, false);
  assert.ok(c.plan.outcomes.includes('qualified organic reach'));
});
