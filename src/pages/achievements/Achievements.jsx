import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import { Tooltip } from 'react-tooltip'
import { AchievementSkeleton, CardSkeleton } from '../../components/LoadingSkeletons'
import { ErrorBoundary } from 'react-error-boundary'
import Navbar from '../../components/Navbar'

// Level system configuration
const LEVEL_CONFIG = {
  baseXP: 1000,
  xpMultiplier: 1.5,
  maxLevel: 100
}

// Rarity configuration
const RARITY_CONFIG = {
  common: { 
    icon: '★', 
    color: 'text-gray-400', 
    bgColor: 'bg-gray-400/20',
    borderColor: 'border-gray-400/50',
    glowColor: 'shadow-gray-400/20'
  },
  rare: { 
    icon: '🔶', 
    color: 'text-yellow-400', 
    bgColor: 'bg-yellow-400/20',
    borderColor: 'border-yellow-400/50',
    glowColor: 'shadow-yellow-400/20'
  },
  legendary: { 
    icon: '💎', 
    color: 'text-purple-400', 
    bgColor: 'bg-purple-400/20',
    borderColor: 'border-purple-400/50',
    glowColor: 'shadow-purple-400/20'
  }
}

// Calculate XP required for next level
const calculateLevelXP = (level) => {
  return Math.floor(LEVEL_CONFIG.baseXP * Math.pow(LEVEL_CONFIG.xpMultiplier, level - 1))
}

// Calculate current level based on total XP
const calculateLevel = (totalXP) => {
  let level = 1
  let xpNeeded = LEVEL_CONFIG.baseXP
  let currentXP = totalXP

  while (currentXP >= xpNeeded && level < LEVEL_CONFIG.maxLevel) {
    currentXP -= xpNeeded
    level++
    xpNeeded = calculateLevelXP(level)
  }

  return {
    level,
    currentXP,
    nextLevelXP: xpNeeded,
    progress: (currentXP / xpNeeded) * 100
  }
}

// Achievement categories
const categories = [
  { id: 'all', name: 'All Achievements' },
  { id: 'recent', name: 'Recently Unlocked' },
  { id: 'progress', name: 'In Progress' },
  { id: 'rare', name: 'Rare Achievements' },
  { id: 'common', name: 'Common' }
]

// Achievement types with their respective colors and icons
const achievementTypes = {
  combat: { color: 'bg-red-500/20 text-red-400', icon: '⚔️' },
  exploration: { color: 'bg-green-500/20 text-green-400', icon: '🗺️' },
  social: { color: 'bg-blue-500/20 text-blue-400', icon: '👥' },
  collection: { color: 'bg-purple-500/20 text-purple-400', icon: '💎' },
  skill: { color: 'bg-yellow-500/20 text-yellow-400', icon: '⭐' },
  special: { color: 'bg-pink-500/20 text-pink-400', icon: '🏆' }
}

// Unlockable rewards configuration
const REWARDS = {
  level: [
    { level: 5, reward: 'Bronze Profile Badge', icon: '🥉' },
    { level: 10, reward: 'Silver Profile Badge', icon: '🥈' },
    { level: 20, reward: 'Gold Profile Badge', icon: '🥇' },
    { level: 30, reward: 'Platinum Profile Badge', icon: '🏆' }
  ],
  streak: [
    { streak: 3, reward: '3-Day Streak Banner', icon: '🔥' },
    { streak: 7, reward: 'Weekly Streak Banner', icon: '⚡' },
    { streak: 30, reward: 'Monthly Streak Banner', icon: '🌟' }
  ]
}

