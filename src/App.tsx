import { PlasmaApp, Page, OnStartFn } from '@sberdevices/plasma-temple';
import { AppHeaderProps, AssistantProps, PageStateType } from './types/types';

const onStart: OnStartFn<PageStateType, {}> = ({ pushScreen }) => {
    pushScreen('main');
};

const assistantParams: AssistantProps = {
    initPhrase: 'запусти alias',
    token: process.env.REACT_APP_ASSISTANT_TOKEN,
};

const header: AppHeaderProps = {
    title: 'Alias',
    logo: ''
};


export const App = () => (
    <PlasmaApp onStart={onStart} assistantParams={assistantParams} header={header}>
        <Page name="home" component={() => <div></div>} />
    </PlasmaApp>
);

export default App
