import { secondary } from '@sberdevices/plasma-tokens'
import { Container, Footnote1, Headline4, Stepper, Switch } from '@sberdevices/plasma-ui'
import { ChangeEvent } from 'react'
import { AppHeader } from '../components/AppHeader'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'
import { actions } from '../store/store'
import { ButtonsBottomContainer, PageContainer, StyledButton } from './TeamsPage'

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
            <Headline4>Количество слов для достижения победы</Headline4>
                <div style={{ marginBottom: '2rem' }}>
                    <Stepper
                        style={{ margin: '0.5rem' }}
                        step={5}
                        value={state.wordsCountToWin}
                        min={10}
                        max={100}
                        showRemove={false}
                        onChange={(value) => dispatch(actions.setWordsCountToWin(value))}
                    />
                    секунд
                </div>
                <Headline4>Время раунда</Headline4>
                <Stepper
                    style={{ marginTop: '1rem', marginBottom: '1.7rem' }}
                    step={5}
                    value={state.timerLimit}
                    min={10}
                    max={120}
                    showRemove={false}
                    onChange={(value) => dispatch(actions.setTimerLimit(value))}
                />
                <div style={{display: 'flex'}}>
                    <Headline4 style={{marginRight: '1rem'}}>Штраф за пропуск</Headline4>
                    <Switch checked={state.isDecreasing} defaultChecked={state.isDecreasing} onChange={switchHandler} />
                </div>
                <Footnote1 style={{ margin: '0.5rem', marginBottom: '1rem', color: secondary }}>Каждое пропущенное слово отнимает одно очко</Footnote1>
                <ButtonsBottomContainer>
                    <StyledButton view='primary' onClick={() => pushScreen('teamScore')}>Далее</StyledButton>
                </ButtonsBottomContainer>
            </PageContainer>
        </Container>
    )
}
