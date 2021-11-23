import { DeviceThemeProvider } from '@sberdevices/plasma-ui'
import { ReactNode } from 'react'
import { AssistantProvider } from './AssistantProvider'
import { StoreProvider } from './StoreProvider'

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <StoreProvider>
            <AssistantProvider>
                <DeviceThemeProvider>
                    {children}
                </DeviceThemeProvider>
            </AssistantProvider>
        </StoreProvider>
    )
}
