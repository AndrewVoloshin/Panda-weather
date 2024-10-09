import { ref, computed, watch, reactive } from 'vue'
import { defineStore } from 'pinia'

import { getCityCoordinates } from '@/composable/getCityCoordinates'
import { getCityWeather } from '@/composable/getCityWeather'

export const useWeatherStore = defineStore('weather', () => {

  const citySelected = ref('')
  const weatherCity = reactive({});

  watch(citySelected, async (newCity) => {
    if (!newCity) return
    const coordinates = await getCityCoordinates(newCity);
    if (!coordinates) return
    const weather = await getCityWeather(coordinates);
    Object.assign(weatherCity, weather);
  })





  return { citySelected, weatherCity }

})