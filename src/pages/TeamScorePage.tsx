import { useMount } from '@sberdevices/plasma-temple'
import { secondary } from '@sberdevices/plasma-tokens'
import { Headline1, Headline3, Body1, Card } from '@sberdevices/plasma-ui'
import { useEffect } from 'react'
import styled from 'styled-components'
import { useAssistant } from '../hooks/useAssistant'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'
import { ButtonsBottomContainer, PageContainer, StyledButton } from './TeamsPage'


export const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    min-width: 20rem;
    justify-content: space-between;
`
const UpContainer = styled(Card)`
    position: relative;
    top: -2rem;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
    background-color: #ff7b00e3;
    overflow: hidden;
    width: 100vw;
    padding-top: 2rem;
    padding-bottom: 2rem;
    border-radius: 0% 0% 60% 60%;
    @media (max-width: 700px){
        border-radius: 0% 0% 25% 25%;
        padding-bottom: 3rem;
    }
`

export const TeamItem = styled.div`
    display: flex;
    align-items: center;
    text-align: start;
    justify-content: space-between;
    margin-bottom: 0.3rem;
    min-height: 1.8rem;
`

export const CenterContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0.2rem;
    justify-content: center;
`
export const TeamsContainer = styled.div`
    width: 18rem;
`
export const StyledImg = styled.img`
    color: ${secondary};
    max-width: 25px;
    max-height: 25px;
`

export const TeamScorePage = () => {
    const [state] = useStore()
    const pushScreen = usePushScreen()

    useMount(() => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    })

    const playHandler = () => {
        pushScreen('play')
    }

    const assistant = useAssistant()
    useEffect(() => {
        if (assistant){
            assistant.on('data', ({ smart_app_data }: any) => {
                if (smart_app_data) {
                    switch (smart_app_data.type) {
                        case 'NAVIGATION_PLAY':
                            pushScreen('play')
                            break;
                        default:
                    }
                }
            })
        }
    }, [assistant])

    return (
        <PageContainer>
            <UpContainer>
                <HeaderContainer>
                    <Headline1 style={{ display: 'block', color: secondary }}>?????????????? ????????????</Headline1>
                    <div>
                        <StyledImg src={'./img/crown2.png'} alt=''></StyledImg>
                        <div style={{marginTop: 0}}><Headline3>{state.wordsCountToWin}</Headline3></div>
                    </div>
                </HeaderContainer>
                <TeamsContainer style={{ marginTop: '1rem' }}>
                    {state.teams.map((team, index) => (
                        <TeamItem
                            key={index}
                        >
                            <div><Headline3>{team.name}</Headline3></div>
                            <div><Headline3>{team.score}</Headline3></div>
                        </TeamItem>
                    ))}
                </TeamsContainer>
            </UpContainer>
            <CenterContainer>
                <Headline3 style={{marginBottom: '1rem'}}>?????????? {state.roundNumber}</Headline3>
                <Body1 style={{marginBottom: '1rem', color: secondary}}>?????????????????? ?? ????????</Body1>
                <Headline3 style={{color: 'orange'}}>{state.currentTeam?.name}</Headline3>
            </CenterContainer>
            <ButtonsBottomContainer>
                <StyledButton view='primary' onClick={playHandler}>??????????????!</StyledButton>
            </ButtonsBottomContainer>
        </PageContainer>
    )
}
