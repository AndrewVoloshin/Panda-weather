<template>
  <Header />
  <main>
    <RouterView />
  </main>
  <language-switcher />
</template>

<script setup lang="ts">
import Header from '@/components/Layout/Header.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
</script>

<style scoped></style>
