import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/login')
  }

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex items-center justify-between shadow-md">
      <Link to="/" className="text-2xl font-bold tracking-tight">
        Hire<span className="text-yellow-300">Hub</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/jobs" className="hover:text-yellow-300 transition">Jobs</Link>

        {!token && <>
          <Link to="/login" className="hover:text-yellow-300 transition">Login</Link>
          <Link to="/signup" className="bg-white text-blue-600 px-4 py-1.5 rounded-full font-semibold hover:bg-yellow-300 transition">
            Signup
          </Link>
        </>}

        {token && <>
          <Link to="/dashboard" className="hover:text-yellow-300 transition">Dashboard</Link>
          <span className="text-blue-200 text-sm">({role})</span>
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-4 py-1.5 rounded-full font-semibold hover:bg-yellow-300 transition">
            Logout
          </button>
        </>}
      </div>
    </nav>
  )
}

export default Navbar