<template>
    <div class="chart">
        <canvas ref="temperatureChart"></canvas>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Filler } from 'chart.js';
import { getForecastForNext24Hours } from '@/utils/getForecastForNext24Hours'

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Filler);

const props = defineProps({
    weather: {
        type: Object,
        required: true
    }
});

const temperatureChart = ref(null);

const setupChartInstance = (forecast24) => {
    if (!forecast24) return
    const forecast24Temperature = forecast24.map(o => o.temperature)
    const forecast24Time = forecast24.map(o => o.time)
    const minTemperature = Math.floor(Math.min(...forecast24Temperature))
    const maxTemperature = Math.floor(Math.max(...forecast24Temperature))

    if (temperatureChart.value) {
        const chartInstance = new Chart(temperatureChart.value, {
            type: 'line',
            data: {
                labels: forecast24Time,
                datasets: [{
                    label: 'Температура (°C)',
                    data: forecast24Temperature,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.1,
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        ticks: {
                            callback: function (value) {
                                return value + '°';
                            }
                        },
                        min: minTemperature > 0 ? 0 : minTemperature,
                        suggestedMax: maxTemperature
                    }
                }
            }
        });
        window.addEventListener('resize', () => {
            chartInstance.resize();
        });
    }
}

onMounted(async () => {
    const forecast24 = await getForecastForNext24Hours(props.weather.coord);
    setupChartInstance(forecast24)
})

</script>

<style scoped>
canvas {
    max-width: 100%;
    height: 400px;
}
</style>