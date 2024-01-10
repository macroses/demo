<script setup>
import { toggleColorTheme } from '@/composables/toggleColor'

const { userTheme, toggleTheme } = toggleColorTheme();
</script>

<template>
  <div class="switcher-box">
    <div
      class="light"
      :class="{ active: userTheme === 'light-theme' }"
      @click.stop="toggleTheme('light-theme')"
    >
      light
      <!--      <Icon-->
      <!--        width="17px"-->
      <!--        icon-name="sun-bright"/>-->
    </div>
    <div
      class="dark"
      @click.stop="toggleTheme('dark-theme')"
      :class="{ active: userTheme === 'dark-theme' }"
    >
      dark
      <!--      <Icon-->
      <!--        width="17px"-->
      <!--        icon-name="moon"/>-->
    </div>
    <div
      class="dark"
      @click.stop="toggleTheme('prefer')"
      :class="{ active: userTheme === 'prefer' }"
    >
      prefer
      <!--      <Icon-->
      <!--        width="17px"-->
      <!--        icon-name="gear"/>-->
    </div>
  </div>
</template>
