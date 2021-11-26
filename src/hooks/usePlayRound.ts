import { actions } from '../store/store';
import { RemoteKey, useMount, useRemoteListener, useTouchHandler } from '@sberdevices/plasma-temple';
import { useState, useEffect, useRef } from 'react';
import { useStore } from './useStore';
import { getRandomFromArray } from '../utils/utils';
import { getWords } from '../api/words';


export const usePlayRound = (
    {
        downCallback,
        upCallback,
        finishCallback
    }: PropsType
) => {
    const [{ playingTeamId, words, isDecreasing, timerLimit, roundWords }, dispatch] = useStore()
    const [currentWord, setCurrentWord] = useState(getRandomFromArray(words))

    const [timer, setTimer] = useState<number>(timerLimit)
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

    const answer = () => {
        setCurrentWord(getRandomFromArray(words))
        if (timer === 0) {
            const increment = roundWords.reduce((acc, item) => {
                if (item.isAnswered) return acc + 1
                else return acc
            }, 0)
            dispatch(actions.incrementTeamScore(playingTeamId as string, increment))

            if (isDecreasing){
                const decrement = roundWords.reduce((acc, item) => {
                    if (!item.isAnswered) return acc + 1
                    else return acc
                }, 0)
                dispatch(actions.decrementTeamScore(playingTeamId as string, decrement))
            }

            finishCallback()
        }
    }
    const rightAnswer = () => {
        dispatch(actions.appendRoundWords(currentWord, true))
        upCallback()
        answer()
    }
    const wrongAnswer = () => {
        dispatch(actions.appendRoundWords(currentWord, false))
        downCallback()
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

    return {
        timer,
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