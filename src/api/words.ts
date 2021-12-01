import axios from 'axios'

export const getWords = async () => {
    const { data } = await axios.get<string[]>(process.env.NODE_ENV === 'development' ? 'http://localhost:5000/words' : 'https://alias-server-sber.vercel.app/words')
    return data
}