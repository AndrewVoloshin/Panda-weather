<script setup lang="ts">
import { ref, onMounted } from 'vue';
import WeatherCardsList from '@/components/WeatherCardsList.vue';

const savedWeather = ref([]);

const getSavedWeather = () => {
  return JSON.parse(localStorage.getItem('likedWeather') || '[]');
};

onMounted(() => {
  savedWeather.value = getSavedWeather();
});
</script>

<template>
  <weather-cards-list :weather="savedWeather" />
</template>