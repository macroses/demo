import dayjs from 'dayjs'
import { supabase } from '@/lib/supabaseClient'

const pushEvent = async (tableName, userData, loading) => {
  const {
    data: { session }
  } = await supabase.auth.getSession()

  try {
    loading.value = true
    const { user } = session

    const updated = {
      user_id: user.id,
      ...userData
    }

    const { error } = await supabase.from(tableName).insert(updated)

    if (error) throw new Error(error.message)
  } catch (error) {
    console.log(error.message)
  } finally {
    loading.value = false
  }
}

const updateStorage = (data, storageName, userData) => {
  localStorage.setItem(storageName, JSON.stringify(data))
  userData.value = data.map(el => ({
    ...el,
    date: dayjs(el.date)
  }))
}

const getWorkouts = async (userData, loading, userId) => {
  try {
    loading.value = true

    const localStorageWorkouts = localStorage.getItem('workouts')

    const { data: workouts, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('user_id', userId)

    if (error) throw new Error(error.message)

    const updatedWorkouts = workouts.map(el => ({
      ...el,
      date: dayjs(el.date)
    }))

    if (localStorageWorkouts) {
      if (localStorageWorkouts !== JSON.stringify(updatedWorkouts)) {
        updateStorage(updatedWorkouts, 'workouts', userData)
      } else {
        userData.value = updatedWorkouts
      }
    } else {
      updateStorage(updatedWorkouts, 'workouts', userData)
    }
  } catch (error) {
    console.log(error.message)
  } finally {
    loading.value = false
  }
}

const deleteEvent = async (tableName, nameOfId, id, loading) => {
  const {
    data: { session }
  } = await supabase.auth.getSession()

  try {
    loading.value = true
    const { user } = session

    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq(nameOfId, id)
      .eq('user_id', user.id)

    if (error) throw new Error(error.message)
  } catch (error) {
    console.log(error.message)
  } finally {
    loading.value = false
  }
}

const updateEvent = async (tableName, nameOfId, eventId, updatedObject, loading) => {
  const {
    data: { session }
  } = await supabase.auth.getSession()

  try {
    loading.value = true
    const { user } = session

    const { error } = await supabase
      .from(tableName)
      .update(updatedObject)
      .eq(nameOfId, eventId)
      .eq('user_id', user.id)
      .select()

    if (error) throw new Error(error.message)
  } catch (error) {
    console.log(error.message)
  } finally {
    loading.value = false
  }
}

const updateSeveralRows = async (tableName, rowsArray, loading) => {
  const {
    data: { session }
  } = await supabase.auth.getSession()

  try {
    loading.value = true
    const { user } = session

    const { error } = await supabase
      .from(tableName)
      .upsert(rowsArray.value)
      .eq('user_id', user.id)
      .select()

    if (error) throw new Error(error.message)
  } catch (error) {
    console.log(error.message)
  } finally {
    loading.value = false
  }
}

export { pushEvent, getWorkouts, deleteEvent, updateEvent, updateSeveralRows }
