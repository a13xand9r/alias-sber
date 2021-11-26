import { isSberBoxLike } from '@sberdevices/plasma-temple'
import { Header } from '@sberdevices/plasma-ui'

export const AppHeader: React.FC<Props> = ({title, back, onBackCallback, minimizeCallback, minimize}) => {

    return (
        <Header
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
    onBackCallback: () => void
    minimize?: boolean
    minimizeCallback?: () => void
}