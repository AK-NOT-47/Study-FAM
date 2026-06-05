# CLAUDE.md — Me Studing Stuff

This repo is a personal study website called **Me Studing Stuff**. Its one job is to get the
owner to **pass actuarial exams efficiently** — high marks for the least time and effort.
Right now there is exactly one exam in it: **SOA Exam FAM**. It is built to hold more later.

The owner passed Exams P and FM but is **new to the FAM material** and relies on you to lead,
explain, and keep things organized.

---

## The principles that govern every change here (read these first)

1. **Simple solutions to complex problems — never complex solutions to complex problems.**
   The site is plain static HTML/CSS/JS with **no build step, no framework, no dependencies**.
   Keep it that way. If a feature needs a toolchain, find a simpler way or don't do it.

2. **Don't bloat the project.** The owner gets overwhelmed by clutter. Every file must earn its
   place by helping them pass. Prefer improving an existing page over adding a new one. No
   half-built features, no "nice to have" pages, no duplicate content.

3. **Stay focused on passing.** When choosing what to do, ask: *does this help them learn faster
   or score higher?* If not, skip it. Optimize for understanding and exam performance, not
   completeness for its own sake.

4. **All study content and reports are HTML** — beautiful, modern, clear, and motivating.
   Markdown is retired (see Archive). Anything you produce for the owner to read goes in a
   styled HTML page that uses the existing design system, so a tired student actually *wants*
   to open it.

---

## How the site works (so you can extend it without breaking it)

No server needed — every page opens by double-clicking. Open `index.html` to start.

> **"Launch" = open the website.** When the owner says **"Launch"** (or "launch the site"), they
> always mean open **Me Studing Stuff** for them — run `Invoke-Item "<repo>\index.html"` (or
> `start index.html`) to open `index.html` in their default browser. No need to ask which site.

```
index.html                      ← dashboard (progress ring, exam countdown, resume, search)
assets/css/styles.css           ← the entire design system (themes, components). Reuse it.
assets/js/manifest.js           ← SINGLE SOURCE OF TRUTH for structure (nav/breadcrumbs/nav read it)
assets/js/site.js               ← the shell: sidebar, topbar, ⌘K search, TOC, progress, MathJax
assets/js/search-index.js       ← search entries: { id, title, section, exam, url, icon, keywords, text }
exams/fam/<section>/<page>.html ← content pages (3 levels deep → use ../../../ for assets)
archive/                        ← the old Markdown notes (DELETE AFTER 2026-07-05; kept only as backup)
```

**A content page is tiny** — it carries only its content plus four trailing scripts; `site.js`
injects all the chrome. Copy the structure from the gold exemplar:
`exams/fam/long-term/03-life-insurance.html`. Every page must have:

- `<body data-page="<id>" data-exam="fam">`, content inside `<article class="article" data-mss-article>`
- the early theme script in `<head>`, the shared `<head>` (fonts + `../../../assets/css/styles.css`)
- trailing: `window.MSS_BASE="../../../"` then `manifest.js`, `search-index.js`, `site.js`

**Design-system components** (all in `styles.css`, all shown in the exemplar): `.callout`
(`objective 🎯 / key 🔑 / note 🧾 / tip ✅ / trap ⚠️`), `.formula` with `.formula-label`,
`<details class="example">` for worked examples, `<details class="qa">` for self-check Q&A,
`.table-scroll > table` for tables. **Math is LaTeX** (`$…$`, `$$…$$`) rendered by MathJax —
preserve it exactly, never hand-render it.

### To add content (the only workflow you need)
1. Create the HTML page under `exams/<exam>/<section>/` using the exemplar's structure.
2. Add one `{ id, title, file, … }` line to the right section in `manifest.js`.
3. Add one entry to `search-index.js` so it's searchable.
That's it — sidebar, breadcrumbs, prev/next, and progress tracking update automatically.

### To add a new exam
Add an exam object to `exams` in `manifest.js` (`status:"active"`), create `exams/<id>/…`
pages the same way. The dashboard and switcher already expect multiple exams.

---

## Content conventions (FAM)

- **Topic notes** follow six parts: Learning Objectives → Key Concepts → Formulas → Worked
  Examples → Common Exam Traps → Self-Check Questions. Keep that rhythm for new topics.
- The study plan teaches **FAM-L first** (life contingencies — sequential) then **FAM-S**
  (loss models — modular). Sources: *AMLCR* (Dickson/Hardy/Waters) for FAM-L, *Loss Models*
  (Klugman) and Friedland for FAM-S.
- Exam facts: 34 MCQs, 3.5 hrs, pass = 6/10, offered Mar/Jul/Nov. The owner has **not set an
  exam date** yet — nudge them to (the dashboard has a countdown that needs it).
- Progress (completion + 🔴🟡🟢 confidence), mock log, and mistake log live in `localStorage`
  via `window.MSSStore` and the Progress Tracker page. Don't add a database.

## Good ways to help (high-leverage, on-mission)
Quiz the owner on a topic and grade them · build full 34-question mock exams · add practice
problem sets to a topic · re-explain a concept they're stuck on · read their tracker and tell
them where they're weakest. Always deliver these as HTML pages wired into the manifest.

## Housekeeping
- After **2026-07-05**, delete `archive/` (the old Markdown). Until then leave it as a safety net.
- Persistent project memory lives in `memory/` (`MEMORY.md` is the index). Update it when
  long-lived facts change.
