import { ref, computed, watch, reactive } from 'vue'
import { defineStore } from 'pinia'

import { getCityCoordinates } from '@/composable/getCityCoordinates'
import { getWeatherByCityCoordinates } from '@/composable/getWeatherByCityCoordinates'

export const useWeatherStore = defineStore('weather', () => {

  const isGetMyLocation = ref(false);
  const citySelected = ref('')
  const weatherCity = reactive({});
  const weatherCards = reactive([])

  watch(citySelected, async (newCity) => {
    if (!newCity) return
    const coordinates = await getCityCoordinates(newCity);
    if (!coordinates) return
    const weather = await getWeatherByCityCoordinates(coordinates);
    if (!weather) return
    Object.assign(weatherCity, weather);
    weatherCards.push(weather)
    console.log(weatherCards, 'useWeatherStore');
  })


  return { isGetMyLocation, citySelected, weatherCity, weatherCards }
})