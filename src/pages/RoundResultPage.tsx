import { useMount } from '@sberdevices/plasma-temple'
import { secondary } from '@sberdevices/plasma-tokens'
import { Button, Container } from '@sberdevices/plasma-ui'
import { useEffect } from 'react'
import styled from 'styled-components'
import { AppHeader } from '../components/AppHeader'
import { useAssistant } from '../hooks/useAssistant'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'
import { actions } from '../store/store'
import { victoryCheck } from '../utils/utils'
import { ButtonsBottomContainer, StyledButton } from './TeamsPage'


const likeIcon = './img/like.png'
const dislikeIcon = './img/dislike.png'

const WordsContainer = styled.div`
    margin: 1rem auto;
`
const WordItem = styled.div`
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

const LikeImg = styled.img`
    width: 1rem;
    height: 1rem;
`

export const RoundResultPage = () => {
    const [{ roundWords, winningTeam, playingTeams, wordsCountToWin, currentTeam }, dispatch] = useStore()
    const pushScreen = usePushScreen()

    useMount(() => {
        console.log(playingTeams.findIndex(team => team.id === currentTeam?.id))
        console.log(playingTeams.length)
        if (playingTeams.findIndex(team => team.id === currentTeam?.id) === playingTeams.length - 1) {
            const winningTeams = victoryCheck(playingTeams, wordsCountToWin)
            console.log('winningTeams', winningTeams)
            if (winningTeams && winningTeams.length > 0) {
                dispatch(actions.setOverWordsLimit(true))
                if (winningTeams.length === 1) {
                    dispatch(actions.setWinningTeam(winningTeams[0].id))
                } else if (winningTeams.length > 1) {
                    dispatch(actions.setPlayingTeams(winningTeams))
                }
            }
            dispatch(actions.increaseRoundNumber())
        }
        dispatch(actions.setNextTeam())
    })

    const continueHandler = () => {
        if (winningTeam) {
            pushScreen('victory')
        } else pushScreen('teamScore')
    }

    const assistant = useAssistant()

    useEffect(() => {
        if (assistant){
            assistant.on('data', ({ smart_app_data }: any) => {
                if (smart_app_data) {
                    console.log(smart_app_data)
                    switch (smart_app_data.type) {
                        case 'NAVIGATION_NEXT':
                            pushScreen('teamScore')
                            break;
                        default:
                    }
                }
            })
        }
    }, [assistant])

    return (
        <Container>
            <AppHeader back={false} title='Результаты раунда' />
            <WordsContainer>
                {roundWords.map(item => (
                    <WordItem>
                        <div>{item.word}</div>
                        <div><LikeImg src={item.isAnswered ? likeIcon : dislikeIcon} alt='' /></div></WordItem>
                ))}
            </WordsContainer>
            <ButtonsBottomContainer>
                <StyledButton view='primary' onClick={continueHandler}>Далее</StyledButton>
            </ButtonsBottomContainer>
        </Container>
    )
}