// Mock achievements data
const mockAchievements = [
  {
    id: 1,
    title: 'First Victory',
    description: 'Win your first match in any game mode',
    type: 'combat',
    rarity: 'common',
    progress: 100,
    unlockedAt: '2024-03-15T10:30:00Z',
    xp: 100,
    game: 'Valorant',
    icon: '/achievements/first-victory.png'
  },
  {
    id: 2,
    title: 'Social Butterfly',
    description: 'Add 10 friends to your friend list',
    type: 'social',
    rarity: 'common',
    progress: 80,
    xp: 150,
    game: 'Platform',
    icon: '/achievements/social-butterfly.png'
  },
  {
    id: 3,
    title: 'Legendary Collection',
    description: 'Collect 5 legendary items',
    type: 'collection',
    rarity: 'rare',
    progress: 60,
    xp: 500,
    game: 'CS:GO',
    icon: '/achievements/legendary-collection.png'
  },
  {
    id: 4,
    title: 'Master Strategist',
    description: 'Win 100 ranked matches',
    type: 'skill',
    rarity: 'rare',
    progress: 45,
    xp: 1000,
    game: 'League of Legends',
    icon: '/achievements/master-strategist.png'
  },
  {
    id: 5,
    title: 'World Explorer',
    description: 'Visit all maps in the game',
    type: 'exploration',
    rarity: 'common',
    progress: 100,
    unlockedAt: '2024-03-14T15:45:00Z',
    xp: 200,
    game: 'Minecraft',
    icon: '/achievements/world-explorer.png'
  },
  {
    id: 6,
    title: 'Tournament Champion',
    description: 'Win a tournament event',
    type: 'special',
    rarity: 'legendary',
    progress: 100,
    unlockedAt: '2024-03-10T20:00:00Z',
    xp: 2000,
    game: 'Valorant',
    icon: '/achievements/tournament-champion.png'
  }
]

// Add a new constant for consistent card styling
const cardStyle = (isDark) => `
  ${isDark ? 'bg-[#1F1F2E]' : 'bg-white'} 
  rounded-2xl 
  p-6 
  backdrop-blur-sm 
  border 
  ${isDark ? 'border-[#2a2f45]' : 'border-gray-200'}
  shadow-lg
  shadow-black/5
  transition-all
  duration-200
  hover:shadow-xl
  hover:shadow-black/10
`

function Card({ children, className = '' }) {
  const { isDark } = useTheme()
  return (
    <div
      className={`
        ${isDark ? 'bg-[#1F1F2E]' : 'bg-white'}
        rounded-2xl
        p-6
        backdrop-blur-sm
        border
        ${isDark ? 'border-[#2a2f45]' : 'border-gray-200'}
        shadow-lg
        shadow-black/5
        transition-all
        duration-200
        hover:shadow-xl
        hover:shadow-black/10
        ${className}
      `}
    >
      {children}
    </div>
  )
}

