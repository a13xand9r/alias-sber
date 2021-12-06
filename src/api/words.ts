import axios from 'axios'
import { WordsComplexity } from '../types/types'

export const getWords = async (complexity: WordsComplexity, limit = 500) => {
    // const { data } = await axios.get<string[]>(process.env.NODE_ENV === 'development' ? 'http://localhost:5000/words' : 'https://alias-server-sber.vercel.app/words')
    const { data: { result } } = await axios.get<WordsResponseType>(`https://shlyapa-game.ru/api/v1/words?complexity=${complexity}&language=rus&limit=${limit}&offset=0&rand=true&randomSeed=${Date.now()}&fields=[%22value%22]`)
    return result.data.map(item => item.value)
}

type WordsResponseType = {
    result: {
        total: number
        data: {value: string}[]
    }
}