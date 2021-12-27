import { actions } from '../store/store';
import { RemoteKey, useRemoteListener, useTouchHandler } from '@sberdevices/plasma-temple';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useStore } from './useStore';
import { getRandomFromArray } from '../utils/utils';
import { usePushScreen } from './usePushScreen';


export const usePlayRound = (
    {
        downCallback,
        upCallback,
        finishCallback
    }: PropsType
) => {
    const [{ currentTeam, words, isDecreasing, timerLimit, roundWords, isFirstRoundGame }, dispatch] = useStore()
    const [currentWord, setCurrentWord] = useState(getRandomFromArray(words))

    const [timer, setTimer] = useState<number>(timerLimit)
    const [isShowEndNotification, setShowEndNotification] = useState(false)
    const [isShowStartNotification, setShowStartNotification] = useState(false)

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
    useEffect(() => {
        dispatch(actions.clearRoundWords())
    }, [])

    const finishAnswer = () => {
        dispatch(actions.incrementTeamScore(currentTeam?.id as string))

        if (isDecreasing) {
            dispatch(actions.decrementTeamScore(currentTeam?.id as string))
        }

        finishCallback()
        pushScreen('roundResult')
    }

    const answer = () => {
        dispatch(actions.incrementCountUsedWords())
        setCurrentWord(getRandomFromArray(words))
        if (timer === 0) {
            finishAnswer()
        }
    }
    const playAudio = (src: string, volume = 1) => {
        let audio = new Audio(src)
        audio.volume = volume
        audio.play()
    }
    useEffect(() => {
        if (timer === 3){
            playAudio('./sounds/timer.mp3')
        }
        if (timer === 0){
            playAudio('./sounds/alarm.mp3')

            if (isFirstRoundGame) {
                setShowEndNotification(true)
                setTimeout(() => {
                    setShowEndNotification(false)
                }, 3500)
            }
        }
    }, [timer])
    useEffect(() => {
        if (isFirstRoundGame) {
            setShowStartNotification(true)
            setTimeout(() => {
                setShowStartNotification(false)
            }, 4000)
        }
        playAudio('./sounds/gong.mp3', 0.5)
    }, [])

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

    const [isUpperRightAnswer, setUpperRightAnswer] = useState(false)
    const [isLoweWrongAnswer, setLoweWrongAnswer] = useState(false)

    useEffect(() => {
        console.log('rightAnswer', isUpperRightAnswer)
        if (isUpperRightAnswer){
            rightAnswer()
            setUpperRightAnswer(false)
        }
    }, [isUpperRightAnswer])

    useEffect(() => {
        if (isLoweWrongAnswer){
            wrongAnswer()
            setLoweWrongAnswer(false)
        }
    }, [isLoweWrongAnswer])

    const swipeWordEnd = (diff: number) => {
        console.log(diff)
        if (!isUpperRightAnswer && diff < -120){
            setUpperRightAnswer(true)
        }
        if (!isLoweWrongAnswer && diff > 120){
            setLoweWrongAnswer(true)
        }
    }

    return {
        timer,
        rightCount,
        wrongCount,
        currentWord,
        swipeWordEnd,
        isShowEndNotification,
        isShowStartNotification,
        onDownClick: wrongAnswer,
        onUpClick: rightAnswer
    }
}


type PropsType = {
    downCallback: () => void,
    upCallback: () => void,
    finishCallback: () => void
}