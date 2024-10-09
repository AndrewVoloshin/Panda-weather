interface ICoordinates {
    lat: string | null;
    lon: string | null;
}

export async function getCityCoordinates(city: string): Promise<ICoordinates> {
    let lat: string | null = null;
    let lon: string | null = null;

    const url = `https://nominatim.openstreetmap.org/search?q=${city}&format=json`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.length > 0) {
            lat = data[0].lat;
            lon = data[0].lon;
        }
    } catch (error) {
        console.error('Ошибка получения координат:', error);
    }

    return { lat, lon };
}