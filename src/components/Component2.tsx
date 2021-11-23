import React from 'react'
import { useStore } from '../hooks/useStore'

export const Component2 = React.memo(() => {
    const [state, dispatch] = useStore()
    console.log('Component2 render')
    return (
        <div>
            Component2
        </div>
    )
}
)

// export const ComponentMemo = React.memo(Component)
