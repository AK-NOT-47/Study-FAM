/* Me Studing Stuff — service worker.
   Makes the site installable and readable offline. No build step, no deps.
   Bump CACHE when you ship content changes so clients refresh the shell. */
const CACHE = "mss-cache-v3";

/* App shell — relative to this file's location (the site root), so it works
   whether served at a domain root or under a GitHub Pages /repo/ subpath. */
const SHELL = [
  "./",
  "./index.html",
  "./assets/css/styles.css",
  "./assets/js/manifest.js",
  "./assets/js/search-index.js",
  "./assets/js/site.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  // Page navigations: network-first so new content shows when online,
  // fall back to cache (then the cached shell) when offline.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => { cachePut(req, res.clone()); return res; })
        .catch(() => caches.match(req).then((m) => m || caches.match("./index.html")))
    );
    return;
  }

  // Everything else (CSS/JS/fonts/MathJax/images): cache-first, then network,
  // caching the result at runtime so it's available offline next time.
  e.respondWith(
    caches.match(req).then((hit) =>
      hit || fetch(req).then((res) => { cachePut(req, res.clone()); return res; }).catch(() => hit)
    )
  );
});

function cachePut(req, res) {
  // Cache same-origin and successfully-fetched cross-origin (opaque) GETs.
  if (!res || (res.status !== 200 && res.type !== "opaque")) return;
  caches.open(CACHE).then((c) => c.put(req, res)).catch(() => {});
}
