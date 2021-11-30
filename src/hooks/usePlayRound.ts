import { actions } from '../store/store';
import { RemoteKey, useRemoteListener, useTouchHandler } from '@sberdevices/plasma-temple';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useStore } from './useStore';
import { getRandomFromArray, victoryCheck } from '../utils/utils';
import { usePushScreen } from './usePushScreen';


export const usePlayRound = (
    {
        downCallback,
        upCallback,
        finishCallback
    }: PropsType
) => {
    const [{ teams, currentTeam, playingTeams, words, isDecreasing, timerLimit, roundWords, wordsCountToWin }, dispatch] = useStore()
    const [currentWord, setCurrentWord] = useState(getRandomFromArray(words))

    const [timer, setTimer] = useState<number>(timerLimit)

    const pushScreen = usePushScreen()
    const interval = useRef<NodeJS.Timeout>()

    useEffect(() => {
        interval.current = setInterval(() => {
            setTimer(prev => prev - 1)
        }, 1000)
        return () => {
            clearInterval(interval.current as NodeJS.Timeout)
        }
    }, [])

    useEffect(() => {
        if (timer === 0) clearInterval(interval.current as NodeJS.Timeout)
    }, [timer])

    const finishAnswer = () => {
        dispatch(actions.incrementTeamScore(currentTeam?.id as string))

        if (isDecreasing) {
            dispatch(actions.decrementTeamScore(currentTeam?.id as string))
        }

        finishCallback()
        pushScreen('roundResult')
    }

    const answer = () => {
        setCurrentWord(getRandomFromArray(words))
        if (timer === 0) {
            finishAnswer()
        }
    }
    const playAudio = (src: string) => {
        let audio = new Audio(src)
        audio.play()
    }
    useEffect(() => {
        if (timer === 3){
            playAudio('./sounds/timer.mp3')
        }
        if (timer === 0){
            playAudio('./sounds/gong.mp3')
        }
    }, [timer])

    const rightAnswer = () => {
        dispatch(actions.appendRoundWords(currentWord, true))
        upCallback()
        playAudio('./sounds/sm-sounds-game-ping-1.mp3')
        answer()
    }
    const wrongAnswer = () => {
        dispatch(actions.appendRoundWords(currentWord, false))
        downCallback()
        playAudio('./sounds/__kantouth__cartoon-bing-lo.mp3')
        answer()
    }

    const remoteListenerHandler = (key: RemoteKey) => {
        switch (key) {
            case 'DOWN':
                wrongAnswer()
                break;
            case 'UP':
                rightAnswer()
                break;
            default:
        }
    }
    useRemoteListener(remoteListenerHandler, {})

    const elementRef = useRef<HTMLDivElement>(null)
    const touchListenerHandler = (dir: number) => {
        switch (dir) {
            case -1:
                wrongAnswer()
                break;
            case 1:
                rightAnswer()
                break;
            default:
        }
    }
    useTouchHandler(elementRef, touchListenerHandler, {
        axis: 'y',
        callDistance: 30
    })

    const rightCount = useMemo(() => {
        return roundWords.reduce((acc, item) => {
            if (item.isAnswered) return acc + 1
            return acc
        }, 0)
    }, [roundWords])
    const wrongCount = useMemo(() => {
        return roundWords.reduce((acc, item) => {
            if (!item.isAnswered) return acc + 1
            return acc
        }, 0)
    }, [roundWords])

    return {
        timer,
        rightCount,
        wrongCount,
        currentWord,
        elementRef,
        onDownClick: wrongAnswer,
        onUpClick: rightAnswer
    }
}


type PropsType = {
    downCallback: () => void,
    upCallback: () => void,
    finishCallback: () => void
}