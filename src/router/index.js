import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import { supabase } from '@/lib/supabaseClient'
import Account from '@/views/Account.vue'
import WorkoutMode from '@/views/WorkoutMode.vue'
import AccountSettings from '@/views/AccountSettings.vue'
import BodyParameters from '@/views/BodyParameters.vue'
import Program from '@/views/Program.vue'
import Exercises from '@/views/Exercises.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        auth: false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        auth: false
      }
    },
    {
      path: '/account',
      name: 'Account',
      component: Account,
      meta: {
        auth: true
      }
    },
    {
      path: '/workout/',
      name: 'workoutmode',
      component: WorkoutMode,
      meta: {
        auth: true
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: AccountSettings,
      meta: {
        auth: true
      }
    },
    {
      path: '/body-parameters',
      name: 'bodyParameters',
      component: BodyParameters,
      meta: {
        auth: true
      }
    },
    {
      path: '/program',
      name: 'program',
      component: Program,
      meta: {
        auth: true
      }
    },
    {
      path: '/exercises',
      name: 'exercises',
      component: Exercises,
      meta: {
        auth: true
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (to.matched.some(res => res.meta.auth)) {
    if (session?.user) {
      next()
      return
    }
    next({ name: 'Login' })
    return
  }
  next()
})

export default router
