import { getCollection } from '@/composables/getCollection'
import { tableSubscriber } from './tableSubscriber'

const cacheExercises = async cacheKey => {
  const cachedData = localStorage.getItem(cacheKey)

  !cachedData
    ? await getAndCacheCollection()
    : tableSubscriber(
      '*',
      'public',
      'exercises',
      'exercisesCache'
    )

  async function getAndCacheCollection() {
    const data = await getCollection('exercises', '*')
    localStorage.setItem(cacheKey, JSON.stringify(data))
  }
}

export { cacheExercises }
