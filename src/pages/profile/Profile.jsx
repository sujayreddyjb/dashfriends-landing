import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import OptimizedImage from '../../components/OptimizedImage'
import { Card } from '../../components/Card'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import ImageUploadModal from '../../components/ImageUploadModal'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { keyframes } from 'styled-components'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import AvatarFallback from '../../components/AvatarFallback'
import AchievementsTimeline from '../../components/AchievementsTimeline'
import Navbar from '../../components/Navbar'

// Mock user data - In a real app, this would come from your backend
const mockUserData = {
  id: '1',
  username: 'GamerPro',
  email: 'gamer@example.com',
  avatar: 'https://ui-avatars.com/api/?name=GamerPro&background=random',
  banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&h=300',
  bio: 'Passionate gamer and achievement hunter. Love exploring new worlds and competing with friends!',
  location: 'San Francisco, CA',
  favoriteGenre: 'RPG',
  level: 42,
  xp: 8750,
  joinDate: '2024-01-15',
  achievements: {
    total: 157,
    completed: 89,
    rare: 12,
    legendary: 3,
    list: [
      {
        id: 1,
        name: 'Master Strategist',
        description: 'Win 100 matches with strategic gameplay',
        rarity: 'LEGENDARY',
        unlockedAt: '2024-03-15T14:30:00Z',
        game: 'Chess Masters'
      },
      {
        id: 2,
        name: 'Speed Demon',
        description: 'Complete all levels under par time',
        rarity: 'RARE',
        unlockedAt: '2024-03-10T18:20:00Z',
        game: 'Racing Evolution'
      },
      {
        id: 3,
        name: 'Team Player',
        description: 'Play 50 team matches',
        rarity: 'COMMON',
        unlockedAt: '2024-03-05T12:15:00Z',
        game: 'Team Fortress'
      }
    ]
  },
  stats: {
    gamesPlayed: 450,
    totalPlaytime: '1250h',
    winRate: '65%',
    favoriteGame: 'Cyberpunk 2077',
    currentStreak: 7,
    longestStreak: 21
  },
  badges: [
    { id: 1, name: 'Early Adopter', icon: '🌟' },
    { id: 2, name: 'Achievement Hunter', icon: '🎯' },
    { id: 3, name: 'Social Butterfly', icon: '🦋' }
  ],
  recentActivity: [
    {
      id: 1,
      type: 'achievement',
      title: 'Master Strategist',
      game: 'Chess Masters',
      timestamp: '2024-03-15T14:30:00Z'
    },
    {
      id: 2,
      type: 'friend',
      title: 'Added new friend: GameMaster',
      timestamp: '2024-03-14T18:20:00Z'
    }
  ],
  visibility: 'public',
  socialLinks: {
    discord: 'gamerpro#1234',
    twitch: 'gamerpro',
    twitter: '@gamerpro'
  },
  rank: {
    tier: 'Pro',
    level: 'Platinum',
    icon: '🏆',
    rankImage: 'https://example.com/rank-badge.png'
  },
  recentGames: [
    {
      id: 1,
      name: 'Cyberpunk 2077',
      hours: 125,
      lastPlayed: '2024-03-15T14:30:00Z',
      achievementProgress: '45/50',
      image: 'https://example.com/game1.jpg'
    },
    {
      id: 2,
      name: 'Valorant',
      hours: 89,
      lastPlayed: '2024-03-14T18:20:00Z',
      achievementProgress: '32/40',
      image: 'https://example.com/game2.jpg'
    }
  ],
  prestige: {
    legacyXP: 156750,
    prestigeLevel: 3,
    specialFrames: [
      {
        id: 1,
        name: "Season 1 Champion",
        frame: "🏆",
        rarity: "LEGENDARY",
        earnedDate: "2024-01-15",
        event: "Winter Championship 2024"
      },
      {
        id: 2,
        name: "Beta Veteran",
        frame: "⚔️",
        rarity: "RARE",
        earnedDate: "2023-12-01",
        event: "Beta Testing Period"
      }
    ],
    titles: [
      {
        id: 1,
        name: "The Unstoppable",
        icon: "🌟",
        rarity: "LEGENDARY",
        earnedDate: "2024-02-20",
        description: "Won 100 consecutive matches"
      },
      {
        id: 2,
        name: "Strategic Mastermind",
        icon: "🧠",
        rarity: "EPIC",
        earnedDate: "2024-01-10",
        description: "Achieved Grandmaster in Strategy Games"
      }
    ],
    rankedAchievements: [
      {
        gameMode: "Competitive 1v1",
        highestRank: "Diamond",
        icon: "💎",
        season: "Season 3",
        winRate: "68%"
      },
      {
        gameMode: "Team Tactical",
        highestRank: "Platinum",
        icon: "⚡",
        season: "Season 2",
        winRate: "72%"
      }
    ],
    lifetimeBadges: [
      {
        id: 1,
        name: "1000 Wins",
        icon: "🏅",
        tier: "GOLD",
        progress: "1247/1000"
      },
      {
        id: 2,
        name: "Master Strategist",
        icon: "👑",
        tier: "DIAMOND",
        progress: "500/500"
      }
    ]
  }
}

