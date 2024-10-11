<template>
  <weather-cards-list :weather="savedWeather" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import WeatherCardsList from '@/components/WeatherCardsList.vue';

const savedWeather = ref([]);


const fetchSavedWeather = () => {
  const storedWeather = JSON.parse(localStorage.getItem('likedWeather') || '[]');
  savedWeather.value = storedWeather;
};

onMounted(() => {
  fetchSavedWeather();
});
</script>

<style scoped></style>
