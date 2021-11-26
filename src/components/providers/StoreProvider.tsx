import { ReactNode, useReducer } from 'react'
import { StoreContext } from '../../context/storeContext'
import { initialState, reducer } from '../../store/store'
import { GlobalStyles } from '../GlobalStyle'

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <StoreContext.Provider value={[state, dispatch]}>
            <GlobalStyles character={state.character} />
            {children}
        </StoreContext.Provider>
    )
}
