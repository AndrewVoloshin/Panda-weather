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
  <div class="weather-card__body">
    <div class="weather-card__temperature">
      <span>{{ Math.floor(weather.main.temp) }}°C</span>
      <img :src="getIconUrl(weather.weather[0].icon)"
           alt="Weather icon" />
    </div>
    <div class="weather-card__details">
      <p> {{ weather.weather[0].description }}</p>
      <p>Humidity: {{ weather.main.humidity }}%</p>
      <p>Wind: {{ weather.wind.speed }} km/h</p>
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

.weather-card__body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.weather-card__temperature {
  display: flex;
  align-items: center;
  font-size: 24px;
}

.weather-card__temperature img {
  margin-left: 8px;
  width: 80px;
  height: 80px;
}

.weather-card__details {
  font-size: 14px;
  color: #666;
}
</style>
