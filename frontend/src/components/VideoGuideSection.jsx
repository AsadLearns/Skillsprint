import { useState, useMemo } from 'react'
import { getCuratedVideos } from '../utils/studyGuideGenerator'

export default function VideoGuideSection({ skill, topic }) {
  const [activeFilter, setActiveFilter] = useState('all') // 'all', 'most-viewed', 'top-rated', 'crash-course', 'quick-concept'
  const [searchQuery, setSearchQuery] = useState('')

  const allVideos = useMemo(() => {
    return getCuratedVideos(skill, topic)
  }, [skill, topic])

  const filteredVideos = useMemo(() => {
    let result = [...allVideos]

    if (activeFilter === 'most-viewed') {
      result.sort((a, b) => b.viewsCount - a.viewsCount)
    } else if (activeFilter === 'top-rated') {
      result.sort((a, b) => (b.ratingScore * b.reviewsCount) - (a.ratingScore * a.reviewsCount))
    } else if (activeFilter !== 'all') {
      result = result.filter(v => v.filterTypes.includes(activeFilter))
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(v => 
        v.title.toLowerCase().includes(q) || 
        v.channel.toLowerCase().includes(q) || 
        v.description.toLowerCase().includes(q)
      )
    }

    return result
  }, [allVideos, activeFilter, searchQuery])

  return (
    <div className="mt-8 pt-6 border-t border-slate-200">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎥</span>
          <h3 className="text-lg font-black text-slate-900 font-heading">
            Recommended Video Guides
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold uppercase tracking-wider">
            Filtered by Views &amp; Reviews
          </span>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          Verified top-tier developer channels
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 flex-wrap mb-4 bg-slate-100 p-1 rounded-2xl border border-slate-200/80">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Guides ({allVideos.length})
        </button>

        <button
          onClick={() => setActiveFilter('most-viewed')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeFilter === 'most-viewed'
              ? 'bg-rose-50 text-rose-700 shadow-xs border border-rose-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🔥</span>
          <span>Most Viewed</span>
        </button>

        <button
          onClick={() => setActiveFilter('top-rated')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeFilter === 'top-rated'
              ? 'bg-amber-50 text-amber-700 shadow-xs border border-amber-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>⭐</span>
          <span>Top Reviews &amp; Ratings</span>
        </button>

        <button
          onClick={() => setActiveFilter('crash-course')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeFilter === 'crash-course'
              ? 'bg-indigo-50 text-indigo-700 shadow-xs border border-indigo-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>⏱️</span>
          <span>Full Crash Courses</span>
        </button>

        <button
          onClick={() => setActiveFilter('quick-concept')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeFilter === 'quick-concept'
              ? 'bg-cyan-50 text-cyan-700 shadow-xs border border-cyan-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>⚡</span>
          <span>Quick Concepts</span>
        </button>
      </div>

      {/* Video Cards Grid */}
      <div className="space-y-3.5">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="group surface-card bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-4 transition-all duration-200 hover:shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            {/* Left Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold">
                  {video.badge}
                </span>
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <span>{video.channel}</span>
                  {video.channelVerified && (
                    <span className="text-blue-500 text-xs" title="Verified Creator">✓</span>
                  )}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-mono font-semibold text-slate-500">
                  ⏱️ {video.duration}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-1">
                {video.title}
              </h4>

              <p className="text-xs text-slate-500 line-clamp-1 mb-2">
                {video.description}
              </p>

              {/* Metrics Row */}
              <div className="flex items-center gap-3 text-xs flex-wrap">
                <span className="inline-flex items-center gap-1 font-mono font-bold text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                  <span>👁️</span>
                  <span>{video.views}</span>
                </span>

                <span className="inline-flex items-center gap-1 font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  <span>⭐</span>
                  <span>{video.rating}</span>
                  <span className="text-[10px] text-amber-600 font-normal">({video.reviews})</span>
                </span>

                {video.highlights && video.highlights[0] && (
                  <span className="text-[11px] text-emerald-700 font-medium hidden sm:inline">
                    ✓ {video.highlights[0]}
                  </span>
                )}
              </div>
            </div>

            {/* Right Action */}
            <div className="shrink-0 w-full sm:w-auto">
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.388.556a3.003 3.003 0 0 0-2.11 2.107C0 8.053 0 12 0 12s0 3.947.502 5.837a3.003 3.003 0 0 0 2.11 2.107C4.5 20.5 12 20.5 12 20.5s7.5 0 9.388-.556a3.003 3.003 0 0 0 2.11-2.107C24 15.947 24 12 24 12s0-3.947-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>Watch on YouTube</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
