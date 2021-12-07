import { IconChevronDown, IconChevronUp } from '@sberdevices/plasma-icons'
import { secondary } from '@sberdevices/plasma-tokens'
import { Card, detectDevice, Headline1, Headline3, TextBox } from '@sberdevices/plasma-ui'
import React from 'react'
import styled from 'styled-components'
import { usePlayRound } from '../hooks/usePlayRound'
import { useStore } from '../hooks/useStore'
import { getTimerPercentage } from '../utils/utils'
import { isSberBoxLike } from '@sberdevices/plasma-temple'
import { Swiper, SwiperSlide } from 'swiper/react'
import { CSSTransition } from 'react-transition-group'
import '../transition.css'

const Container = styled.div`
    height: 85vh;
    margin: 0;
    display: flex;
    overflow: hidden;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
`

const UpContainer = styled(Card)`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    /* flex-direction: ${detectDevice() === 'sberPortal' ? 'row' : 'column'}; */
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    background-color: #ff7b00e3;
    height: ${detectDevice() === 'mobile' ? '7' : '5'}rem;
    overflow: hidden;
    /* height: 4rem; */
    width: 100vw;
    /* padding-top: 20px; */
    padding-bottom: 20px;
    border-radius: 0% 0% 60% 60%;
    @media (max-width: 700px){
        border-radius: 0% 0% 30% 30%;
        padding-bottom: 3rem;
    }
`
const BottomContainer = styled(Card)`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: 0;
    /* margin-bottom: 1rem; */
    /* background-color: #696969ea; */
    width: 100vw;
    height: ${detectDevice() === 'mobile' ? '15' : '10.5'}rem;
    /* height: 35vh; */
    padding-top: ${detectDevice() === 'mobile' ? '20' : '9'}px;
    /* padding-bottom: ${detectDevice() === 'mobile' ? '14' : '8'}rem; */
    overflow: hidden;
    border-radius: 60% 60% 0% 0%;
    @media (max-width: 700px){
        border-radius: 30% 30% 0% 0%;
        padding-bottom: 3rem;
    }
`
const CenterContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 35vh;
    margin-bottom: 2rem;
`
const Notification = styled(Card)`
    position: absolute;
    right: 1rem;
    top: ${detectDevice() === 'mobile' ? '7.5' : '5'}rem;
    width: ${detectDevice() === 'mobile' ? '11' : '14'}rem;
    text-align: center;
    padding: 0.3rem;
`
const ArrowButton = styled.div`
    border: none;
    background: none;
    &:focus{
        outline: none;
    }
`
const Timer = styled.div<{ timerPercentage: number }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 6rem;
    padding: 0.3rem;
    position: relative;
    border-radius: 1rem;
    margin-top: 0.8rem;
    background: linear-gradient(to right, #00e1ff97 ${props => props.timerPercentage}%, #ffffff18 ${props => props.timerPercentage}%);
`
const TeamName = styled.div`
    color: ${secondary};
    margin-top: ${detectDevice() === 'mobile' ? '2' : '0.5'}rem;
    /* margin: ${detectDevice() === 'sberPortal' ? '0' : '0.5'}rem; */
`
const Word = styled(Card)<{isRight: boolean, isWrong: boolean}>`
    display: flex;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: ${detectDevice() === 'mobile' ? '15' : '12'}rem;
    width: ${detectDevice() === 'mobile' ? '15' : '12'}rem;
    border-radius: 50%;
    transition: all 0.3s;
    box-shadow: 0px 0px 51px -31px rgba(0, 0, 0, 0.48);
    ${props => {
        let shadow = `box-shadow: 0px 0px 51px -31px rgba(0, 0, 0, 0.48);`
        if (props.isRight) shadow = `box-shadow: 0px 36px 94px -29px rgba(35, 255, 32, 0.48) inset;`
        if (props.isWrong) shadow = `box-shadow: 0px -46px 94px -29px rgba(193, 179, 0, 0.48) inset;`
        return shadow
    }}
`
const UpArrow = styled(IconChevronUp)`
    width: 5rem;
    height: 5rem;
`
const DownArrow = styled(IconChevronDown)`
    width: 5rem;
    height: 5rem;
`
const RightAnswerLight = styled.div`
    /* position: absolute;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 5rem;
    background-color: aqua; */
`

