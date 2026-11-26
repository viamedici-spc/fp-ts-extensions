---
status: accepted
---

# Changelog Convention

This convention defines changelog creation for the **fp-ts-extensions** library (a JavaScript/TypeScript package).

The changelog uses a fixed heading structure so release notes are consistent across versions.

Notes:

- Level 1 headings (`#`) are reserved for sections: New Features, Improvements, Changes, Fixes.
- Level 2 headings (`##`) are used for concrete items under each section (feature titles or grouped entries).
- New Features use short paragraphs under `##` headings; Improvements, Changes, and Fixes are bullet lists under their
  `##` headings.
- Target audience: developers who use these fp-ts extensions, mostly through the SPC client libraries. Avoid overly
  technical or internal-only details.

Template:

```md
# New Features

## Example Feature 1

Short paragraph describing the change and why it matters to developers.

## Example Feature 2

Short paragraph describing the change.

# Improvements

- **Short summary:** Longer description of the improvement.
- **Short summary:** Longer description of the improvement.

# Changes

- **Short summary:** Longer description of the change.
- **Short summary:** Longer description of the change.

# Fixes

- **Short summary:** Longer description of the fix.
- **Short summary:** Longer description of the fix.
```
