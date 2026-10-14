import { describe, expect, it } from 'vitest';
import {
  patterns,
  rename,
  repoOf,
  rewrites,
  type Identity,
} from '../scripts/rename.ts';

const fossil: Identity = {
  name: 'Fossil Design',
  cssPrefix: 'fossil',
  npmScope: '@acme-foundry',
  repo: 'ibrahimmoazzam/acme-design',
};
const acme: Identity = {
  name: 'Acme Design',
  cssPrefix: 'acme',
  npmScope: '@acme-foundry',
  repo: 'acme/acme-design',
};
const toAcme = (text: string) => rename(text, rewrites(fossil, acme));

describe('rename', () => {
  it('renames package names, imports and dependencies', () => {
    expect(toAcme(`import { Box } from '@acme-foundry/react';`)).toBe(
      `import { Box } from '@acme-foundry/react';`,
    );
    expect(toAcme(`"@acme-foundry/tokens": "workspace:*"`)).toBe(
      `"@acme-foundry/tokens": "workspace:*"`,
    );
    expect(toAcme(`'@acme-foundry/tokens': patch`)).toBe(
      `'@acme-foundry/tokens': patch`,
    );
  });

  it('renames custom properties, the bin and the AGENTS.md markers', () => {
    expect(toAcme('padding: var(--acme-space-m);')).toBe(
      'padding: var(--acme-space-m);',
    );
    expect(toAcme('npx acme-agents-md --check')).toBe(
      'npx acme-agents-md --check',
    );
    expect(toAcme('<!-- BEGIN:acme-foundry-agent-rules -->')).toBe(
      '<!-- BEGIN:acme-foundry-agent-rules -->',
    );
  });

  it('renames the repository in its URLs', () => {
    expect(
      toAcme('git+https://github.com/ibrahimmoazzam/acme-design.git'),
    ).toBe('git+https://github.com/acme/acme-design.git');
    expect(toAcme('https://github.com/ibrahimmoazzam/acme-design/issues')).toBe(
      'https://github.com/acme/acme-design/issues',
    );
  });

  it('leaves what only looks like the old names', () => {
    for (const text of [
      // Names Fossil keeps: the config file, the vendor key, the lint configs' factory.
      'fossil.config.json',
      'com.ibrahimmoazzam.fossil',
      "import { fossil } from '@acme-foundry/stylelint-config';",
      // Longer names that start with the old ones.
      '@fossil-designer/react',
      'my-fossil-agents-md',
      '--fossilized-',
      'ibrahimmoazzam/fossil-design-notes',
    ])
      expect(toAcme(text)).toBe(text);
  });

  it("doesn't match a scope inside a longer one, when the new scope contains the old", () => {
    const longer = rewrites(acme, { ...acme, npmScope: '@acme-design-system' });
    expect(
      rename('@acme-foundry/react and @acme-design-system/react', longer),
    ).toBe('@acme-design-system/react and @acme-design-system/react');
  });

  it('rewrites nothing when nothing changes', () => {
    expect(rewrites(fossil, fossil)).toEqual([]);
    expect(rewrites(fossil, { ...fossil, name: 'Other' })).toEqual([]);
  });
});

describe('repoOf', () => {
  it('reads owner and name from the URLs package.json holds', () => {
    expect(
      repoOf('git+https://github.com/ibrahimmoazzam/acme-design.git'),
    ).toBe('ibrahimmoazzam/acme-design');
    expect(repoOf('https://github.com/acme/acme-design')).toBe(
      'acme/acme-design',
    );
    expect(repoOf('git@github.com:acme/acme-design.git')).toBe(
      'acme/acme-design',
    );
  });

  it("refuses a repository that isn't on GitHub", () => {
    expect(() => repoOf('https://gitlab.com/acme/acme-design.git')).toThrow(
      "isn't a GitHub URL",
    );
  });
});

describe('patterns', () => {
  it('accept what fossil.config.json accepts', () => {
    expect(patterns.cssPrefix.test('acme')).toBe(true);
    expect(patterns.cssPrefix.test('Acme')).toBe(false);
    expect(patterns.npmScope.test('@acme-foundry')).toBe(true);
    expect(patterns.npmScope.test('acme-design')).toBe(false);
    expect(patterns.repo.test('acme/acme-design')).toBe(true);
    expect(patterns.repo.test('https://github.com/acme/acme-design')).toBe(
      false,
    );
  });
});
