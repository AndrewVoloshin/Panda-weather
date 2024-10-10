export interface ICityCoordinates {
    lat: string | null;
    lon: string | null;
}

export const getCityWeather = async (cityCoordinates: ICityCoordinates, format = 'weather') => {
    if (!cityCoordinates) return
    const url = `http://api.openweathermap.org/data/2.5/${format}?lat=${cityCoordinates.lat}&lon=${cityCoordinates.lon}&appid=2220f87983d31fbc9d2f18e9292efacb&units=metric`;


    try {
        const response = await fetch(url);
        const data = await response.json();
        return data

    } catch (error) {
        console.error('Ошибка получения координат:', error);
    }
};


