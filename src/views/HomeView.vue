<script setup lang="ts">
import { onMounted } from 'vue'
import InputCity from '@/components/Weather/InputCity.vue'
import WeatherCardsList from '@/components/Weather/WeatherCardsList.vue'
import { useWeatherStore } from '@/stores/weather'
import { getWeatherMyPosition } from '@/composable/getMyLocation'

const weatherStore = useWeatherStore()

const addWeatherByPositionToStore = async () => {
  if (weatherStore.isGetMyLocation) return
  weatherStore.isGetMyLocation = true
  const weatherMyPosition = await getWeatherMyPosition()
  if (!weatherMyPosition) return
  weatherStore.weatherCards.push(weatherMyPosition)
}

onMounted(async () => {
  addWeatherByPositionToStore()
});
</script>

<template>
  <input-city />
  <weather-cards-list :weatherCards="weatherStore.weatherCards" />
</template>
