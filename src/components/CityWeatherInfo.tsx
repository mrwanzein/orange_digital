import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { selectSelectedCity } from "../redux/store"
import { SelectedCity } from "../redux/CitiesWeatherSlice";
import styled from "styled-components"
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import ThunderstormIcon from '@mui/icons-material/Thunderstorm'
import CloudIcon from '@mui/icons-material/Cloud'
import WaterIcon from '@mui/icons-material/Water';
import AirIcon from '@mui/icons-material/Air';

const CityWeatherInfo = () => {
    const selectedCityFromStore = useSelector(selectSelectedCity);
    
    const [firstRender, setFirstRender] = useState<boolean>(true);
    const [cachedCity, setCachedCity]  = useState<SelectedCity | undefined>(selectedCityFromStore);
    const [isCelsius, setIsCelsius] = useState<boolean>(true);
    const [cityTemp, setCityTemp] = useState<number | undefined>(selectedCityFromStore?.weatherInfo?.temperature);

    const cacheCity = (): void => {
        localStorage.setItem('cachedCity', JSON.stringify(selectedCityFromStore));
    }

    const clearCachedCity = (): void => {
        localStorage.removeItem('cachedCity');
    }

    const convertTemperature = (temp: number | undefined): void => {
        if (temp) {
            if (isCelsius) {
                setCityTemp(Math.round(temp * 1.8) + 32);
                setIsCelsius(!isCelsius);
            } else {
                setCityTemp(Math.round((temp - 32) * 5/9));
                setIsCelsius(!isCelsius);
            }
        }
    }

    const getIcon = () => {
        const iconStyle = {
            transform: "scale(4)"
        }
        
        if (cachedCity?.weatherInfo) {
            return (
                {
                    "thunderstorm": <ThunderstormIcon style={iconStyle} />,
                    "sunny": <WbSunnyIcon style={iconStyle} />,
                    "overcast": <CloudIcon style={iconStyle} />
                }[cachedCity.weatherInfo.icon]
            )
        }
    }

    useEffect(() => {
        setCityTemp(selectedCityFromStore?.weatherInfo?.temperature);
        setIsCelsius(true);
        setCachedCity(firstRender? JSON.parse(localStorage.getItem('cachedCity') as string) : selectedCityFromStore);
        setFirstRender(false);
    }, [selectedCityFromStore])

    return (
        <>
            {
                cachedCity?.cityName === "unknown city" ?
                
                <p style={{ marginLeft: "10px", marginTop: "10px" }}>No city found. It could be the city is missing from the database or a possible typo.</p> :

                cachedCity?.cityName && cachedCity.cityName !== "unknown city" ?
                
                <CityWeatherInfoWrapper>
                    <CityName>
                        <h3>{cachedCity.cityName}</h3>
                    </CityName>

                    <TemperatureAndHumidityWrapper>
                        <TemperatureDiv>
                            <TemperatureValue>
                                {cityTemp ?? cachedCity?.weatherInfo?.temperature}°{isCelsius ? "C" : "F"} <CompareArrowsIcon style={{ cursor: "pointer", transform: "scale(1.5)"}} onClick={() => convertTemperature(cityTemp ?? cachedCity?.weatherInfo?.temperature)}/> {!isCelsius ? "C" : "F"}
                            </TemperatureValue>
                            
                            <div style={{ marginTop: "40px" }}>
                                {getIcon()}
                            </div>

                            <div style={{ marginTop: "40px", fontSize: "1.5em" }}>
                                {cachedCity?.weatherInfo?.icon}
                            </div>
                        </TemperatureDiv>

                        <HumidityAndWindSpeedDiv>
                            <HumidityValueWrapper>
                                <WaterIcon style={{ transform: "scale(3)" }}/>
                                <HumidityAndWindSpeedNumericValue>{cachedCity?.weatherInfo && cachedCity?.weatherInfo?.humidity * 100}%</HumidityAndWindSpeedNumericValue>
                                <HumidityAndWindSpeedStringValue>humidity</HumidityAndWindSpeedStringValue>
                            </HumidityValueWrapper>

                            <WindSpeedValueWrapper>
                                <AirIcon style={{ transform: "scale(3)" }}/>
                                <HumidityAndWindSpeedNumericValue>{cachedCity?.weatherInfo?.windSpeed} km/h</HumidityAndWindSpeedNumericValue>
                                <HumidityAndWindSpeedStringValue>wind speed</HumidityAndWindSpeedStringValue>
                            </WindSpeedValueWrapper>
                        </HumidityAndWindSpeedDiv>

                    </TemperatureAndHumidityWrapper>

                    <StorageButtonsWrapper>
                        <button onClick={cacheCity}>set city as default</button>
                        <button onClick={clearCachedCity}>clear default city</button>
                    </StorageButtonsWrapper>
                </CityWeatherInfoWrapper> :
                
                <p style={{ marginLeft: "10px", marginTop: "10px" }}>No city searched.</p>
            }
        </>
    )
}

export default CityWeatherInfo;

const CityWeatherInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: fill-available;
`

const CityName = styled.div`
    font-size: 2.0em;
    margin-top: 10px;
`

const TemperatureAndHumidityWrapper = styled.div`
    display: flex;
    flex: 1;
    padding: 70px 0;
`

const TemperatureDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex: 1;
    border-right: 1px solid black;
    margin-top: -20px;
`

const TemperatureValue = styled.span`
    font-size: 2.2em;
`

const HumidityAndWindSpeedDiv = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 0 40px;
`

const HumidityValueWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex: 1;
    border-bottom: 1px solid black;
`

const WindSpeedValueWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex: 1;
`

const HumidityAndWindSpeedNumericValue = styled.div`
    font-size: 1.5em;
    margin-top: 10px;
`

const HumidityAndWindSpeedStringValue = styled.div`
    font-size: 1.5em;
    margin-top: 10px;
`

const StorageButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`


