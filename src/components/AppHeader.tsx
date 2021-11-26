import { isSberBoxLike } from '@sberdevices/plasma-temple'
import { detectDevice, Header } from '@sberdevices/plasma-ui'
import styled from 'styled-components'

const StyledHeader = styled(Header)`
    ${detectDevice() === 'mobile' ? '' : `
        margin-top: 0.5rem;
    `};
`

export const AppHeader: React.FC<Props> = ({title, back, onBackCallback, minimizeCallback, minimize}) => {

    return (
        <StyledHeader
            title={title}
            back={(back && !isSberBoxLike()) || undefined}
            onBackClick={onBackCallback}
            logo='./img/alias_logo.png'
            // minimize={minimize || undefined}
        />
    )
}

type Props = {
    title: string
    back: boolean
    onBackCallback?: () => void
    minimize?: boolean
    minimizeCallback?: () => void
}