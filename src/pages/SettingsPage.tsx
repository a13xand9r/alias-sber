import { isSberBoxLike } from '@sberdevices/plasma-temple'
import { accent, secondary } from '@sberdevices/plasma-tokens'
import { Container, Footnote1, Headline4, Stepper, Switch, Radiobox } from '@sberdevices/plasma-ui'
import React, { ChangeEvent, useEffect } from 'react'
import styled from 'styled-components'
import { getWords } from '../api/words'
import { AppHeader } from '../components/AppHeader'
import { useAssistant } from '../hooks/useAssistant'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'
import { actions } from '../store/store'
import { wordsSetLimit } from '../utils/utils'
import { ButtonsBottomContainer, PageContainer, StyledButton } from './TeamsPage'

const WordsSetItemContainer = styled.div`
    display: flex;
    width: 8rem;
    text-align: start;
    justify-content: flex-start;
    align-items: center;
    height: 2rem;
    padding: 10px;
    min-width: 10rem;
    box-sizing: border-box;
  &:focus-visible {
    outline: none;
    border: ${accent} solid 2px;
    border-radius: 15px;
  }
  &:focus {
    border: ${accent} solid 2px;
    border-radius: 15px;
    outline: none;
  }
`

export const SettingsPage = () => {
    const [state, dispatch] = useStore()
    const pushScreen = usePushScreen()
    const switchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation()
        console.log(e.target.checked)
        dispatch(actions.setDecreasingPoints(!state.isDecreasing))
    }
    const switchContainerHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        console.log('container handler')
        dispatch(actions.setDecreasingPoints(!state.isDecreasing))
    }
    const switchEasyHandler = () => {
        dispatch(actions.setWordsComplexity('low'))
    }
    const switchNormalHandler = () => {
        dispatch(actions.setWordsComplexity('normal'))
    }
    const switchHighHandler = () => {
        dispatch(actions.setWordsComplexity('high'))
    }
    useEffect(() => {
        getWords(state.wordsComplexity, wordsSetLimit).then(words => {
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
        if (assistant) {
            assistant.on('data', ({ smart_app_data }: any) => {
                if (smart_app_data) {
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
                    <Headline4 style={{ margin: '0.6rem' }}>Набор слов</Headline4>
                    <WordsSetItemContainer
                        onClick={() => {
                            if (isSberBoxLike()) switchEasyHandler()
                        }}
                        tabIndex={isSberBoxLike() ? 1 : 0}
                    >
                        <Radiobox
                            value='low'
                            name='low'
                            tabIndex={-1}
                            label='Легко'
                            checked={state.wordsComplexity === 'low'}
                            defaultChecked={state.wordsComplexity === 'low'}
                            onChange={switchEasyHandler}
                        />
                    </WordsSetItemContainer>
                    <WordsSetItemContainer
                        onClick={() => {
                            if (isSberBoxLike()) switchNormalHandler()
                        }}
                        tabIndex={isSberBoxLike() ? 1 : 0}
                    >
                        <Radiobox
                            value='normal'
                            name='normal'
                            tabIndex={-1}
                            label='Нормально'
                            checked={state.wordsComplexity === 'normal'}
                            defaultChecked={state.wordsComplexity === 'normal'}
                            onChange={switchNormalHandler}
                        />
                    </WordsSetItemContainer>
                    <WordsSetItemContainer
                        onClick={() => {
                            if (isSberBoxLike()) switchHighHandler()
                        }}
                        tabIndex={isSberBoxLike() ? 1 : 0}
                    >
                        <Radiobox
                            value='high'
                            name='high'
                            tabIndex={-1}
                            label="Сложно"
                            onChange={switchHighHandler}
                            defaultChecked={state.wordsComplexity === 'high'}
                            checked={state.wordsComplexity === 'high'}
                        />
                    </WordsSetItemContainer>
                    <WordsSetItemContainer
                        tabIndex={isSberBoxLike() ? 1 : 0}
                        onClick={(e) => {
                            if (isSberBoxLike()) switchContainerHandler(e)
                        }}
                        style={{ marginTop: '1.5rem', width: '18rem', height: '3rem' }}
                    >
                        <Headline4 style={{ marginRight: '1rem' }}>Штраф за пропуск</Headline4>
                        <Switch
                            tabIndex={-1}
                            checked={state.isDecreasing}
                            defaultChecked={state.isDecreasing}
                            onChange={switchHandler}
                        />
                    </WordsSetItemContainer>
                    <Footnote1 style={{ margin: '0.5rem', marginBottom: '1rem', color: secondary }}>Каждое пропущенное слово отнимает одно очко</Footnote1>
                    <ButtonsBottomContainer>
                        <StyledButton onClick={onContinueClick} view='primary'>Далее</StyledButton>
                    </ButtonsBottomContainer>
                </PageContainer>
        </Container>
    )
}
