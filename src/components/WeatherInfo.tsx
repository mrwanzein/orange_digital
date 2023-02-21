import { ReactNode } from "react"
import styled from "styled-components"

type WeatherInfoProps = {
    children: ReactNode
}

const WeatherInfo = ({ children }: WeatherInfoProps) => {
    return (
        <Container>
            <InfoContainer>
                {children}
            </InfoContainer>
        </Container>
    )
}

export default WeatherInfo

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 600px;
    width: 800px;
    margin-top: -200px;
    box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.41);
    border-radius: 5px;
`