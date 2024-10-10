<template>
  <div>
    <h3>Прогноз на 5 днів</h3>
    <ul>
      <li v-for="day in forecast" :key="day.date">
        {{ day.date }}: {{ day.avgTemp.toFixed(1) }} °C
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps({
  forecast: Array
});
</script>
