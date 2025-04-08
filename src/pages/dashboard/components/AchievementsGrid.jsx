import { useTheme } from '../../../contexts/ThemeContext'
import { Link } from 'react-router-dom'

export default function AchievementsGrid({ achievements }) {
  const { isDark } = useTheme()

  const rarityColors = {
    common: 'text-gray-400',
    uncommon: 'text-green-500',
    rare: 'text-blue-500',
    epic: 'text-purple-500',
    legendary: 'text-yellow-500'
  }

  return (
    <div className={`${isDark ? 'bg-[#1a1f35]/50' : 'bg-white'} rounded-2xl p-6`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Achievements</h2>
        <Link to="/achievements" className="text-primary hover:text-primary/80 text-sm font-medium">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`${isDark ? 'bg-[#0b0c2a]/50 hover:bg-[#0b0c2a]' : 'bg-gray-50 hover:bg-gray-100'} 
              rounded-xl p-4 transition-colors group cursor-pointer`}
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} text-2xl`}>
                {achievement.icon}
              </div>
              <div className="flex-1">
                <h3 className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {achievement.title}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                  {achievement.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium ${rarityColors[achievement.rarity.toLowerCase()]}`}>
                    {achievement.rarity}
                  </span>
                  <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {achievement.date}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 