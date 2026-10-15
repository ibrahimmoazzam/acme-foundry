# Acme Foundry

> **Archived test artifact.** This is not a product, it is not maintained, and it is not a design system to install. It is a copy of [Fossil Design](https://github.com/ibrahimmoazzam/fossil-design) made to test whether Fossil's adoption guide can actually be followed, kept read-only as the record of that test.

## What this is

On 12 October 2026 this repository was created from Fossil Design's template at commit `5305359` and renamed to Acme Foundry, with the CSS prefix `acme`, the npm scope `@acme-foundry` and this repository's own name. It was then taken through [Fossil's adoption guide](https://github.com/ibrahimmoazzam/fossil-design/blob/main/docs/adopting.md) the way a team adopting the system would: rename the copy, replace the brand's tokens, publish the packages under its own scope, apply the tokens to Figma and build the Figma component library from code.

The guide is the one part of Fossil with no automated check behind it. Nothing reads it and does what it says, so this copy did, once, and wrote down what it cost.

## What it found

Thirty-two issues, each one recorded with its evidence and what fixing it took, in [`docs/fork-test.md`](https://github.com/ibrahimmoazzam/fossil-design/blob/main/docs/fork-test.md) upstream. A few examples of the kind of thing a real adoption turns up:

- The rename missed the npm badge, because the badge spells the scope percent-encoded.
- Two token descriptions named Fossil's own typefaces, and travelled into this copy's Figma file, where a designer reads them.
- Three of the four packages published and one did not, leaving a component package depending on a version of the token package that did not exist. The guide's publish step had no check that would have shown it.
- The guide sent you to Figma's Assets panel to turn a library on, which is not where the switch is.

## What has been retired

The four `@acme-foundry` packages have been unpublished from npm, the two Figma files have been deleted, the npm organisation has been removed, and the docs site at `ibrahimmoazzam.github.io/acme-foundry` is no longer deployed. The repository is archived, so nothing here builds, publishes or deploys any more.

## What is still here

The renamed tree as it stood at `f58eda8`, over 17 commits. That tree is the evidence behind several of the issues above, which is the reason to keep it rather than delete it.

## A note on the prose in these files

A rename rewrites the names things are addressed by. It does not rewrite claims. So files in this repository say Acme Foundry where they described Fossil, including positioning, market research and a line about packages "harvested from the author's portfolio site" that was true of Fossil and is not true of anything called Acme Foundry. That is not a claim this copy makes. It is one of the things the test measured, and the reason the guide now has a step that asks an adopter to settle each inherited claim by hand.

## Where to go instead

- **Fossil Design:** [the repository](https://github.com/ibrahimmoazzam/fossil-design) and [the docs site](https://fossil.ibrahimmoazzam.com).
- **The packages:** [`@fossil-design/react`](https://www.npmjs.com/package/@fossil-design/react), [`@fossil-design/tokens`](https://www.npmjs.com/package/@fossil-design/tokens), [`@fossil-design/eslint-config`](https://www.npmjs.com/package/@fossil-design/eslint-config), [`@fossil-design/stylelint-config`](https://www.npmjs.com/package/@fossil-design/stylelint-config).
- **To build your own system from it:** [the adoption guide](https://github.com/ibrahimmoazzam/fossil-design/blob/main/docs/adopting.md), which these 32 issues were spent on.

MIT licensed, keeping Fossil Design's copyright notice. See [`LICENSE`](./LICENSE).
