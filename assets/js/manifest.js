/* ============================================================================
   manifest.js — the single source of truth for site structure.
   ----------------------------------------------------------------------------
   TO ADD CONTENT: add a { id, title, file, ... } page object to a section.
   TO ADD A SECTION: add a { id, name, icon, pages:[...] } to an exam.
   TO ADD AN EXAM: add an exam object to `exams` (set status:"active").
   The sidebar, breadcrumbs, prev/next nav, and dashboard all read from here,
   so the site stays consistent automatically. No build step required.
   ============================================================================ */
window.MSS_MANIFEST = {
  site: {
    name: "Me Studing Stuff",
    tagline: "Study smarter. Pass exams.",
    initial: "M"
  },

  // Rotating motivational lines shown on the dashboard.
  quotes: [
    { t: "You don't have to be great to start, but you have to start to be great.", b: "Zig Ziglar" },
    { t: "Problems are where the learning actually happens. Do the problems.", b: "Every actuary who passed" },
    { t: "It always seems impossible until it's done.", b: "Nelson Mandela" },
    { t: "Small daily improvements are the key to staggering long-term results.", b: "—" },
    { t: "The expert in anything was once a beginner.", b: "Helen Hayes" },
    { t: "Discipline is choosing between what you want now and what you want most.", b: "—" },
    { t: "A 6 is a pass. Aim to understand, not to be perfect.", b: "FAM wisdom" }
  ],

  exams: [
    {
      id: "fam",
      name: "Exam FAM",
      full: "Fundamentals of Actuarial Mathematics",
      org: "Society of Actuaries (SOA)",
      status: "active",
      home: "exams/fam/getting-started/overview.html",
      sections: [
        {
          id: "getting-started", name: "Getting Started", icon: "🚀",
          pages: [
            { id: "overview",    title: "Exam Overview",  file: "exams/fam/getting-started/overview.html" },
            { id: "study-plan",  title: "Study Plan",     file: "exams/fam/getting-started/study-plan.html" },
            { id: "resources",   title: "Resources",      file: "exams/fam/getting-started/resources.html" }
          ]
        },
        {
          id: "long-term", name: "Long-Term · FAM-L", icon: "📈", track: "FAM-L",
          pages: [
            { id: "lt-00", num: "L0", title: "Insurance & Annuity Products",     file: "exams/fam/long-term/00-products.html" },
            { id: "lt-01", num: "L1", title: "Survival Models",                 file: "exams/fam/long-term/01-survival-models.html" },
            { id: "lt-02", num: "L2", title: "Life Tables & Fractional Ages",   file: "exams/fam/long-term/02-life-tables.html" },
            { id: "lt-03", num: "L3", title: "Life Insurance",                  file: "exams/fam/long-term/03-life-insurance.html" },
            { id: "lt-04", num: "L4", title: "Life Annuities",                  file: "exams/fam/long-term/04-life-annuities.html" },
            { id: "lt-05", num: "L5", title: "Premiums",                        file: "exams/fam/long-term/05-premiums.html" },
            { id: "lt-06", num: "L6", title: "Policy Values & Reserves",        file: "exams/fam/long-term/06-policy-values.html" },
            { id: "lt-07", num: "L7", title: "Multiple-State & Decrement",      file: "exams/fam/long-term/07-multiple-state.html", offSyllabus: true }
          ]
        },
        {
          id: "short-term", name: "Short-Term · FAM-S", icon: "📊", track: "FAM-S",
          pages: [
            { id: "st-01", num: "S1",  title: "Insurance & Reinsurance Coverages", file: "exams/fam/short-term/01-coverages.html" },
            { id: "st-02", num: "S2",  title: "Severity Models",                   file: "exams/fam/short-term/02-severity.html" },
            { id: "st-03", num: "S3",  title: "Frequency Models",                  file: "exams/fam/short-term/03-frequency.html" },
            { id: "st-04", num: "S4",  title: "Aggregate Loss Models & Risk Measures", file: "exams/fam/short-term/04-aggregate.html" },
            { id: "st-05", num: "S5",  title: "Coverage Modifications",            file: "exams/fam/short-term/05-coverage-mods.html" },
            { id: "st-06", num: "S6",  title: "Parametric & Non-Parametric Estimation", file: "exams/fam/short-term/06-estimation.html" },
            { id: "st-07", num: "S7",  title: "Credibility",                       file: "exams/fam/short-term/07-credibility.html" },
            { id: "st-08", num: "S8",  title: "Ratemaking",                        file: "exams/fam/short-term/08-ratemaking.html" },
            { id: "st-09", num: "S9",  title: "Loss Reserving",                    file: "exams/fam/short-term/09-reserving.html" },
            { id: "st-10", num: "S10", title: "Option Pricing Fundamentals",       file: "exams/fam/short-term/10-option-pricing.html" }
          ]
        },
        {
          id: "formula-sheets", name: "Formula Sheets", icon: "📋",
          pages: [
            { id: "fs-l", title: "FAM-L Master Formula Sheet", file: "exams/fam/formula-sheets/fam-l.html" },
            { id: "fs-s", title: "FAM-S Master Formula Sheet", file: "exams/fam/formula-sheets/fam-s.html" }
          ]
        },
        {
          id: "practice", name: "Practice & Strategy", icon: "🎯",
          pages: [
            { id: "pr-strategy", title: "Practice & Exam-Day Strategy", file: "exams/fam/practice/strategy.html" },
            { id: "pr-worked",   title: "Worked Examples (Mixed Set)",  file: "exams/fam/practice/worked-examples.html" }
          ]
        },
        {
          id: "progress", name: "Progress Tracker", icon: "✅",
          pages: [
            { id: "tracker", title: "Progress Tracker", file: "exams/fam/progress/tracker.html" }
          ]
        }
      ]
    }

    /* Future exams go here, e.g.:
    { id: "fm", name: "Exam FM", full: "Financial Mathematics", org: "SOA",
      status: "soon", sections: [] }
    */
  ]
};

/* ---- Flatten helpers (used by sidebar/search/nav) ---- */
window.MSS_MANIFEST.flatPages = (function (m) {
  const out = [];
  m.exams.forEach(ex => (ex.sections || []).forEach(sec =>
    (sec.pages || []).forEach(p => out.push(Object.assign({ examId: ex.id, examName: ex.name, sectionId: sec.id, sectionName: sec.name, icon: sec.icon }, p)))
  ));
  return out;
})(window.MSS_MANIFEST);
