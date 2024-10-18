import { getWeatherByCityCoordinates } from '@/composable/getWeatherByCityCoordinates'
import type { ICoordinates, IWeather } from '@/types/weatherTypes'

export const getMyLocation = async (): Promise<{ lat: string; lon: string }> => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ lat: latitude.toString(), lon: longitude.toString() });
                },
                (error) => {
                    reject(new Error('Error getting location: ' + error.message));
                }
            );
        } else {
            reject(new Error('Geolocation is not supported by this browser.'));
        }
    });
};

export const getWeatherMyPosition = async () => {
    try {
        const myCoordinates: ICoordinates = await getMyLocation();
        const weatherData = await getWeatherByCityCoordinates(myCoordinates) as IWeather;
        return weatherData
    }
    catch (error) {
        throw error;
    }



}

