import { useNavigate } from "react-router-dom"
import { PageStateType } from '../types/types'

// type Navigate = (to: `/${keyof PageStateType}`) => void

export const usePushScreen = () => {
    const navigate = useNavigate()
    return (to: keyof PageStateType | '' | -1) => {
        console.log(to)
        if (to === -1) navigate(to)
        else navigate(`/${to}`)
    }
}