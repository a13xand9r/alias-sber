import { PageComponent } from '@sberdevices/plasma-temple'
import { Button } from '@sberdevices/plasma-ui'
import { useStore } from '../hooks/useStore'
import { PageParamsType, PageStateType } from '../types/types'

export const RoundResultPage: PageComponent<PageStateType, 'roundResult', PageParamsType> = ({pushScreen}) => {
    const [{roundWords}] = useStore()

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
