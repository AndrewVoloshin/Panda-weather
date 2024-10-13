import { ref, watch, reactive } from 'vue'
import { defineStore } from 'pinia'
import { getCityCoordinates } from '@/composable/getCityCoordinates'
import { getWeatherByCityCoordinates } from '@/composable/getWeatherByCityCoordinates'

export const useWeatherStore = defineStore('weather', () => {
  const isGetMyLocation = ref(false)
  const citySelected = ref('')
  const weatherCards = reactive([])
  const isLoading = ref(false)

  const startLoading = () => {
    isLoading.value = true
  }
  const stopLoading = () => {
    isLoading.value = false
  }

  const addWeatherToCardByInput = async (newCity) => {
    startLoading()
    if (!newCity) return
    const coordinates = await getCityCoordinates(newCity)

    if (!coordinates) return
    const weather = await getWeatherByCityCoordinates(coordinates)

    if (!weather) return
    weatherCards.unshift(weather)

    stopLoading()
  }

  watch(citySelected, addWeatherToCardByInput)

  return { isGetMyLocation, citySelected, weatherCards, isLoading, startLoading, stopLoading }
})