function LevelProgress({ levelInfo }) {
  const { isDark } = useTheme()
  
  return (
    <Card>
      <div className="flex items-center justify-between mb-2">
        <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Level {levelInfo.level}
        </h2>
        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {levelInfo.currentXP} / {levelInfo.nextLevelXP} XP
        </span>
      </div>
      <div className={`w-full h-3 rounded-full ${isDark ? 'bg-[#0b0c2a]' : 'bg-gray-200'}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${levelInfo.progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70"
        />
      </div>
    </Card>
  )
}

function StreakBadge({ streak }) {
  const { isDark } = useTheme()
  
  return (
    <Card>
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center text-white text-xl font-bold">
          {streak}
        </div>
        <div>
          <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Achievement Streak
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {streak} achievements unlocked this week
          </p>
        </div>
      </div>
    </Card>
  )
}

function AchievementDetailsModal({ achievement, onClose }) {
  const { isDark } = useTheme()
  const rarity = RARITY_CONFIG[achievement.rarity]
  const type = achievementTypes[achievement.type]
  const isUnlocked = achievement.progress === 100

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`${isDark ? 'bg-[#1a1f35]' : 'bg-white'} rounded-2xl p-6 max-w-md w-full mx-4`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-lg ${type.color} flex items-center justify-center text-2xl`}>
              {type.icon}
            </div>
            <div>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {achievement.title}
              </h2>
              <div className={`text-sm ${rarity.color} flex items-center`}>
                <span className="mr-1">{rarity.icon}</span>
                {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Description
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {achievement.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Status
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {isUnlocked ? 'Unlocked' : 'Locked'}
              </p>
            </div>
            <div>
              <h3 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                XP Reward
              </h3>
              <p className="text-primary">
                +{achievement.xp} XP
              </p>
            </div>
          </div>

          {isUnlocked && achievement.unlockedAt && (
            <div>
              <h3 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Unlocked On
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {new Date(achievement.unlockedAt).toLocaleDateString()}
              </p>
            </div>
          )}

          <div>
            <h3 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Game
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {achievement.game}
            </p>
          </div>

          {achievement.progress < 100 && (
            <div>
              <h3 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Progress
              </h3>
              <div className={`w-full h-2 rounded-full ${isDark ? 'bg-[#0b0c2a]' : 'bg-gray-200'}`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${achievement.progress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className={`h-full rounded-full ${type.color.replace('20', '50')}`}
                />
              </div>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {achievement.progress}%
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

function AchievementCard({ achievement, onClick }) {
  const { isDark } = useTheme()
  const type = achievementTypes[achievement.type]
  const rarity = RARITY_CONFIG[achievement.rarity]
  const isUnlocked = achievement.progress === 100

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onClick={() => onClick(achievement)}
      className={`${isDark ? 'bg-[#0b0c2a]/50' : 'bg-gray-50'} rounded-xl p-4 backdrop-blur-sm cursor-pointer hover:scale-[1.02] transition-transform`}
    >
      <div className="flex items-start space-x-4">
        <div className="relative">
          <div className={`w-12 h-12 rounded-lg ${type.color} flex items-center justify-center text-2xl`}>
            {type.icon}
          </div>
          {isUnlocked && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {achievement.title}
                </h3>
                <div 
                  className={`px-2 py-0.5 rounded-full border ${rarity.borderColor} ${rarity.bgColor} ${rarity.glowColor} shadow-sm flex items-center space-x-1`}
                >
                  <span className={`text-base ${rarity.color}`}>{rarity.icon}</span>
                  <span className={`text-xs font-medium ${rarity.color}`}>
                    {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                  </span>
                </div>
              </div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {achievement.description}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className={`text-xs px-2 py-0.5 rounded-full ${type.color}`}>
                {achievement.game}
              </span>
              <span className="text-xs text-primary mt-1">+{achievement.xp} XP</span>
            </div>
          </div>
          {achievement.progress < 100 && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Progress
                </span>
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {achievement.progress}%
                </span>
              </div>
              <div className={`w-full h-2 rounded-full ${isDark ? 'bg-[#1a1f35]' : 'bg-gray-200'}`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${achievement.progress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className={`h-full rounded-full ${type.color.replace('20', '50')}`}
                />
              </div>
            </div>
          )}
          {isUnlocked && achievement.unlockedAt && (
            <p className={`text-xs mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function AchievementStats({ achievements }) {
  const { isDark } = useTheme()
  const totalAchievements = achievements.length
  const unlockedAchievements = achievements.filter(a => a.progress === 100).length
  const totalXP = achievements.reduce((sum, a) => sum + (a.progress === 100 ? a.xp : 0), 0)
  const completionRate = Math.round((unlockedAchievements / totalAchievements) * 100)
  const levelInfo = calculateLevel(totalXP)

  // Calculate streak (achievements unlocked in the last 7 days)
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  const streak = achievements.filter(a => 
    a.progress === 100 && 
    new Date(a.unlockedAt) > oneWeekAgo
  ).length

  const stats = [
    { label: 'Total Achievements', value: totalAchievements },
    { label: 'Unlocked', value: unlockedAchievements },
    { label: 'Completion Rate', value: `${completionRate}%` },
    { label: 'Total XP', value: totalXP }
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LevelProgress levelInfo={levelInfo} />
        <StreakBadge streak={streak} />
      </div>
      <Card>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

function UnlockableRewards({ levelInfo, streak }) {
  const { isDark } = useTheme()
  const [activeTab, setActiveTab] = useState('level')

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Unlockable Rewards
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('level')}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              activeTab === 'level'
                ? 'bg-primary text-white'
                : isDark
                ? 'text-gray-300 hover:bg-white/5'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Level Rewards
          </button>
          <button
            onClick={() => setActiveTab('streak')}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              activeTab === 'streak'
                ? 'bg-primary text-white'
                : isDark
                ? 'text-gray-300 hover:bg-white/5'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Streak Rewards
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {(activeTab === 'level' ? REWARDS.level : REWARDS.streak).map((reward, index) => {
          const isUnlocked = activeTab === 'level' 
            ? levelInfo.level >= reward.level
            : streak >= reward.streak
          
          return (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg ${
                isUnlocked
                  ? 'bg-primary/10'
                  : isDark
                  ? 'bg-[#0b0c2a]/50'
                  : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{reward.icon}</span>
                <div>
                  <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {reward.reward}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {activeTab === 'level' ? `Level ${reward.level}` : `${reward.streak} Day Streak`}
                  </p>
                </div>
              </div>
              {isUnlocked ? (
                <span className="text-green-500 font-medium">Unlocked</span>
              ) : (
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {activeTab === 'level'
                    ? `${reward.level - levelInfo.level} levels to go`
                    : `${reward.streak - streak} days to go`}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </Card>
  )
}

function ErrorFallback({ error, resetErrorBoundary }) {
  const { isDark } = useTheme()
  return (
    <div role="alert" className="text-center py-8">
      <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Something went wrong
      </h2>
      <pre className={`text-sm mb-4 ${isDark ? 'text-red-400' : 'text-red-600'}`}>{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        Try again
      </button>
    </div>
  )
}

export default function Achievements() {
  const { isDark } = useTheme()
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [achievements, setAchievements] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filterGame, setFilterGame] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [selectedAchievement, setSelectedAchievement] = useState(null)
  const [user] = useState({
    username: "PlayerOne",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PlayerOne",
    notifications: [
      {
        id: 1,
        message: "You've unlocked a new achievement: First Victory!",
        timestamp: "1 hour ago",
        read: false,
        type: "achievement"
      }
    ],
    friendRequests: [
      {
        id: 1,
        username: "GamerPro",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GamerPro",
        mutualFriends: 3
      }
    ]
  })

  useEffect(() => {
    // Simulate loading achievements data
    const loadAchievements = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setAchievements(mockAchievements)
      } catch (error) {
        console.error('Failed to load achievements:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadAchievements()
  }, [])

  // Calculate totalXP from unlocked achievements
  const totalXP = achievements.reduce((sum, a) => sum + (a.progress === 100 ? a.xp : 0), 0)
  
  // Calculate streak (achievements unlocked in the last 7 days)
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  const streak = achievements.filter(a => 
    a.progress === 100 && 
    a.unlockedAt && 
    new Date(a.unlockedAt) > oneWeekAgo
  ).length

  const allGames = [...new Set(achievements.map(a => a.game))]

  const filteredAndSortedAchievements = achievements
    .filter(achievement => {
      const matchesSearch = achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          achievement.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' ||
                            (selectedCategory === 'recent' && achievement.progress === 100) ||
                            (selectedCategory === 'progress' && achievement.progress < 100) ||
                            (selectedCategory === achievement.rarity)
      const matchesGame = filterGame === 'all' || achievement.game === filterGame
      return matchesSearch && matchesCategory && matchesGame
    })
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.unlockedAt || 0) - new Date(a.unlockedAt || 0)
      } else if (sortBy === 'progress') {
        return b.progress - a.progress
      } else if (sortBy === 'xp') {
        return b.xp - a.xp
      } else if (sortBy === 'rarity') {
        const rarityOrder = { 'legendary': 3, 'rare': 2, 'common': 1 }
        return rarityOrder[b.rarity] - rarityOrder[a.rarity]
      }
      return 0
    })

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#070817]' : 'bg-gray-50'}`}>
      <Navbar user={user} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Achievements
        </h1>
        {/* Page header */}
        <div className="mb-8">
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`} tabIndex="0">
            Achievements
          </h1>
          <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`} tabIndex="0">
            Track your progress and unlock rewards
          </p>
        </div>

        {/* Achievement Stats */}
        <div className="mb-8">
          {isLoading ? (
            <CardSkeleton />
          ) : (
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <AchievementStats achievements={achievements} />
            </ErrorBoundary>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="space-y-6">
            <Card>
              <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`} tabIndex="0">
                Filters
              </h2>
              
              {/* Categories */}
              <div className="space-y-2" role="group" aria-label="Achievement categories">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                      selectedCategory === category.id
                        ? 'bg-primary text-white'
                        : isDark
                        ? 'text-gray-300 hover:bg-white/5'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    aria-pressed={selectedCategory === category.id}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </div>

              {/* Game Filter */}
              <div className="mt-6">
                <label 
                  htmlFor="gameFilter" 
                  className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Game
                </label>
                <select
                  id="gameFilter"
                  value={filterGame}
                  onChange={(e) => setFilterGame(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg ${
                    isDark ? 'bg-[#151520] text-white border-[#2a2f45]' : 'bg-gray-50 text-gray-900 border-gray-200'
                  } border focus:outline-none focus:ring-2 focus:ring-primary/50`}
                  aria-label="Filter achievements by game"
                >
                  <option value="all">All Games</option>
                  {allGames.map(game => (
                    <option key={game} value={game}>{game}</option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div className="mt-6">
                <label 
                  htmlFor="sortBy" 
                  className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Sort By
                </label>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg ${
                    isDark ? 'bg-[#151520] text-white border-[#2a2f45]' : 'bg-gray-50 text-gray-900 border-gray-200'
                  } border focus:outline-none focus:ring-2 focus:ring-primary/50`}
                  aria-label="Sort achievements"
                >
                  <option value="recent">Most Recent</option>
                  <option value="progress">Progress</option>
                  <option value="xp">XP Value</option>
                  <option value="rarity">Rarity</option>
                </select>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <UnlockableRewards levelInfo={calculateLevel(totalXP)} streak={streak} />
            </ErrorBoundary>

            <Card>
              {/* Search */}
              <div className="relative mb-6">
                <label htmlFor="searchAchievements" className="sr-only">
                  Search achievements
                </label>
                <input
                  id="searchAchievements"
                  type="text"
                  placeholder="Search achievements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full px-4 py-2 pl-10 rounded-lg ${
                    isDark ? 'bg-[#151520] text-white border-[#2a2f45]' : 'bg-gray-50 text-gray-900 border-gray-200'
                  } border focus:outline-none focus:ring-2 focus:ring-primary/50`}
                  aria-label="Search achievements"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Achievements List */}
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <AchievementSkeleton key={i} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredAndSortedAchievements.map(achievement => (
                      <AchievementCard
                        key={achievement.id}
                        achievement={achievement}
                        onClick={setSelectedAchievement}
                      />
                    ))}
                    {filteredAndSortedAchievements.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`flex flex-col items-center justify-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                        role="status"
                        aria-live="polite"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        <p className="text-center">No achievements found</p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedCategory('all')
                            setFilterGame('all')
                            setSortBy('recent')
                            setSearchQuery('')
                          }}
                          className="mt-4 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                          aria-label="Clear all filters"
                        >
                          Clear Filters
                        </motion.button>
                      </motion.div>
                    )}
                  </div>
                )}
              </AnimatePresence>
            </Card>
          </div>
        </div>
      </main>

      {/* Achievement Details Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <AchievementDetailsModal
            achievement={selectedAchievement}
            onClose={() => setSelectedAchievement(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

                   