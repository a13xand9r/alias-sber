import { Team, RoundWord, WordsComplexity } from './../types/types';
import { ActionsType, CharacterType, StateType } from '../types/types'
import { v4 } from 'uuid'
import { getRandomFromArrayWithOldValues } from '../utils/utils';
import { teamNames } from '../utils/teamNames';


export const initialState = {
    character: 'sber' as CharacterType,
    isFirstRoundGame: true,
    isFirstLaunchOnDevice: true,
    teams: [] as Team[],
    playingTeams: [] as Team[],
    words: [] as string[],
    currentTeam: null as null | Team,
    winningTeam: null as null | Team,
    isDecreasing: false,
    timerLimit: 60,
    wordsComplexity: 'low' as WordsComplexity,
    isOverWordsLimit: false,
    wordsCountToWin: 30,
    roundWords: [] as RoundWord[],
    roundNumber: 1,
    countUsedWords: 0
}

export const reducer = (state: StateType, action: ActionsType): StateType => {
    let currentTeam = null
    switch (action.type) {
        case 'SET_CHARACTER':
            return { ...state, character: action.payload }
        case 'RESET_GAME':
            return {
                ...state,
                teams: [],
                playingTeams: [],
                isFirstRoundGame: true,
                currentTeam: null,
                winningTeam: null,
                isOverWordsLimit: false,
                roundWords: [],
                roundNumber: 1,
                countUsedWords: 0
            }
        case 'ADD_TEAM':
            const teamName = getRandomFromArrayWithOldValues(teamNames, state.teams.map(team => team.name))
            const newCommand: Team = {
                name: teamName,
                id: v4(),
                score: 0
            }
            return { ...state, teams: [...state.teams, newCommand], playingTeams: [...state.teams, newCommand] }
        case 'SET_PLAYING_TEAMS':
            return { ...state, playingTeams: [...action.payload] }
        case 'DELETE_TEAM':
            return {
                ...state,
                teams: state.teams.filter(team => team.id !== action.payload)
            }
        case 'DELETE_PLAYING_TEAM':
            return {
                ...state,
                playingTeams: state.playingTeams.filter(team => team.id !== action.payload)
            }
        case 'INCREASE_SCORE':
            const increment = state.roundWords.reduce((acc, item) => {
                if (item.isAnswered) return acc + 1
                else return acc
            }, 0)
            const teamsUp: Team[] = state.teams.map(team => ({
                name: team.name,
                id: team.id,
                score: team.id === action.payload.id ? team.score + increment : team.score
            }))
            return {
                ...state,
                teams: teamsUp,
                playingTeams: !state.isOverWordsLimit
                    ? teamsUp
                    : state.playingTeams.map(team => ({
                        name: team.name,
                        id: team.id,
                        score: team.id === action.payload.id ? team.score + increment : team.score
                    }))
            }
        case 'DECREASE_SCORE':
            const decrement = state.roundWords.reduce((acc, item) => {
                if (!item.isAnswered) return acc + 1
                else return acc
            }, 0)
            const teamsDown: Team[] = state.teams.map(team => ({
                name: team.name,
                id: team.id,
                score: team.id === action.payload.id ? team.score - decrement : team.score
            }))
            return {
                ...state,
                teams: teamsDown,
                playingTeams: !state.isOverWordsLimit
                    ? teamsDown
                    : state.playingTeams.map(team => ({
                        name: team.name,
                        id: team.id,
                        score: team.id === action.payload.id ? team.score - decrement : team.score
                    }))
            }
        case 'SET_WORDS':
            return { ...state, words: action.payload }
        case 'DELETE_WORD':
            return { ...state, words: state.words.filter(word => word !== action.payload) }
        case 'SET_CURRENT_TEAM':
            currentTeam = state.teams.find(team => team.id === action.payload)
            return { ...state, currentTeam: { ...currentTeam } as Team }
        case 'SET_WINNING_TEAM':
            return { ...state, winningTeam: state.teams.find(team => team.id === action.payload) as Team }
        case 'SET_NEXT_TEAM':
            let currentTeamIndex = state.playingTeams.findIndex((team) => team.id === state.currentTeam?.id)
            let nextPlyingTeam = currentTeamIndex + 1 === state.playingTeams.length
                ? state.playingTeams[0]
                : state.playingTeams[currentTeamIndex + 1]
            return { ...state, currentTeam: { ...nextPlyingTeam } as Team }
        case 'APPEND_ROUND_WORD':
            return { ...state, roundWords: [...state.roundWords, action.payload] }
        case 'CLEAR_ROUND_WORD':
            return { ...state, roundWords: [] }
        case 'SET_TIMER_LIMIT':
            return { ...state, timerLimit: action.payload.limit }
        case 'SET_WORDS_COUNT_TO_WIN':
            return { ...state, wordsCountToWin: action.payload.count }
        case 'SET_DECREASING_POINTS':
            console.log('isDecreasing', action.payload.isDecreasing)
            return { ...state, isDecreasing: action.payload.isDecreasing }
        case 'INCREASE_ROUND_NUMBER':
            return { ...state, roundNumber: state.roundNumber + 1 }
        case 'SET_ROUND_NUMBER':
            return { ...state, roundNumber: action.payload }
        case 'SET_OVER_WORDS_LIMIT':
            return { ...state, isOverWordsLimit: action.payload }
        case 'SET_FIRST_LAUNCH_ON_DEVICE':
            return { ...state, isFirstLaunchOnDevice: action.payload }
        case 'SET_COUNT_USED_WORDS':
            return { ...state, countUsedWords: action.payload }
        case 'INCREMENT_COUNT_USED_WORDS':
            return { ...state, countUsedWords: state.countUsedWords + 1 }
        case 'SET_WORDS_COMPLEXITY':
            return { ...state, wordsComplexity: action.payload.complexity }
        case 'SET_FIRST_ROUND':
            return { ...state, isFirstRoundGame: action.payload }
        default: return state
    }
}

