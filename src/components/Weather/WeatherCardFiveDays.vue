<script setup lang="ts">
import { reactive, ref, onMounted, watch } from 'vue';
import Loader from '@/components/UI/Loader.vue';
import { getWeatherByCityCoordinates } from '@/composable/getWeatherByCityCoordinates';

const props = defineProps({
  weather: {
    type: Object,
    required: true
  }
});

const forecast = reactive<{ date: string, avgTemp: number, iconUrl: string, description: string }[]>([]);

const isLoading = ref(true);

onMounted(() => {
  getForecastFiveDays();
});

const getForecastFiveDays = async () => {
  isLoading.value = true;

  const weatherForecast = await getWeatherByCityCoordinates(props.weather.coord, 'forecast');

  const groupedByDays = weatherForecast.list.reduce((acc: any, current: any) => {
    const date = current.dt_txt.split(' ')[0];
    if (!acc[date]) {
      acc[date] = { temps: [], avgTemp: 0, icon: current.weather[0].icon, description: current.weather[0].description };
    }
    acc[date].temps.push(current.main.temp);
    return acc;
  }, {});

  const dates = Object.keys(groupedByDays);
  if (dates.length <= 6) {
    const lastDate = dates[dates.length - 1];
    delete groupedByDays[lastDate];
  }

  for (const day in groupedByDays) {
    const temps = groupedByDays[day].temps;
    groupedByDays[day].avgTemp = temps.reduce((sum: number, temp: number) => sum + temp, 0) / temps.length;
  }

  forecast.splice(0, forecast.length, ...Object.keys(groupedByDays).map((date) => ({
    date,
    avgTemp: groupedByDays[date].avgTemp,
    iconUrl: `http://openweathermap.org/img/wn/${groupedByDays[date].icon}@2x.png`,
    description: groupedByDays[date].description
  })));

  isLoading.value = false;
};


watch(() => props.weather, getForecastFiveDays);

</script>

<template>
  <div class="forecast-container minimal">
    <Loader v-if="isLoading" />

    <ul v-else
        class="forecast-list">
      <li v-for="day in forecast"
          :key="day.date"
          class="forecast-item">
        <div class="forecast-item__container">
          <span class="forecast-date">
            {{ new Date(day.date).toLocaleDateString('uk-UA', { weekday: 'short', day: 'numeric', month: 'numeric' }) }}
          </span>
          <img :src="day.iconUrl"
               alt="weather icon"
               class="forecast-icon" />
          <span class="forecast-temp">{{ day.avgTemp.toFixed(1) }} °C</span>
        </div>
        <div class="forecast-desc">{{ day.description }}</div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.forecast-item__container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.forecast-icon {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.forecast-desc {
  font-size: 12px;
  color: #777;
}

.forecast-container.minimal {
  background-color: #fff;
  max-width: 400px;
  margin: 0 auto;
  font-family: 'Arial', sans-serif;
}

.forecast-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.forecast-item {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  border-bottom: 1px solid #eee;
  gap: 17px
}

.forecast-item:last-child {
  border-bottom: none;
}

.forecast-item:hover {
  background-color: #f4f4f4;
}

.forecast-date {
  font-size: 14px;
  color: #555;
}

.forecast-temp {
  font-size: 14px;
  color: #666;
  font-weight: bold;
}
</style>
