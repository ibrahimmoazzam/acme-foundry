---
'@acme-foundry/tokens': patch
---

`font.family.heading` and `font.family.mono` no longer name a typeface in their descriptions. Taken from upstream: the sentence still says what the token is for — a seam an app can point at its own face — without crediting a face this system does not use. A token's description reaches `tokens.json`, the foundations block and, through the sync, the Figma variable a designer reads.
