/* ============================================================================
   site.js — the application shell. Runs on every page.
   Builds: sidebar · topbar · breadcrumbs · search palette · "on this page" TOC
           · reading progress · prev/next nav · progress tracking · MathJax
   Pages stay tiny: they only carry their content + 3 script tags. Everything
   structural is injected here so the whole site stays consistent.
   ============================================================================ */
(function () {
  "use strict";

  var BASE = window.MSS_BASE || "";
  var M = window.MSS_MANIFEST || { exams: [], flatPages: [], quotes: [] };
  var SEARCH = window.MSS_SEARCH || [];
  var body = document.body;
  var PAGE_ID = body.getAttribute("data-page") || "";
  var EXAM_ID = body.getAttribute("data-exam") || (M.exams[0] && M.exams[0].id) || "fam";

  /* ---------- small helpers ---------- */
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function href(file) { return BASE + file; }
  function exam() { return M.exams.filter(function (e) { return e.id === EXAM_ID; })[0] || M.exams[0]; }
  function pageById(id) { return M.flatPages.filter(function (p) { return p.id === id; })[0]; }
  function esc(s) { return (s || "").replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }

  /* ---------- progress store (localStorage) ---------- */
  var Store = {
    key: "mss:progress",
    read: function () { try { return JSON.parse(localStorage.getItem(this.key) || "{}"); } catch (e) { return {}; } },
    write: function (o) { try { localStorage.setItem(this.key, JSON.stringify(o)); } catch (e) {} },
    get: function (id) { return this.read()[id] || {}; },
    set: function (id, patch) { var o = this.read(); o[id] = Object.assign({}, o[id], patch); this.write(o); document.dispatchEvent(new CustomEvent("mss:progress-change")); },
  };
  window.MSSStore = Store;

  // "learnable" pages = the actual topic notes (what the progress % is measured on).
  // Off-syllabus pages (kept as optional background) are excluded so progress tracks only examinable topics.
  function learnablePages() {
    return M.flatPages.filter(function (p) { return (p.sectionId === "long-term" || p.sectionId === "short-term") && !p.offSyllabus; });
  }
  function overallPct() {
    var lp = learnablePages(), done = 0;
    lp.forEach(function (p) { if (Store.get(p.id).done) done++; });
    return { done: done, total: lp.length, pct: lp.length ? Math.round(done / lp.length * 100) : 0 };
  }
  window.MSSProgress = { overallPct: overallPct, learnablePages: learnablePages };

  /* ---------- theme ---------- */
  function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("mss:theme", t); } catch (e) {}
    var btn = document.getElementById("themeBtn");
    if (btn) btn.innerHTML = t === "dark" ? "☀️" : "🌙";
  }
  function initTheme() {
    var saved; try { saved = localStorage.getItem("mss:theme"); } catch (e) {}
    if (!saved) saved = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(saved);
  }

  /* ====================================================================
     SIDEBAR
     ==================================================================== */
  function buildSidebar() {
    var ex = exam();
    var aside = el("aside", "sidebar");
    aside.id = "mssSidebar";

    // brand
    var brand = el("a", "brand");
    brand.href = href("index.html");
    brand.style.textDecoration = "none"; brand.style.color = "inherit";
    brand.innerHTML =
      '<div class="logo">' + (M.site.initial || "M") + '</div>' +
      '<div class="name">' + esc(M.site.name) + '<small>' + esc(M.site.tagline) + '</small></div>';
    aside.appendChild(brand);

    // exam switch pill
    var sw = el("div", "exam-switch");
    var pill = el("a", "exam-pill");
    pill.href = href(ex.home || "index.html");
    pill.innerHTML = '<span class="dot"></span><span>' + esc(ex.name) + '</span><span class="meta">SOA</span>';
    sw.appendChild(pill);
    aside.appendChild(sw);

    // nav
    var scroll = el("nav", "nav-scroll");
    var prog = Store.read();
    (ex.sections || []).forEach(function (sec) {
      var wrap = el("div", "nav-section");
      var head = el("button", "sec-head");
      head.type = "button";
      head.innerHTML = '<span class="ico">' + (sec.icon || "•") + '</span><span>' + esc(sec.name) + '</span><span class="chev">▾</span>';
      head.addEventListener("click", function () { wrap.classList.toggle("collapsed"); });
      wrap.appendChild(head);

      var items = el("div", "sec-items");
      (sec.pages || []).forEach(function (p) {
        var a = el("a", "nav-link" + (p.id === PAGE_ID ? " active" : ""));
        a.href = href(p.file);
        var st = (prog[p.id] && prog[p.id].done) ? "solid" : (prog[p.id] && prog[p.id].conf) || "";
        var stat = '<span class="nl-status" data-s="' + esc(st) + '"></span>';
        var offTag = p.offSyllabus ? '<span class="nl-off" title="Not on the current FAM syllabus — optional background">off-syllabus</span>' : '';
        a.innerHTML = (p.num ? '<span class="nl-num">' + esc(p.num) + '</span>' : '') +
                      '<span>' + esc(p.title) + '</span>' + offTag + stat;
        items.appendChild(a);
      });
      wrap.appendChild(items);
      scroll.appendChild(wrap);
    });
    aside.appendChild(scroll);

    // footer mini-progress
    var op = overallPct();
    var foot = el("div", "sidebar-foot");
    foot.innerHTML =
      '<div class="mini-progress"><span>Topics mastered</span><span id="miniPct">' + op.done + '/' + op.total + '</span></div>' +
      '<div class="bar"><i id="miniBar" style="width:' + op.pct + '%"></i></div>';
    aside.appendChild(foot);

    return aside;
  }

  /* ====================================================================
     TOPBAR + breadcrumbs
     ==================================================================== */
  function buildTopbar() {
    var bar = el("header", "topbar");
    var menu = el("button", "icon-btn menu-btn", "☰");
    menu.id = "menuBtn"; menu.setAttribute("aria-label", "Menu");
    menu.addEventListener("click", function () { body.classList.toggle("nav-open"); });
    bar.appendChild(menu);

    // breadcrumbs
    var crumbs = el("nav", "crumbs");
    var parts = [];
    parts.push('<a href="' + href("index.html") + '">Home</a>');
    var p = pageById(PAGE_ID);
    if (p) {
      parts.push('<span class="sep">›</span><a href="' + href(exam().home || "index.html") + '">' + esc(p.examName) + '</a>');
      parts.push('<span class="sep">›</span><span class="text-mute">' + esc(p.sectionName) + '</span>');
      parts.push('<span class="sep">›</span><span class="cur">' + esc(p.title) + '</span>');
    } else if (body.getAttribute("data-title")) {
      parts.push('<span class="sep">›</span><span class="cur">' + esc(body.getAttribute("data-title")) + '</span>');
    }
    crumbs.innerHTML = parts.join("");
    bar.appendChild(crumbs);

    bar.appendChild(el("div", "spacer"));

    // search trigger
    var st = el("button", "search-trigger");
    st.id = "searchTrigger";
    st.innerHTML = '<span class="ico">🔍</span><span class="stxt">Search everything…</span><span class="kbd">Ctrl K</span>';
    st.addEventListener("click", openSearch);
    bar.appendChild(st);

    // theme toggle
    var th = el("button", "icon-btn", "🌙");
    th.id = "themeBtn"; th.setAttribute("aria-label", "Toggle theme");
    th.addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme");
      setTheme(cur === "dark" ? "light" : "dark");
    });
    bar.appendChild(th);

    return bar;
  }

  /* ====================================================================
     LAYOUT ASSEMBLY
     ==================================================================== */
  function assemble() {
    var article = document.querySelector("[data-mss-article]");
    var customMain = document.querySelector("[data-mss-main]");

    var rp = el("div", "read-progress"); rp.id = "readProgress";
    document.body.insertBefore(rp, document.body.firstChild);

    var app = el("div", "app");
    var sidebar = buildSidebar();
    var mainCol = el("div", "main-col");
    mainCol.appendChild(buildTopbar());

    if (article) {
      var wrap = el("div", "page-wrap");
      article.parentNode.removeChild(article);
      wrap.appendChild(article);
      var toc = el("aside", "toc"); toc.id = "mssTOC";
      wrap.appendChild(toc);
      mainCol.appendChild(wrap);
    } else if (customMain) {
      customMain.parentNode.removeChild(customMain);
      mainCol.appendChild(customMain);
    }

    app.appendChild(sidebar);
    app.appendChild(mainCol);
    // mobile nav backdrop — inside .app so the sidebar layers above it; tap to close
    var scrim = el("div", "nav-scrim"); scrim.id = "navScrim";
    scrim.addEventListener("click", function () { body.classList.remove("nav-open"); });
    app.appendChild(scrim);
    document.body.appendChild(app);

    // overlays
    document.body.appendChild(buildSearchOverlay());
    var tw = el("div", "toast-wrap"); tw.id = "toastWrap"; document.body.appendChild(tw);
    var stp = el("button", "icon-btn scroll-top", "↑"); stp.id = "scrollTop"; stp.setAttribute("aria-label", "Scroll to top");
    stp.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    document.body.appendChild(stp);

    if (article) { buildTOC(article); buildPageNav(article); buildPageControls(article); }
  }

  /* ====================================================================
     "ON THIS PAGE" TOC + scrollspy + reading progress
     ==================================================================== */
  var tocLinks = [], headings = [];
  function buildTOC(article) {
    var toc = document.getElementById("mssTOC");
    var hs = article.querySelectorAll(".article-body h2, .article-body h3");
    if (!toc || hs.length < 2) { if (toc) toc.style.display = "none"; var pw = article.closest(".page-wrap"); if (pw) pw.classList.add("no-toc"); return; }
    var html = '<div class="toc-title">On this page</div>';
    hs.forEach(function (h, i) {
      if (!h.id) h.id = "h-" + i + "-" + (h.textContent || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
      headings.push(h);
      html += '<a href="#' + h.id + '" class="lvl-' + (h.tagName === "H3" ? "3" : "2") + '">' + esc(h.textContent) + '</a>';
    });
    toc.innerHTML = html;
    tocLinks = [].slice.call(toc.querySelectorAll("a"));
    tocLinks.forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var t = document.getElementById(a.getAttribute("href").slice(1));
        if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - 90, behavior: "smooth" });
      });
    });
  }

  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    var rpEl = document.getElementById("readProgress");
    if (rpEl) rpEl.style.width = pct + "%";
    var stp = document.getElementById("scrollTop");
    if (stp) stp.classList.toggle("show", h.scrollTop > 600);

    // scrollspy
    if (headings.length) {
      var cur = headings[0], y = window.pageYOffset + 120;
      for (var i = 0; i < headings.length; i++) { if (headings[i].offsetTop <= y) cur = headings[i]; }
      tocLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + cur.id); });
    }
  }

  /* ====================================================================
     PREV / NEXT (within the same exam, across sections)
     ==================================================================== */
  function buildPageNav(article) {
    var p = pageById(PAGE_ID); if (!p) return;
    var seq = M.flatPages.filter(function (x) { return x.examId === p.examId; });
    var idx = seq.map(function (x) { return x.id; }).indexOf(PAGE_ID);
    if (idx < 0) return;
    var prev = seq[idx - 1], next = seq[idx + 1];
    var nav = el("nav", "page-nav");
    nav.innerHTML =
      (prev ? '<a class="prev" href="' + href(prev.file) + '"><span class="dir">← Previous</span><span class="ttl">' + esc(prev.title) + '</span></a>'
            : '<a class="prev disabled"><span class="dir">← Previous</span><span class="ttl">—</span></a>') +
      (next ? '<a class="next" href="' + href(next.file) + '"><span class="dir">Next →</span><span class="ttl">' + esc(next.title) + '</span></a>'
            : '<a class="next disabled"><span class="dir">Next →</span><span class="ttl">—</span></a>');
    article.appendChild(nav);
  }

  /* ====================================================================
     PAGE CONTROLS — mark complete + confidence (only for topic pages)
     ==================================================================== */
  function buildPageControls(article) {
    var p = pageById(PAGE_ID); if (!p) return;
    var isTopic = p.sectionId === "long-term" || p.sectionId === "short-term";
    if (!isTopic) return;
    try { localStorage.setItem("mss:lastpage", PAGE_ID); } catch (e) {}

    var head = article.querySelector(".article-head") || article;
    var row = el("div", "meta-row");
    var rec = Store.get(PAGE_ID);

    var done = el("button", "complete-toggle" + (rec.done ? " done" : ""));
    function paintDone() { done.innerHTML = '<span class="box">✓</span><span>' + (Store.get(PAGE_ID).done ? "Completed" : "Mark complete") + '</span>'; }
    paintDone();
    done.addEventListener("click", function () {
      var nd = !Store.get(PAGE_ID).done;
      Store.set(PAGE_ID, { done: nd, ts: Date.now() });
      done.classList.toggle("done", nd); paintDone();
      if (nd) { toast("✅", "Nice — topic marked complete!"); confetti(); }
    });
    row.appendChild(done);

    var conf = el("div", "confidence");
    [["red", "🔴"], ["learning", "🟡"], ["solid", "🟢"]].forEach(function (pair) {
      var b = el("button", rec.conf === pair[0] ? "sel" : "", pair[1]);
      b.setAttribute("data-v", pair[0]); b.title = pair[0];
      b.addEventListener("click", function () {
        Store.set(PAGE_ID, { conf: pair[0] });
        [].slice.call(conf.children).forEach(function (c) { c.classList.remove("sel"); });
        b.classList.add("sel");
      });
      conf.appendChild(b);
    });
    var wrap = el("span", "chip"); wrap.style.padding = "4px 6px 4px 12px"; wrap.style.gap = "10px";
    wrap.innerHTML = '<span>Confidence</span>'; wrap.appendChild(conf);
    row.appendChild(wrap);

    head.appendChild(row);

    document.addEventListener("mss:progress-change", refreshMini);
  }

  function refreshMini() {
    var op = overallPct();
    var mp = document.getElementById("miniPct"), mb = document.getElementById("miniBar");
    if (mp) mp.textContent = op.done + "/" + op.total;
    if (mb) mb.style.width = op.pct + "%";
  }

  /* ====================================================================
     SEARCH PALETTE
     ==================================================================== */
  var searchSel = 0, searchMatches = [];
  function buildSearchOverlay() {
    var ov = el("div", "search-overlay"); ov.id = "searchOverlay";
    ov.innerHTML =
      '<div class="search-box" role="dialog" aria-label="Search">' +
        '<div class="search-input-row"><span class="ico">🔍</span>' +
        '<input id="searchInput" type="text" placeholder="Search topics, formulas, concepts…" autocomplete="off" spellcheck="false"></div>' +
        '<div class="search-results" id="searchResults"></div>' +
        '<div class="search-foot"><span><span class="kbd">↑↓</span> navigate</span><span><span class="kbd">↵</span> open</span><span><span class="kbd">esc</span> close</span></div>' +
      '</div>';
    ov.addEventListener("click", function (e) { if (e.target === ov) closeSearch(); });
    return ov;
  }
  function openSearch() {
    var ov = document.getElementById("searchOverlay"); ov.classList.add("open");
    var inp = document.getElementById("searchInput"); inp.value = ""; inp.focus();
    renderResults("");
  }
  function closeSearch() { document.getElementById("searchOverlay").classList.remove("open"); }

  function scoreEntry(q, e) {
    var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return 0;
    var title = (e.title || "").toLowerCase();
    var kw = (e.keywords || "").toLowerCase();
    var txt = (e.text || "").toLowerCase();
    var sec = (e.section || "").toLowerCase();
    var s = 0;
    terms.forEach(function (t) {
      if (title === t) s += 120;
      if (title.indexOf(t) === 0) s += 60;
      if (title.indexOf(t) > -1) s += 40;
      if (sec.indexOf(t) > -1) s += 12;
      if (kw.indexOf(t) > -1) s += 22;
      if (txt.indexOf(t) > -1) s += 6;
    });
    // require every term to appear somewhere
    var hay = title + " " + kw + " " + txt + " " + sec;
    var all = terms.every(function (t) { return hay.indexOf(t) > -1; });
    return all ? s : 0;
  }
  function hl(text, q) {
    var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    var out = esc(text);
    terms.forEach(function (t) {
      if (!t) return;
      var re = new RegExp("(" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
      out = out.replace(re, "<mark>$1</mark>");
    });
    return out;
  }
  function renderResults(q) {
    var box = document.getElementById("searchResults");
    var pool = SEARCH.length ? SEARCH : M.flatPages.map(function (p) { return { id: p.id, title: p.title, section: p.sectionName, exam: p.examName, url: p.file, icon: p.icon, keywords: "", text: "" }; });

    if (!q.trim()) {
      // show quick links: continue + topic list
      var recent = "";
      var last; try { last = localStorage.getItem("mss:lastpage"); } catch (e) {}
      var lp = last && pageById(last);
      var html = "";
      if (lp) html += '<div class="sr-group-label">Continue</div>' + itemHTML({ title: lp.title, section: lp.sectionName, icon: lp.icon, url: lp.file }, "");
      html += '<div class="sr-group-label">Jump to</div>';
      pool.slice(0, 7).forEach(function (e) { html += itemHTML(e, ""); });
      box.innerHTML = html;
      wireItems(box);
      return;
    }

    searchMatches = pool.map(function (e) { return { e: e, s: scoreEntry(q, e) }; })
      .filter(function (x) { return x.s > 0; })
      .sort(function (a, b) { return b.s - a.s; })
      .slice(0, 24).map(function (x) { return x.e; });

    if (!searchMatches.length) {
      box.innerHTML = '<div class="search-empty">No results for “' + esc(q) + '”.<br><span class="text-mute">Try a topic, formula name, or concept.</span></div>';
      return;
    }
    // group by section
    var groups = {};
    searchMatches.forEach(function (e) { (groups[e.section] = groups[e.section] || []).push(e); });
    var html = "";
    Object.keys(groups).forEach(function (g) {
      html += '<div class="sr-group-label">' + esc(g) + '</div>';
      groups[g].forEach(function (e) { html += itemHTML(e, q); });
    });
    box.innerHTML = html;
    searchSel = 0; wireItems(box); markSel();
  }
  function itemHTML(e, q) {
    var sub = e.text ? e.text.slice(0, 90) : (e.exam || "");
    return '<a class="sr-item" href="' + href(e.url) + '">' +
      '<span class="sr-ico">' + (e.icon || "📄") + '</span>' +
      '<span class="sr-main"><span class="sr-title">' + (q ? hl(e.title, q) : esc(e.title)) + '</span>' +
      '<span class="sr-sub">' + (q && e.text ? hl(sub, q) : esc(sub)) + '</span></span>' +
      '<span class="sr-enter">↵</span></a>';
  }
  function wireItems(box) {
    [].slice.call(box.querySelectorAll(".sr-item")).forEach(function (a, i) {
      a.addEventListener("mousemove", function () { searchSel = i; markSel(); });
    });
  }
  function markSel() {
    var items = document.querySelectorAll("#searchResults .sr-item");
    items.forEach(function (a, i) { a.classList.toggle("sel", i === searchSel); });
    var sel = items[searchSel]; if (sel) sel.scrollIntoView({ block: "nearest" });
  }

  /* ====================================================================
     TOASTS + confetti (the little dopamine hits that keep students going)
     ==================================================================== */
  function toast(icon, msg) {
    var w = document.getElementById("toastWrap"); if (!w) return;
    var t = el("div", "toast", '<span class="ti">' + icon + '</span><span>' + esc(msg) + '</span>');
    w.appendChild(t);
    setTimeout(function () { t.style.transition = "opacity .4s, transform .4s"; t.style.opacity = "0"; t.style.transform = "translateY(8px)"; setTimeout(function () { t.remove(); }, 400); }, 2600);
  }
  window.MSSToast = toast;
  function confetti() {
    var colors = ["#6366f1", "#8b5cf6", "#d946ef", "#f59e0b", "#10b981"];
    var n = 36;
    for (var i = 0; i < n; i++) {
      var c = el("div");
      var size = 6 + (i % 4) * 2;
      c.style.cssText = "position:fixed;z-index:130;top:-12px;left:" + (10 + (i / n) * 80) + "vw;width:" + size + "px;height:" + size + "px;background:" + colors[i % colors.length] + ";border-radius:2px;pointer-events:none;animation:confetti-fall " + (1.6 + (i % 5) * 0.25) + "s var(--ease) forwards;animation-delay:" + (i % 6) * 0.05 + "s;";
      document.body.appendChild(c);
      (function (node) { setTimeout(function () { node.remove(); }, 3200); })(c);
    }
  }
  window.MSSConfetti = confetti;

  /* ====================================================================
     GLOBAL KEYBINDINGS + scroll wiring
     ==================================================================== */
  function keybinds() {
    document.addEventListener("keydown", function (e) {
      var open = document.getElementById("searchOverlay").classList.contains("open");
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) { e.preventDefault(); open ? closeSearch() : openSearch(); return; }
      if (e.key === "/" && !open && !/INPUT|TEXTAREA|SELECT/.test((e.target.tagName || ""))) { e.preventDefault(); openSearch(); return; }
      if (!open) return;
      if (e.key === "Escape") { closeSearch(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); searchSel = Math.min(searchSel + 1, document.querySelectorAll("#searchResults .sr-item").length - 1); markSel(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); searchSel = Math.max(searchSel - 1, 0); markSel(); }
      else if (e.key === "Enter") { var sel = document.querySelectorAll("#searchResults .sr-item")[searchSel]; if (sel) location.href = sel.getAttribute("href"); }
    });
    document.addEventListener("input", function (e) { if (e.target.id === "searchInput") renderResults(e.target.value); });
  }

  /* ====================================================================
     MATHJAX (LaTeX rendering via CDN, configured for $…$ and $$…$$)
     ==================================================================== */
  function loadMath() {
    if (!document.querySelector("[data-mss-article], [data-has-math]")) return;
    window.MathJax = {
      tex: { inlineMath: [["$", "$"], ["\\(", "\\)"]], displayMath: [["$$", "$$"], ["\\[", "\\]"]], processEscapes: true, tags: "none" },
      options: { skipHtmlTags: ["script", "noscript", "style", "textarea", "pre", "code"] },
      startup: { typeset: true }
    };
    var s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
    s.async = true; s.id = "MathJax-script";
    document.head.appendChild(s);
  }

  /* ====================================================================
     PWA — make the site installable as a phone/desktop app + offline.
     Injected here so every page gets it without editing each file.
     ==================================================================== */
  function registerPWA() {
    if (!document.querySelector('link[rel="manifest"]')) {
      var head = document.head;
      var man = el("link"); man.rel = "manifest"; man.href = href("site.webmanifest"); head.appendChild(man);
      var tc = el("meta"); tc.name = "theme-color"; tc.content = "#e02516"; head.appendChild(tc);
      var ati = el("link"); ati.rel = "apple-touch-icon"; ati.href = href("assets/icons/apple-touch-icon.png"); head.appendChild(ati);
      var cap = el("meta"); cap.name = "apple-mobile-web-app-capable"; cap.content = "yes"; head.appendChild(cap);
      var title = el("meta"); title.name = "apple-mobile-web-app-title"; title.content = "Study FAM"; head.appendChild(title);
    }
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register(href("service-worker.js")).catch(function () {});
      });
    }
  }

  /* ====================================================================
     BOOT
     ==================================================================== */
  function injectField() {
    if (document.querySelector(".mss-field")) return;
    var f = document.createElement("div");
    f.className = "mss-field"; f.setAttribute("aria-hidden", "true");
    f.innerHTML = '<div class="ms blk-bar"></div><div class="ms red-sq"></div><div class="ms blk-circ"></div><div class="ms blue-line"></div><div class="ms yel-tri"></div><div class="ms thin-diag"></div><div class="ms sm-red"></div>';
    document.body.insertBefore(f, document.body.firstChild);
  }

  function boot() {
    initTheme();
    injectField();
    assemble();
    keybinds();
    loadMath();
    registerPWA();
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    // close mobile nav when a link is tapped
    document.getElementById("mssSidebar").addEventListener("click", function (e) {
      if (e.target.closest(".nav-link")) body.classList.remove("nav-open");
    });
    // expose for dashboard / custom pages
    document.dispatchEvent(new CustomEvent("mss:ready"));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
