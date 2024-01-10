<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { supabase } from '@/lib/supabaseClient'
import Button from '@/components/UI/Button/Button.vue'
import Input from '@/components/UI/Input/Input.vue'
import { useVuelidate } from '@vuelidate/core'
import { minLength, required } from '@vuelidate/validators'

const router = useRouter()
const formState = reactive({
  email: null,
  password: null,
  confirmPassword: null
})

const rules = reactive({
  password: { required, minLength: minLength(6) }
})

const v$ = ref(useVuelidate(rules, formState))

const loading = ref(false)

const register = async () => {
  v$.value.password.$touch()
  if (!v$.value.password.$error && formState.password === formState.confirmPassword) {
    try {
      loading.value = true
      const { error } = await supabase.auth.signUp({
        email: formState.email,
        password: formState.password
      })

      loading.value = false
      if (error) throw error
      router.push('/')
    } catch (error) {
      toast.error(error.message, { position: toast.POSITION.TOP_RIGHT })
    }

    return
  }
  toast.error('Password do not match or is less than 6 characters', { position: toast.POSITION.TOP_CENTER })
}

async function signInWithGitHub() {
  await supabase.auth.signInWithOAuth({
    provider: 'github'
  })
}
</script>

<template>
  <form
    class="form__auth"
    @submit.prevent="register"
  >
    <h1 class="form__header">
      Register
    </h1>
    <Input
      v-model="formState.email"
      label-placeholder="Email"
    />
    <Input
      type="password"
      v-model="formState.password"
      label-placeholder="Password"
    />
    <Input
      type="password"
      v-model="formState.confirmPassword"
      label-placeholder="Password"
      width="350px"
    />

    <div class="social-auth">
      <Button
        type="button"
        @click="signInWithGitHub"
        transparent
      >
        <Icon icon-name="github" width="28px"/>
      </Button>
    </div>

    <div class="form__submit">
      <Button
        type="submit"
        :loading="loading"
      >
        Submit
      </Button>
      <p>
        Already registered?
        <RouterLink
          to="/login"
          class="form-redirect"
        >
          Login
        </RouterLink>
      </p>
    </div>
  </form>
</template>
