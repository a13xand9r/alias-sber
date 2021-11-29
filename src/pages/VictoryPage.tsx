import { Card } from '@sberdevices/plasma-ui'
import styled from 'styled-components'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'
import { StyledButton } from './TeamsPage'

const Container = styled.div`
    display: flex;
    margin-top: 2rem;
    height: 30vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const VictoryPage = () => {
    const pushScreen = usePushScreen()
    const [state] = useStore()
    return (
        <Container>
            <StyledButton view='primary' onClick={() => pushScreen('teams')}>Новая игра</StyledButton>
            <StyledButton onClick={() => pushScreen('rules')}>Правила</StyledButton>
        </Container>
    )
}
