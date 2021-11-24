import { PlasmaApp, Page, OnStartFn } from '@sberdevices/plasma-temple';
import { PlayPage } from './pages/PlayPage';
import { RoundResultPage } from './pages/RoundResultPage';
import { SettingsPage } from './pages/SettingsPage';
import { StartPage } from './pages/StartPage';
import { TeamScorePage } from './pages/TeamScorePage';
import { TeamsPage } from './pages/TeamsPage';
import { AppHeaderProps, AssistantProps, PageStateType } from './types/types';

const onStart: OnStartFn<PageStateType, {}> = ({ pushScreen }) => {
    console.log('onStart')
    pushScreen('start');
};

const assistantParams: AssistantProps = {
    initPhrase: 'запусти alias',
    token: process.env.REACT_APP_ASSISTANT_TOKEN,
};

const header: AppHeaderProps = {
    title: 'Alias',
    logo: ''
};


const App = () => {
    console.log('App')
    return(
    <PlasmaApp onStart={onStart} assistantParams={assistantParams} header={header}>
        <Page name='play' component={PlayPage} />
        <Page name='roundResult' component={RoundResultPage} />
        <Page name='teamScore' component={TeamScorePage} />
        <Page name='start' component={StartPage} />
        <Page name='teams' component={TeamsPage} />
        <Page name='settings' component={SettingsPage} />
    </PlasmaApp>
)}

export default App
