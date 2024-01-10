<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useOnlyNumbers } from '@/helpers/useOnlyNumbers'
import { supabase } from '@/lib/supabaseClient'
import { getProfile, updateProfile } from '@/composables/profile'

const isLoading = ref(false)
const currentSession = ref(null)

const userData = reactive({
  username: null,
  age: null,
  weight: null,
  height: null,
  gender: null,
  level: null,
  updated_at: null
})

const handleSubmit = () => updateProfile(userData, isLoading)

onMounted(async () => {
  const {
    data: { session }
  } = await supabase.auth.getSession()

  currentSession.value = session

  await getProfile(userData, isLoading)
})
</script>

<template>
  <form
    class="account__user-form"
    @submit.prevent="handleSubmit"
  >
    <Loading
      v-if="isLoading"
      large
    />

    <Input
      v-model="userData.username"
      :value="userData.username"
      label-placeholder="Name"
    />
    <Input
      v-model="userData.age"
      :value="userData.age"
      label-placeholder="Age"
      @keydown="useOnlyNumbers($event)"
    />
    <Input
      v-model="userData.weight"
      :value="userData.weight"
      label-placeholder="Weight (kg)"
      @keydown="useOnlyNumbers($event)"
    />
    <Input
      v-model="userData.height"
      :value="userData.height"
      label-placeholder="Height (cm)"
      @keydown="useOnlyNumbers($event)"
    />
    <GroupInputs>
      <Radio
        v-model="userData.gender"
        label="Male"
        name="gender"
        value="Male"
      />
      <Radio
        v-model="userData.gender"
        label="Female"
        name="gender"
        value="Female"
      />
    </GroupInputs>
    <GroupInputs>
      <Radio
        v-model="userData.level"
        label="Novice"
        name="gender"
        value="Novice"
      />
      <Radio
        v-model="userData.level"
        label="Advanced"
        name="gender"
        value="Advanced"
      />
      <Radio
        v-model="userData.level"
        label="Professional"
        name="gender"
        value="Professional"
      />
    </GroupInputs>
    <Button
      class="account__user-form-submit"
      type="submit"
    >
      Update info
    </Button>
  </form>
</template>
