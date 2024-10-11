<template>
    <div class="weather-cards">

      <div v-if="savedWeather.length === 0">
        <p>No saved weather data found.</p>
      </div>

      <div v-else>
        <weather-controller v-for="(weather, index) in savedWeather"
                            :key="index"
                            :weather="weather" />
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import WeatherController from '@/components/WeatherCardsController.vue';

const savedWeather = ref([]);


const fetchSavedWeather = () => {
  const storedWeather = JSON.parse(localStorage.getItem('likedWeather') || '[]');
  savedWeather.value = storedWeather;
};

onMounted(() => {
  fetchSavedWeather();
});
</script>

<style scoped>

</style>
