---
answerworthy: "1.0"
standard: "https://raw.githubusercontent.com/answerworthy/answerworthy.md/main/README.md"
subject: "Acme Analytics GmbH — fictional worked example"
website: "https://acme.example/"
updated: 2026-09-12
---

## Sources

Use the [self-contained fictional source pack](materials.md). These are supplied teaching fixtures, not real web captures or measured customer results.

- SRC-1: private owner brief, objective and preparation permission.
- SRC-2: public product-guide fixture; roles, German hosting and workflow boundary.
- SRC-3: public trial-page fixture; existing /trial route, fields and no payment at request.
- SRC-4: public partner-invitation fixture; contribution format, not editorial acceptance.

## Scope

- objective: increase suitable trial enquiries — supplied, SRC-1
- workstream: connect useful existing explanations to the trial choice and prepare a distribution contribution — inferred from SRC-1–SRC-4
- effort: one preparation session; publication and contact are separate — supplied, SRC-1
- buyers: small German teams evaluating shared analytics — supplied, SRC-1
- market: Germany; language: de-DE — supplied, SRC-1
- assets: preserve the existing headline and guide; reuse role explanations — observed in SRC-2
- alternative: continue the current reporting process — inferred, not an inspected competing product
- material non-fit: organisation-wide approval workflows are required — observed in SRC-2
- coverage: bounded to the fixture; actual search visibility and broader competitors uninspected

### QF1 — Is Acme suitable for our analytics responsibilities?

provenance: inferred
sources: [SRC-1, SRC-2, SRC-3]
criteria: who configures collection, who reads reports, hosting location, required approval workflows

## Outcomes

- **O1 — QF1:** The team can understand responsibilities and take the appropriate trial-request step. This serves the objective of suitable trial enquiries.
- **O2 — QF1:** A team requiring organisation-wide approval workflows recognises that the current product does not include them before requesting a trial.

## State

### S1 — Existing role explanation
condition: understood
coverage: bounded
state: verified
evidence: SRC-2 explains administrators, viewers and the configuration walkthrough. Preserve it.

### S2 — Trial-page connection
condition: answering
coverage: bounded
state: incomplete
evidence: SRC-3 links the guide but does not summarise the roles or approval-workflow boundary.
needed: prepared in A1; publication is A2.

### S3 — Included implementation call
condition: understood
coverage: bounded
state: unreached
evidence: SRC-1 explicitly leaves this term unresolved.
needed: owner answer only for a statement about an included call.

### S4 — Partner contribution
condition: distributed
coverage: bounded
state: incomplete
evidence: SRC-4 documents a relevant format. No submission or acceptance has occurred.
needed: prepared contribution, publication/contact approval and actual submission route.

### S5 — Answering-system response
condition: observed
coverage: uncovered
state: unreached
needed: a separately authorised observation; no provider result is claimed in this example.

Reachable, Identified, Evidenced and Corroborated are outside this exercise's full assessment. This is not a claim of full conformance or organic growth.

## Actions

### A1 — Prepare the team-fit passage
advances: [O1, O2]
serves: [understood, answering]
state: done
needs: [agent]
operation: prepare a trial-page passage
prerequisites: []
why: put existing useful distinctions beside the trial decision without replacing the brand or duplicating its documentation
done_when: the populated passage and placement instruction are ready for factual review
verify: compare product statements with SRC-2/SRC-3; omit an included-call statement while S3 is unresolved
next_operation: A2

#### Prepared material

Place beside the trial action. Link “Produktleitfaden” to the existing guide; keep the existing headline.

> **Passt Acme zu Ihrem Team?**
>
> Mit Acme erfassen Sie Website-Ereignisse und betrachten sie in gemeinsamen Dashboards. Administratoren richten die Datenerfassung und den Teamzugriff ein. Viewer lesen die Dashboards, ohne die Erfassungseinstellungen zu verändern.
>
> Die Daten dieses Angebots werden in Deutschland gehostet. Organisationsweite Freigabeworkflows gehören derzeit nicht zum Produkt. Im Produktleitfaden finden Sie die Rollen und die Einrichtung im Detail.
>
> **Testzugang anfragen**
>
> Beschreiben Sie im Formular kurz Ihren Anwendungsfall. Für die Anfrage ist keine Zahlung erforderlich.

The passage is prepared, not published. Its product facts come from SRC-2/SRC-3.

### A2 — Approve and publish A1
advances: [O1, O2]
serves: [understood, answering]
state: waiting-human
needs: [human, agent]
operation: obtain approval for this passage, then edit the existing page
prerequisites: [owner publication approval]
prepared_material: A1 in this file
why: SRC-1 authorises preparation, not publication
done_when: the approved passage is visible and its guide link works
verify: inspect the rendered page and permitted form navigation without submitting customer data
next_operation: record publication; observe relevant enquiries separately

### A3 — Prepare the partner contribution
advances: [O1]
serves: [distributed, answering]
state: ready
needs: [agent]
operation: draft from the populated structure below
prerequisites: []
why: the documented partner format can introduce the existing explanation to small-team readers; acceptance remains the editor's decision
done_when: the contribution is ready for owner review
verify: attribute the product example, distinguish explanatory judgment from measurements, and retain the editorial boundary
next_operation: obtain owner approval and the actual submission route

#### Prepared material

**Title:** “Wer richtet Analytics ein, und wer braucht nur die Ergebnisse?”

**Opening:** Explain how separating configuration from reading results can help a team evaluate a shared reporting tool. Present this as practical judgment, not a measured campaign result.

**Responsibility worksheet:** Supply columns for task, responsible person and required access. Include collection settings, access decisions and dashboard reading.

**Worked example:** Use Acme's documented administrator/viewer split and link its configuration walkthrough, clearly attributed. Other products may also separate roles.

**Before a trial:** Ask readers to identify required approval workflows and who will configure collection. State the current Acme workflow boundary from SRC-2.

**Closing:** Invite readers to use the worksheet with their current process or prospective product. Offer the Acme guide as the vendor-authored example, subject to partner review.

This is a populated structure for independent drafting. It does not depend on an included-call answer or authorise contact.

### A4 — Resolve the optional call statement
advances: [O1]
serves: [understood]
state: waiting-human
needs: [human]
operation: confirm an offer term
prerequisites: [owner answer]
question: Is an implementation call included, optional on request, or not offered?
why: only a proposed call statement depends on this answer
done_when: record the answer as supplied knowledge and prepare any resulting wording
verify: compare that wording with the confirmed term before seeking publication approval

## Maintenance

- A1 is prepared; A2 awaits approval; A3 is ready; A4 is the only unresolved offer question.
- Continue with A3 unless new permission or a changed objective changes the next operation. Reuse A1 directly; do not ask the owner to recreate it.
- No page was published, partner contacted, enquiry generated or answering-system result observed in this exercise.
- Record the Standard revision used, review its living source on resumption, and reconcile changes explicitly.
- Recheck facts when the roles, hosting, trial offer or workflow support change.
