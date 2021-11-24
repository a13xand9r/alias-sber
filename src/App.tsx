import { PlasmaApp, Page, OnStartFn } from '@sberdevices/plasma-temple';
import { PlayPage } from './pages/PlayPage';
import { AppHeaderProps, AssistantProps, PageStateType } from './types/types';

const onStart: OnStartFn<PageStateType, {}> = ({ pushScreen }) => {
    console.log('onStart')
    pushScreen('play');
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
    </PlasmaApp>
)}

export default App
