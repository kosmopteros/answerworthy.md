import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const canonicalStandard = 'https://raw.githubusercontent.com/answerworthy/answerworthy.md/main/README.md'
const activeFiles = ['README.md', 'template/answerworthy.md', 'examples/acme/answerworthy.md']

async function source(path) {
  return readFile(new URL(`../${path}`, import.meta.url), 'utf8')
}

test('Answerworthy 1.0 is published as the current Standard', async () => {
  const [readme, template, example] = await Promise.all(activeFiles.map(source))
  const combined = [readme, template, example].join('\n')

  assert.match(readme, /Answerworthy 1\.0 is the current specification\./)
  assert.doesNotMatch(combined, /working draft/i)
  assert.doesNotMatch(combined, /1\.0-draft/)
  assert.doesNotMatch(combined, /raw\.githubusercontent\.com\/kosmopteros\/answerworthy\.md/)

  for (const file of [readme, template, example]) {
    assert.match(file, /answerworthy: "1\.0"/)
    assert.match(file, new RegExp(`standard: "${canonicalStandard.replaceAll('.', '\\.').replaceAll('/', '\\/')}"`))
  }
})

test('the published file contract keeps the canonical six-section order', async () => {
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
