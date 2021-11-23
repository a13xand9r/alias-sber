import { ActionsType, CharacterType, StateType } from '../types/types'


export const initialState = {
    character: 'sber' as CharacterType,
    aaa: 0
}

export const reducer = (state: StateType, action: ActionsType): StateType => {
    switch (action.type) {
        case 'SET_CHARACTER':
            return { ...state, character: action.characterId }
        default: return state
    }
}

export const actions = {
    setCharacter: (characterId: CharacterType) => ({ type: 'SET_CHARACTER', characterId } as const),
}