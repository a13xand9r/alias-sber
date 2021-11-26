import { PageComponent } from '@sberdevices/plasma-temple'
import { Button } from '@sberdevices/plasma-ui'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'
import { PageParamsType, PageStateType } from '../types/types'

export const RoundResultPage = () => {
    const [{roundWords}] = useStore()
    const pushScreen = usePushScreen()

    const continueHandler = () => {
        pushScreen('teamScore')
    }
    return (
        <div>
            {roundWords.map(item => (
                <div>{item.word} {item.isAnswered}</div>
            ))}
            <Button onClick={continueHandler}>Продолжить</Button>
        </div>
    )
}
