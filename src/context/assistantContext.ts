import { initializeAssistant } from './../assistant/assistant';
import React from 'react'
import { createAssistant } from '@sberdevices/assistant-client'

export const AssistantContext = React.createContext<ReturnType<typeof createAssistant>>(initializeAssistant(() => { }))