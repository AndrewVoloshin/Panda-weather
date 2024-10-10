<script setup lang="ts">
import WeatherCard from './WeatherCard.vue';
import WeatherCardFiveDays from './WeatherCardFiveDays.vue';

const props = defineProps({
    weather: {
        type: Object,
        required: true
    }
});

props.weather.forecastDays = 1



</script>

<template>
    <weather-card :weather="props.weather"
                  v-if="props.weather.forecastDays = 1" />

    <weather-card-five-days :weather="props.weather"
                            v-if="props.weather.forecastDays = 5" />
</template>