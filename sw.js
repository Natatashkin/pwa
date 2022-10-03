const staticCacheName = "stat-app-v0";
const dynamicCacheName = "dynamic-app-v0";

const appStaticFiles = [
  "/",
  "/index.html",
  "/style.css",
  "/index.js",
  "/manifest.json",
  "/fonts/Roboto-Bold.ttf",
  "/fonts/Roboto-Regular.ttf",
  "/icons/search.png",
  "/icons/logo_32x32.png",
  "/offline.html",
];

self.addEventListener("install", async (e) => {
  console.log("sw: install");
  const cahe = await caches.open(staticCacheName);
  await cahe.addAll(appStaticFiles);
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

const fetchRequest = async (req) => {
  const dynamicCache = await caches.open(dynamicCacheName);
  try {
    const response = await fetch(req);
    await dynamicCache.put(req, response.clone());
    return response;
  } catch (error) {
    const chachedData = await caches.match(req);
    return chachedData;
  }
};

self.addEventListener("fetch", (e) => {
  e.respondWith(fetchRequest(e.request));
});
