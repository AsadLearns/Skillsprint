import { useEffect, useState } from 'react'
import API from '../services/api'

function Dashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await API.get('/dashboard')
        setUser(data.user)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <h1 className="text-4xl font-bold">
        Welcome {user?.name} 👋
      </h1>

      <p className="mt-4">
        Email: {user?.email}
      </p>

      <div className="mt-10 bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold">
          Dashboard Connected Successfully
        </h2>
      </div>
    </div>
  )
}

export default Dashboard