import { detectDevice } from '@sberdevices/plasma-ui'
import { Card, CardBody, CardContent, Container, TextBox } from '@sberdevices/plasma-ui'
import styled from 'styled-components'
import { AppHeader } from '../components/AppHeader'
import { usePushScreen } from '../hooks/usePushScreen'
import { PageContainer, StyledButton } from './TeamsPage'
import { useAssistant } from '../hooks/useAssistant'
import { useEffect } from 'react'

const StartTextBox = styled(TextBox)`
    text-align: start;
`

export const RulesPage = () => {
    const pushScreen = usePushScreen()
    const assistant = useAssistant()

    useEffect(() => {
        if (assistant){
            assistant.on('data', ({ smart_app_data }: any) => {
                if (smart_app_data) {
                    switch (smart_app_data.type) {
                        case 'NAVIGATION_BACK':
                            pushScreen(-1)
                            break;
                        default:
                    }
                }
            })
        }
    }, [assistant])

    return (
        <Container style={{marginBottom: '5rem'}}>
            <AppHeader title='Правила' back={true} onBackCallback={() => pushScreen(-1)} />
            <PageContainer>
                <Card>
                    <CardBody style={{ height: '100%', alignItems: 'center' }}>
                        <CardContent style={{ height: '100%' }} cover={false}>
                            <TextBox>
                                Увлекательная командная игра для веселой компании
                            </TextBox>
                            <br />
                            <StartTextBox>
                                Задача каждого игрока - объяснить как можно больше слов товарищам по команде за ограниченное время
                                <br />
                                <br />
                                Во время объяснения нельзя использовать одинаковые и однокоренные слова, озвучивать текст с иностранных языков
                                <br />
                                <br />
                                Отгаданное слово приносит команде одно очко, а за пропущенное слово команда штрафуется (в зависимости от настроек)
                                <br />
                                <br />
                                Победителем становится команда, у которой количество очков достигло заранее установленного значения
                                <br />
                                <br />
                                Лучше всего разбиваться на команды по 2 человека и по очереди меняться — один раунд первый объясняет слова, второй раунд — меняемся
                                <br />
                                <br />
                                {detectDevice() === 'sberBox'
                                    ? 'Во время игры, если слово угадано верно, нужно нажать кнопку вверх на пульте, иначе вниз. Когда время заканчивается, на последнее слово остается неограниченное количество времени, но постарайтесь не злоупотреблять им'
                                    : 'Во время игры, если слово угадано верно, нужно сделать свайп вверх, иначе вниз. Когда время заканчивается, на последнее слово остается неограниченное количество времени, но постарайтесь не злоупотреблять им'}
                            </StartTextBox>
                        </CardContent>
                    </CardBody>
                </Card>
                <StyledButton view='primary' onClick={() => pushScreen(-1)}>Понятно!</StyledButton>
            </PageContainer>
        </Container>
    )
}
