import axios from 'axios'
import { WordsComplexity } from '../types/types'

export const getWords = async (complexity: WordsComplexity, limit = 500) => {
    const { data } = await axios.get<string[]>(`https://alias-server-sber.vercel.app/words?complexity=${complexity}&limit=${limit}`)
    // const { data: { result } } = await axios.get<WordsResponseType>(`https://shlyapa-game.ru/api/v1/words?complexity=${complexity}&language=rus&limit=${limit}&offset=0&rand=true&randomSeed=${Date.now()}&fields=[%22value%22]`)
    // return result.data.map(item => item.value)
    return data
}

type WordsResponseType = {
    result: {
        total: number
        data: {value: string}[]
    }
}