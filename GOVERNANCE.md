# One definition, coordinated releases

The canonical open Standard, starter and worked example live in **answerworthy/answerworthy.md**. The public Standard mirrors and working-copy repository must not publish divergent definitions under the same version. Proposals belong in branches and pull requests; adopted changes enter this source first.

`surface-contract.json` is a small, non-normative public description of the Standard, free Read and paid Plan. It gives the gateway, commercial landing and application one shared account of their purposes. It is not required to apply the Standard. Commercial price, cohort, timing and entitlements remain in the application's existing product contract. Payment rules are not defined by marketing text.

## Change set

For a change affecting more than one surface:

1. Update the canonical specification/example or public surface contract. Keep the open method independently useful and the paid engagement's wider purpose explicit. Record the change here or in release notes.
2. Commit the source on a review branch. Use that exact SHA to synchronize consumers with `scripts/sync-surfaces.mjs`. Each consumer receives local copies and `answerworthy-sync.lock.json`; there is no fetch-on-render dependency.
3. Update consumers, tests and the actual user-facing explanations together. A shared-file checksum is necessary, but does not prove good wording, a working agent or a deployed page.
4. Run the source tests, each consumer's relevant tests/build and its synchronization checker. Test the standalone example separately from the paid planning path.
5. Open linked PRs with the same release identifier. Promote through each website's existing dev/staging/main policy. Record exact source and consumer revisions and real staging results; do not claim one repo merge deploys all surfaces.

## Commands

```sh
node --test tests/*.test.mjs
node scripts/sync-surfaces.mjs --revision <source-commit> --role engine ../answerworthy
node scripts/sync-surfaces.mjs --revision <source-commit> --role gateway ../answerworthy-lean-landing
node scripts/sync-surfaces.mjs --revision <source-commit> --role commercial ../answerworthy.pichugin.me
node scripts/sync-surfaces.mjs --revision <source-commit> --role mirror ../answerworthy.md-WD
```

In a consumer, `node scripts/check-answerworthy-sync.mjs` verifies its committed copies. Add `--source /path/to/canonical-checkout` to compare the coordinated workspaces, or `--remote` to verify the exact upstream SHA. `--check` on the synchronization command detects drift without rewriting files.

A prose improvement that does not change the offer can remain surface-specific. A change to product purpose, free/paid capability, Standard authority or release semantics must update the shared source and its consumers. The Plan may recommend growth work beyond Standard deficiencies. The Read retains its complete useful Standard work; drafting and prioritisation are not reserved to paid users.

Historical client reports remain historical. New templates apply to new/reviewed revisions; they do not rewrite old observations or transfer old approvals to new copy.
