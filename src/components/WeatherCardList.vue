<script setup lang="ts">
import WeatherCard from '@/components/WeatherCard.vue'
import { reactive } from 'vue';

import { useWeatherStore } from '@/stores/weather'

const weatherStore = useWeatherStore()



const weatherCardList = reactive([])



</script>


<template>
    <weather-card />

    <div>{{ weatherStore.weatherCity }}</div>

</template>