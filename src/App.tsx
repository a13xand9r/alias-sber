import { PlayPage } from './pages/PlayPage';
import { RoundResultPage } from './pages/RoundResultPage';
import { SettingsPage } from './pages/SettingsPage';
import { StartPage } from './pages/StartPage';
import { TeamScorePage } from './pages/TeamScorePage';
import { TeamsPage } from './pages/TeamsPage';
import {
    Routes,
    Route
} from 'react-router-dom'
import { VictoryPage } from './pages/VictoryPage';
import { RulesPage } from './pages/RulesPage';
import { useMount } from '@sberdevices/plasma-temple';
import { useStore } from './hooks/useStore';
import { actions } from './store/store';
import { useAssistant } from './hooks/useAssistant';
import { useEffect } from 'react';
import { WordsComplexity } from './types/types';


const App = () => {
    const [{isFirstLaunchOnDevice}, dispatch] = useStore()
    const assistant = useAssistant()
    useMount(() => {
        const timerLimit = localStorage.getItem('timerLimit')
        const isDecreasing = localStorage.getItem('isDecreasing')
        const wordsCountToWin = localStorage.getItem('wordsCountToWin')
        const wordsComplexity = localStorage.getItem('wordsComplexity') as WordsComplexity | undefined

        if (timerLimit) dispatch(actions.setTimerLimit(Number(timerLimit)))
        if (isDecreasing === 'true') dispatch(actions.setDecreasingPoints(true))
        if (wordsCountToWin) dispatch(actions.setWordsCountToWin(Number(wordsCountToWin)))
        if (wordsComplexity) dispatch(actions.setWordsComplexity(wordsComplexity))
    })
    useEffect(() => {
        if (assistant && isFirstLaunchOnDevice){
            const hasAlreadyLaunch = localStorage.getItem('hasAlreadyLaunch')
            if (hasAlreadyLaunch) dispatch(actions.setFirstLaunchOnDevice(false))

            assistant.sendAction({
                type: 'HELLO_MESSAGE',
                payload: {
                    isFirstLaunchOnDevice: hasAlreadyLaunch ? false : true
                }
            })
            localStorage.setItem('hasAlreadyLaunch', 'true')
        }
    }, [assistant])
    return (
        <Routes>
            <Route path="/play" element={<PlayPage />} />
            <Route path="/roundResult" element={<RoundResultPage />} />
            <Route path="/teamScore" element={<TeamScorePage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/victory" element={<VictoryPage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/" element={<StartPage />} />
        </Routes>
    )
}

export default App
