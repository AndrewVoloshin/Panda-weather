<template>
    <div class="container">
        <div class="chart">
            <canvas ref="temperatureChart"></canvas>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Filler } from 'chart.js';
import { getWeatherByCityCoordinates } from '@/composable/getWeatherByCityCoordinates'

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Filler);

const props = defineProps({
    weather: {
        type: Object,
        required: true
    }
});

const forecast = reactive<{ date: string, avgTemp: number, iconUrl: string, description: string }[]>([])

console.log('props.weather=>', props.weather);

// Дані для графіка
const hours = ['0', '3', '6', '9', '12', '15', '18', '21'];
const temperatures = [-5, -2, 0, 5, 10, 15, 7, 3]; // Включені від'ємні температури

const temperatureChart = ref(null);

const getForecastForNext24Hours = async () => {
    const weatherForecast = await getWeatherByCityCoordinates(props.weather.coord, 'forecast');
    console.log('weatherForecast=>', weatherForecast);

    // Получаем уникальные даты из прогноза
    const uniqueDates = [...new Set(weatherForecast.list.map(current => current.dt_txt.split(' ')[0]))];

    // Проверяем, есть ли доступные даты
    if (uniqueDates.length === 0) {
        console.error('Нет доступных дат в прогнозе погоды.');
        return;
    }

    // Берём первую дату как базовую
    const baseDate = uniqueDates[0];
    console.log('Базовая дата:', baseDate);

    // Получаем текущий час
    const currentHour = new Date().getHours();
    console.log('Текущий час:', currentHour);

    // Массив для хранения почасовых данных
    const hourlyTemperatures = [];

    // Фильтруем данные по текущему часу и базовой дате
    const todayHourlyData = weatherForecast.list.filter(current => {
        const [date, time] = current.dt_txt.split(' ');
        const hour = parseInt(time.split(':')[0], 10); // Получаем час
        return date === baseDate && hour >= currentHour; // Условие для текущего дня
    });

    // Добавляем данные на текущий день
    hourlyTemperatures.push(...todayHourlyData.map(current => ({
        time: parseInt(current.dt_txt.split(' ')[1].split(':')[0], 10), // Час без ведущего нуля
        temperature: current.main.temp // Температура
    })));

    // Если необходимо добавить данные на следующий день
    if (hourlyTemperatures.length < 24) {
        // Получаем следующий день
        const nextDateIndex = uniqueDates.indexOf(baseDate) + 1; // Индекс следующей даты
        const nextDate = uniqueDates[nextDateIndex]; // Следующая дата после базовой

        if (nextDate) {
            const nextDayHourlyData = weatherForecast.list.filter(current => {
                const [date] = current.dt_txt.split(' ');
                return date === nextDate; // Условие для следующего дня
            });

            // Добавляем данные на следующий день
            hourlyTemperatures.push(...nextDayHourlyData.map(current => ({
                time: parseInt(current.dt_txt.split(' ')[1].split(':')[0], 10), // Час без ведущего нуля
                temperature: current.main.temp // Температура
            })));
        }
    }
    console.log(hourlyTemperatures.slice(0, 24));
    // Ограничиваем массив до 24 значений
    return hourlyTemperatures.slice(0, 24); // Возвращаем только первые 24 значения
};



onMounted(async () => {
    const obj = await getForecastForNext24Hours();

    const objArrayTime = obj.map(o => o.temperature)
    console.log(objArrayTime);

    const objArrayTimeTemp = obj.map(o => o.time)
    console.log(objArrayTimeTemp, 'objArrayTimeTemp');


    const minTemperature = Math.floor(Math.min(...objArrayTime))
    const maxTemperature = Math.floor(Math.max(...objArrayTime))

    console.log('Минимальная температура:', minTemperature);
    console.log('Максимальная температура:', maxTemperature);





    if (temperatureChart.value) {
        const chartInstance = new Chart(temperatureChart.value, {
            type: 'line', // Тип графіка
            data: {
                labels: objArrayTimeTemp,
                datasets: [{
                    label: 'Температура (°C)',
                    data: objArrayTime,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true, // Включаємо заливку
                    tension: 0.1, // Плавність лінії
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
                        min: minTemperature > 0 ? 0 : minTemperature, // Мінімальне значення для відображення
                        suggestedMax: maxTemperature // Можна задати максимальне значення для більш зручного масштабу
                    }
                }
            }
        });



        window.addEventListener('resize', () => {
            chartInstance.resize();
        });
    }


});
</script>

<style scoped>
canvas {
    max-width: 100%;
    height: 400px;
}
</style>