// Mock gameplay stats data
const mockGameplayStats = [
  { month: 'Jan', games: 12, hours: 45 },
  { month: 'Feb', games: 15, hours: 52 },
  { month: 'Mar', games: 18, hours: 65 },
  { month: 'Apr', games: 14, hours: 48 },
  { month: 'May', games: 20, hours: 72 },
  { month: 'Jun', games: 16, hours: 58 },
  { month: 'Jul', games: 22, hours: 78 },
  { month: 'Aug', games: 19, hours: 68 },
  { month: 'Sep', games: 25, hours: 85 },
  { month: 'Oct', games: 21, hours: 75 },
  { month: 'Nov', games: 28, hours: 92 },
  { month: 'Dec', games: 24, hours: 82 }
]

// Add styles for glassmorphism
const glassCard = `backdrop-blur-md bg-opacity-80 border border-opacity-20 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:z-10`

// Add the animation keyframes to your CSS (you'll need to create this file)
const avatarGlowStyle = {
  animation: 'glow 2s ease-in-out infinite'
}

// Skeleton Components
const SkeletonAvatar = () => (
  <div className="h-32 w-32 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
)

const SkeletonText = ({ width = 'full', height = '4' }) => (
  <div
    className={`h-${height} bg-gray-200 dark:bg-gray-700 rounded animate-pulse`}
    style={{ width: width === 'full' ? '100%' : width }}
  />
)

const SkeletonCard = () => (
  <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
    <div className="space-y-4">
      <SkeletonText width="1/3" height="6" />
      <div className="space-y-2">
        <SkeletonText />
        <SkeletonText />
        <SkeletonText width="2/3" />
      </div>
    </div>
  </div>
)

const ProfileSkeleton = () => {
  const { isDark } = useTheme()
  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#070818]' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header Skeleton */}
        <div className="relative mb-8">
          <div className="h-48 w-full rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="absolute -bottom-16 left-8 flex items-end space-x-6">
            <SkeletonAvatar />
            <div className="pb-4">
              <SkeletonText width="1/4" height="8" />
              <div className="mt-2 space-y-2">
                <SkeletonText width="1/2" />
                <SkeletonText width="1/3" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column Skeleton */}
          <div className="space-y-6">
            <SkeletonCard />
            <SkeletonCard />
          </div>

          {/* Middle Column Skeleton */}
          <div className="space-y-6">
            <SkeletonCard />
            <SkeletonCard />
          </div>

          {/* Right Column Skeleton */}
          <div className="space-y-6">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </div>
    </div>
  )
}

