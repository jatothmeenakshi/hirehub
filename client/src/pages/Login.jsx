import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', res.data.role)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back</h2>
        <p className="text-gray-500 mb-8">Login to your HireHub account</p>

        {error && <p className="text-red-500 mb-4 bg-red-50 p-3 rounded-lg">{error}</p>}

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
            Login
          </button>
        </div>

        <p className="text-center text-gray-500 mt-6">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 font-semibold hover:underline">Signup</a>
        </p>
      </div>
    </div>
  )
}

export default Login