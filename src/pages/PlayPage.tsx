import { IconChevronDown, IconChevronUp } from '@sberdevices/plasma-icons'
import { PageComponent, useAssistantOnSmartAppData, useMount, useRemoteHandlers } from '@sberdevices/plasma-temple'
import React from 'react'
import styled from 'styled-components'
import { getWords } from '../api/words'
import { useStore } from '../hooks/useStore'
import { actions } from '../store/store'
import { ActionType, AssistantDataAction, PageParamsType, PageStateType } from '../types/types'
import { getRandomFromArray } from '../utils'

const ArrowButton = styled.div`
    border: none;
    background: none;
`
const Word = styled.div`
    
`

export const PlayPage: PageComponent<PageStateType, 'play', PageParamsType> = ({}) => {

    const [state, dispatch] = useStore()

    useMount(() => {
        console.log('useMount')
        getWords().then(words => {
            dispatch(actions.setWords(words))
        })
    })

    useAssistantOnSmartAppData<AssistantDataAction>(action => {
        if (!action) {
            return
        }

        switch (action.type) {
            case ActionType.WORDS:
                dispatch(actions.setWords(action.payload))
                break;
            default:
                break;
        }
    })

    const { current: prevIndex } = React.useRef<number>(0)

    useRemoteHandlers({
        axis: 'y',
        initialIndex: 0,
        max: 10000,
        min: -10000,
    })

    React.useEffect(() => {

    }, [])

    const word = getRandomFromArray(state.words)

    return (
        <div>
            PLAY COMPONENT
            <ArrowButton><IconChevronUp /></ArrowButton>
            <Word>{word}</Word>
            <ArrowButton><IconChevronDown /></ArrowButton>
        </div>
    )
}
