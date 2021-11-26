import { FC, useMemo } from 'react'
import { createGlobalStyle } from 'styled-components'
import { darkSber, darkEva, darkJoy } from '@sberdevices/plasma-tokens/themes'
import {
    text, // Цвет текста
    background, // Цвет подложки
    gradient, // Градиент
} from '@sberdevices/plasma-tokens'
import { CharacterType } from '../types/types'

const themes = {
    sber: createGlobalStyle(darkSber),
    eva: createGlobalStyle(darkEva),
    joy: createGlobalStyle(darkJoy),
}

const DocumentStyle = createGlobalStyle`
  html:root {
    padding-top: 1rem;
    min-height: 100vh;
    color: ${text};
    /* background-color: #680068; */
    /* background-image: ${gradient}; */
    /* background: rgb(34,193,195);
    background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(131,66,227,1) 86%); */
    background: rgb(12,166,168);
    background: linear-gradient(0deg, rgba(12,166,168,1) 0%, rgba(64,4,152,1) 91%);
  }
`

export const GlobalStyles: FC<{ character: CharacterType }> = ({ character }) => {
    const Theme = useMemo(() => themes[character], [character])
    return (
        <>
            <DocumentStyle />
            <Theme />
        </>
    )
}