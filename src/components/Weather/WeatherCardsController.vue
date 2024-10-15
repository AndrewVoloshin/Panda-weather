<script setup lang="ts">
import { ref } from 'vue';
import WeatherCard from '@/components/Weather/WeatherCard.vue';
import WeatherCardFiveDays from '@/components/Weather/WeatherCardFiveDays.vue';
import ButtonLike from '@/components/UI/ButtonLike.vue';
import ButtonDelete from '@/components/UI/ButtonDelete.vue';
import ButtonSwitchForecast from '@/components/UI/ButtonSwitchForecast.vue';
import Chart from '@/components/Chart.vue'

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

const handleToggleForecast = () => {
    isSingleDayForecast.value = !isSingleDayForecast.value;
};

</script>

<template>
    <div class="weather-card__container">
        <div class="weather-card__header">
            <h3>{{ weather.name }}</h3>
        </div>

        <weather-card v-if="isSingleDayForecast"
                      :weather="props.weather" />

        <weather-card-five-days v-else
                                :weather="props.weather" />

        <chart :weather="props.weather" />

        <div class="button-container">

            <button-delete :weatherCards="weatherCards"
                           :weather="props.weather" />

            <button-switch-forecast @toggle="handleToggleForecast" />

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