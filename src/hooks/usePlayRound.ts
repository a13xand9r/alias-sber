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

    // useEffect(() => {
    //     if (timer === 0) {
    //         if (playingTeams.findIndex(team => team.id === currentTeam?.id) === teams.length - 1) {
    //             const winningTeams = victoryCheck(playingTeams, wordsCountToWin)
    //             if (winningTeams) {
    //                 if (winningTeams.length === 1) {
    //                     dispatch(actions.setWinningTeam(winningTeams[0].id))
    //                     pushScreen('victory')
    //                 } else if (winningTeams.length > 1) {
    //                     dispatch(actions.setPlayingTeams(winningTeams))
    //                     dispatch(actions.setNextTeam())
    //                     dispatch(actions.increaseRoundNumber())
    //                     pushScreen('roundResult')
    //                 } else {
    //                     dispatch(actions.setNextTeam())
    //                     dispatch(actions.increaseRoundNumber())
    //                     pushScreen('roundResult')
    //                 }
    //             } else {
    //                 dispatch(actions.setNextTeam())
    //                 dispatch(actions.increaseRoundNumber())
    //                 pushScreen('roundResult')
    //             }
    //         } else {
    //             dispatch(actions.setNextTeam())
    //             pushScreen('roundResult')
    //         }
    // }

    // }, [currentTeam?.id])

    const answer = () => {
        setCurrentWord(getRandomFromArray(words))
        if (timer === 0) {
            finishAnswer()
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