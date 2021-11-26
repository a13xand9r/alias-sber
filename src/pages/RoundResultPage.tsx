import { secondary } from '@sberdevices/plasma-tokens'
import { Button, Container } from '@sberdevices/plasma-ui'
import styled from 'styled-components'
import { AppHeader } from '../components/AppHeader'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'
import { ButtonsBottomContainer, StyledButton } from './TeamsPage'


const likeIcon = './img/like.png'
const dislikeIcon = './img/dislike.png'

const WordsContainer = styled.div`
    margin: 1rem auto;
`
const WordItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 1.7rem;
    min-width: 15rem;
    position: relative;
    &::after{
        content: ' ';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        opacity: 0.5;
        background-color: ${secondary};
    }
`

const LikeImg = styled.img`
    width: 1rem;
    height: 1rem;
`

export const RoundResultPage = () => {
    const [{roundWords}] = useStore()
    const pushScreen = usePushScreen()

    const continueHandler = () => {
        pushScreen('teamScore')
    }
    return (
        <Container>
            <AppHeader back={false} title='Результаты раунда' />
            <WordsContainer>
                {roundWords.map(item => (
                    <WordItem>
                        <div>{item.word}</div>
                        <div><LikeImg src={item.isAnswered ? likeIcon : dislikeIcon} alt='' /></div></WordItem>
                ))}
            </WordsContainer>
            <ButtonsBottomContainer>
                <StyledButton view='primary' onClick={continueHandler}>Далее</StyledButton>
            </ButtonsBottomContainer>
        </Container>
    )
}
