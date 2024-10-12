import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Router>
      <AppRoutes/>
     </Router>
    </>
  )
}

export default App
