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


const App = () => {
    return (
        <Routes>
            <Route path="/play" element={<PlayPage />} />
            <Route path="/roundResult" element={<RoundResultPage />} />
            <Route path="/teamScore" element={<TeamScorePage />} />
            <Route path="/teamScore" element={<TeamScorePage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/" element={<StartPage />} />
        </Routes>
    )
}

export default App
