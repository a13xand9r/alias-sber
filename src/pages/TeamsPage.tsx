import { IconClose, IconPlus } from '@sberdevices/plasma-icons'
import { useMount } from '@sberdevices/plasma-temple'
import { Button, Card, Container, Body1 } from '@sberdevices/plasma-ui'
import { useEffect } from 'react'
import styled from 'styled-components'
import { getWords } from '../api/words'
import { AppHeader } from '../components/AppHeader'
import { useAssistant } from '../hooks/useAssistant'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'
import { actions } from '../store/store'
import { wordsSetLimit } from '../utils/utils'

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.5rem auto;
    text-align: center;
    width: 30rem;
    @media (max-width: 700px){
        width: 90vw;
    }
`

export const ButtonsBottomContainer = styled.div`
    margin: auto;
    text-align: center;
    margin-bottom: 10rem;
`

export const TeamsContainer = styled.div`
    width: 100%;
`

const TeamItem = styled(Card)`
    display: flex;
    flex-direction: row;
    padding: 0 0.2rem 0 1rem;
    margin-bottom: 0.3rem;
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

export const TeamsPage = () => {
    const [{ teams, wordsComplexity }, dispatch] = useStore()
    const pushScreen = usePushScreen()

    useMount(() => {
        if (teams.length < 2) {
            dispatch(actions.addTeam())
            dispatch(actions.addTeam())
        }
    })
    useMount(() => {
        getWords(wordsComplexity, wordsSetLimit).then(words => {
            dispatch(actions.setWords(words))
        })
    })

    const addTeamHandler = () => {
        dispatch(actions.addTeam())
        console.log(teams)
    }
    const deleteTeamHandler = (id: string) => {
        dispatch(actions.deleteTeam(id))
    }
    const continueHandler = () => pushScreen('teamScore')
    const settingsHandler = () => pushScreen('settings')

    const assistant = useAssistant()
    useEffect(() => {
        if (assistant){
            assistant.on('data', ({ smart_app_data }: any) => {
                if (smart_app_data) {
                    switch (smart_app_data.type) {
                        case 'NAVIGATION_BACK':
                            pushScreen(-1)
                            break;
                        case 'NAVIGATION_SETTINGS':
                            pushScreen('settings')
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

    useEffect(() => {
        if (teams.length) dispatch(actions.setCurrentTeam(teams[0].id))
    }, [teams])
    return (
        <Container>
            <AppHeader title='??????????????' back={true} onBackCallback={() => pushScreen(-1)} />
            <PageContainer>
                <TeamsContainer>
                    {teams.map((team, _, arr) => (
                        <TeamItem key={team.id}>
                            <Body1>{team.name} </Body1>
                            {arr.length > 2 &&
                            <DeleteButton onClick={() => deleteTeamHandler(team.id)}>
                                <IconClose />
                            </DeleteButton>}
                        </TeamItem>
                    ))}
                </TeamsContainer>
                <AddButton onClick={addTeamHandler}><IconPlus /> ????????????????</AddButton>
                <ButtonsBottomContainer>
                    <StyledButton onClick={settingsHandler}>??????????????????</StyledButton>
                    <StyledButton onClick={continueHandler} view='primary'>??????????</StyledButton>
                </ButtonsBottomContainer>
            </PageContainer>
        </Container>
    )
}
