export interface ICoordinates {
    lat: string;
    lon: string;
}

export interface IWeather {
    base: string;
    clouds: {
        all: number;
    };
    cod: number;
    coord: {
        lon: number;
        lat: number;
    };
    dt: number;
    id: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    name: string;
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    visibility: number;
    weather: {
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
        deg: number;
        gust?: number;
    };
}

interface IForecast {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
        deg: number;
    };
    dt_txt: string;
}

export type TWeather = IWeather | IForecast | null