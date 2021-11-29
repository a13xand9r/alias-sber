import { Card } from '@sberdevices/plasma-ui'
import styled from 'styled-components'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'
import { StyledButton } from './TeamsPage'

const Container = styled.div`
    display: flex;
    margin-top: 2rem;
    height: 30vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const UpContainer = styled(Card)`
    margin-bottom: 1rem;
    height: 40vh;
    position: relative;
    left: 0;
    top: -2rem;
    background-image: url('./img/background-city.jpeg');
    background-size: 100%;
    background-position-y: 40%;
    width: 100%;
    overflow: hidden;
    padding-top: 2rem;
    padding-bottom: 2rem;
    border-radius: 0% 0% 60% 60%;
    @media (max-width: 700px){
        border-radius: 0% 0% 30% 30%;
        padding-bottom: 3rem;
    }
`

export const StartPage = () => {
    const pushScreen = usePushScreen()
    const [state] = useStore()
    return (
        <div>
        <UpContainer></UpContainer>
        <Container>
            <StyledButton view='primary' onClick={() => pushScreen('teams')}>Новая игра</StyledButton>
            <StyledButton onClick={() => pushScreen('rules')}>Правила</StyledButton>
        </Container>
        </div>
    )
}
