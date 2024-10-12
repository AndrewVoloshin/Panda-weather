<script setup lang="ts">
const props = defineProps({
  weather: {
    type: Object,
    required: true
  }
});

const getIconUrl = (iconCode: string) => {
  return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
</script>

<template>
  <div class="weather-card">
    <div class="weather-card__body">
      <div class="weather-card__temperature">
        <span>{{ Math.floor(weather.main.temp) }}°C</span>
        <img :src="getIconUrl(weather.weather[0].icon)"
             alt="Weather icon" />
      </div>
      <div class="weather-card__details">
        <p class="weather-card__description">{{ weather.weather[0].description }}</p>
        <p>Humidity: {{ weather.main.humidity }}%</p>
        <p>Wind: {{ weather.wind.speed }} km/h</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

.weather-card__body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.weather-card__temperature {
  display: flex;
  align-items: center;
  font-size: 36px; 
  font-weight: 600;
  color: #333; 
}

.weather-card__temperature img {
  margin-left: 12px;
  width: 80px;
  height: 80px;
}

.weather-card__details {
  font-size: 16px;
  color: #555; 
  margin-top: 10px;
  text-align: center;
}

.weather-card__description {
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 500;
  color: #555; 
}

.weather-card__description:first-letter {
  text-transform: uppercase;
}
</style>
