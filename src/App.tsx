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


const App = () => {
    const [_, dispatch] = useStore()
    useMount(() => {
        const timerLimit = localStorage.getItem('timerLimit')
        const isDecreasing = localStorage.getItem('isDecreasing')
        const wordsCountToWin = localStorage.getItem('wordsCountToWin')

        if (timerLimit) dispatch(actions.setTimerLimit(Number(timerLimit)))
        if (isDecreasing === 'true') dispatch(actions.setDecreasingPoints(true))
        if (wordsCountToWin) dispatch(actions.setWordsCountToWin(Number(wordsCountToWin)))

        console.log(process.env.NODE_ENV)
    })
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