export const PlayPage = () => {

    const [isUpArrowColored, setIsUpArrowColored] = React.useState(false)
    const [isDownArrowColored, setIsDownArrowColored] = React.useState(false)

    const [{ currentTeam, timerLimit }, dispatch] = useStore()

    const upCallback = () => {
        setIsUpArrowColored(true)
    }
    const downCallback = () => {
        setIsDownArrowColored(true)
    }
    React.useEffect(() => {
        if (isUpArrowColored) {
            setTimeout(() => setIsUpArrowColored(false), 200)
        }
    }, [isUpArrowColored])
    React.useEffect(() => {
        if (isDownArrowColored) {
            setTimeout(() => setIsDownArrowColored(false), 200)
        }
    }, [isDownArrowColored])

    React.useEffect(() => {
        // const element = document.getElementById('mySwipe');
        // window.mySwipe = new Swiper(element, {
        //     startSlide: 0,
        //     auto: 3000,
        //     draggable: false,
        //     autoRestart: false,
        //     continuous: true,
        //     disableScroll: true,
        //     stopPropagation: true,
        //     callback: function (index, element) { },
        //     transitionEnd: function (index, element) { }
        // });
    }, [])

    const finishCallback = () => {
    }

    const {
        timer,
        currentWord,
        elementRef,
        onDownClick,
        onUpClick,
        rightCount,
        wrongCount,
        isShowStartNotification,
        isShowEndNotification,
        swipeWordEnd
    } = usePlayRound({
        downCallback,
        upCallback,
        finishCallback
    })

    return (
        <Container>
            <UpContainer>
                <TeamName>{currentTeam?.name}</TeamName>
                <Headline1>{rightCount}</Headline1>
                <div>отгадано</div>
            </UpContainer>
            <CenterContainer>
                {
                    isSberBoxLike() &&
                    <ArrowButton
                        tabIndex={0}
                        onClick={onUpClick}
                        style={{ marginBottom: '-1rem' }}
                    >
                        <UpArrow color={isUpArrowColored ? 'yellow' : secondary} />
                    </ArrowButton>
                }
                {
                    isSberBoxLike()
                        ? <Word
                            // ref={elementRef}
                            isRight={isUpArrowColored}
                            isWrong={isDownArrowColored}
                        >
                            <RightAnswerLight></RightAnswerLight>
                            <Headline3>{currentWord}</Headline3>
                        </Word>
                        : <Swiper
                            style={{margin: '0'}}
                            spaceBetween={50}
                            direction='vertical'
                            slidesPerView={1}
                            onTouchEnd={(swiper) => swipeWordEnd(swiper.touches.diff)}
                        >
                            <SwiperSlide style={{margin: '0', marginTop: detectDevice() === 'mobile' ? '4rem' : '0'}}>
                                <Word
                                    // ref={elementRef}
                                    isRight={isUpArrowColored}
                                    isWrong={isDownArrowColored}
                                >
                                    <RightAnswerLight></RightAnswerLight>
                                    <Headline3>{currentWord}</Headline3>
                                </Word>
                            </SwiperSlide>
                        </Swiper>
                }
                {
                    isSberBoxLike() &&
                    <ArrowButton
                        tabIndex={0}
                        onClick={onDownClick}
                        style={{ marginTop: '-1rem' }}
                    >
                        <DownArrow color={isDownArrowColored ? 'yellow' : secondary} />
                    </ArrowButton>
                }
            </CenterContainer>
            <BottomContainer>
                <Headline1>{wrongCount}</Headline1>
                <div>пропущено</div>
                <Timer timerPercentage={getTimerPercentage(timer, timerLimit)}>{timer}</Timer>
            </BottomContainer>
            <CSSTransition
                in={isShowEndNotification}
                timeout={300}
                classNames='notification'
                unmountOnExit
            >
                <Notification>
                    <TextBox>
                        Ещё можно угадать последнее слово
                    </TextBox>
                </Notification>
            </CSSTransition>
            <CSSTransition
                in={isShowStartNotification}
                timeout={300}
                classNames='notification'
                unmountOnExit
            >
                <Notification>
                    {
                        isSberBoxLike()
                            ? <>
                                <TextBox>Вверх — правильно</TextBox>
                                <TextBox> Вниз — пропустить слово</TextBox>
                            </>
                            : <>
                                <TextBox>Свайп по кружочку вверх — правильно</TextBox>
                                <TextBox>Вниз — пропустить слово</TextBox>
                            </>
                    }
                </Notification>
            </CSSTransition>
        </Container>
    )
}
