import { onMounted, ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'

export const getSession = () => {
  const session = ref(null)

  onMounted(() => {
    supabase.auth.getSession().then(({ data }) => {
      session.value = data.session
    })

    supabase.auth.onAuthStateChange((_, _session) => {
      session.value = _session
    })
  })

  return { session }
}
