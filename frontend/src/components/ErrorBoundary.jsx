import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('SkillSprint Navigation/Runtime Error Caught:', error, errorInfo)
    
    // Auto-recover from chunk loading errors (caused by new deployments)
    const isChunkError = 
      error?.name === 'ChunkLoadError' ||
      error?.message?.includes('dynamically imported module') ||
      error?.message?.includes('Loading chunk') ||
      error?.message?.includes('Failed to fetch')

    if (isChunkError) {
      const reloaded = sessionStorage.getItem('skillsprint_chunk_reloaded')
      if (!reloaded) {
        sessionStorage.setItem('skillsprint_chunk_reloaded', 'true')
        window.location.reload()
      }
    }
  }

  handleReload = () => {
    sessionStorage.removeItem('skillsprint_chunk_reloaded')
    window.location.reload()
  }

  handleGoHome = () => {
    sessionStorage.removeItem('skillsprint_chunk_reloaded')
    window.location.href = '/'
  }

  handleResetSession = () => {
    try {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      sessionStorage.clear()
    } catch {
      // ignore
    }
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-900 font-sans">
          <div className="surface-card bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full shadow-xl text-center">
            <div className="w-16 h-16 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl">
              ⚡
            </div>
            
            <h2 className="text-2xl font-black text-slate-950 font-heading mb-2">
              Page Ready to Reload
            </h2>
            
            <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
              We updated the page components or encountered a network transition. Click below to continue your sprint smoothly.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={this.handleReload}
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-md text-sm transition-all cursor-pointer"
              >
                Reload Page ↻
              </button>

              <button
                onClick={this.handleGoHome}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-semibold py-3 px-6 rounded-xl text-sm transition-all cursor-pointer"
              >
                Return to Home
              </button>

              <button
                onClick={this.handleResetSession}
                className="text-xs text-slate-500 hover:text-slate-700 underline mt-2 py-1 cursor-pointer"
              >
                Clear cached session &amp; restart
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
