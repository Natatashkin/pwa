const updateCacheNames = async (cacheKeys) => {
  const step = 1;
  return cacheKeys.map((key) => {
    const version = key.slice(key.length - 1, 1);
    const newVersion = version + step;
    const newCacheName = key.slice(0, key.length - 2);
    console.log(`${newCacheName}${newVersion}`);
    return `${newCacheName}${newVersion}`;
  });
};
