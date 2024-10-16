import { ref, watch, reactive } from 'vue'
import { defineStore } from 'pinia'
import { getCityCoordinates } from '@/composable/getCityCoordinates'
import { getWeatherByCityCoordinates } from '@/composable/getWeatherByCityCoordinates'
import type { TWeather } from '@/types/weatherTypes'

export const useWeatherStore = defineStore('weather', () => {
  const isGetMyLocation = ref(false)
  const citySelected = ref('')
  const weatherCards = reactive<TWeather[]>([])
  const isLoading = ref(false)

  const startLoading = () => {
    isLoading.value = true
  }

  const stopLoading = () => {
    isLoading.value = false
  }

  const addWeatherToCardByInput = async (newCity: string) => {
    try {
      const coordinates = await getCityCoordinates(newCity)
      const weather = await getWeatherByCityCoordinates(coordinates)
      weatherCards.unshift(weather)
    }
    catch (error) {
      console.error('Error adding weather for city:', error);
    }
  }

  watch(citySelected, addWeatherToCardByInput)

  return { isGetMyLocation, citySelected, weatherCards, isLoading, startLoading, stopLoading }
})
