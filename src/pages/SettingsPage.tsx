import { PageComponent } from '@sberdevices/plasma-temple'
import { secondary } from '@sberdevices/plasma-tokens'
import { Body1, Button, Container, Footnote1, Slider, Stepper, Switch } from '@sberdevices/plasma-ui'
import { ChangeEvent } from 'react'
import styled from 'styled-components'
import { AppHeader } from '../components/AppHeader'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'
import { actions } from '../store/store'
import { PageParamsType, PageStateType } from '../types/types'
import { ButtonsBottomContainer, PageContainer, StyledButton } from './TeamsPage'

const StyledStepper = styled(Stepper)`
    margin: 1rem;
`

export const SettingsPage = () => {
    const [state, dispatch] = useStore()
    const pushScreen = usePushScreen()
    const switchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.checked)
        dispatch(actions.setDecreasingPoints(e.target.checked))
    }
    return (
        <Container>
            <AppHeader title='Настройки' back={true} onBackCallback={() => pushScreen(-1)} />
            <PageContainer>
                Количество слов для достижения победы
                <div style={{ marginBottom: '3rem' }}>
                    <Stepper
                        style={{ margin: '1rem' }}
                        step={5}
                        value={state.wordsCountToWin}
                        min={10}
                        max={100}
                        showRemove={false}
                        onChange={(value) => dispatch(actions.setWordsCountToWin(value))}
                    />
                    секунд
                </div>
                Время раунда
                <Stepper
                    style={{ marginTop: '1rem', marginBottom: '3rem' }}
                    step={5}
                    value={state.timerLimit}
                    min={10}
                    max={120}
                    showRemove={false}
                    onChange={(value) => dispatch(actions.setTimerLimit(value))}
                />
                <Switch label='Штраф за пропуск' checked={state.isDecreasing} defaultChecked={state.isDecreasing} onChange={switchHandler} />
                <Footnote1 style={{ margin: '0.3rem', color: secondary }}>Каждое пропущенное слово отнимает одно очко</Footnote1>
                <ButtonsBottomContainer>
                    <StyledButton view='primary' onClick={() => pushScreen('teamScore')}>Далее</StyledButton>
                </ButtonsBottomContainer>
            </PageContainer>
        </Container>
    )
}
