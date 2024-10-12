import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
    const navigate = useNavigate();
    const handleGuestLogin = ()=>{
        localStorage.setItem('guest', 'true');
        navigate('/dashboard');
    }
  return (
    <div className='homepage'>
        <h1>Welcome to Game Tracker</h1>
        <div className='button-container'>
            <button onClick={()=> navigate('/register')}>Register</button>
            <button onClick={handleGuestLogin}>Enter as guest</button>
        </div>

    </div>
  )
}
