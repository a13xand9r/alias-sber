import axios from 'axios'

export const getWords = async () => {
    const { data } = await axios.get<string[]>('http://localhost:5000/words')
    return data
}