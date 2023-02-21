import { configureStore } from "@reduxjs/toolkit"
import { citiesWeatherSlice } from "./CitiesWeatherSlice"

const store = configureStore({
    reducer: {
        citiesWeather: citiesWeatherSlice.reducer
    },
})

type RootState = ReturnType<typeof store.getState>

export const selectCities = (state: RootState) => state.citiesWeather.cities;
export const selectSelectedCity= (state: RootState) => state.citiesWeather.selectedCity;

export default store