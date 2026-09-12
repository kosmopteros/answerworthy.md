import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sync = join(root, 'scripts/sync-surfaces.mjs');
test('a synchronized consumer verifies offline and against the source; an edited definition fails', () => {
  assert.ok(existsSync(sync), 'the sync command must exist');
  const dir = mkdtempSync(join(tmpdir(), 'aw-sync-test-'));
  try {
    const make = spawnSync(process.execPath, [sync, '--revision', 'a'.repeat(40), '--role', 'engine', dir], {encoding:'utf8'});
    assert.equal(make.status, 0, make.stderr);
    mkdirSync(join(dir,'lib/product'),{recursive:true});
    mkdirSync(join(dir,'lib/standard'),{recursive:true});
    writeFileSync(join(dir,'lib/product/positioning.ts'),'// fixture consumer');
    writeFileSync(join(dir,'lib/standard/wd-contracts.ts'),'// fixture consumer');
    const verify = () => spawnSync(process.execPath, [join(dir,'scripts/check-answerworthy-sync.mjs'), '--source',root], {encoding:'utf8', cwd:dir});
    assert.equal(verify().status, 0);
    const contract = join(dir,'contracts/answerworthy-surface-contract.v1.json');
    const original = readFileSync(contract,'utf8');
    writeFileSync(contract, original.replace('organic reach','paid reach'));
    assert.notEqual(verify().status, 0);
    writeFileSync(contract, original);
    assert.equal(verify().status, 0);
  } finally { rmSync(dir,{recursive:true,force:true}); }
});
test('checking a stale consumer never rewrites it', () => {
  assert.ok(existsSync(sync), 'the sync command must exist');
  const dir = mkdtempSync(join(tmpdir(),'aw-sync-check-'));
  try {
    spawnSync(process.execPath,[sync,'--revision','a'.repeat(40),'--role','commercial',dir]);
    const p = join(dir,'contracts/answerworthy-surface-contract.v1.json');
    writeFileSync(p,'{}\n');
    const result = spawnSync(process.execPath,[sync,'--revision','a'.repeat(40),'--role','commercial','--check',dir]);
    assert.notEqual(result.status,0);
    assert.equal(readFileSync(p,'utf8'),'{}\n');
  } finally { rmSync(dir,{recursive:true,force:true}); }
});
