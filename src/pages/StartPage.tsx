import { PageComponent } from '@sberdevices/plasma-temple'
import { Button } from '@sberdevices/plasma-ui'
import { useStore } from '../hooks/useStore'
import { PageParamsType, PageStateType } from '../types/types'

export const StartPage: PageComponent<PageStateType, 'start', PageParamsType> = ({pushScreen}) => {
    const [state] = useStore()
    return (
        <div>
            <Button onClick={() => pushScreen('teams')}>Играть</Button>
            <Button onClick={() => pushScreen('rules')}>Правила</Button>
        </div>
    )
}
