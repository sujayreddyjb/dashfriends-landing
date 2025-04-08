import { useTheme } from '../../../contexts/ThemeContext'
import { Link } from 'react-router-dom'

const medals = {
  1: "🥇",
  2: "🥈",
  3: "🥉"
}

export default function Leaderboard({ leaderboard, currentUser }) {
  const { isDark } = useTheme()

  return (
    <div className={`${isDark ? 'bg-[#1a1f35]/50' : 'bg-white'} rounded-2xl p-6`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Top Players</h2>
        <Link to="/leaderboard" className="text-primary hover:text-primary/80 text-sm font-medium">
          Full Rankings
        </Link>
      </div>

      <div className="space-y-4">
        {leaderboard.map((player) => (
          <div
            key={player.rank}
            className={`${isDark ? 'bg-[#0b0c2a]/50' : 'bg-gray-50'} 
              ${player.username === currentUser ? (isDark ? 'ring-2 ring-primary/30' : 'ring-2 ring-primary/20') : ''}
              rounded-xl p-4 flex items-center space-x-4`}
          >
            <div className={`w-8 h-8 flex items-center justify-center rounded-full 
              ${player.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' :
                player.rank === 2 ? 'bg-gray-400/20 text-gray-400' :
                player.rank === 3 ? 'bg-amber-600/20 text-amber-600' :
                isDark ? 'bg-gray-700/50 text-gray-400' : 'bg-gray-200 text-gray-600'
              } font-bold`}
            >
              {player.rank}
            </div>
            
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src={player.avatar} alt={player.username} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1">
              <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'} ${
                player.username === currentUser ? 'text-primary' : ''
              }`}>
                {player.username}
              </h3>
            </div>
            
            <div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {player.score.toLocaleString()} pts
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 