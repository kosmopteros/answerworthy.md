#!/usr/bin/env node
import { readFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, relative, isAbsolute } from 'node:path';
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const within = (root, path) => {
  const full = resolve(root, path), rel = relative(root, full);
  if (isAbsolute(rel) || rel === '..' || rel.startsWith('../')) throw new Error(`Path outside checkout: ${path}`);
  return full;
};
const args = process.argv.slice(2);
let root = process.cwd(), source = null, remote = false;
for (let i=0;i<args.length;i++) {
  if (args[i] === '--root' && args[i+1]) root = resolve(args[++i]);
  else if (args[i] === '--source' && args[i+1]) source = resolve(args[++i]);
  else if (args[i] === '--remote') remote = true;
  else throw new Error(`Unknown or incomplete argument: ${args[i]}`);
}
const errors = [];
try {
  const lock = JSON.parse(await readFile(within(root,'answerworthy-sync.lock.json'),'utf8'));
  if (lock.schemaVersion !== 'answerworthy-sync-v1' || lock.sourceRepository !== 'answerworthy/answerworthy.md'
      || !/^[a-f0-9]{40}$/.test(lock.sourceRevision) || !Array.isArray(lock.files) || !lock.files.length) {
    throw new Error('Invalid synchronization lock.');
  }
  const targets = new Set();
  for (const file of lock.files) {
    if (targets.has(file.target)) throw new Error(`Duplicate managed target: ${file.target}`);
    targets.add(file.target);
    const bytes = await readFile(within(root,file.target));
    if (hash(bytes) !== file.sha256) errors.push(`${file.target}: differs from the locked source`);
    if (source) {
      const upstream = await readFile(within(source,file.source));
      if (hash(upstream) !== file.sha256) errors.push(`${file.target}: source checkout differs from release`);
    }
    if (remote) {
      const path = file.source.split('/').map(encodeURIComponent).join('/');
      const response = await fetch(`https://raw.githubusercontent.com/${lock.sourceRepository}/${lock.sourceRevision}/${path}`,
        { signal: AbortSignal.timeout(15000) });
      if (!response.ok) throw new Error(`Pinned source unavailable: HTTP ${response.status} for ${file.source}`);
      if (hash(Buffer.from(await response.arrayBuffer())) !== file.sha256) errors.push(`${file.target}: differs from pinned upstream revision`);
    }
  }
  // These are explicit ownership declarations, not prose classification rules.
  // Each consumer test renders/checks its actual integration separately.
  for (const path of lock.consumers ?? []) await access(within(root,path));
  console.log(JSON.stringify({ release: lock.release, sourceRevision: lock.sourceRevision,
    role: lock.role, verifiedFiles: lock.files.length,
    sourceVerification: remote ? 'pinned-upstream' : source ? 'source-checkout' : 'locked-files',
    status: errors.length ? 'failed' : 'passed', errors },null,2));
  process.exitCode = errors.length ? 1 : 0;
} catch (error) {
  console.error(JSON.stringify({status:'failed',errors:[error instanceof Error ? error.message : String(error)]}));
  process.exitCode = 1;
}
