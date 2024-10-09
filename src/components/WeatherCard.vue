<template>
  <div class="weather-card">
    <div class="weather-card__header">
      <h3>{{ weatherItem.name }}</h3>
      <p>{{ weatherItem.date }}</p>
    </div>
    <div class="weather-card__body">
      <div class="weather-card__temperature">
        <span>{{ Math.floor(weatherItem.main.temp) }}°C</span>
        <img :src="getIconUrl(weatherItem.weather[0].icon)"
             alt="Weather icon" />
      </div>
      <div class="weather-card__details">
        <p> {{ weatherItem.weather[0].description }}</p>

        <p>Humidity: {{ weatherItem.main.humidity }}%</p>
        <p>Wind: {{ weatherItem.wind.speed }} km/h</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  weatherItem: {
    type: Object,
    required: true
  }
});

const getIconUrl = (iconCode: string) => {
  return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
console.log(props.weatherItem);
</script>

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
  width: 40px;
  height: 40px;
}

.weather-card__details {
  font-size: 14px;
  color: #666;
}
</style>
