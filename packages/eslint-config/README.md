# @acme-foundry/eslint-config

The shared ESLint config for [Acme Foundry](https://github.com/ibrahimmoazzam/acme-foundry), Acme's product design system. It keeps JSX on-system: layout goes through `Box`, and every disable comment says why. Its partner, [`@acme-foundry/stylelint-config`](https://www.npmjs.com/package/@acme-foundry/stylelint-config), does the same for stylesheets.

> **Early release.** Versions `0.x` may tighten rules between minor versions. The release notes list each change.

## Install

```sh
npm install --save-dev @acme-foundry/eslint-config eslint
```

The config sets rules, not a parser. A TypeScript app already has one from `typescript-eslint`:

```js
// eslint.config.js
import fossil from '@acme-foundry/eslint-config';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(tseslint.configs.recommended, fossil);
```

## What it checks

- **Layout through `Box`.** A raw `<div>`, `<section>`, `<nav>` or any other element `Box` renders is an error: use `<Box as="nav">`, whose props take Acme Foundry's tokens. Text, links, buttons and media have their own components and aren't affected. Member expressions such as `<motion.div>` pass.
- **Disable comments explain themselves.** Each needs a reason after `--`, and one that disables nothing is an error.

```tsx
return (
  // eslint-disable-next-line no-restricted-syntax -- the map library measures this element itself
  <div ref={mapRef} />
);
```

## Options

```js
// eslint.config.js
import { fossil } from '@acme-foundry/eslint-config';

export default [...fossil({ layoutElements: 'warn', deprecations: true })];
```

- **`layoutElements`**: `'error'` (the default) or `'warn'`, for an app still moving onto Acme Foundry.
- **`deprecations`**: adds `@typescript-eslint/no-deprecated`, which flags deprecated Acme Foundry components and props. It needs type information, so register typescript-eslint's typed linting first, for example with `tseslint.configs.recommendedTypeChecked`. Its `strictTypeChecked` preset already includes the rule.
- **`files`**: the files the layout rule applies to. Defaults to every `.jsx` and `.tsx` file.

The layout rule is ESLint's `no-restricted-syntax`. If your config sets that rule too, the later setting replaces the earlier one, so add Acme Foundry's entries to yours:

```js
import { layoutElementRestrictions } from '@acme-foundry/eslint-config';

const rules = {
  'no-restricted-syntax': ['error', ...layoutElementRestrictions, yourEntry],
};
```

## Escapes

Acme Foundry has three levels of escape, so deviation stays visible rather than impossible:

1. **Sanctioned:** `Box`'s narrow `style` prop, for layout tokens can't express, such as `gridTemplateAreas` or `aspectRatio`. No comment needed.
2. **Logged:** a disable comment with a reason, like the one above. A margin other than `0` always needs one.
3. **Signal:** three disables for the same need suggest something Acme Foundry is missing. Open a [gap](https://github.com/ibrahimmoazzam/acme-foundry/issues/new?template=gap.yml) on the Acme Foundry repository.

## License

MIT © 2026 Ibrahim Moazzam. See [LICENSE](./LICENSE).
