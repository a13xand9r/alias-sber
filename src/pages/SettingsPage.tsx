import { secondary } from '@sberdevices/plasma-tokens'
import { Container, Footnote1, Headline4, Stepper, Switch, Body1 } from '@sberdevices/plasma-ui'
import { ChangeEvent, useEffect } from 'react'
import styled from 'styled-components'
import { getWords } from '../api/words'
import { AppHeader } from '../components/AppHeader'
import { useAssistant } from '../hooks/useAssistant'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'
import { actions } from '../store/store'
import { wordsAssemblyLimit } from '../utils/utils'
import { ButtonsBottomContainer, PageContainer, StyledButton } from './TeamsPage'

const WordsAssemblyItemContainer = styled.div`
    display: flex;
    width: 15rem;
    margin: 0.2rem;
    justify-content: space-between;
`

export const SettingsPage = () => {
    const [state, dispatch] = useStore()
    const pushScreen = usePushScreen()
    const switchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.checked)
        dispatch(actions.setDecreasingPoints(e.target.checked))
    }
    const switchEasyHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.checked)
        dispatch(actions.setWordsComplexity('low'))
    }
    const switchNormalHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.checked)
        dispatch(actions.setWordsComplexity('normal'))
    }
    const switchHighHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.checked)
        dispatch(actions.setWordsComplexity('high'))
    }
    useEffect(() => {
        getWords(state.wordsComplexity, wordsAssemblyLimit).then(words => {
            dispatch(actions.setWords(words))
        })
    }, [state.wordsComplexity])

    const onContinueClick = () => {
        localStorage.setItem('timerLimit', state.timerLimit.toString())
        localStorage.setItem('isDecreasing', state.isDecreasing.toString())
        localStorage.setItem('wordsCountToWin', state.wordsCountToWin.toString())
        localStorage.setItem('wordsComplexity', state.wordsComplexity.toString())
        pushScreen('teamScore')
    }

    const assistant = useAssistant()
    useEffect(() => {
        if (assistant){
            assistant.on('data', ({ smart_app_data }: any) => {
                if (smart_app_data) {
                    // console.log(smart_app_data)
                    switch (smart_app_data.type) {
                        case 'NAVIGATION_BACK':
                            pushScreen(-1)
                            break;
                        case 'NAVIGATION_NEXT':
                            pushScreen('teamScore')
                            break;
                        default:
                    }
                }
            })
        }
    }, [assistant])

    return (
        <Container>
            <AppHeader title='Настройки' back={true} onBackCallback={() => pushScreen(-1)} />
            <PageContainer>
            <Headline4>Время раунда</Headline4>
                <div style={{ marginBottom: '2rem' }}>
                    <Stepper
                        style={{ margin: '0.5rem' }}
                        step={5}
                        value={state.timerLimit}
                        min={10}
                        max={120}
                        showRemove={false}
                        onChange={(value) => dispatch(actions.setTimerLimit(value))}
                    />
                    секунд
                </div>
                <Headline4>Количество слов для достижения победы</Headline4>
                <Stepper
                    style={{ marginTop: '1rem', marginBottom: '1.7rem' }}
                    step={5}
                    value={state.wordsCountToWin}
                    min={10}
                    max={100}
                    showRemove={false}
                    onChange={(value) => dispatch(actions.setWordsCountToWin(value))}
                />
                <Headline4 style={{marginRight: '1rem'}}>Набор слов</Headline4>
                <WordsAssemblyItemContainer>
                    <Body1 style={{ marginRight: '1rem' }}>Легко</Body1>
                    <Switch
                        checked={state.wordsComplexity === 'low'}
                        defaultChecked={state.wordsComplexity === 'low'}
                        onChange={switchEasyHandler}
                    />
                </WordsAssemblyItemContainer>
                <WordsAssemblyItemContainer>
                    <Body1 style={{ marginRight: '1rem' }}>Нормально</Body1>
                    <Switch
                        checked={state.wordsComplexity === 'normal'}
                        defaultChecked={state.wordsComplexity === 'normal'}
                        onChange={switchNormalHandler}
                    />
                </WordsAssemblyItemContainer>
                <WordsAssemblyItemContainer>
                    <Body1 style={{ marginRight: '1rem' }}>Сложно</Body1>
                    <Switch
                        checked={state.wordsComplexity === 'high'}
                        defaultChecked={state.wordsComplexity === 'high'}
                        onChange={switchHighHandler}
                    />
                </WordsAssemblyItemContainer>
                <div style={{display: 'flex', marginTop: '1.2rem'}}>
                    <Headline4 style={{marginRight: '1rem'}}>Штраф за пропуск</Headline4>
                    <Switch checked={state.isDecreasing} defaultChecked={state.isDecreasing} onChange={switchHandler} />
                </div>
                <Footnote1 style={{ margin: '0.5rem', marginBottom: '1rem', color: secondary }}>Каждое пропущенное слово отнимает одно очко</Footnote1>
                <ButtonsBottomContainer>
                    <StyledButton view='primary' onClick={onContinueClick}>Далее</StyledButton>
                </ButtonsBottomContainer>
            </PageContainer>
        </Container>
    )
}
