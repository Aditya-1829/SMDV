const CACHE_NAME = "smdv-v3-fixed-20261017";
const BASE = "/SMDV/";
const ASSETS = [
  BASE,
  BASE + "index.html",
  BASE + "manifest.json",
  BASE + "icon-192.png",
  BASE + "icon-512.png"
];
self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Cache files individually so one unavailable file doesn't break SW installation.
    await Promise.all(ASSETS.map(async url => {
      try { await cache.add(new Request(url, {cache: "reload"})); }
      catch (err) { console.warn("Could not cache", url, err); }
    }));
    await self.skipWaiting();
  })());
});
self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith("smdv-") && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(BASE)) return;
  if (req.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(BASE + "index.html", fresh.clone()).catch(() => {});
        }
        return fresh;
      } catch {
        return (await caches.match(req)) || (await caches.match(BASE)) || (await caches.match(BASE + "index.html"));
      }
    })());
    return;
  }
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try { return await fetch(req); }
    catch { return new Response("Offline", {status: 503, headers: {"Content-Type":"text/plain"}}); }
  })());
});