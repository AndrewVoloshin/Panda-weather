<script setup lang="ts">
import { onMounted } from 'vue'
import WeatherController from './WeatherCardsController.vue'
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
    <div v-for="(weather, index) in weatherStore.weatherCardList"
         :key="index">
        <weather-controller :weather="weather" />
    </div>
</template>