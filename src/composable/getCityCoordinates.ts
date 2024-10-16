import type { ICoordinates } from '@/types/weatherTypes'

export async function getCityCoordinates(city: string): Promise<ICoordinates> {
    const url = `https://nominatim.openstreetmap.org/search?q=${city}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.length > 0) {
            const lat = data[0].lat
            const lon = data[0].lon
            return { lat, lon };
        } else {
            throw new Error(`Could not find coordinates for the city: ${city}`);
        }
    } catch (error) {
        console.error('Error when receiving coordinates:', error);
        throw new Error(`Error when getting coordinates for a city: ${city}`);
    }
}
