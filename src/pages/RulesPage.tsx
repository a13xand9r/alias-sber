import { Button, detectDevice } from '@sberdevices/plasma-ui'
import { secondary } from '@sberdevices/plasma-tokens'
import { Card, CardBody, CardContent, Container, Footnote1, Headline4, Stepper, Switch, TextBox } from '@sberdevices/plasma-ui'
import { ChangeEvent } from 'react'
import styled from 'styled-components'
import { AppHeader } from '../components/AppHeader'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'
import { actions } from '../store/store'
import { ButtonsBottomContainer, PageContainer, StyledButton } from './TeamsPage'

const StartTextBox = styled(TextBox)`
    text-align: start;
`

export const RulesPage = () => {
    const pushScreen = usePushScreen()
    return (
        <Container style={{marginBottom: '5rem'}}>
            <AppHeader title='Настройки' back={true} onBackCallback={() => pushScreen(-1)} />
            <PageContainer>
                <Card>
                    <CardBody style={{ height: '100%', alignItems: 'center' }}>
                        <CardContent style={{ height: '100%' }} cover={false}>
                            <TextBox>
                                Увлекательная командная игра для веселой компании
                            </TextBox>
                            <br />
                            <StartTextBox>
                                {/* &#128077;  */}
                                Задача каждого игрока - объяснить как можно больше слов товарищам по команде за ограниченное время
                                <br />
                                <br />
                                {/* &#128078;  */}
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
