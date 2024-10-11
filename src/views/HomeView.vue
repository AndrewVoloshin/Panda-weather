<script setup lang="ts">
import { onMounted } from 'vue'
import InputCity from '../components/InputCity.vue';
import WeatherCardsList from '../components/WeatherCardsList.vue';
import { useWeatherStore } from '@/stores/weather'
import { getWeatherMyPosition } from '@/composable/getMyLocation'

const weatherStore = useWeatherStore()

const addWeatherToList = (weatherData) => {
  if (!weatherData) return
  weatherStore.weatherCardList.push(weatherData)
}

onMounted(async () => {
  if (weatherStore.isGetMyLocation) return
  weatherStore.isGetMyLocation = true
  const weatherMyPosition = await getWeatherMyPosition()
  addWeatherToList(weatherMyPosition)
});
</script>

<template>
  <input-city />
  <weather-cards-list :weather="weatherStore.weatherCardList" />
</template>
