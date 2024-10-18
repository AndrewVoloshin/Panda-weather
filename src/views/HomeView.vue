<script setup lang="ts">
import { onMounted } from 'vue'
import InputCity from '../components/Weather/InputCity.vue';
import WeatherCardsList from '@/components/Weather/WeatherCardsList.vue';
import { useWeatherStore } from '@/stores/weather'
import { getWeatherMyPosition } from '@/composable/getMyLocation'
import type { TWeather } from '@/types/weatherTypes'


const weatherStore = useWeatherStore()

const addWeatherByPositionToStore = async () => {
  if (weatherStore.isGetMyLocation) return
  weatherStore.isGetMyLocation = true
  try {
    const weatherMyPosition = await getWeatherMyPosition()
    weatherStore.weatherCards.push(weatherMyPosition)
  }
  catch (error) {
    console.error('Error adding weather for city by my position:', error);
  }
}

onMounted(async () => {
  addWeatherByPositionToStore()
});
</script>

<template>
  <input-city />
  <weather-cards-list :weatherCards="weatherStore.weatherCards" />
</template>
