import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import API from '../api/axios'

function JobDetail() {
  const [job, setJob] = useState(null)
  const [message, setMessage] = useState('')
  const { id } = useParams()
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(`/jobs/${id}`)
        setJob(res.data)
      } catch (err) {
        setMessage('Failed to fetch job')
      }
    }
    fetchJob()
  }, [id])

  const handleApply = async () => {
    try {
      await API.post(`/applications/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessage('Applied successfully! ✅')
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to apply')
    }
  }

  if (!job) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Loading...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        <h2 className="text-3xl font-bold text-gray-800">{job.title}</h2>
        <p className="text-blue-600 font-semibold text-lg mt-1">{job.company}</p>

        <div className="flex gap-6 mt-4 text-gray-500">
          <span>📍 {job.location}</span>
          <span>💰 ₹{job.salary}</span>
          <span>👤 {job.postedBy?.name}</span>
        </div>

        <hr className="my-6 border-gray-100" />

        <h3 className="text-lg font-semibold text-gray-700 mb-2">Job Description</h3>
        <p className="text-gray-600 leading-relaxed">{job.description}</p>

        <div className="mt-8">
          {token && role === 'jobseeker' && (
            <button
              onClick={handleApply}
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition">
              Apply Now
            </button>
          )}
          {!token && (
            <p className="text-gray-500">
              Please <a href="/login" className="text-blue-600 font-semibold hover:underline">login</a> to apply
            </p>
          )}
          {message && (
            <p className="mt-4 text-green-600 font-medium bg-green-50 p-3 rounded-lg">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobDetail