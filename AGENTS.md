# Codex project guidance

## Project purpose

- This repository is the **Me Studing Stuff** static study website, currently focused on SOA Exam FAM.
- Optimize changes for learning efficiency and exam performance. Keep the experience clear, focused, and low-clutter.
- Read `CLAUDE.md` before making substantive changes; it is the detailed source of truth for architecture, content conventions, and the meaning of “Launch.”

## Architecture constraints

- Keep the site dependency-free: plain HTML, CSS, and JavaScript with no framework, package manager, build step, or server requirement.
- Prefer improving an existing page over adding files or features.
- Reuse the design system in `assets/css/styles.css` and the content-page structure documented in `CLAUDE.md`.
- Treat `assets/js/manifest.js` as the source of truth for navigation and site structure.
- When adding a content page, also update `assets/js/manifest.js` and `assets/js/search-index.js`.
- Preserve MathJax/LaTeX source exactly unless the requested change specifically concerns a formula.
- Do not add a database; progress data remains in browser `localStorage` through `window.MSSStore`.

## Working practices

- Do not modify or delete `archive/` unless the user explicitly asks, even if an older note says it is eligible for deletion.
- Do not commit, push, publish, or add dependencies unless the user explicitly requests it.
- Keep unrelated user changes intact and make narrowly scoped edits.
- For visual changes, open the affected page locally and verify both desktop and narrow/mobile layouts.
- For JavaScript or navigation changes, check the browser console and verify that links, search, progress tracking, and the service worker still behave as relevant.

## Common commands

```powershell
# Open the site in the default browser
Invoke-Item .\index.html

# Inspect repository state
git status --short --branch

# Review local changes
git diff
```

There is no install, build, lint, or automated test command in this repository.
