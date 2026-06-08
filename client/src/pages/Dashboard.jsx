import { useState, useEffect } from 'react'
import API from '../api/axios'

function Dashboard() {
  const [data, setData] = useState([])
  const [applications, setApplications] = useState({})
  const [message, setMessage] = useState('')
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (role === 'recruiter') {
          const res = await API.get('/jobs/my', {
            headers: { Authorization: `Bearer ${token}` }
          })
          setData(res.data)
          // fetch applications for each job
          const appsMap = {}
          for (const job of res.data) {
            const appRes = await API.get(`/applications/job/${job._id}`, {
              headers: { Authorization: `Bearer ${token}` }
            })
            appsMap[job._id] = appRes.data
          }
          setApplications(appsMap)
        } else {
          const res = await API.get('/applications/my', {
            headers: { Authorization: `Bearer ${token}` }
          })
          setData(res.data)
        }
      } catch (err) {
        setMessage('Failed to fetch data')
      }
    }
    fetchData()
  }, [])

  const handleDelete = async (jobId) => {
    try {
      await API.delete(`/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setData(data.filter(job => job._id !== jobId))
      setMessage('Job deleted ✅')
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to delete')
    }
  }

  const handleStatusUpdate = async (appId, jobId, status) => {
    try {
      await API.patch(`/applications/${appId}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setApplications(prev => ({
        ...prev,
        [jobId]: prev[jobId].map(app =>
          app._id === appId ? { ...app, status } : app
        )
      }))
      setMessage(`Application ${status} ✅`)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {role === 'recruiter' ? 'My Posted Jobs' : 'My Applications'}
        </h2>
        <p className="text-gray-500 mb-8">
          {role === 'recruiter' ? 'Manage your job listings' : 'Track your applications'}
        </p>

        {message && (
          <p className="text-green-600 bg-green-50 p-3 rounded-lg mb-6">{message}</p>
        )}

        {data.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <p className="text-gray-400 text-lg">Nothing here yet!</p>
          </div>
        )}

        <div className="flex flex-col gap-6">
          {role === 'recruiter' && data.map(job => (
            <div key={job._id} className="bg-white rounded-2xl shadow-sm border border-gray-100">
              {/* Job Header */}
              <div className="p-6 flex justify-between items-center border-b border-gray-100">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                  <p className="text-blue-600 font-medium mt-1">{job.company}</p>
                  <div className="flex gap-4 mt-2 text-gray-500 text-sm">
                    <span>📍 {job.location}</span>
                    <span>💰 ₹{job.salary}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-red-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition">
                  Delete
                </button>
              </div>

              {/* Applications for this job */}
              <div className="p-6">
                <h4 className="font-semibold text-gray-700 mb-4">
                  Applications ({applications[job._id]?.length || 0})
                </h4>
                {applications[job._id]?.length === 0 && (
                  <p className="text-gray-400 text-sm">No applications yet</p>
                )}
                {applications[job._id]?.map(app => (
                  <div key={app._id}
                    className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="font-medium text-gray-800">{app.userId?.name}</p>
                      <p className="text-gray-500 text-sm">{app.userId?.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                        ${app.status === 'accepted' ? 'bg-green-100 text-green-700' : ''}
                        ${app.status === 'rejected' ? 'bg-red-100 text-red-700' : ''}
                      `}>
                        {app.status}
                      </span>
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusUpdate(app._id, job._id, e.target.value)}
                        className="border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-blue-500">
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {role === 'jobseeker' && data.map(app => (
            <div key={app._id}
              className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{app.jobId?.title}</h3>
                  <p className="text-blue-600 font-medium mt-1">{app.jobId?.company}</p>
                  <div className="flex gap-4 mt-2 text-gray-500 text-sm">
                    <span>📍 {app.jobId?.location}</span>
                    <span>🗓 {new Date(app.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-sm font-semibold
                  ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                  ${app.status === 'accepted' ? 'bg-green-100 text-green-700' : ''}
                  ${app.status === 'rejected' ? 'bg-red-100 text-red-700' : ''}
                `}>
                  {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard