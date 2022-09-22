const staticCacheName = "stat-app-v2";
const dynamicCacheName = "dynamic-app-v2";

const appStaticFiles = [
  "./",
  "./index.html",
  "./style.css",
  "./index.js",
  "./fonts/Roboto-Bold.ttf",
  "./fonts/Roboto-Regular.ttf",
  "./icons/search.png",
  "./icons/logo_32x32.png",
  "./offline.html",
];

self.addEventListener("install", async (e) => {
  const staticCache = await caches.open(staticCacheName);
  await staticCache.addAll(appStaticFiles);
});

self.addEventListener("activate", async (e) => {
  const cacheKeys = await caches.keys();
  await Promise.all(
    cacheKeys
      .filter((name) => name !== staticCacheName)
      .filter((name) => name !== dynamicCacheName)
      .map((name) => caches.delete(name))
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(checkCache(e.request));
});

async function checkCache(req) {
  const cachedResponse = await caches.match(req);
  return cachedResponse || checkOnline(req);
}

async function checkOnline(req) {
  const dynamicCache = await caches.open(dynamicCacheName);
  try {
    const res = await fetch(req);
    await dynamicCache.put(req, res.clone());
    return res;
  } catch (error) {
    const cachedRes = await dynamicCache.match(req);
    if (cachedRes) {
      return cachedRes;
    }
    return caches.match("./offline.html");
  }
}
