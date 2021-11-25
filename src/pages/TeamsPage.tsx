import { IconClose, IconPlus } from '@sberdevices/plasma-icons'
import { PageComponent, useMount } from '@sberdevices/plasma-temple'
import { Button } from '@sberdevices/plasma-ui'
import { useEffect } from 'react'
import styled from 'styled-components'
import { useStore } from '../hooks/useStore'
import { actions } from '../store/store'
import { PageParamsType, PageStateType } from '../types/types'
import { teamNames } from '../utils/teamNames'
import { getRandomFromArray, getRandomFromArrayWithOldValues } from '../utils/utils'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem auto;
    text-align: center;
    width: 40rem;
    @media (max-width: 700px){
        width: 90vw;
    }
`

export const ButtonsBottomContainer = styled.div`
    position: absolute;
    bottom: 10rem;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
`

export const TeamsContainer = styled.div`
    width: 100%;
`

export const TeamItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 3.5rem;
`
const AddButton = styled(Button)`
    display: flex;
    justify-content: space-around;
    background: none;
    align-items: center;
    margin: 1rem auto;
    width: 11rem;
`
export const StyledButton = styled(Button)`
    display: block;
    margin: 1rem auto;
    width: 15rem;
`

const DeleteButton = styled(Button)`
    display: block;
    background: none;
    border: none;
`

export const TeamsPage: PageComponent<PageStateType, 'teams', PageParamsType> = ({ pushScreen }) => {
    const [{ teams }, dispatch] = useStore()

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
        <Container>
            <TeamsContainer>
                {teams.map((team, _, arr) => (
                    <TeamItem key={team.id}>{team.name} {arr.length > 2 && <DeleteButton onClick={() => deleteTeamHandler(team.id)}><IconClose /></DeleteButton>}</TeamItem>
                ))}
            </TeamsContainer>
            <AddButton onClick={addTeamHandler}><IconPlus /> Добавить</AddButton>
            <ButtonsBottomContainer>
                <StyledButton onClick={settingsHandler}>Настройки</StyledButton>
                <StyledButton onClick={continueHandler} view='primary'>Далее</StyledButton>
            </ButtonsBottomContainer>
        </Container>
    )
}
