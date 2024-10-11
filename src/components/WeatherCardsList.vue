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
    <div class="weather-list">
        <div class="weather-card"
             v-for="(weather, index) in weatherStore.weatherCardList"
             :key="index">
            <weather-controller :weather="weather" />
        </div>
    </div>
</template>

<style lang="css" scoped>
.weather-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 0 20px;
}

.weather-card {
    max-width: 360px;
}



@media (min-width: 400px) {
    .weather-card {
        width: 360px;
    }

    .weather-list {
        align-items: center;
    }
}



@media (min-width: 481px) {
    .weather-list {
        padding: 0 30px;
    }
}


@media (min-width: 769px) {
    .weather-list {
        padding: 10px 40px;
    }
}

@media (min-width: 815px) {
    .weather-list {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
}





@media (min-width: 1200px) {
    .weather-list {
        padding: 10px 60px;
    }
}
</style>
