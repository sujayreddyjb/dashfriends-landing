import { motion } from 'framer-motion'
import { useTheme } from '../../../contexts/ThemeContext'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
}

export default function ConnectedGames({ games }) {
  const { isDark } = useTheme()

  return (
    <div className={`${isDark ? 'bg-[#1a1f35]/50' : 'bg-white'} rounded-2xl p-6`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Connected Games</h2>
        <button className="text-primary hover:text-primary/80 text-sm font-medium">
          + Connect Game
        </button>
      </div>

      <div className="space-y-4">
        {games.map((game) => (
          <div
            key={game.id}
            className={`${isDark ? 'bg-[#0b0c2a]/50' : 'bg-gray-50'} rounded-xl p-4 flex items-center justify-between`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                {game.icon}
              </div>
              <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {game.name}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`text-sm px-2 py-1 rounded-full ${
                game.status === 'connected'
                  ? 'bg-green-500/10 text-green-500'
                  : game.status === 'pending'
                  ? 'bg-yellow-500/10 text-yellow-500'
                  : isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'
              }`}>
                {game.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 