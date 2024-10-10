<template>
  <div class="about">
    <h1>Saved Weather Cards</h1>
    <div class="weather-cards">
      <div v-if="savedWeather.length === 0">
        <p>No saved weather data found.</p>
      </div>
      <div v-else>
        <weather-controller
          v-for="(weather, index) in savedWeather"
          :key="index"
          :weather="weather"
        />
      </div>
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
.about {
  padding: 20px;
}

.weather-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.weather-controller {
  max-width: 300px;
}
</style>
