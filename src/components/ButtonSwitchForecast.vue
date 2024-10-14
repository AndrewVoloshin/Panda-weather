<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const emit = defineEmits<{
    (e: 'toggle'): void;
}>();

const isSingleDayForecast = ref(true);

const toggleForecast = () => {
    isSingleDayForecast.value = !isSingleDayForecast.value;
    emit('toggle');
};
</script>

<template>
    <div class="button-forecast"
         @click="toggleForecast">
        <img v-if="isSingleDayForecast"
             src="/src/assets/svg/chevron-down-solid.svg"
             alt="Toggle to multi-day forecast">
        <img v-else
             src="/src/assets/svg/chevron-up-solid.svg"
             alt="Toggle to single-day forecast">
    </div>
</template>

<style scoped>
.button-forecast {
    display: inline-block;
    position: relative;
    width: 25px;
    height: 25px;
}

.button-forecast img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>