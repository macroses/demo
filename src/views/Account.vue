<script setup>
import Alert from '@/components/UI/Alert/Alert.vue'
import UserForm from '@/components/Account/UserForm.vue'
</script>

<template>
  <div class="account">
    <div class="container">
      <div class="account__layout">
        <div class="account__layout-item">
          <Alert>
            Please provide additional information about yourself. This is necessary for compiling
            <b>statistics</b> and creating <b>training programs</b>.
          </Alert>
          <UserForm />
        </div>
      </div>
    </div>
  </div>
</template>
