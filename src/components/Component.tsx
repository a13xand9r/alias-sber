import React from 'react'
import { useStore } from '../hooks/useStore'

export const Component = React.memo(() => {
    const [state, dispatch] = useStore()
    console.log('Component1 render')
    return (
        <div>
            Component1
        </div>
    )
}
)

// export const ComponentMemo = React.memo(Component)
