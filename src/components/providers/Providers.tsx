import { DeviceThemeProvider } from '@sberdevices/plasma-ui'
import { ReactNode } from 'react'
import { AssistantProvider } from './AssistantProvider'
import { StoreProvider } from './StoreProvider'
import {
    BrowserRouter as Router,
} from 'react-router-dom'

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <Router>
            <StoreProvider>
                <AssistantProvider>
                    <DeviceThemeProvider>
                        {children}
                    </DeviceThemeProvider>
                </AssistantProvider>
            </StoreProvider>
        </Router>
    )
}
