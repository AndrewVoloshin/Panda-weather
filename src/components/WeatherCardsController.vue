<script setup lang="ts">
import { ref, watch } from 'vue';
import WeatherCard from './WeatherCard.vue';
import WeatherCardFiveDays from './WeatherCardFiveDays.vue';

const props = defineProps({
    weather: {
        type: Object,
        required: true,
    },
});

const isSingleDayForecast = ref(true);
const isLiked = ref(false); 

const toggleForecast = () => {
    isSingleDayForecast.value = !isSingleDayForecast.value;
};

const toggleLike = () => {
    const weatherId = props.weather.id; 
    const storedWeather = JSON.parse(localStorage.getItem('likedWeather') || '[]');

    if (isLiked.value) {
        const updatedWeather = storedWeather.filter((item) => item.id !== weatherId);
        localStorage.setItem('likedWeather', JSON.stringify(updatedWeather));
    } else {
        storedWeather.push(props.weather);
        localStorage.setItem('likedWeather', JSON.stringify(storedWeather));
    }
    isLiked.value = !isLiked.value;
};

watch(
    () => props.weather,
    (newWeather) => {
        const storedWeather = JSON.parse(localStorage.getItem('likedWeather') || '[]');
        isLiked.value = storedWeather.some((item) => item.id === newWeather.id);
    },
    { immediate: true }
);


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

            <button @click="toggleLike">
                <span v-if="isLiked">&#9829;</span>
                <span v-else>&#9825;</span>
                Like
            </button>
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

.button-container {
    margin-top: 16px;
}

button {
    margin-right: 8px;
    padding: 8px 16px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

/* Стили для сердечка */
button span {
    margin-right: 4px;
    /* Отступ между иконкой и текстом */
    font-size: 16px;
    /* Размер иконки */
}
</style>