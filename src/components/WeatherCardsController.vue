<script setup lang="ts">
import { ref } from 'vue';
import WeatherCard from './WeatherCard.vue';
import WeatherCardFiveDays from './WeatherCardFiveDays.vue';
import ButtonLike from './ButtonLike.vue';


const props = defineProps({
    weather: {
        type: Object,
        required: true,
    },
});

const isSingleDayForecast = ref(true);

const toggleForecast = () => {
    isSingleDayForecast.value = !isSingleDayForecast.value;
};

</script>

<template>
    <div class="weather-card">
        <div class="weather-card__header">
            <h3>{{ weather.name }}</h3>
            <p>{{ weather.date }}</p>
        </div>

        <weather-card v-if="isSingleDayForecast"
                      :weather="props.weather" />
        <weather-card-five-days v-else
                                :weather="props.weather" />

        <div class="button-container">
            <button @click="toggleForecast">
                {{ isSingleDayForecast ? '5-day forecast' : '1-day forecast' }}
            </button>

            <button-like :weather="props.weather" />

        </div>
    </div>
</template>



<style scoped>
.weather-card {
    background-color: #fff;
    border-radius: 10px;
    padding: 16px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    max-width: 300px;
    margin: 10px;
}

.weather-card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.weather-card__header h3 {
    margin: 0;
    font-size: 18px;
}

.weather-card__header p {
    margin: 0;
    color: #666;
}
</style>