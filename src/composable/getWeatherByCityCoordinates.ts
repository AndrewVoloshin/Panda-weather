import type { ICoordinates, TWeather } from '@/types/weatherTypes';

export const getWeatherByCityCoordinates = async (
    cityCoordinates: ICoordinates,
    format: 'weather' | 'forecast' = 'weather'
): Promise<TWeather> => {
    if (!cityCoordinates) throw new Error('Incorrect coordinates');

    const url = `https://api.openweathermap.org/data/2.5/${format}?lat=${cityCoordinates.lat}&lon=${cityCoordinates.lon}&appid=2220f87983d31fbc9d2f18e9292efacb&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error receiving weather:', error);
        throw error;
    }
};