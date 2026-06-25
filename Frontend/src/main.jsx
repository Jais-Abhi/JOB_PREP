import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router'
import { Provider } from 'react-redux'
import store from './Redux/Store/store.js'
import { Toaster } from "./components/ui/sonner"

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
    <Provider store={store} >
        <App />
        <Toaster position="top-right" richColors theme="light" closeButton />
    </Provider>
    </BrowserRouter>
  // </StrictMode>,
)
