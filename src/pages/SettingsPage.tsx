import { accent, headline4, secondary } from '@sberdevices/plasma-tokens'
import { Container, Footnote1, Headline4, Stepper, Switch, Body1, Radiobox } from '@sberdevices/plasma-ui'
import { ChangeEvent, FormEvent, useEffect } from 'react'
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
    margin-top: 1rem;
    text-align: start;
    justify-content: flex-start;
    align-items: flex-start;
    box-sizing: border-box;
  &:focus-visible {
    outline: none;
    border: ${accent} solid 2px;
    border-radius: 10px;
  }
  &:focus {
    border: ${accent} solid 2px;
    border-radius: 10px;
    outline: none;
  }
    /* justify-content: space-between;
    text-align: center; */
`
const StyledSwitch = styled(Switch)`
    display: flex;
    justify-content: space-between;
    max-width: 7rem;
    margin: 0.2rem;
    text-align: center;
`
const StyledHeadlineSwitch = styled(Switch)`
    /* display: flex;
    justify-content: space-between; */
    width: 15rem;
    /* max-width: 2rem; */
    margin: 0.1rem auto;
    text-align: center;
`

const StyledRadiobox = styled(Radiobox)`
  box-sizing: border-box;
  &:focus-visible {
    outline: ${accent} solid 1px;
  }
  &:focus {
    outline: ${accent} solid 1px;
  }
`;
const StyledDiv = styled.div`
  box-sizing: border-box;
  &:focus-visible {
    outline: ${accent} solid 1px;
  }
  &:focus {
    outline: ${accent} solid 1px;
  }
`;

export const SettingsPage = () => {
    const [state, dispatch] = useStore()
    const pushScreen = usePushScreen()
    const switchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        console.log(e.target.checked)
        dispatch(actions.setDecreasingPoints(e.target.checked))
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

    const onContinueClick = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
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
            <form onSubmit={onContinueClick}>
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
                    <WordsSetItemContainer onClick={switchEasyHandler} tabIndex={1}>
                        {/* <Body1>Легко</Body1> */}
                        {/* <Switch
                        label='Легко'
                        tabIndex={2}
                        checked={state.wordsComplexity === 'low'}
                        defaultChecked={state.wordsComplexity === 'low'}
                        onChange={switchEasyHandler}
                    /> */}
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
                    <WordsSetItemContainer onClick={switchNormalHandler} tabIndex={1}>
                        {/* <Body1 >Нормально</Body1> */}
                        {/* <Switch
                        label='Нормально'
                        tabIndex={2}
                        checked={state.wordsComplexity === 'normal'}
                        defaultChecked={state.wordsComplexity === 'normal'}
                        onChange={switchNormalHandler}
                    /> */}
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
                    <WordsSetItemContainer onClick={switchHighHandler} tabIndex={1}>
                        {/* <Body1 >Сложно</Body1> */}
                        <Radiobox
                            value='high'
                            name='high'
                            tabIndex={-1}
                            label="Сложно"
                            onChange={switchHighHandler}
                            defaultChecked={state.wordsComplexity === 'high'}
                            checked={state.wordsComplexity === 'high'}
                        />
                        {/* <Switch
                    tabIndex={2}
                        label='Сложно'
                        checked={state.wordsComplexity === 'high'}
                        defaultChecked={state.wordsComplexity === 'high'}
                        onChange={switchHighHandler}
                    /> */}
                    </WordsSetItemContainer>
                    <div style={{ display: 'flex', marginTop: '1.5rem', width: '17rem' }}>
                        <Headline4 style={{marginRight: '1rem'}}>Штраф за пропуск</Headline4>
                        <Switch
                            tabIndex={2}
                            checked={state.isDecreasing}
                            defaultChecked={state.isDecreasing}
                            onChange={switchHandler}
                        />
                    </div>
                    <Footnote1 style={{ margin: '0.5rem', marginBottom: '1rem', color: secondary }}>Каждое пропущенное слово отнимает одно очко</Footnote1>
                    <ButtonsBottomContainer>
                        <StyledButton type='submit' view='primary'>Далее</StyledButton>
                    </ButtonsBottomContainer>
                </PageContainer>
            </form>
        </Container>
    )
}
