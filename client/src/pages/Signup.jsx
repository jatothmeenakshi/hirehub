import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('jobseeker')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post('/auth/signup', { name, email, password, role })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', res.data.role)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md">
    <h2 className="text-3xl font-bold text-gray-800 mb-2">Join HireHub</h2>
    <p className="text-gray-500 mb-8">Create your account</p>
    <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
        />
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
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="jobseeker">Job Seeker</option>
          <option value="recruiter">Recruiter</option>
        </select>
        <button onClick={handleSignup}
          className="bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition w-full" >
            Signup
            </button>
        </div>
    
     <p className="text-center text-gray-500 mt-6"></p>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
      </div>
  )
}

export default Signup