import { PageComponent } from '@sberdevices/plasma-temple'
import { Button, Slider, Stepper, Switch } from '@sberdevices/plasma-ui'
import { ChangeEvent } from 'react'
import { useStore } from '../hooks/useStore'
import { actions } from '../store/store'
import { PageParamsType, PageStateType } from '../types/types'

export const SettingsPage: PageComponent<PageStateType, 'settings', PageParamsType> = ({pushScreen}) => {
    const [state, dispatch] = useStore()
    const switchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.checked)
        dispatch(actions.setDecreasingPoints(e.target.checked))
    }
    return (
        <div>
            Количество слов для достижения победы
            <Stepper
                step={5}
                value={state.wordsCountToWin}
                min={10}
                max={100}
                showRemove={false}
                onChange={(value) => dispatch(actions.setWordsCountToWin(value))}
            />
            Время раунда
            <Stepper
                step={5}
                value={state.timerLimit}
                min={10}
                max={120}
                showRemove={false}
                onChange={(value) => dispatch(actions.setTimerLimit(value))}
            />
            <Switch label='Штраф за пропуск' checked={state.isDecreasing} defaultChecked={state.isDecreasing} onChange={switchHandler} />
            <Button onClick={() => pushScreen('teamScore')}>Далее</Button>
        </div>
    )
}