const GameplayStatsChart = ({ isDark }) => {
  const chartRef = useRef(null)
  const isInView = useInView(chartRef, { once: true })

  return (
    <motion.div
      ref={chartRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-xl backdrop-blur-md bg-gray-900/90 border border-gray-800/50 shadow-xl`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Gaming Activity</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm text-gray-400">Games</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-gray-400">Hours</span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={mockGameplayStats}
            margin={{ top: 5, right: 10, bottom: 5, left: 0 }}
          >
            <defs>
              <linearGradient id="gameGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="hourGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#2D3748"
              vertical={false}
            />
            
            <XAxis
              dataKey="month"
              stroke="#718096"
              tick={{ fill: '#718096', fontSize: 12 }}
              axisLine={{ stroke: '#2D3748' }}
              tickLine={{ stroke: '#2D3748' }}
            />
            
            <YAxis
              stroke="#718096"
              tick={{ fill: '#718096', fontSize: 12 }}
              axisLine={{ stroke: '#2D3748' }}
              tickLine={{ stroke: '#2D3748' }}
            />
            
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A202C',
                border: '1px solid #2D3748',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              itemStyle={{ color: '#E2E8F0' }}
              labelStyle={{ color: '#A0AEC0' }}
            />

            <Line
              type="monotone"
              dataKey="games"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                fill: '#3B82F6',
                stroke: '#1A202C',
                strokeWidth: 2
              }}
              fillOpacity={1}
              fill="url(#gameGradient)"
            />
            
            <Line
              type="monotone"
              dataKey="hours"
              stroke="#10B981"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                fill: '#10B981',
                stroke: '#1A202C',
                strokeWidth: 2
              }}
              fillOpacity={1}
              fill="url(#hourGradient)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
          <div className="text-sm text-gray-400">Monthly Average</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">
              {Math.round(mockGameplayStats.reduce((acc, curr) => acc + curr.games, 0) / mockGameplayStats.length)}
            </span>
            <span className="text-sm text-gray-400">games</span>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
          <div className="text-sm text-gray-400">Peak Month</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">
              {Math.max(...mockGameplayStats.map(stat => stat.games))}
            </span>
            <span className="text-sm text-gray-400">games</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Add mock friends data
const mockFriends = [
  {
    id: 1,
    username: 'GameMaster',
    avatar: 'https://ui-avatars.com/api/?name=GameMaster&background=random',
    level: 39,
    mutual: true,
    isOnline: true,
    joinedDate: '2024-02-15',
    gamesCount: 300,
    recentGames: ['Chess Masters', 'Racing Evolution'],
    specialties: ['Strategy', 'RPG'],
    achievements: {
      total: 145,
      rare: 8,
      legendary: 2
    },
    recentActivity: [
      { type: 'achievement', game: 'Chess Masters', action: 'Unlocked Master Strategist', timestamp: '2024-03-15T14:30:00Z' },
      { type: 'game', game: 'Racing Evolution', action: 'Started playing', timestamp: '2024-03-14T18:20:00Z' }
    ]
  },
  {
    id: 2,
    username: 'PixelMage',
    avatar: 'https://ui-avatars.com/api/?name=PixelMage&background=random',
    level: 45,
    mutual: true,
    isOnline: false,
    joinedDate: '2024-01-20',
    gamesCount: 250,
    recentGames: ['Final Fantasy XIV', 'Elden Ring'],
    specialties: ['RPG', 'Magic'],
    achievements: {
      total: 178,
      rare: 12,
      legendary: 4
    },
    recentActivity: [
      { type: 'achievement', game: 'Elden Ring', action: 'Completed No-Death Run', timestamp: '2024-03-14T20:30:00Z' },
      { type: 'game', game: 'Final Fantasy XIV', action: 'Reached max level', timestamp: '2024-03-13T15:45:00Z' }
    ]
  }
]

// Activity type icons mapping
const activityIcons = {
  achievement: '🏆',
  friend: '👥',
  level: '⭐',
  game: '🎮',
  rank: '📈',
  tournament: '🏅',
  quest: '🗺️',
  strategy: '🧠'
}

// Add animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const buttonHover = {
  scale: 1.05,
  transition: { type: 'spring', stiffness: 400, damping: 10 }
}

const buttonTap = {
  scale: 0.95,
  transition: { type: 'spring', stiffness: 400, damping: 10 }
}

const avatarHover = {
  scale: 1.05,
  boxShadow: '0 0 20px rgba(79, 70, 229, 0.4)',
  transition: { type: 'spring', stiffness: 400, damping: 10 }
}

// Add animation variants for cards
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

// Add hover animation for badges
const badgeHoverVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
}

// Add the Prestige Panel component
const PrestigePanel = ({ prestige, isDark }) => {
  const panelRef = useRef(null)
  const isInView = useInView(panelRef, { once: true })

  return (
    <motion.div
      ref={panelRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      className={`p-6 rounded-xl backdrop-blur-xl bg-gradient-to-br from-gray-900/90 via-gray-900/95 to-gray-900/90 border border-gray-800/50 shadow-2xl`}
    >
      <div className="space-y-8">
        {/* Legacy XP and Prestige Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-yellow-400">Legacy XP</h3>
              <div className="text-2xl font-bold text-yellow-400">
                {prestige.legacyXP.toLocaleString()}
              </div>
            </div>
            <div className="relative h-2 rounded-full overflow-hidden bg-yellow-500/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-400 to-yellow-600"
              />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-400">Prestige Level</h3>
              <div className="text-2xl font-bold text-blue-400">
                {prestige.prestigeLevel}
              </div>
            </div>
            <div className="relative h-2 rounded-full overflow-hidden bg-blue-500/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-400 to-blue-600"
              />
            </div>
          </motion.div>
        </div>

        {/* Special Frames */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Special Frames</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prestige.specialFrames.map((frame) => (
              <motion.div
                key={frame.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl ${
                  frame.rarity === 'LEGENDARY'
                    ? 'bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20'
                    : 'bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${
                    frame.rarity === 'LEGENDARY'
                      ? 'bg-gradient-to-br from-purple-500/20 to-purple-600/20'
                      : 'bg-gradient-to-br from-blue-500/20 to-blue-600/20'
                  }`}>
                    <span className="text-2xl">{frame.frame}</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">{frame.name}</div>
                    <div className="text-sm text-gray-400">{frame.event}</div>
                    <div className={`text-xs mt-1 px-2 py-0.5 rounded-full inline-block ${
                      frame.rarity === 'LEGENDARY'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {frame.rarity}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Earned Titles */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Earned Titles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prestige.titles.map((title) => (
              <motion.div
                key={title.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl ${
                  title.rarity === 'LEGENDARY'
                    ? 'bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20'
                    : 'bg-gradient-to-br from-gray-500/10 to-gray-600/5 border border-gray-500/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${
                    title.rarity === 'LEGENDARY'
                      ? 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/20'
                      : 'bg-gradient-to-br from-gray-500/20 to-gray-600/20'
                  }`}>
                    <span className="text-2xl">{title.icon}</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">{title.name}</div>
                    <div className="text-sm text-gray-400">{title.description}</div>
                    <div className={`text-xs mt-1 px-2 py-0.5 rounded-full inline-block ${
                      title.rarity === 'LEGENDARY'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {title.rarity}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ranked Achievements */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Ranked Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prestige.rankedAchievements.map((rank, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20">
                      <span className="text-xl">{rank.icon}</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">{rank.gameMode}</div>
                      <div className="text-sm text-gray-400">{rank.season}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-400">{rank.highestRank}</div>
                    <div className="text-sm text-green-400">{rank.winRate} Win Rate</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lifetime Badges */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Lifetime Badges</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prestige.lifetimeBadges.map((badge) => (
              <motion.div
                key={badge.id}
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${
                    badge.tier === 'DIAMOND'
                      ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/20'
                      : 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/20'
                  }`}>
                    <span className="text-2xl">{badge.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">{badge.name}</div>
                    <div className="mt-2">
                      <div className="relative h-2 rounded-full overflow-hidden bg-gray-700">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className={`absolute inset-y-0 left-0 ${
                            badge.tier === 'DIAMOND'
                              ? 'bg-gradient-to-r from-blue-400 to-blue-600'
                              : 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                          }`}
                        />
                      </div>
                      <div className="text-xs text-gray-400 mt-1">{badge.progress}</div>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${
                    badge.tier === 'DIAMOND'
                      ? 'text-blue-400'
                      : 'text-yellow-400'
                  }`}>
                    {badge.tier}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Add new styles for the dashboard header
const dashboardHeaderStyles = {
  wrapper: `relative h-48 mb-20`,
  bannerOverlay: `absolute inset-0 backdrop-blur-sm bg-gradient-to-b from-black/30 via-black/50 to-black/80`,
  contentWrapper: `absolute bottom-0 translate-y-1/2 w-full`,
  innerContent: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`,
  profileCard: `bg-gray-900/90 backdrop-blur-xl border border-gray-800/50 rounded-xl shadow-2xl p-6`,
  avatarWrapper: `relative -mt-16 flex items-center gap-6`,
  badgeWrapper: `flex items-center gap-2 text-sm`,
}

// Add new styles for stat cards
const statCardStyles = {
  wrapper: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8`,
  card: `p-6 rounded-xl backdrop-blur-md bg-gray-900/90 border border-gray-800/50 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:z-10`,
  iconWrapper: `p-3 rounded-full bg-gradient-to-br mb-3`,
  metric: `text-3xl font-bold text-white mb-1`,
  label: `text-sm text-gray-400`,
}

// Add new styles for achievements
const achievementStyles = {
  wrapper: `p-6 rounded-xl backdrop-blur-md bg-gray-900/90 border border-gray-800/50 shadow-xl`,
  header: `flex items-center justify-between mb-6`,
  filterChips: `flex gap-2 flex-wrap`,
  progressSection: `grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8`,
  historyWrapper: `space-y-4`,
  unlockCard: `p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800/80 transition-all duration-300`,
}

export default function Profile() {
  const { isDark } = useTheme()
  const [user] = useState({
    username: "GamerPro",
    title: "Pro Platinum",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GamerPro",
    notifications: [
      { id: 1, type: 'achievement', message: 'You earned the "Master Strategist" achievement!', timestamp: '1 hour ago', read: false },
      { id: 2, type: 'friend', message: 'GameMaster accepted your friend request', timestamp: '2 hours ago', read: false }
    ],
    friendRequests: [
      { id: 1, username: "NinjaWarrior", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NinjaWarrior", mutualFriends: 3 },
      { id: 2, username: "PixelQueen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PixelQueen", mutualFriends: 5 }
    ],
    stats: {
      gamesPlayed: 450,
      totalPlaytime: "1250h",
      winRate: "65%",
      dayStreak: 7
    },
    badges: [
      { id: 1, name: "Early Adapter", icon: "⭐" },
      { id: 2, name: "Achievement Hunter", icon: "🎯" },
      { id: 3, name: "Social Butterfly", icon: "🦋" }
    ],
    achievements: {
      total: 89,
      total_possible: 157,
      recent: {
        id: 1,
        name: "Master Strategist",
        description: "Win 100 matches",
        date: "15/03/2024",
        rarity: "LEGENDARY"
      }
    },
    level: {
      current: 42,
      xp: 8760,
      nextLevel: 43
    }
  })

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#070817]' : 'bg-gray-50'}`}>
      <Navbar user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-24 h-24 rounded-full"
            />
            <div className="absolute -bottom-2 -right-2 bg-[#1a1b3a] text-white px-2 py-1 rounded-lg text-xs">
              Pro Platinum
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-white">{user.username}</h1>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-lg">ONLINE</span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-sm text-gray-400">83% Win Rate</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-400">Level 42</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className={`${isDark ? 'bg-[#1a1b3a]/50' : 'bg-white'} rounded-xl p-4`}>
            <div className="flex items-center justify-between">
              <span className="text-blue-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </span>
              <span className="text-2xl font-bold text-white">{user.stats.gamesPlayed}</span>
            </div>
            <p className="text-sm text-gray-400 mt-2">Games Played</p>
          </div>

          <div className={`${isDark ? 'bg-[#1a1b3a]/50' : 'bg-white'} rounded-xl p-4`}>
            <div className="flex items-center justify-between">
              <span className="text-green-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <span className="text-2xl font-bold text-white">{user.stats.totalPlaytime}</span>
            </div>
            <p className="text-sm text-gray-400 mt-2">Total Playtime</p>
          </div>

          <div className={`${isDark ? 'bg-[#1a1b3a]/50' : 'bg-white'} rounded-xl p-4`}>
            <div className="flex items-center justify-between">
              <span className="text-yellow-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </span>
              <span className="text-2xl font-bold text-white">{user.stats.winRate}</span>
            </div>
            <p className="text-sm text-gray-400 mt-2">Win Rate</p>
          </div>

          <div className={`${isDark ? 'bg-[#1a1b3a]/50' : 'bg-white'} rounded-xl p-4`}>
            <div className="flex items-center justify-between">
              <span className="text-purple-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              <span className="text-2xl font-bold text-white">{user.stats.dayStreak}</span>
            </div>
            <p className="text-sm text-gray-400 mt-2">Day Streak</p>
          </div>
        </div>

        {/* Badges */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Badges</h2>
          <div className="flex space-x-4">
            {user.badges.map(badge => (
              <div key={badge.id} className="bg-[#1a1b3a]/50 rounded-xl p-4 flex items-center space-x-2">
                <span className="text-2xl">{badge.icon}</span>
                <span className="text-sm text-white">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics and Level Progress */}
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-[#1a1b3a]/50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Statistics</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Games Played</span>
                  <span className="text-white">{user.stats.gamesPlayed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Playtime</span>
                  <span className="text-white">{user.stats.totalPlaytime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Win Rate</span>
                  <span className="text-white">{user.stats.winRate}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1b3a]/50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Gaming Activity</h2>
              {/* Add your activity chart here */}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-[#1a1b3a]/50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Achievements</h2>
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <svg className="w-32 h-32" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#444"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="3"
                      strokeDasharray={`${(user.achievements.total / user.achievements.total_possible) * 100}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{user.achievements.total}</div>
                      <div className="text-sm text-gray-400">/{user.achievements.total_possible}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#0b0c2a] rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-500/20 p-2 rounded-lg">
                    <span className="text-yellow-500 text-xl">🏆</span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{user.achievements.recent.name}</h3>
                    <p className="text-gray-400 text-sm">{user.achievements.recent.date}</p>
                  </div>
                  <span className="ml-auto text-xs text-yellow-400">{user.achievements.recent.rarity}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1b3a]/50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Level Progress</h2>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white">Level {user.level.current}</span>
                  <span className="text-gray-400">{user.level.xp} XP</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(user.level.xp / 10000) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  {10000 - user.level.xp} XP until Level {user.level.nextLevel}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 