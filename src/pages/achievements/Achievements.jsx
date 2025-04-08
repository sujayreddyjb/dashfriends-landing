import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'

// Mock achievements data - In a real app, this would come from an API
const mockAchievements = [
  {
    id: 1,
    title: "Early Bird",
    description: "Join DashFriends in its first month",
    icon: "🌟",
    rarity: "Legendary",
    rarityColor: "bg-yellow-500/20 text-yellow-400",
    progress: 100,
    completed: true,
    completedDate: "2024-03-01",
    xp: 500
  },
  {
    id: 2,
    title: "Social Butterfly",
    description: "Add 10 friends to your network",
    icon: "🦋",
    rarity: "Rare",
    rarityColor: "bg-purple-500/20 text-purple-400",
    progress: 70,
    completed: false,
    xp: 300
  },
  {
    id: 3,
    title: "Game Master",
    description: "Play 5 different games with friends",
    icon: "🎮",
    rarity: "Epic",
    rarityColor: "bg-blue-500/20 text-blue-400",
    progress: 40,
    completed: false,
    xp: 400
  },
  {
    id: 4,
    title: "Team Player",
    description: "Join 3 gaming sessions in one day",
    icon: "🤝",
    rarity: "Common",
    rarityColor: "bg-green-500/20 text-green-400",
    progress: 100,
    completed: true,
    completedDate: "2024-03-15",
    xp: 200
  },
  {
    id: 5,
    title: "Night Owl",
    description: "Play games for 3 hours after midnight",
    icon: "🦉",
    rarity: "Rare",
    rarityColor: "bg-purple-500/20 text-purple-400",
    progress: 90,
    completed: false,
    xp: 300
  }
]

function AchievementCard({ achievement }) {
  const { isDark } = useTheme()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`${isDark ? 'bg-[#0b0c2a]/50' : 'bg-gray-50'} rounded-xl p-6 backdrop-blur-sm relative overflow-hidden`}
    >
      {/* Achievement completion overlay */}
      {achievement.completed && (
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent" />
      )}
      
      <div className="flex items-start gap-4">
        {/* Icon and XP */}
        <div className="flex flex-col items-center">
          <div className={`w-14 h-14 ${achievement.rarityColor} rounded-xl flex items-center justify-center text-2xl mb-2`}>
            {achievement.icon}
          </div>
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {achievement.xp} XP
          </span>
        </div>

        {/* Achievement details */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {achievement.title}
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${achievement.rarityColor}`}>
              {achievement.rarity}
            </span>
          </div>
          
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
            {achievement.description}
          </p>

          {/* Progress bar */}
          <div className="relative pt-1">
            <div className={`overflow-hidden h-2 text-xs flex rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${achievement.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                  achievement.completed ? 'bg-green-500' : 'bg-primary'
                }`}
              />
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {achievement.progress}%
              </span>
              {achievement.completed && (
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Completed on {new Date(achievement.completedDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ProgressOverview({ achievements }) {
  const { isDark } = useTheme()
  const totalAchievements = achievements.length
  const completedAchievements = achievements.filter(a => a.completed).length
  const totalXP = achievements.reduce((sum, a) => sum + (a.completed ? a.xp : 0), 0)
  
  return (
    <div className={`${isDark ? 'bg-[#1a1f35]/50' : 'bg-white'} rounded-2xl p-6 backdrop-blur-sm`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {completedAchievements}/{totalAchievements}
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Achievements Completed
          </p>
        </div>
        <div className="text-center">
          <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {totalXP}
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Total XP Earned
          </p>
        </div>
        <div className="text-center">
          <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {Math.round((completedAchievements / totalAchievements) * 100)}%
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Completion Rate
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Achievements() {
  const { isDark } = useTheme()
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('progress')

  const filteredAndSortedAchievements = mockAchievements
    .filter(achievement => {
      if (filter === 'completed') return achievement.completed
      if (filter === 'in-progress') return !achievement.completed
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'progress') return b.progress - a.progress
      if (sortBy === 'xp') return b.xp - a.xp
      if (sortBy === 'rarity') {
        const rarityOrder = { 'Legendary': 4, 'Epic': 3, 'Rare': 2, 'Common': 1 }
        return rarityOrder[b.rarity] - rarityOrder[a.rarity]
      }
      return 0
    })

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#070818]' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
              Achievements
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Track your gaming milestones and unlock rewards
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={`px-4 py-2 rounded-lg ${
                isDark ? 'bg-[#0b0c2a]/50 text-white' : 'bg-white text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-primary/50`}
            >
              <option value="all">All Achievements</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-2 rounded-lg ${
                isDark ? 'bg-[#0b0c2a]/50 text-white' : 'bg-white text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-primary/50`}
            >
              <option value="progress">Sort by Progress</option>
              <option value="xp">Sort by XP</option>
              <option value="rarity">Sort by Rarity</option>
            </select>
          </div>
        </div>

        {/* Progress Overview */}
        <ProgressOverview achievements={mockAchievements} />

        {/* Achievements Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6">
          {filteredAndSortedAchievements.map(achievement => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
          {filteredAndSortedAchievements.length === 0 && (
            <p className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              No achievements found matching your filter
            </p>
          )}
        </div>
      </div>
    </div>
  )
} 