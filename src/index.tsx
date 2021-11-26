import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Providers } from './components/providers/Providers'
if (process.env.NODE_ENV === 'development'){
    //@ts-ignore
    import('@sberdevices/spatial-navigation')
}

ReactDOM.render(
    <React.StrictMode>
        <Providers>
            <App />
        </Providers>
    </React.StrictMode>,
    document.getElementById('root')
)
