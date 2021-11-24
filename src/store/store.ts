import { Command } from './../types/types';
import { ActionsType, CharacterType, StateType } from '../types/types'
import { v4 } from 'uuid'


export const initialState = {
    character: 'sber' as CharacterType,
    commands: [] as Command[],
    words: [] as string[],
    playingCommandId: null as null | string
}

export const reducer = (state: StateType, action: ActionsType): StateType => {
    switch (action.type) {
        // case 'SET_CHARACTER':
        //     return { ...state, character: action.payload }
        case 'ADD_COMMAND':
            const newCommand: Command = {
                name: action.payload,
                id: v4(),
                score: 0
            }
            return { ...state, commands: [...state.commands, newCommand] }
        case 'DELETE_COMMAND':

            return {
                ...state,
                commands: state.commands.filter(command => command.id !== action.payload)
            }
        case 'ADD_SCORE':
            const commands: Command[] = state.commands.map(command => ({
                name: command.name,
                id: command.id,
                score: command.id === action.payload ? command.score + 1 : command.score
            }))
            return { ...state, commands: commands }
        case 'SET_WORDS':
            return { ...state, words: action.payload }
        case 'DELETE_WORD':
            return { ...state, words: state.words.filter(word => word !== action.payload) }
        case 'SET_PLAYING_COMMAND':
            return { ...state, playingCommandId: action.payload }
        default: return state
    }
}

export const actions = {
    setCharacter: (payload: CharacterType) => ({ type: 'SET_CHARACTER', payload } as const),
    addCommand: (name: string) => ({ type: 'ADD_COMMAND', payload: name } as const),
    deleteCommand: (id: string) => ({ type: 'DELETE_COMMAND', payload: id } as const),
    addScore: (id: string) => ({ type: 'ADD_SCORE', payload: id } as const),
    setWords: (words: string[]) => ({ type: 'SET_WORDS', payload: words } as const),
    deleteWord: (word: string) => ({ type: 'DELETE_WORD', payload: word } as const),
    setPlayingCommand: (id: string) => ({ type: 'SET_PLAYING_COMMAND', payload: id } as const),
}