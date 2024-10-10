import { ref, computed, watch, reactive } from 'vue'
import { defineStore } from 'pinia'

import { getCityCoordinates } from '@/composable/getCityCoordinates'
import { getWeatherByCityCoordinates } from '@/composable/getWeatherByCityCoordinates'

export const useWeatherStore = defineStore('weather', () => {

  const isGetMyLocation = ref(false);
  const citySelected = ref('')
  const weatherCity = reactive({});
  const weatherCardList = reactive([])

  watch(citySelected, async (newCity) => {
    if (!newCity) return
    const coordinates = await getCityCoordinates(newCity);
    if (!coordinates) return
    const weather = await getWeatherByCityCoordinates(coordinates);
    if (!weather) return
    Object.assign(weatherCity, weather);
    weatherCardList.push(weather)
  })





  return { isGetMyLocation, citySelected, weatherCity, weatherCardList }

})