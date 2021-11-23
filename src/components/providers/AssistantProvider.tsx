import { createAssistant } from '@sberdevices/assistant-client'
import { ReactNode, useEffect, useRef } from 'react'
import { initAssistant } from '../../assistant/assistant'
import { AssistantContext } from '../../context/assistantContext'
import { useStore } from '../../hooks/useStore'
import { StateType } from '../../types/types'

export const AssistantProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useStore()
    const assistantRef = useRef<ReturnType<typeof createAssistant>>()
    const stateRef = useRef<StateType>(state)
    stateRef.current = state
    useEffect(() => {
        console.log('useEffect')
        assistantRef.current = initAssistant(dispatch, () => stateRef.current)
    }, [])
    return (
        <AssistantContext.Provider value={assistantRef.current as ReturnType<typeof createAssistant>}>
            {children}
        </AssistantContext.Provider>
    )
}
