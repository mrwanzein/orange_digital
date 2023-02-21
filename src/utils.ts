import { CityWeatherParams } from "./redux/CitiesWeatherSlice";
import { WeatherIcon } from "./redux/CitiesWeatherSlice";

// generate pseudo random number between a max (not included) & a min
const generateRandomNumBetweenTwoValues = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min)) + min;
}

// create a city with fictional weather data
export const createCityWithFakeWeatherData = (): CityWeatherParams => {
    const possibleForecast: WeatherIcon[] = ["thunderstorm", "sunny", "overcast"];
    
    return {
        temperature: generateRandomNumBetweenTwoValues(15, 30),
        humidity: generateRandomNumBetweenTwoValues(0, 1),
        windSpeed: generateRandomNumBetweenTwoValues(3, 12),
        icon: possibleForecast[Math.floor(Math.random() * possibleForecast.length)]
    }
}