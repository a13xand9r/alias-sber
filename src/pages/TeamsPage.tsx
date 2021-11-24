import { PageComponent, useMount } from '@sberdevices/plasma-temple'
import { Button } from '@sberdevices/plasma-ui'
import { useEffect } from 'react'
import { useStore } from '../hooks/useStore'
import { actions } from '../store/store'
import { PageParamsType, PageStateType } from '../types/types'
import { teamNames } from '../utils/teamNames'
import { getRandomFromArray, getRandomFromArrayWithOldValues } from '../utils/utils'

export const TeamsPage: PageComponent<PageStateType, 'teams', PageParamsType> = ({pushScreen}) => {
    const [{teams}, dispatch] = useStore()

    useMount(() => {
        const team1 = getRandomFromArray(teamNames)
        const team2 = getRandomFromArrayWithOldValues(teamNames, [team1])
        dispatch(actions.addTeam(team1))
        dispatch(actions.addTeam(team2))
    })

    const addTeamHandler = () => {
        dispatch(actions.addTeam(getRandomFromArrayWithOldValues(teamNames, teams.map(team => team.name))))
        console.log(teams)
    }
    const deleteTeamHandler = (id: string) => {
        dispatch(actions.deleteTeam(id))
    }
    const continueHandler = () => pushScreen('teamScore')
    const settingsHandler = () => pushScreen('settings')

    useEffect(() => {
        if (teams.length) dispatch(actions.setPlayingTeam(teams[0].id))
    }, [teams])
    return (
        <div>
            {teams.map((team, _, arr) => (
                <div key={team.id}>{team.name} {arr.length > 2 && <button onClick={() => deleteTeamHandler(team.id)}>X</button>}</div>
            ))}
            <Button onClick={addTeamHandler}>Добавить</Button>
            <Button onClick={settingsHandler}>Настройки</Button>
            <Button onClick={continueHandler}>Далее</Button>
        </div>
    )
}
