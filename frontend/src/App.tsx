import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'

export default function App() {
  const [token, setToken] = useState<string | null>(null)

  // Lê o token do localStorage quando o App carrega
  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  return (
    <Routes>
      <Route path="/login" element={<LoginPage setToken={setToken} />} />
      <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
    </Routes>
  )
}
