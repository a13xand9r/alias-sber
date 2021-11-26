import { IconChevronDown, IconChevronUp } from '@sberdevices/plasma-icons'
import { secondary } from '@sberdevices/plasma-tokens'
import { Card, Headline1, Headline2 } from '@sberdevices/plasma-ui'
import React from 'react'
import styled from 'styled-components'
import { usePlayRound } from '../hooks/usePlayRound'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'
import { actions } from '../store/store'
import { getTimerPercentage } from '../utils/utils'

const Container = styled.div`
    height: 85vh;
    margin: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`

const UpContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
    background-color: #ff7b00e3;
    height: 9rem;
    width: 100vw;
    padding-top: 20px;
    padding-bottom: 20px;
    border-radius: 0% 0% 60% 60%;
    @media (max-width: 700px){
        border-radius: 0% 0% 30% 30%;
        padding-bottom: 3rem;
    }
`
const BottomContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: 0;
    /* margin-bottom: 1rem; */
    background-color: #696969ea;
    width: 100vw;
    height: 35vh;
    padding-top: 20px;
    /* padding-bottom: 10rem; */
    border-radius: 60% 60% 0% 0%;
    @media (max-width: 700px){
        border-radius: 30% 30% 0% 0%;
        padding-bottom: 3rem;
    }
`
const CenterContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 35vh;
    margin-bottom: 1.5rem;
`
const ArrowButton = styled.div`
    border: none;
    background: none;
`
const Timer = styled.div<{timerPercentage: number}>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 6rem;
    padding: 0.3rem;
    position: relative;
    border-radius: 1rem;
    margin-top: 0.8rem;
    background: linear-gradient(to right, #00e1ff97 ${props => props.timerPercentage}%, #ffffff18 ${props => props.timerPercentage}%);
`
const TeamName = styled.div`
    color: ${secondary};
    margin: 0.5rem;
`
const Word = styled(Card)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 200px;
    border-radius: 50%;
    /* margin: 1rem; */
    background-color: #8080808b;
`
const UpArrow = styled(IconChevronUp)`
    width: 5rem;
    height: 5rem;
`
const DownArrow = styled(IconChevronDown)`
    width: 5rem;
    height: 5rem;
`

export const PlayPage = () => {

    const [isUpArrowColored, setIsUpArrowColored] = React.useState(false)
    const [isDownArrowColored, setIsDownArrowColored] = React.useState(false)

    const pushScreen = usePushScreen()

    const [{ teams, playingTeamId, roundWords, timerLimit }, dispatch] = useStore()

    const upCallback = () => {
        // setCurrentWord(getRandomFromArray(words))
        setIsUpArrowColored(true)
    }
    const downCallback = () => {
        // setCurrentWord(getRandomFromArray(words))
        setIsDownArrowColored(true)
    }
    React.useEffect(() => {
        if (isUpArrowColored) {
            setTimeout(() => setIsUpArrowColored(false), 200)
        }
    }, [isUpArrowColored])
    React.useEffect(() => {
        if (isDownArrowColored) {
            setTimeout(() => setIsDownArrowColored(false), 200)
        }
    }, [isDownArrowColored])

    const finishCallback = () => {
        if (teams.findIndex(team => team.id === playingTeamId) === teams.length - 1) {
            dispatch(actions.increaseRoundNumber())
        }
        dispatch(actions.setNextPlayingTeam())
        pushScreen('roundResult')
    }

    const { timer, currentWord, elementRef, onDownClick, onUpClick } = usePlayRound({
        downCallback,
        upCallback,
        finishCallback
    })

    const rightCount = React.useMemo(() => {
        return roundWords.reduce((acc, item) => {
            if (item.isAnswered) return acc + 1
            return acc
        }, 0)
    }, [roundWords])
    const wrongCount = React.useMemo(() => {
        return roundWords.reduce((acc, item) => {
            if (!item.isAnswered) return acc + 1
            return acc
        }, 0)
    }, [roundWords])

    return (
        <Container>
            <UpContainer>
                <TeamName>{teams.find(team => team.id === playingTeamId)?.name}</TeamName>
                <Headline1>{rightCount}</Headline1>
                <div>отгадано</div>
            </UpContainer>
            <CenterContainer>
                <ArrowButton onClick={onUpClick}><UpArrow color={isUpArrowColored ? 'yellow' : undefined} /></ArrowButton>
                <Word ref={elementRef}><Headline2>{currentWord}</Headline2></Word>
                <ArrowButton onClick={onDownClick}><DownArrow color={isDownArrowColored ? 'yellow' : undefined} /></ArrowButton>
            </CenterContainer>
            <BottomContainer>
                <Headline1>{wrongCount}</Headline1>
                <div>пропущено</div>
                <Timer timerPercentage={getTimerPercentage(timer, timerLimit)}>{timer}</Timer>
            </BottomContainer>
        </Container>
    )
}
