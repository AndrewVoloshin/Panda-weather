<template>


  <h1>Поиск погоды</h1>
  <input-city />

  <weather-card-list />


</template>

<script setup lang="ts">
import InputCity from '../components/InputCity.vue';
import WeatherCardList from '../components/WeatherCardsList.vue';
import { ref, onMounted } from 'vue';


</script>
