import { secondary } from '@sberdevices/plasma-core/tokens'
import { useMount } from '@sberdevices/plasma-temple'
import { Body1, Card, Container, Headline3 } from '@sberdevices/plasma-ui'
import styled from 'styled-components'
import { AppHeader } from '../components/AppHeader'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'
import { actions } from '../store/store'
import { StyledButton } from './TeamsPage'

// const Container = styled.div`
//     display: flex;
//     margin-top: 2rem;
//     height: 30vh;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
// `

const WinningTeam = styled(Card)`
    display: flex;
    padding: 1rem;
    margin: 1rem auto;
    position: relative;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 12rem;
    width: 12rem;
    border-radius: 50%;
    /* background: rgb(255,136,32);
    background: linear-gradient(0deg, rgba(255,136,32,1) 0%, rgba(255,192,42,1) 91%); */
    /* margin: 1rem; */
    /* background-color: #8080808b; */

    /* background-image: url('./img/fireworks.png');
    background-size: cover;
    opacity: 0.5 */

    &:before{
        z-index: -1;
        width: 14rem;
        left: -1rem;
        background: rgb(255,136,32);
        background: linear-gradient(0deg, rgba(255,136,32,1) 0%, rgba(255,192,42,1) 91%);
        background-image: url('./img/fireworks.png');
        background-size: cover;
        opacity: 0.4;
    }
`

const WinnerText = styled.div`
    background-color: #ff5100;
    border-radius: 4px;
    margin-top: 0.5rem;
`

const TeamsContainer = styled.div`
    margin: 1rem auto;
`
const TeamItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 1.7rem;
    min-width: 15rem;
    position: relative;
    &::after{
        content: ' ';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        opacity: 0.5;
        background-color: ${secondary};
    }
`

export const VictoryPage = () => {
    const pushScreen = usePushScreen()
    const [state, dispatch] = useStore()

    useMount(() => {
        let audio = new Audio('./sounds/sm-sounds-game-win-1.mp3')
        console.log(audio)
        audio.play()

        dispatch(actions.setFirsRound(true))
    })
    return (
        <Container>
            <AppHeader title='Победа' back={true} onBackCallback={() => pushScreen(-1)} />
            <WinningTeam>
                <Body1>{state.winningTeam?.score} очков</Body1>
                <Headline3>{state.winningTeam?.name}</Headline3>
                <WinnerText>Победитель</WinnerText>
            </WinningTeam>
            <TeamsContainer>
                {state.teams.map(team => (
                    <TeamItem>
                        <div>{team.name}</div>
                        <div>{team.score}</div>
                    </TeamItem>
                ))}
            </TeamsContainer>
            <StyledButton view='primary' onClick={() => pushScreen('')}>Меню</StyledButton>
        </Container>
    )
}
