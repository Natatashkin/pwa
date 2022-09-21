const staticCacheName = "stat-app-v2";
const dynamicCacheName = "dinamic-app-v2";

const appStaticFiles = [
  "index.html",
  "style.css",
  "index.js",
  "/fonts/Roboto-Bold.ttf",
  "/fonts/Roboto-Regular.ttf",
  "/icons/search.png",
  "/icons/logo_32x32.png",
  "/offline.html",
];

// Strategy Cache first
async function cacheFirst(request) {
  const cachedData = await caches.match(request);
  if (cachedData) {
    return cachedData;
  }
  const requestData = await fetch(request);
  console.log(requestData);
  return requestData;
  // return cachedData ?? (await fetch(request));
}
// <<<<

// Strategy Network first
async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName);
  try {
    const response = await fetch(request);
    console.log("network >>>", response);
    await cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cachedData = await cache.match(request);
    return cachedData ?? (await caches.match("/offline.html"));
  }
}
// <<<<

self.addEventListener("install", async (e) => {
  const cache = await caches.open(staticCacheName);
  return await cache.addAll(appStaticFiles);
});

self.addEventListener("activate", async (e) => {
  const cacheKeys = await caches.keys();
  console.log(cacheKeys);
  return await Promise.all(
    cacheKeys
      .filter((name) => name !== staticCacheName)
      .filter((name) => name !== dynamicCacheName)
      .map((name) => caches.delete(name))
  );
});

self.addEventListener("fetch", async (e) => {
  // console.log("Fetch >>>", e.request.url;
  const { request } = e;
  const url = new URL(request.url);
  if (url.origin === location.origin) {
    await e.respondWith(cacheFirst(request));
    return;
  }
  await e.respondWith(networkFirst(request));
});
