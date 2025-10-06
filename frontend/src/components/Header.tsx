import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
      <h1>Tech Debt Manager</h1>
      <button onClick={logout}>Logout</button>
    </header>
  )
}
