<script setup lang="ts">
import { ref } from 'vue';
import WeatherCard from './WeatherCard.vue';
import WeatherCardFiveDays from './WeatherCardFiveDays.vue';
import ButtonLike from './ButtonLike.vue';
import ButtonDelete from './ButtonDelete.vue';
import Chart from './Chart.vue'

const props = defineProps({
    weather: {
        type: Object,
        required: true,
    },
    weatherCards: {
        type: Object,
        required: true,
    }
});

const isSingleDayForecast = ref(true);

const toggleForecast = () => {
    isSingleDayForecast.value = !isSingleDayForecast.value;
};
</script>

<template>
    <div class="weather-card__container">
        <div class="weather-card__header">
            <h3>{{ weather.name }}</h3>
            <p>{{ weather.date }}</p>
        </div>

        <weather-card v-if="isSingleDayForecast"
                      :weather="props.weather" />
        <weather-card-five-days v-else
                                :weather="props.weather" />


        <chart :weather="props.weather" />


        <div class="button-container">

            <button-delete :weatherCards="weatherCards"
                           :weather="props.weather" />

            <div class="button-forecast"
                 @click="toggleForecast">
                <img v-if="isSingleDayForecast"
                     src="/src/assets/svg/chevron-down-solid.svg"
                     alt="">
                <img v-else
                     src="/src/assets/svg/chevron-up-solid.svg"
                     alt="">
            </div>
            <button-like :weather="props.weather" />
        </div>
    </div>
</template>

<style scoped>
.weather-card__container {
    background-color: #fff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.weather-card__container:hover {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
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

.button-forecast {
    display: inline-block;
    position: relative;
    width: 25px;
    height: 25px;
}

.button-forecast img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}

@media (max-width: 400px) {
    .weather-card__container {
        max-width: 320px;
    }

}


@media (min-width: 815px) {
    .weather-card__container {
        width: 420px;
    }

}
</style>