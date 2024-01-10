async function loadCachedData(cacheName, cacheKey) {
  try {
    const cache = await caches.open(cacheName)
    const cachedResponse = await cache.match(cacheKey)

    if (cachedResponse) {
      return await cachedResponse.json()
    }
    return null
  } catch (error) {
    console.error('Error loading data from cache:', error)
    throw error
  }
}

const saveDataToCache = async (cacheName, cacheKey, fromData) => {
  try {
    const cache = await caches.open(cacheName)
    const cacheData = JSON.stringify(fromData.value)
    const response = new Response(cacheData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    await cache.put(cacheKey, response)
  } catch (error) {
    console.error('Error saving data to cache:', error)
  }
}

export { loadCachedData, saveDataToCache }
