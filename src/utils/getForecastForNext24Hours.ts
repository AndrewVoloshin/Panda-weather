import { getWeatherByCityCoordinates } from '@/composable/getWeatherByCityCoordinates'

export const getForecastForNext24Hours = async (weatherCoordinates) => {
    const weatherForecast = await getWeatherByCityCoordinates(weatherCoordinates, 'forecast');

    // Получаем уникальные даты из прогноза
    const uniqueDates = [...new Set(weatherForecast.list.map(current => current.dt_txt.split(' ')[0]))];

    // Проверяем, есть ли доступные даты
    if (uniqueDates.length === 0) {
        console.error('Нет доступных дат в прогнозе погоды.');
        return;
    }

    // Берём первую дату как базовую
    const baseDate = uniqueDates[0];

    // Получаем текущий час
    const currentHour = new Date().getHours();

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
    // Ограничиваем массив до 24 значений
    return hourlyTemperatures.slice(0, 24); // Возвращаем только первые 24 значения
};
