const IMAGE_CACHE_PREFIX = "empty-classes-images-";
const IMAGE_CACHE_NAME = `${IMAGE_CACHE_PREFIX}v2`;
const IMAGE_PRECACHE_CONCURRENCY = 3;

const IMAGE_PATHS = [
  "art.webp",
  "ben2tu-avatar.webp",
  "computer.webp",
  "credit.webp",
  "dimpome.webp",
  "ghost-girl-id-portrait.webp",
  "ghost-girl-inverted-eyes-strip.webp",
  "ghost-girl-official-roster-crop.webp",
  "lin-ruoxuan.webp",
  "lin-ruoxuan-ambulance-cn.webp",
  "lin-ruoxuan-ambulance-cn-final.webp",
  "sport.webp",
  "spring.webp",
  "zhetang-city-aerial.webp",
  "zhetang-six-exterior.webp",
  "zhetang-six-flower-grass.webp",
  "pics/admin.webp",
  "pics/black-square-favicon.svg",
  "pics/broken-mirror-portrait.svg",
  "pics/friend1.webp",
  "pics/friend2.webp",
  "pics/hash-bloodshot-eyes-jumpscare.webp",
  "pics/pan1.webp",
  "pics/pan2.webp",
  "pics/pan3.webp",
  "pics/red-eye-favicon.svg",
  "pics/safe-jumpscare.svg",
  "pics/truck.webp"
];

let precachePromise = null;

function imageUrl(path) {
  return new URL(path, self.registration.scope).href;
}

async function notifyClients(payload) {
  const clients = await self.clients.matchAll({
    includeUncontrolled: true,
    type: "window"
  });
  clients.forEach((client) => client.postMessage(payload));
}

async function cacheOneImage(cache, path) {
  const url = imageUrl(path);
  const cached = await cache.match(url);
  if (cached) return { path, status: "cached" };

  try {
    const response = await fetch(new Request(url, {
      credentials: "same-origin"
    }));

    if (!response.ok) {
      return { path, status: "failed", httpStatus: response.status };
    }

    await cache.put(url, response);
    return { path, status: "downloaded" };
  } catch {
    return { path, status: "failed" };
  }
}

async function precacheImages() {
  const cache = await caches.open(IMAGE_CACHE_NAME);
  let nextIndex = 0;
  let completed = 0;
  let failed = 0;

  await notifyClients({
    type: "IMAGE_PRECACHE_PROGRESS",
    completed,
    failed,
    total: IMAGE_PATHS.length
  });

  async function worker() {
    while (nextIndex < IMAGE_PATHS.length) {
      const path = IMAGE_PATHS[nextIndex++];
      const result = await cacheOneImage(cache, path);
      completed += 1;
      if (result.status === "failed") failed += 1;

      await notifyClients({
        type: "IMAGE_PRECACHE_PROGRESS",
        completed,
        failed,
        total: IMAGE_PATHS.length,
        path,
        status: result.status
      });
    }
  }

  const workerCount = Math.min(IMAGE_PRECACHE_CONCURRENCY, IMAGE_PATHS.length);
  await Promise.all(Array.from({ length: workerCount }, () => worker()));

  await notifyClients({
    type: "IMAGE_PRECACHE_COMPLETE",
    completed,
    failed,
    total: IMAGE_PATHS.length
  });
}

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames
      .filter((name) => name.startsWith(IMAGE_CACHE_PREFIX) && name !== IMAGE_CACHE_NAME)
      .map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("message", (event) => {
  if (event.data?.type !== "START_IMAGE_PRECACHE") return;
  if (!precachePromise) {
    precachePromise = precacheImages().finally(() => {
      precachePromise = null;
    });
  }
  event.waitUntil(precachePromise);
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET" || request.destination !== "image") return;

  const requestUrl = new URL(request.url);
  if (requestUrl.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(IMAGE_CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached;

    const response = await fetch(request);
    if (response.ok) {
      await cache.put(request, response.clone());
    }
    return response;
  })());
});
