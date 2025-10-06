import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

interface Props {
  setToken: (token: string) => void
}

export default function LoginPage({ setToken }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password })
      localStorage.setItem('token', response.data.token)
      setToken(response.data.token)   // atualiza estado do App
      navigate('/dashboard')          // navega para o dashboard
    } catch (err) {
      setError('Login failed')
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ display: 'block', marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ display: 'block', marginBottom: 10 }}
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}
