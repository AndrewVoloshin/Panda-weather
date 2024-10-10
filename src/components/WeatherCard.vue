<script setup lang="ts">
import { getCityWeather } from '@/composable/getCityWeather'
const props = defineProps({
  weather: {
    type: Object,
    required: true
  }
});

const getIconUrl = (iconCode: string) => {
  return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

const getForecastFiveDays = async () => {
  const weatherForecast = await getCityWeather(props.weather.coord, 'forecast')

  const groupedByDays = weatherForecast.list.reduce((acc: any, current: any) => {
    const date = current.dt_txt.split(' ')[0];
    if (!acc[date]) {
      acc[date] = { temps: [], avgTemp: 0 };
    }
    acc[date].temps.push(current.main.temp);
    return acc;
  }, {});

  for (const day in groupedByDays) {
    const temps = groupedByDays[day].temps;
    groupedByDays[day].avgTemp = temps.reduce((sum: number, temp: number) => sum + temp, 0) / temps.length;
  }

  const fiveDayForecast = Object.keys(groupedByDays).map((date) => ({
    date,
    avgTemp: groupedByDays[date].avgTemp,
  }));

  console.log(fiveDayForecast);

}
</script>

<template>
  <div class="weather-card">
    <div class="weather-card__header">
      <h3>{{ weather.name }}</h3>
      <p>{{ weather.date }}</p>
    </div>
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
    <div class="button-container">
      <button @click="getForecastFiveDays()">Switch</button>
      <button>Like</button>
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
