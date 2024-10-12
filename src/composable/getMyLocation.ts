import { getWeatherByCityCoordinates } from '@/composable/getWeatherByCityCoordinates'


export const getMyLocation = async (): Promise<{ lat: string; lon: string } | null> => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ lat: latitude.toString(), lon: longitude.toString() });
                },
                (error) => {
                    console.error('Error getting location:', error);
                    reject(null);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            reject(null);
        }
    });
};

export const getWeatherMyPosition = async () => {
    const myCoordinates = await getMyLocation();
    const weatherData = await getWeatherByCityCoordinates(myCoordinates);
    return weatherData
}

