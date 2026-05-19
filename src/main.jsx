import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './index.css'

const logoUrl = import.meta.env.VITE_LOGO || '/assets/logos/logo.png'
document.querySelectorAll("link[rel*='icon']").forEach(el => { el.href = logoUrl })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
