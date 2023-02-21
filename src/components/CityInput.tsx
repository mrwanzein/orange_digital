import { useState } from "react"
import { useDispatch } from "react-redux"
import { selectCity } from "../redux/CitiesWeatherSlice"
import styled from "styled-components"

const CityInput = () => {
    const dispatch = useDispatch();

    const [cityInput, setCityInput] = useState<string>("");
    
    const searchCity = (): void => {
        dispatch(selectCity(cityInput));
    }
    
    return (
        <CityInputWrapper>
            <CityInputField
                value={cityInput}
                onChange={(e) => {
                    setCityInput(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") searchCity();
                }}
                placeholder="Please type a city to check its weather"
            />
            <SearchButton
                onClick={searchCity}
                disabled={cityInput === ""}
            >
                search
            </SearchButton>
        </CityInputWrapper>
    )
}

export default CityInput

const CityInputWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-left: 10px;
`

const CityInputField = styled.input`
    width: 70%;
    border: 2px solid black;
    border-radius: 5px;
`

const SearchButton = styled.button`
    width: 30%;
    margin: 0 10px;
    padding: 0;
    cursor: pointer;
    height: 27px;
`