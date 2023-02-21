import styled from "styled-components"
import WeatherInfo from "./components/WeatherInfo"
import CityInput from "./components/CityInput"
import CityWeatherInfo from "./components/CityWeatherInfo"

function App() {
  return (
    <>
      <TitleWrapper>
        <h1>How is the weather?</h1>
      </TitleWrapper>
      
      <WeatherInfo>
        <CityInput />
        <CityWeatherInfo />
      </WeatherInfo>
    </>
  )
}

export default App

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`
