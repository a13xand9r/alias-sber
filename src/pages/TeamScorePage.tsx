import { PageComponent } from '@sberdevices/plasma-temple'
import { secondary } from '@sberdevices/plasma-tokens'
import { Button, Headline1, Headline3, Body1 } from '@sberdevices/plasma-ui'
import styled from 'styled-components'
import { useStore } from '../hooks/useStore'
import { actions } from '../store/store'
import { PageParamsType, PageStateType } from '../types/types'
import { UpContainer } from './PlayPage'
import { ButtonsBottomContainer, Container, StyledButton, TeamItem } from './TeamsPage'


export const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    min-width: 20rem;
    justify-content: space-between;
`
export const CenterContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 30vh;
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

export const TeamScorePage: PageComponent<PageStateType, 'teamScore', PageParamsType> = ({ pushScreen }) => {
    const [state, dispatch] = useStore()

    const playHandler = () => {
        dispatch(actions.clearRoundWords())
        pushScreen('play')
    }
    return (
        <Container>
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
        </Container>
    )
}
