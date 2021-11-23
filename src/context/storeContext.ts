import { StateType, ActionsType } from './../types/types'
import React, { Dispatch } from 'react'
import { initialState } from '../store/store'

export const StoreContext = React.createContext<[StateType, Dispatch<ActionsType>]>([
    initialState,
    () => null
])