import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import WelcomeBanner from './components/WelcomeBanner'
import AchievementsGrid from './components/AchievementsGrid'
import ActivityFeed from './components/ActivityFeed'
import ConnectedGames from './components/ConnectedGames'
import Leaderboard from './components/Leaderboard'
import QuestCard from './components/QuestCard'

// Mock user data - In a real app, this would come from an API
const mockUserData = {
  username: "ProGamer123",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ProGamer123",
  level: 42,
  xp: 8750,
  xpNeeded: 10000,
  rank: "Diamond",
  notifications: [
    { id: 1, type: 'achievement', message: 'You earned the "First Blood" achievement!', timestamp: '1 hour ago', read: false },
    { id: 2, type: 'friend', message: 'Sarah accepted your friend request', timestamp: '2 hours ago', read: false },
    { id: 3, type: 'game', message: 'New quest available in Valorant', timestamp: '3 hours ago', read: true },
  ],
  friendRequests: [
    { id: 1, username: "NinjaWarrior", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NinjaWarrior", mutualFriends: 3 },
    { id: 2, username: "PixelQueen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PixelQueen", mutualFriends: 5 },
  ],
  achievements: [
    { id: 1, title: "First Blood", description: "Win your first match", icon: "🏆", rarity: "common", date: "2024-04-08" },
    { id: 2, title: "Sharpshooter", description: "100 headshots", icon: "🎯", rarity: "rare", date: "2024-04-07" },
    { id: 3, title: "Team Player", description: "Play 50 team matches", icon: "👥", rarity: "uncommon", date: "2024-04-06" },
    { id: 4, title: "Unstoppable", description: "Win 10 matches in a row", icon: "🔥", rarity: "epic", date: "2024-04-05" },
  ],
  friends: [
    { id: 1, username: "Alex", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", action: "earned Diamond Badge", timestamp: "2 hours ago" },
    { id: 2, username: "Sarah", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", action: "won 5 matches in a row", timestamp: "3 hours ago" },
    { id: 3, username: "Mike", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike", action: "reached Level 50", timestamp: "5 hours ago" },
  ],
  connectedGames: [
    { id: 1, name: "Valorant", status: "connected", icon: "🎮" },
    { id: 2, name: "CS:GO", status: "connected", icon: "🎯" },
    { id: 3, name: "League of Legends", status: "pending", icon: "⚔️" },
  ],
  leaderboard: [
    { rank: 1, username: "ProPlayer99", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ProPlayer99", score: 15000 },
    { rank: 2, username: "GameMaster", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GameMaster", score: 14500 },
    { rank: 3, username: "ProGamer123", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ProGamer123", score: 14000 },
    { rank: 4, username: "EliteGamer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=EliteGamer", score: 13500 },
    { rank: 5, username: "LegendaryPlayer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LegendaryPlayer", score: 13000 },
  ],
  dailyQuest: {
    title: "Win 3 Ranked Matches",
    progress: 2,
    total: 3,
    reward: "500 XP",
    expiresIn: "5h 30m",
  }
}

function ThemeSwitcher() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-white/5 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300 hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300 hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  )
}

function NotificationsPanel({ notifications, onClose }) {
  const { isDark } = useTheme()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className={`absolute right-0 mt-2 w-96 ${isDark ? 'bg-[#0b0c2a] border-[#1a1f35]' : 'bg-white border-gray-200'} border rounded-lg shadow-lg py-2`}
    >
      <div className={`px-4 py-2 border-b ${isDark ? 'border-[#1a1f35]' : 'border-gray-200'}`}>
        <div className="flex justify-between items-center">
          <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Notifications</h3>
          <button onClick={onClose} className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className={`text-center py-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No new notifications</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`px-4 py-3 ${!notification.read ? (isDark ? 'bg-primary/5' : 'bg-primary/5') : ''} hover:bg-${isDark ? 'white/5' : 'gray-50'} transition-colors`}
            >
              <div className="flex items-start space-x-3">
                <div className={`mt-1 p-2 rounded-full ${
                  notification.type === 'achievement' ? 'bg-yellow-500/10 text-yellow-500' :
                  notification.type === 'friend' ? 'bg-green-500/10 text-green-500' :
                  'bg-blue-500/10 text-blue-500'
                }`}>
                  {notification.type === 'achievement' ? '🏆' :
                   notification.type === 'friend' ? '👥' : '🎮'}
                </div>
                <div className="flex-1">
                  <p className={isDark ? 'text-white' : 'text-gray-900'}>{notification.message}</p>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-500'} text-sm>{notification.timestamp}</p>
                </div>
                {!notification.read && (
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  )
}

function FriendRequestsPanel({ requests, onClose }) {
  const { isDark } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className={`absolute right-0 mt-2 w-80 ${isDark ? 'bg-[#0b0c2a] border-[#1a1f35]' : 'bg-white border-gray-200'} border rounded-lg shadow-lg py-2`}
    >
      <div className={`px-4 py-2 border-b ${isDark ? 'border-[#1a1f35]' : 'border-gray-200'}`}>
        <div className="flex justify-between items-center">
          <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Friend Requests</h3>
          <button onClick={onClose} className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {requests.length === 0 ? (
          <p className={`text-center py-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No pending friend requests</p>
        ) : (
          requests.map((request) => (
            <div key={request.id} className={`px-4 py-3 hover:bg-${isDark ? 'white/5' : 'gray-50'} transition-colors`}>
              <div className="flex items-center space-x-3">
                <img src={request.avatar} alt={request.username} className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{request.username}</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{request.mutualFriends} mutual friends</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-sm transition-colors">
                    Accept
                  </button>
                  <button className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-full text-sm transition-colors">
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  )
}

function DashboardNav({ user }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [showFriendRequests, setShowFriendRequests] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const { isDark } = useTheme()

  const unreadNotifications = user.notifications.filter(n => !n.read).length

  return (
    <nav className={`${isDark ? 'bg-[#0b0c2a]/95' : 'bg-white/95'} backdrop-blur-sm border-b ${isDark ? 'border-[#1a1f35]' : 'border-gray-200'} sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              DashFriends
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className={`${isDark ? 'text-white' : 'text-gray-900'} hover:text-primary transition-colors`}>Dashboard</Link>
            <Link to="/friends" className={`${isDark ? 'text-gray-300' : 'text-gray-600'} hover:text-primary transition-colors`}>Friends</Link>
            <Link to="/games" className={`${isDark ? 'text-gray-300' : 'text-gray-600'} hover:text-primary transition-colors`}>Games</Link>
            <Link to="/achievements" className={`${isDark ? 'text-gray-300' : 'text-gray-600'} hover:text-primary transition-colors`}>Achievements</Link>
          </div>

          {/* User Profile and Notifications */}
          <div className="flex items-center space-x-4">
            {/* Theme Switcher */}
            <ThemeSwitcher />

            {/* Friend Requests */}
            <div className="relative">
              <button
                onClick={() => setShowFriendRequests(!showFriendRequests)}
                className={`relative p-2 rounded-full hover:bg-${isDark ? 'white/5' : 'gray-100'} transition-colors group`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'} transition-colors`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {user.friendRequests?.length > 0 && (
                  <div className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></div>
                )}
              </button>
              {showFriendRequests && (
                <FriendRequestsPanel
                  requests={user.friendRequests}
                  onClose={() => setShowFriendRequests(false)}
                />
              )}
            </div>

            {/* Notifications Icon */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 rounded-full hover:bg-${isDark ? 'white/5' : 'gray-100'} transition-colors group`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'} transition-colors`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadNotifications > 0 && (
                  <div className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></div>
                )}
              </button>
              {showNotifications && (
                <NotificationsPanel
                  notifications={user.notifications}
                  onClose={() => setShowNotifications(false)}
                />
              )}
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 group"
              >
                <div className="flex items-center space-x-3">
                  <span className={`${isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'} transition-colors`}>{user.username}</span>
                  <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary/30 group-hover:ring-primary/50 transition-all">
                    <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                  </div>
                </div>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={`absolute right-0 mt-2 w-48 ${isDark ? 'bg-[#0b0c2a] border-[#1a1f35]' : 'bg-white border-gray-200'} border rounded-lg shadow-lg py-1`}
                >
                  <Link to="/profile" className={`block px-4 py-2 ${isDark ? 'text-gray-300 hover:bg-primary/10 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} transition-colors`}>
                    Profile Settings
                  </Link>
                  <hr className={`my-1 ${isDark ? 'border-[#1a1f35]' : 'border-gray-200'}`} />
                  <button className={`w-full text-left px-4 py-2 ${isDark ? 'text-gray-300 hover:bg-primary/10 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} transition-colors`}>
                    Sign Out
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default function Dashboard() {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { isDark } = useTheme()

  useEffect(() => {
    // Simulate API call
    const fetchUserData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay
      setUserData(mockUserData)
      setLoading(false)
    }

    fetchUserData()
  }, [])

  if (loading) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-[#070818]' : 'bg-gray-50'} flex items-center justify-center`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={isDark ? 'text-white' : 'text-gray-900'}
        >
          Loading your dashboard...
        </motion.div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#070818] text-white' : 'bg-gray-50 text-gray-900'}`}>
      <DashboardNav user={userData} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Welcome Banner */}
          <WelcomeBanner user={userData} />

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <AchievementsGrid achievements={userData.achievements} />
              <QuestCard quest={userData.dailyQuest} />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <Leaderboard leaderboard={userData.leaderboard} currentUser={userData.username} />
              <ConnectedGames games={userData.connectedGames} />
              <ActivityFeed activities={userData.friends} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 