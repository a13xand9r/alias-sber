import { IconChevronDown, IconChevronUp } from '@sberdevices/plasma-icons'
import { PageComponent, useAssistantOnSmartAppData, useMount } from '@sberdevices/plasma-temple'
import React from 'react'
import styled from 'styled-components'
import { getWords } from '../api/words'
import { usePlayRound } from '../hooks/usePlayRound'
import { useStore } from '../hooks/useStore'
import { actions } from '../store/store'
import { ActionType, AssistantDataAction, PageParamsType, PageStateType } from '../types/types'
import { getRandomFromArray } from '../utils/utils'

const ArrowButton = styled.div`
    border: none;
    background: none;
`
const Word = styled.div`
    
`

export const PlayPage: PageComponent<PageStateType, 'play', PageParamsType> = ({ pushScreen }) => {

    const [_, dispatch] = useStore()

    useAssistantOnSmartAppData<AssistantDataAction>(action => {
        if (!action) {
            return
        }

        switch (action.type) {
            case ActionType.WORDS:
                // dispatch(actions.setWords(action.payload))
                break;
            default:
                break;
        }
    })

    const downCallback = () => {
        // setCurrentWord(getRandomFromArray(words))
    }

    const upCallback = () => {
        // setCurrentWord(getRandomFromArray(words))
    }
    const finishCallback = () => {
        dispatch(actions.setNextPlayingTeam())
        pushScreen('roundResult')
    }

    const { timer, currentWord } = usePlayRound({
        downCallback,
        upCallback,
        finishCallback
    })

    return (
        <div>
            PLAY COMPONENT
            <br/>
            {timer}
            <ArrowButton><IconChevronUp color='yellow' /></ArrowButton>
            <Word>{currentWord}</Word>
            <ArrowButton><IconChevronDown /></ArrowButton>
        </div>
    )
}
