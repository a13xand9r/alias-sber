import { secondary } from '@sberdevices/plasma-tokens'
import { Headline1, Headline3, Body1 } from '@sberdevices/plasma-ui'
import styled from 'styled-components'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'
import { actions } from '../store/store'
import { ButtonsBottomContainer, PageContainer, StyledButton, TeamItem } from './TeamsPage'


export const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    min-width: 20rem;
    justify-content: space-between;
`
const UpContainer = styled.div`
    position: relative;
    top: -2rem;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
    background-color: #ff9900ea;
    width: 100vw;
    padding-top: 2rem;
    padding-bottom: 2rem;
    border-radius: 0% 0% 60% 60%;
    @media (max-width: 700px){
        border-radius: 0% 0% 25% 25%;
        padding-bottom: 3rem;
    }
`

export const CenterContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem;
    /* height: 30vh; */
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
    const [state, dispatch] = useStore()
    const pushScreen = usePushScreen()

    const playHandler = () => {
        dispatch(actions.clearRoundWords())
        pushScreen('play')
    }
    return (
        <PageContainer>
            <UpContainer>
                <HeaderContainer>
                    <Headline1 style={{ display: 'block', color: secondary }}>Рейтинг команд</Headline1>
                    <div>
                        <StyledImg src={'./img/crown2.png'} alt=''></StyledImg>
                        <div style={{marginTop: 0}}><Headline3>{state.wordsCountToWin}</Headline3></div>
                    </div>
                </HeaderContainer>
                <TeamsContainer style={{ marginTop: '2rem' }}>
                    {state.teams.map((team, index) => (
                        <TeamItem
                            key={index}
                            style={{ maxHeight: '1.5rem' }}
                        >
                            <div><Headline3>{team.name}</Headline3></div>
                            <div><Headline3>{team.score}</Headline3></div>
                        </TeamItem>
                    ))}
                </TeamsContainer>
            </UpContainer>
            <CenterContainer>
                <Headline3 style={{marginBottom: '1rem'}}>Раунд {state.roundNumber}</Headline3>
                <Body1 style={{marginBottom: '1rem', color: secondary}}>готовятся к игре</Body1>
                <Headline3 style={{color: 'orange'}}>{state.teams.find(team => team.id === state.playingTeamId)?.name}</Headline3>
            </CenterContainer>
            <ButtonsBottomContainer>
                <StyledButton view='primary' onClick={playHandler}>Поехали!</StyledButton>
            </ButtonsBottomContainer>
        </PageContainer>
    )
}
