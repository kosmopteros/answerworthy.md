import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import test from 'node:test'

const canonicalStandard = 'https://raw.githubusercontent.com/answerworthy/answerworthy.md/main/README.md'

async function source(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8')
}

test('the personal copy forwards new and existing users to canonical authority', async () => {
  const readme = await source('README.md')
  assert.ok(readme.includes(`](${canonicalStandard})`))
  assert.ok(readme.includes('https://github.com/answerworthy/answerworthy.md/blob/main/template/answerworthy.md'))
  assert.ok(readme.includes('https://github.com/answerworthy/answerworthy.md/tree/main/examples/acme'))
  assert.match(readme, /does not maintain or release a separate specification/)
  assert.match(readme, /including when an older link resolves to this README/)
  assert.doesNotMatch(readme, /Answerworthy 1\.0 is the current specification\./)
  assert.doesNotMatch(readme, /^## (?:Runtime contract|File semantics|Rules)$/m)
})

test('the retained historical file contract keeps its six-section order', async () => {
  const [template, example] = await Promise.all([
    source('template/answerworthy.md'),
    source('examples/acme/answerworthy.md'),
  ])
  const sections = ['Sources', 'Scope', 'Outcomes', 'State', 'Actions', 'Maintenance']

  for (const file of [template, example]) {
    const positions = sections.map((section) => file.indexOf(`## ${section}`))
    assert.ok(positions.every((position) => position >= 0), 'all canonical sections must be present')
    assert.deepEqual([...positions].sort((left, right) => left - right), positions)
  }
})

test('the old README, starter and example preserve their historical Git blobs', async () => {
  const retained = {
    'history/README.7d36f79.md': 'eebd6f4eb333ed87d2a5de8ab4780c238e4d0a2a',
    'template/answerworthy.md': '15bffdd5b62f912c923683a7812e4c091c105064',
    'examples/acme/answerworthy.md': '8286a0063a1e3f3f326943e6373c01ce7bab6376',
  }
  const readme = await source('README.md')
  for (const [path, expected] of Object.entries(retained)) {
    const bytes = Buffer.from((await source(path)).replaceAll('\r\n', '\n'), 'utf8')
    const hash = createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex')
    assert.equal(hash, expected, `${path} must retain its original text`)
    assert.ok(readme.includes(`](./${path})`), `${path} must remain discoverable as history`)
  }
})
