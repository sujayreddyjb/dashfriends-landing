import { useTheme } from '../../../contexts/ThemeContext'

export default function WelcomeBanner({ user }) {
  const { isDark } = useTheme()
  const progress = (user.xp / user.xpNeeded) * 100

  return (
    <div className={`${isDark ? 'bg-[#1a1f35]/50' : 'bg-white'} rounded-2xl p-6 relative overflow-hidden`}>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary/30">
            <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-primary text-white text-xs font-medium px-2 py-0.5 rounded-full">
            {user.level}
          </div>
        </div>
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Welcome back, <span className="text-primary">{user.username}</span>
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {user.rank} • Level {user.level}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Level Progress</span>
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {user.xp} / {user.xpNeeded} XP
          </span>
        </div>
        <div className="h-2 bg-gray-700/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
} 