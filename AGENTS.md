# AGENTS.md — Me Studing Stuff

Personal static study site whose one job is to get its owner to **pass SOA actuarial exams
efficiently**. One exam today (**FAM**), built to hold more. The owner passed P and FM but is new
to FAM material — lead, explain, and keep things organized.

Judge every change by: *does this help them learn faster or score higher?* If not, skip it.
Prefer improving an existing page over adding one; clutter actively hurts here.

## Hard invariants (never break without an explicit ask)

- **No build step, framework, package manager, server, or dependency.** Plain HTML/CSS/JS only;
  every page must still open by double-clicking (`file://`). If a feature needs a toolchain,
  find a simpler way or don't do it.
- **`assets/js/manifest.js` is the single source of truth** for nav, breadcrumbs, and prev/next.
  Every new page needs one entry there *and* one in `assets/js/search-index.js`.
- **Preserve LaTeX source exactly** (`$…$`, `$$…$$`, MathJax-rendered). Never hand-render math.
- **No database.** Progress, mock log, and mistake log stay in `localStorage` via `window.MSSStore`.
- **Deliverables are styled HTML pages** using the existing design system — never Markdown.
- **Do not touch `archive/`** (old Markdown backup) unless the owner explicitly asks, even though
  older notes call it eligible for deletion.
- **Do not commit, push, or publish** unless asked. Keep edits narrowly scoped and leave unrelated
  working-tree changes intact.

## Layout

```
index.html                      dashboard (progress ring, countdown, resume, search)
assets/css/styles.css           the whole design system — reuse it, don't add CSS files
assets/js/manifest.js           site structure (source of truth)
assets/js/site.js               shell: sidebar, topbar, ⌘K search, TOC, progress, MathJax
assets/js/search-index.js       { id, title, section, exam, url, icon, keywords, text }
exams/<exam>/<section>/*.html   content pages (3 levels deep → assets via ../../../)
memory/MEMORY.md                persistent project memory — update when long-lived facts change
archive/                        frozen backup; leave alone
```

## Adding a content page

Copy the gold exemplar `exams/fam/long-term/03-life-insurance.html` — `site.js` injects all chrome,
so a page carries only its content plus four trailing scripts. Required:

- `<body data-page="<id>" data-exam="fam">`, content in `<article class="article" data-mss-article>`
- early theme script in `<head>`; shared `<head>` (fonts + `../../../assets/css/styles.css`)
- trailing: `window.MSS_BASE="../../../"`, then `manifest.js`, `search-index.js`, `site.js`

Then add the `manifest.js` and `search-index.js` entries. Sidebar, breadcrumbs, prev/next, and
progress tracking follow automatically. A new exam is just a new `exams` object in `manifest.js`
(`status:"active"`) plus pages under `exams/<id>/`.

Components (all in `styles.css`, all demonstrated in the exemplar): `.callout` (`objective 🎯 /
key 🔑 / note 🧾 / tip ✅ / trap ⚠️`), `.formula` + `.formula-label`, `<details class="example">`,
`<details class="qa">`, `.table-scroll > table`.

## FAM content conventions

- Topic notes follow six parts: Learning Objectives → Key Concepts → Formulas → Worked Examples →
  Common Exam Traps → Self-Check Questions.
- Study order is FAM-L first (life contingencies, sequential) then FAM-S (loss models, modular).
  Sources: *AMLCR* (Dickson/Hardy/Waters) for FAM-L; *Loss Models* (Klugman) and Friedland for FAM-S.
- Exam facts: 34 MCQs, 3.5 hrs, pass = 6/10, offered Mar/Jul/Nov. No exam date is set — nudge the
  owner to set one so the dashboard countdown works.
- High-leverage help: quiz and grade them, build 34-question mocks, add problem sets, re-explain a
  stuck concept, read their tracker and name their weakest areas. Always as HTML wired into the manifest.

## Verifying (there is no install, build, lint, or test command)

- Visual changes: open the affected page and check desktop *and* narrow/mobile layouts.
- JS or nav changes: check the browser console, and confirm links, ⌘K search, progress tracking,
  and the service worker still work.
- **"Launch" means open the site**: `Invoke-Item .\index.html` (or `start index.html`). Never ask which site.
