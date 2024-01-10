import { supabase } from '@/lib/supabaseClient'

const tableSubscriber = (channel, event, schema, tableName, storageName) => {
  const cache = JSON.parse(localStorage.getItem(storageName)) || []

  supabase.channel(channel)
    .on(
      'postgres_changes',
      { event, schema, table: tableName },
      payload => {
        if (payload.eventType === 'DELETE') {
          const updatedStorage = cache.filter(column => column.id !== payload.old.id)
          localStorage.setItem(storageName, JSON.stringify(updatedStorage))
        }

        if (payload.eventType === 'INSERT') {
          cache.push({ ...payload.new })
          localStorage.setItem(storageName, JSON.stringify(cache))
        }

        if (payload.eventType === 'UPDATE') {
          const updatedStorage = cache.map(column => {
            if (column.id === payload.new.id) {
              return { ...column, ...payload.new }
            }
            return column;
          })

          localStorage.setItem(storageName, JSON.stringify([...updatedStorage]))
        }
      }
    )
    .subscribe()
}

export { tableSubscriber }
