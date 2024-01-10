<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { supabase } from '@/lib/supabaseClient'
import Button from '@/components/UI/Button/Button.vue'
import Input from '@/components/UI/Input/Input.vue'
import { useEventsStore } from '@/stores/userEvents'

const router = useRouter()
const formState = reactive({
  email: null,
  password: null,
  errorMessage: null
})

const userEvents = useEventsStore()
const loading = ref(false)

const login = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithPassword({
      email: formState.email,
      password: formState.password
    })

    if (error) throw error
    router.push('/')

    await userEvents.fetchEventHandler()
  } catch (error) {
    toast.error(error.message, { position: toast.POSITION.TOP_RIGHT })
  } finally {
    loading.value = false
  }
}

const isButtonDisabled = computed(() => Boolean(formState.errorMessage))

async function signInWithGitHub() {
  await supabase.auth.signInWithOAuth({
    provider: 'github'
  })
}
</script>

<template>
  <form
    class="form__auth"
    @submit.prevent="login"
  >
    <h1 class="form__header">
      Login
    </h1>
    <Input
      v-model="formState.email"
      label-placeholder="Email"
      type="email"
    />
    <Input
      type="password"
      v-model="formState.password"
      label-placeholder="Password"
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
        :disabled="isButtonDisabled"
      >
        Submit
      </Button>
      <p>
        Do not have an account?
        <RouterLink
          to="/register"
          class="form-redirect"
        >
          Register
        </RouterLink>
      </p>
    </div>
  </form>
</template>
