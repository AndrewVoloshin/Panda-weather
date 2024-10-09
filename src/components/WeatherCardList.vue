<script setup lang="ts">
import WeatherCard from '@/components/WeatherCard.vue'
import { ref, computed, watch, reactive, onMounted } from 'vue'
import { useWeatherStore } from '@/stores/weather'
import { getCityWeather } from '@/composable/getCityWeather'

const weatherStore = useWeatherStore()


const getWeatherMyPosition = async () => {
    if (weatherStore.isGetMyLocation) return
    weatherStore.isGetMyLocation = true
    const myCoordinates = await getMyLocation();
    const weatherData = await getCityWeather(myCoordinates);
    return weatherData
}

const getMyLocation = async (): Promise<{ lat: string; lon: string } | null> => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log(position.coords);
                    resolve({ lat: latitude.toString(), lon: longitude.toString() });
                },
                (error) => {
                    console.error('Error getting location:', error);
                    reject(null);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            reject(null);
        }
    });
};

const addWeatherToList = (weatherData) => {
    if (!weatherData) return
    weatherStore.weatherCardList.push(weatherData)
}

onMounted(async () => {
    const weatherMyPosition = await getWeatherMyPosition()
    addWeatherToList(weatherMyPosition)
});


</script>


<template>
    <div v-for="(weatherItem, index) in weatherStore.weatherCardList"
         :key="index">
        <weather-card :weatherItem="weatherItem" />
    </div>
</template>