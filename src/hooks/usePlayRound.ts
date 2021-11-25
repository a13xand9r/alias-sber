import { actions } from '../store/store';
import { RemoteKey, useMount, useRemoteListener, useTouchHandler } from '@sberdevices/plasma-temple';
import { Dispatch, useState, useEffect, useRef, RefObject } from 'react';
import { ActionsType } from '../types/types';
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
    const [{ playingTeamId, words, isDecreasing, timerLimit }, dispatch] = useStore()
    const [currentWord, setCurrentWord] = useState('')

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

    useMount(() => {
        getWords().then(words => {
            dispatch(actions.setWords(words))
            setCurrentWord(getRandomFromArray(words))
        })
    })

    const answer = () => {
        setCurrentWord(getRandomFromArray(words))
        if (timer === 0) finishCallback()
    }
    const rightAnswer = () => {
        dispatch(actions.increaseCommandStore(playingTeamId as string))
        dispatch(actions.appendRoundWords(currentWord, true))
        upCallback()
        answer()
    }
    const wrongAnswer = () => {
        isDecreasing && dispatch(actions.decreaseCommandStore(playingTeamId as string))
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