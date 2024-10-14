<script setup lang="ts">
import WeatherController from '@/components/Weather/WeatherCardsController.vue'

const props = defineProps({
    weatherCards: {
        type: Object,
        required: true,
    },
});

</script>

<template>
    <div class="weather-list">
        <div class="weather-container">
            <div class="weather-card"
                 v-for="weather in props.weatherCards"
                 :key="weather.id">
                <weather-controller :weatherCards="weatherCards"
                                    :weather="weather" />
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.weather-container {
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

    .weather-container {
        align-items: center;
    }
}

@media (min-width: 481px) {
    .weather-container {
        padding: 0 30px;
    }
}

@media (min-width: 769px) {
    .weather-container {
        padding: 10px 40px;
    }
}

@media (min-width: 815px) {
    .weather-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(420px, 0fr));
        justify-content: center;
        gap: 20px;
    }
}

@media (min-width: 1190px) {
    .weather-card {
        width: 400px;
    }
}

@media (min-width: 1200px) {
    .weather-list {
        display: flex;
        justify-content: center;
    }

    .weather-container {
        width: 1200px;
        padding: 10px 60px;
    }
}
</style>
