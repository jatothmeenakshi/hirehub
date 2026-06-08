import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20 px-8 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Find Your Dream Job with <span className="text-yellow-300">HireHub</span>
        </h1>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Connecting talented job seekers with top recruiters across India
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/jobs')}
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition text-lg">
            Browse Jobs
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-blue-600 transition text-lg">
            Post a Job
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="text-4xl font-bold text-blue-600 mb-2">500+</h2>
            <p className="text-gray-500">Jobs Posted</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="text-4xl font-bold text-blue-600 mb-2">1000+</h2>
            <p className="text-gray-500">Job Seekers</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="text-4xl font-bold text-blue-600 mb-2">200+</h2>
            <p className="text-gray-500">Companies</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50 py-16 px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to get started?</h2>
        <p className="text-gray-500 mb-8">Join thousands of job seekers and recruiters on HireHub</p>
        <button
          onClick={() => navigate('/signup')}
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition text-lg">
          Join HireHub Today
        </button>
      </div>
    </div>
  )
}

export default Home