export const actions = {
    setCharacter: (payload: CharacterType) => ({ type: 'SET_CHARACTER', payload } as const),
    addTeam: () => ({ type: 'ADD_TEAM' } as const),
    setPlayingTeams: (teams: Team[]) => ({ type: 'SET_PLAYING_TEAMS', payload: teams } as const),
    deleteTeam: (id: string) => ({ type: 'DELETE_TEAM', payload: id } as const),
    deletePlayingTeam: (id: string) => ({ type: 'DELETE_PLAYING_TEAM', payload: id } as const),
    incrementTeamScore: (id: string) => ({ type: 'INCREASE_SCORE', payload: { id } } as const),
    decrementTeamScore: (id: string) => ({ type: 'DECREASE_SCORE', payload: { id } } as const),
    setWords: (words: string[]) => ({ type: 'SET_WORDS', payload: words } as const),
    deleteWord: (word: string) => ({ type: 'DELETE_WORD', payload: word } as const),
    setCurrentTeam: (id: string) => ({ type: 'SET_CURRENT_TEAM', payload: id } as const),
    setWinningTeam: (id: string) => ({ type: 'SET_WINNING_TEAM', payload: id } as const),
    setNextTeam: () => ({ type: 'SET_NEXT_TEAM' } as const),
    appendRoundWords: (word: string, isAnswered: boolean) => ({ type: 'APPEND_ROUND_WORD', payload: { word, isAnswered } } as const),
    clearRoundWords: () => ({ type: 'CLEAR_ROUND_WORD' } as const),
    setTimerLimit: (limit: number) => ({ type: 'SET_TIMER_LIMIT', payload: { limit } } as const),
    setWordsCountToWin: (count: number) => ({ type: 'SET_WORDS_COUNT_TO_WIN', payload: { count } } as const),
    setDecreasingPoints: (isDecreasing: boolean) => ({ type: 'SET_DECREASING_POINTS', payload: { isDecreasing } } as const),
    increaseRoundNumber: () => ({ type: 'INCREASE_ROUND_NUMBER' } as const),
    setRoundNumber: (round: number) => ({ type: 'SET_ROUND_NUMBER', payload: round } as const),
    setOverWordsLimit: (payload: boolean) => ({ type: 'SET_OVER_WORDS_LIMIT', payload } as const),
    setFirstLaunchOnDevice: (payload: boolean) => ({ type: 'SET_FIRST_LAUNCH_ON_DEVICE', payload } as const),
    setCountUsedWords: (payload: number) => ({ type: 'SET_COUNT_USED_WORDS', payload } as const),
    incrementCountUsedWords: () => ({ type: 'INCREMENT_COUNT_USED_WORDS' } as const),
    setWordsComplexity: (complexity: WordsComplexity) => ({ type: 'SET_WORDS_COMPLEXITY', payload: {complexity} } as const),
    setFirsRound: (payload: boolean) => ({ type: 'SET_FIRST_ROUND', payload } as const),
    resetGame: () => ({ type: 'RESET_GAME' } as const),
}