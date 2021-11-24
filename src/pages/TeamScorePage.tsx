import { PageComponent } from '@sberdevices/plasma-temple'
import { Button } from '@sberdevices/plasma-ui'
import { useStore } from '../hooks/useStore'
import { actions } from '../store/store'
import { PageParamsType, PageStateType } from '../types/types'
import { teamNames } from '../utils/teamNames'

export const TeamScorePage: PageComponent<PageStateType, 'teamScore', PageParamsType> = ({pushScreen}) => {
    const [state, dispatch] = useStore()
    const playHandler = () => {
        dispatch(actions.clearRoundWords())
        pushScreen('play')
    }
    return (
        <div>
            {state.teams.map((team, index) => (
                <div key={index}>{team.name} {team.score}</div>
            ))}
            Сейчас раунд команды {state.teams.find(team => team.id === state.playingTeamId)?.name}
            <Button onClick={playHandler}>Поехали!</Button>
        </div>
    )
}
