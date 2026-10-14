# Acme Foundry

[![CI](https://github.com/ibrahimmoazzam/acme-foundry/actions/workflows/ci.yml/badge.svg)](https://github.com/ibrahimmoazzam/acme-foundry/actions/workflows/ci.yml) [![npm](https://img.shields.io/npm/v/@acme-foundry/react?label=%40acme-foundry%2Freact)](https://www.npmjs.com/package/@acme-foundry/react) [![License: MIT](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

Acme's product design system, built so that AI agents stay on-system from design to code. Tokens live in git and flow into CSS, typed React components, Figma variables and a Figma component library generated from code. Shared lint configs, docs bundled into the packages and guidelines for Figma Make keep what coding agents and Make generate on-system.

**Docs: [ibrahimmoazzam.github.io/acme-foundry](https://ibrahimmoazzam.github.io/acme-foundry/)**, with a [getting started guide](https://ibrahimmoazzam.github.io/acme-foundry/?path=/docs/getting-started--docs), every component's props, variants and examples, and the [foundations](https://ibrahimmoazzam.github.io/acme-foundry/?path=/docs/foundations-overview--docs).

> **Status: early.** The packages are on npm as `0.x`. The token build, the Figma sync, the components, both lint configs and the agent docs are in place.

Acme Foundry is built on [Fossil Design](https://github.com/ibrahimmoazzam/fossil-design), whose pipeline, components and tooling it keeps. Fossil's [reasoning](https://fossil.ibrahimmoazzam.com/?path=/docs/architecture-key-decisions--docs) explains why the system is shaped this way; this repository holds Acme's brand, tokens and components.

## Why

Coding agents produce off-system UI in two different ways, and most design systems only address one of them.

1. **The agent doesn't know what exists,** so it invents. The fix is context: token and component metadata the agent can read.
2. **The agent knows and drifts anyway.** Its training pulls harder than your documentation, so it writes `bg-gray-100` with your tokens in plain view. The fix is constraint: make off-system values impossible to express.

Acme Foundry does both. The usual approach is to allow any CSS and lint it afterwards. Acme Foundry closes the surface instead: layout props accept only token keys, styles accept only semantic tokens, and lint covers what remains.

## How it works

```
Design tokens (DTCG JSON in git, reviewed in pull requests)
 ├─▶ Figma Variables            values round-trip through the Figma MCP server
 └─▶ Style Dictionary build     one validated run
      ├─▶ tokens.css, tokens.json, tokens.ts
      └─▶ React components      CSS Modules, props typed to token keys
           ├─▶ npm packages, with Markdown docs for agents
           └─▶ Figma component library, generated from code
```

| Layer        | What Acme Foundry does                                                                                                                       |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Context      | An always-on `AGENTS.md` block, component docs bundled in the installed package, guidelines for Figma Make, Figma variables with code syntax |
| Constraint   | `Box` props typed to tokens, a Stylelint config that allows only semantic tokens, an ESLint rule against raw `<div>`s                        |
| Verification | Token build validation, interaction and accessibility tests, a check that the Figma library matches the code                                 |

Accessibility is tested, not assumed. Every Storybook story runs axe and must have zero violations. Real-input browser tests cover keyboard, focus and native behaviour, such as Escape closing `Modal`'s `<dialog>`. The token tests fail if a colour misses the WCAG 2.2 AA contrast minimum it declares, in light or dark mode.

Everything runs on a Figma Professional or Education plan and free tiers elsewhere: no Code Connect, no Variables REST API.

## Packages

| Package                                                         | What it is                                                                  | Version                                                                                                                             |
| --------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| [`@acme-foundry/tokens`](./packages/tokens)                     | DTCG token source and the build that turns it into CSS, JSON and TypeScript | [![npm](https://img.shields.io/npm/v/@acme-foundry/tokens)](https://www.npmjs.com/package/@acme-foundry/tokens)                     |
| [`@acme-foundry/react`](./packages/react)                       | React components, precompiled to JavaScript and one stylesheet              | [![npm](https://img.shields.io/npm/v/@acme-foundry/react)](https://www.npmjs.com/package/@acme-foundry/react)                       |
| [`@acme-foundry/eslint-config`](./packages/eslint-config)       | Keeps JSX on-system                                                         | [![npm](https://img.shields.io/npm/v/@acme-foundry/eslint-config)](https://www.npmjs.com/package/@acme-foundry/eslint-config)       |
| [`@acme-foundry/stylelint-config`](./packages/stylelint-config) | Keeps CSS on-system                                                         | [![npm](https://img.shields.io/npm/v/@acme-foundry/stylelint-config)](https://www.npmjs.com/package/@acme-foundry/stylelint-config) |
| [`@acme-foundry/figma-sync`](./packages/figma-sync)             | Syncs tokens with Figma; runs from the repo, not published                  | Private                                                                                                                             |

### Bring your own headless library

Acme Foundry's interactive components are built on native elements, such as `<dialog>` for `Modal`, but their props describe behaviour, never the element underneath. They use the names [Base UI](https://base-ui.com) and [Radix](https://www.radix-ui.com/primitives) use: `open`, `onOpenChange`, `value` and `onValueChange`. So a component can be rebuilt on either of them, or on [React Aria](https://react-aria.adobe.com) or [Headless UI](https://headlessui.com) by mapping their names inside the component. The component keeps its props and styles, the apps that use it don't change, and the rest of the pipeline is untouched.

## Development

You need Node 22.14 or later and pnpm 12.8.1, the version pinned in [`package.json`](./package.json).

```sh
pnpm install --frozen-lockfile
pnpm build && pnpm lint && pnpm typecheck && pnpm test
```

[`AGENTS.md`](./AGENTS.md) lists every command and the rules for contributing, for people and coding agents alike.

## Reasoning

Acme Foundry keeps the decision records it inherited, and numbers its own after them:

- [Decision records](./docs/decisions): every architectural decision, as an ADR.
- [Fossil's key decisions](https://fossil.ibrahimmoazzam.com/?path=/docs/architecture-key-decisions--docs): the decisions behind the pipeline, each with the alternative it rejected and why.

## License

MIT © 2026 Acme Corporation. Portions © 2026 Ibrahim Moazzam. See [LICENSE](./LICENSE).
