import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-purple-600 font-semibold text-lg animate-pulse">Loading...</div>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" />

  return children
}

export default ProtectedRoute