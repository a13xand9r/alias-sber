import { isSberBoxLike } from '@sberdevices/plasma-temple'
import { Card, detectDevice } from '@sberdevices/plasma-ui'
import { useEffect } from 'react'
import styled from 'styled-components'
import { useAssistant } from '../hooks/useAssistant'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'
import { actions } from '../store/store'
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
    height: ${detectDevice() === 'mobile' ? `37` : `40`}vh;
    position: relative;
    left: 0;
    top: -2rem;
    /* background-image: url('./img/background-city.jpeg'); */
    background-image: ${isSberBoxLike() ? `url('./img/00ff8346261277.586d57aa98e78.png')` : `url('./img/background-city.jpeg')`};
    background-size: 100%;
    background-position-y: 80%;
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
    const [{isFirstRoundGame}, dispatch] = useStore()

    const assistant = useAssistant()
    useEffect(() => {
        if (assistant){
            assistant.on('data', ({ smart_app_data }: any) => {
                if (smart_app_data) {
                    // console.log(smart_app_data)
                    switch (smart_app_data.type) {
                        case 'NAVIGATION_PLAY':
                            pushScreen('teams')
                            break;
                        case 'NAVIGATION_RULES':
                            pushScreen('rules')
                            break;
                        default:
                    }
                }
            })
        }
    }, [assistant])
    const onNewGameClick = () => {
        dispatch(actions.resetGame())
        pushScreen('teams')
    }
    return (
        <div>
            <UpContainer></UpContainer>
            <Container>
                {
                    !isFirstRoundGame
                    && <StyledButton view='primary' onClick={() => pushScreen('teamScore')}>Продолжить</StyledButton>
                }
                <StyledButton view='primary' onClick={onNewGameClick}>Новая игра</StyledButton>
                <StyledButton onClick={() => pushScreen('rules')}>Правила</StyledButton>
            </Container>
        </div>
    )
}
