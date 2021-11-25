import { PageComponent } from '@sberdevices/plasma-temple'
import { Button } from '@sberdevices/plasma-ui'
import styled from 'styled-components'
import { useStore } from '../hooks/useStore'
import { PageParamsType, PageStateType } from '../types/types'
import { StyledButton } from './TeamsPage'

const Container = styled.div`
    display: flex;
    margin-top: 30rem;
    height: 40vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const UpContainer = styled.div`
    margin-bottom: 1rem;
    height: 40vh;
    position: absolute;
    left: 0;
    top: 0;
    background-image: url('./img/background-city.jpeg');
    background-size: 100%;
    background-position-y: 40%;
    width: 100vw;
    padding-top: 2rem;
    padding-bottom: 2rem;
    border-radius: 0% 0% 60% 60%;
`

export const StartPage: PageComponent<PageStateType, 'start', PageParamsType> = ({pushScreen}) => {
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
