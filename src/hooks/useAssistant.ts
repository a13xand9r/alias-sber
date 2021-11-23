import { AssistantContext } from './../context/assistantContext';
import { useContext } from 'react'

export const useAssistant = () => {
    return useContext(AssistantContext)
}