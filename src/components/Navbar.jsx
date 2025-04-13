import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BellIcon, UserGroupIcon, XMarkIcon } from '@heroicons/react/24/outline/index.js'
import { useTheme } from '../contexts/ThemeContext'

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

export default function Navbar({ user }) {
  const { isDark, toggleTheme } = useTheme()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showFriendRequests, setShowFriendRequests] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Friends', path: '/friends' },
    { name: 'Achievements', path: '/achievements' }
  ]

  const isActivePath = (path) => {
    return location.pathname === path
  }

  const handleSignOut = () => {
    // Clear user session
    localStorage.removeItem('user')
    // Redirect to login page
    navigate('/login')
  }

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
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActivePath(link.path)
                    ? 'bg-primary text-white'
                    : isDark
                    ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* User Profile and Notifications */}
          <div className="flex items-center space-x-4">
            {/* Theme Switcher */}
            <ThemeSwitcher />

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications)
                  setShowFriendRequests(false)
                  setShowProfileMenu(false)
                }}
                className={`p-2 rounded-full ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <BellIcon className="h-6 w-6" />
                {user.notifications.some(n => !n.read) && (
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <NotificationsPanel
                    notifications={user.notifications}
                    onClose={() => setShowNotifications(false)}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Friend Requests */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowFriendRequests(!showFriendRequests)
                  setShowNotifications(false)
                  setShowProfileMenu(false)
                }}
                className={`p-2 rounded-full ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <UserGroupIcon className="h-6 w-6" />
                {user.friendRequests.length > 0 && (
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
                )}
              </button>

              <AnimatePresence>
                {showFriendRequests && (
                  <FriendRequestsPanel
                    requests={user.friendRequests}
                    onClose={() => setShowFriendRequests(false)}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu)
                  setShowNotifications(false)
                  setShowFriendRequests(false)
                }}
                className="flex items-center space-x-2 group"
              >
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-8 h-8 rounded-full ring-2 ring-primary/30 group-hover:ring-primary/50 transition-all"
                />
                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {user.username}
                </span>
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${
                      isDark ? 'bg-[#1a1b3a]' : 'bg-white'
                    } ring-1 ring-black ring-opacity-5 py-1`}
                  >
                    <Link
                      to="/profile"
                      className={`block px-4 py-2 text-sm ${
                        isDark
                          ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                      onClick={() => setShowProfileMenu(false)}
                    >
                      View Profile
                    </Link>
                    <Link
                      to="/profile/settings"
                      className={`block px-4 py-2 text-sm ${
                        isDark
                          ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Profile Settings
                    </Link>
                    <hr className={`my-1 ${isDark ? 'border-gray-800' : 'border-gray-200'}`} />
                    <button
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        isDark
                          ? 'text-red-400 hover:bg-gray-800 hover:text-red-300'
                          : 'text-red-600 hover:bg-gray-100 hover:text-red-700'
                      }`}
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}