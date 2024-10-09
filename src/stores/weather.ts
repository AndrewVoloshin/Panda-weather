import { ref, computed, watch, reactive } from 'vue'
import { defineStore } from 'pinia'

import { getCityCoordinates } from '@/composable/getCityCoordinates'
import { getCityWeather } from '@/composable/getCityWeather'

export const useWeatherStore = defineStore('weather', () => {

  const isGetMyLocation = ref(false);
  const citySelected = ref('')
  const weatherCity = reactive({});
  const weatherCardList = reactive([])

  watch(citySelected, async (newCity) => {
    if (!newCity) return
    const coordinates = await getCityCoordinates(newCity);
    if (!coordinates) return
    const weather = await getCityWeather(coordinates);
    if (!weather) return
    Object.assign(weatherCity, weather);
    weatherCardList.push(weather)
  })





  return { isGetMyLocation, citySelected, weatherCity, weatherCardList }

})