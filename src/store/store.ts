import { Team, RoundWord } from './../types/types';
import { ActionsType, CharacterType, StateType } from '../types/types'
import { v4 } from 'uuid'


export const initialState = {
    character: 'sber' as CharacterType,
    teams: [] as Team[],
    words: [] as string[],
    playingTeamId: null as null | string,
    isDecreasing: false,
    timerLimit: 60,
    wordsCountToWin: 30,
    roundWords: [] as RoundWord[],
    roundNumber: 1
}

export const reducer = (state: StateType, action: ActionsType): StateType => {
    switch (action.type) {
        // case 'SET_CHARACTER':
        //     return { ...state, character: action.payload }
        case 'ADD_TEAM':
            const newCommand: Team = {
                name: action.payload,
                id: v4(),
                score: 0
            }
            return { ...state, teams: [...state.teams, newCommand] }
        case 'DELETE_TEAM':

            return {
                ...state,
                teams: state.teams.filter(team => team.id !== action.payload)
            }
        case 'INCREASE_SCORE':
            const teamsUp: Team[] = state.teams.map(team => ({
                name: team.name,
                id: team.id,
                score: team.id === action.payload ? team.score + 1 : team.score
            }))
            return { ...state, teams: teamsUp }
        case 'DECREASE_SCORE':
            const teamsDown: Team[] = state.teams.map(team => ({
                name: team.name,
                id: team.id,
                score: team.id === action.payload ? team.score - 1 : team.score
            }))
            return { ...state, teams: teamsDown }
        case 'SET_WORDS':
            return { ...state, words: action.payload }
        case 'DELETE_WORD':
            return { ...state, words: state.words.filter(word => word !== action.payload) }
        case 'SET_PLAYING_TEAM':
            return { ...state, playingTeamId: action.payload }
        case 'SET_NEXT_PLAYING_TEAM':
            let currentTeamIndex = state.teams.findIndex((team) => team.id === state.playingTeamId)
            let nextPlyingTeamId = currentTeamIndex + 1 === state.teams.length ? state.teams[0].id : state.teams[currentTeamIndex + 1].id
            return { ...state, playingTeamId: nextPlyingTeamId}
        case 'APPEND_ROUND_WORD':
            return { ...state, roundWords: [...state.roundWords, action.payload] }
        case 'CLEAR_ROUND_WORD':
            return { ...state, roundWords: [] }
        case 'SET_TIMER_LIMIT':
            return { ...state, timerLimit: action.payload }
        case 'SET_WORDS_COUNT_TO_WIN':
            return { ...state, wordsCountToWin: action.payload }
        case 'SET_DECREASING_POINTS':
            return { ...state, isDecreasing: action.payload }
        case 'INCREASE_ROUND_NUMBER':
            return { ...state, roundNumber: state.roundNumber + 1 }
        case 'SET_ROUND_NUMBER':
            return { ...state, roundNumber: action.payload }
        default: return state
    }
}

export const actions = {
    setCharacter: (payload: CharacterType) => ({ type: 'SET_CHARACTER', payload } as const),
    addTeam: (name: string) => ({ type: 'ADD_TEAM', payload: name } as const),
    deleteTeam: (id: string) => ({ type: 'DELETE_TEAM', payload: id } as const),
    increaseCommandStore: (id: string) => ({ type: 'INCREASE_SCORE', payload: id } as const),
    decreaseCommandStore: (id: string) => ({ type: 'DECREASE_SCORE', payload: id } as const),
    setWords: (words: string[]) => ({ type: 'SET_WORDS', payload: words } as const),
    deleteWord: (word: string) => ({ type: 'DELETE_WORD', payload: word } as const),
    setPlayingTeam: (id: string) => ({ type: 'SET_PLAYING_TEAM', payload: id } as const),
    setNextPlayingTeam: () => ({ type: 'SET_NEXT_PLAYING_TEAM' } as const),
    appendRoundWords: (word: string, isAnswered: boolean) => ({ type: 'APPEND_ROUND_WORD', payload: {word, isAnswered} } as const),
    clearRoundWords: () => ({ type: 'CLEAR_ROUND_WORD' } as const),
    setTimerLimit: (limit: number) => ({ type: 'SET_TIMER_LIMIT', payload: limit } as const),
    setWordsCountToWin: (count: number) => ({ type: 'SET_WORDS_COUNT_TO_WIN', payload: count } as const),
    setDecreasingPoints: (payload: boolean) => ({ type: 'SET_DECREASING_POINTS', payload } as const),
    increaseRoundNumber: () => ({ type: 'INCREASE_ROUND_NUMBER' } as const),
    setRoundNumber: (round: number) => ({ type: 'SET_ROUND_NUMBER', payload: round } as const),
}