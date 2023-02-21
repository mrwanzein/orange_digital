import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createCityWithFakeWeatherData } from "../utils"

export type WeatherIcon = "thunderstorm" | "sunny" | "overcast"

export interface CityWeatherParams {
    temperature: number,
    humidity: number,
    windSpeed: number,
    icon: WeatherIcon
}

export type CityWeatherData = { [key: string]: CityWeatherParams }

export type SelectedCity = {
    cityName: string;
    weatherInfo: CityWeatherParams | undefined
}

type InitialState = {
    cities: CityWeatherData
    selectedCity?: SelectedCity
}

const initialState: InitialState = {
    cities: {
        "New York": {
            temperature: 22,
            humidity: 0.6,
            windSpeed: 5,
            icon: "thunderstorm"
        },
        "London": {
            temperature: 18,
            humidity: 0.8,
            windSpeed: 4,
            icon: "sunny"
        },
        "Paris": {
            temperature: 20,
            humidity: 0.7,
            windSpeed: 6,
            icon: "overcast"
        },
        "Berlin": {
            temperature: 21,
            humidity: 0.75,
            windSpeed: 7,
            icon: "sunny"
        },
    },
    selectedCity: undefined
}

export const citiesWeatherSlice = createSlice({
    name: "citiesWeather",
    initialState,
    reducers: {
        addCity: (state, action: PayloadAction<string>): void => {
            const newCity: CityWeatherParams = createCityWithFakeWeatherData();
            
            state.cities = {
                ...state.cities,
                [action.payload]: newCity
            }
        },
        selectCity: (state, action: PayloadAction<string>): void => {
            let cityInput = action.payload;
            cityInput = cityInput.trim().toLocaleLowerCase();

            if (cityInput.split(" ").length >= 2) {
                cityInput = cityInput.split(" ").map(str => str[0].toLocaleUpperCase() + str.substring(1)).join(" ");
            } else {
                cityInput = cityInput[0].toLocaleUpperCase() + cityInput.substring(1);
            }

            if (state.cities[cityInput]) {
                state.selectedCity = {
                    cityName: cityInput,
                    weatherInfo: state.cities[cityInput]
                }
            } else {
                state.selectedCity = {
                    cityName: "unknown city",
                    weatherInfo: undefined
                }
            }

        }
    }
})

export const { addCity, selectCity } = citiesWeatherSlice.actions