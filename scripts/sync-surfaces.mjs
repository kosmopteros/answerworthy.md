#!/usr/bin/env node
// Run from the canonical Standard checkout; no runtime network dependency.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2), destinations=[];
let revision, role, check=false;
for (let i=0;i<args.length;i++) {
  if (args[i]==='--revision' && args[i+1]) revision=args[++i];
  else if (args[i]==='--role' && args[i+1]) role=args[++i];
  else if (args[i]==='--check') check=true;
  else if (args[i].startsWith('--')) throw new Error(`Unknown argument: ${args[i]}`);
  else destinations.push(resolve(args[i]));
}
if (!revision || !/^[a-f0-9]{40}$/.test(revision) || !['engine','gateway','commercial','mirror'].includes(role) || !destinations.length)
  throw new Error('Usage: node scripts/sync-surfaces.mjs --revision <40-char-source-SHA> --role engine|gateway|commercial|mirror [--check] <checkout>...');
const text = await readFile(resolve(root,'surface-contract.json'),'utf8');
const contract = JSON.parse(text), mirror=role==='mirror';
const sourceFiles=['README.md','template/answerworthy.md','examples/acme/answerworthy.md','examples/acme/materials.md'];
const mappings=sourceFiles.map(source=>({source,target:mirror?source:`vendor/answerworthy-standard/${source}`}));
mappings.push({source:'surface-contract.json',target:mirror?'surface-contract.json':'contracts/answerworthy-surface-contract.v1.json'});
mappings.push({source:'scripts/check-sync.mjs',target:'scripts/check-answerworthy-sync.mjs'});
const consumers = {engine:['lib/product/positioning.ts','lib/standard/wd-contracts.ts'],
  gateway:['lib/positioning.ts','lib/standard.ts'],commercial:['lib/positioning.ts'],mirror:[]}[role];
const files=await Promise.all(mappings.map(async file=>{
  const bytes=await readFile(resolve(root,file.source));
  return {...file,bytes,sha256:createHash('sha256').update(bytes).digest('hex')};
}));
for (const dest of destinations) {
  const lock={schemaVersion:'answerworthy-sync-v1',release:contract.release,role,
    sourceRepository:'answerworthy/answerworthy.md',sourceRevision:revision,standardVersion:contract.standard.version,
    files:files.map(({source,target,sha256})=>({source,target,sha256})),consumers};
  const outputs=[...files.map(({target,bytes})=>({target,bytes})),{target:'answerworthy-sync.lock.json',bytes:Buffer.from(JSON.stringify(lock,null,2)+'\n')}];
  for (const output of outputs) {
    const target=resolve(dest,output.target);
    if(check) {
      const actual=await readFile(target).catch(()=>null);
      if (!actual || !actual.equals(output.bytes)) {console.error(`Out of sync: ${target}`);process.exitCode=1;}
    } else {await mkdir(dirname(target),{recursive:true});await writeFile(target,output.bytes);}
  }
  console.log(`${check?'Checked':'Synchronized'} ${role}: ${dest} (${revision})`);
}
