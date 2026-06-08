import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

function Jobs() {
  const [jobs, setJobs] = useState([])
  const [search,setSearch]=useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get('/jobs')
        setJobs(res.data)
      } catch (err) {
        setError('Failed to fetch jobs')
      }
    }
    fetchJobs()
  }, [])
    const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase())
  )

  return (
     <div className="min-h-screen bg-gray-50 py-10 px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">All Jobs</h2>
<p className="text-gray-500 mb-6">Find your perfect opportunity</p>

        <input
          type="text"
          placeholder="Search by title, company or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-5 py-3 mb-8 focus:outline-none focus:border-blue-500 shadow-sm"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {filteredJobs.length === 0 && <p className="text-gray-500">No jobs found</p>}

        <div className="flex flex-col gap-4">
          {filteredJobs.map(job => (
            <div key={job._id}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                  <p className="text-blue-600 font-medium mt-1">{job.company}</p>
                  <div className="flex gap-4 mt-2 text-gray-500 text-sm">
                    <span>📍 {job.location}</span>
                    <span>💰 ₹{job.salary}</span>
                    <span>👤 {job.postedBy?.name}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/jobs/${job._id}`)}
                  className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition">
                  View Details
                </button>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Jobs