console.log("Hello from Service Worker!");

self.addEventListener("install", async (e) => {
  console.log("Service Worker Installed");
  const cache = await caches.open("static-cache");
  cache
    .addAll([
      "./",
      "./index.html",
      "./sw.ts",
      "./assets/coda_sign.png",
      "offline.html",
    ])
    .then(function () {
      console.log("Cached all files");
    });
});

self.addEventListener("activate", async (e) => {
  console.log("Service Worker Activated");
});

self.addEventListener("fetch", async (e: FetchEvent) => {
  console.log("Fetch Event");
  const req = e.request;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    console.log("Fetch Event: Cache First");
    e.respondWith(cacheFirst(req));
  } else {
    console.log("Fetch Event: Network First");
    e.respondWith(networkFirst(req));
  }
});

async function cacheFirst(req: Request): Promise<Response> {
  const cache = await caches.open("static-cache");
  const cached = await cache.match(req);
  return (
    cached ||
    fetch(req).catch((e) => {
      console.log("Error: ", e);
      return caches.match("offline.html").then((res) => {
        return res || new Response("Offline");
      });
    })
  );
}

async function networkFirst(req: Request): Promise<Response> {
  const cache = await caches.open("static-cache");
  try {
    const fresh = await fetch(req);
    // cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached || new Response("Not Found");
  }
}
