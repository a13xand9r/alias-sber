import { IconChevronDown, IconChevronUp } from '@sberdevices/plasma-icons'
import { secondary } from '@sberdevices/plasma-tokens'
import { Card, detectDevice, Headline1, Headline2, Headline3 } from '@sberdevices/plasma-ui'
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

const UpContainer = styled(Card)`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    /* flex-direction: ${detectDevice() === 'sberPortal' ? 'row' : 'column'}; */
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    background-color: #ff7b00e3;
    height: ${detectDevice() === 'mobile' ? '7' : '5'}rem;
    /* height: 4rem; */
    width: 100vw;
    /* padding-top: 20px; */
    padding-bottom: ${detectDevice() === 'mobile' ? '20' : '10'}px;
    border-radius: 0% 0% 60% 60%;
    @media (max-width: 700px){
        border-radius: 0% 0% 30% 30%;
        padding-bottom: 3rem;
    }
`
const BottomContainer = styled(Card)`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: 0;
    /* margin-bottom: 1rem; */
    /* background-color: #696969ea; */
    width: 100vw;
    height: ${detectDevice() === 'mobile' ? '11' : '9'}rem;
    /* height: 35vh; */
    padding-top: ${detectDevice() === 'mobile' ? '20' : '9'}px;
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
    &:focus{
        outline: none;
    }
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
    margin-top: ${detectDevice() === 'mobile' ? '2' : '0.5'}rem;
    /* margin: ${detectDevice() === 'sberPortal' ? '0' : '0.5'}rem; */
`
const Word = styled(Card)`
    display: flex;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 12rem;
    width: 12rem;
    border-radius: 50%;
    /* margin: 1rem; */
    /* background-color: #8080808b; */
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
                <ArrowButton
                    tabIndex={0}
                    onClick={onUpClick}
                    style={{marginBottom: '-1rem'}}
                    >
                    <UpArrow color={isUpArrowColored ? 'yellow' : secondary} />
                </ArrowButton>
                <Word ref={elementRef}><Headline3>{currentWord}</Headline3></Word>
                <ArrowButton
                    tabIndex={0}
                    onClick={onDownClick}
                    style={{marginTop: '-1rem'}}
                    >
                    <DownArrow color={isDownArrowColored ? 'yellow' : secondary} />
                </ArrowButton>
            </CenterContainer>
            <BottomContainer>
                <Headline1>{wrongCount}</Headline1>
                <div>пропущено</div>
                <Timer timerPercentage={getTimerPercentage(timer, timerLimit)}>{timer}</Timer>
            </BottomContainer>
        </Container>
    )
}
