import { actions } from '../store/store';
import { RemoteKey, useMount, useRemoteListener } from '@sberdevices/plasma-temple';
import { Dispatch, useState, useEffect, useRef } from 'react';
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

    const remoteListenerHandler = (key: RemoteKey) => {
        switch (key) {
            case 'DOWN':
                isDecreasing && dispatch(actions.decreaseCommandStore(playingTeamId as string))
                dispatch(actions.appendRoundWords(currentWord, false))
                downCallback()
                answer()
                break;
            case 'UP':
                dispatch(actions.increaseCommandStore(playingTeamId as string))
                dispatch(actions.appendRoundWords(currentWord, true))
                upCallback()
                answer()
                break;
            default:
        }
    }
    useRemoteListener(remoteListenerHandler, {})

    return { timer, currentWord }
}

type PropsType = {
    downCallback: () => void,
    upCallback: () => void,
    finishCallback: () => void
}