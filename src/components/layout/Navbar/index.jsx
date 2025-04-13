import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { BellIcon, UserGroupIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';

/**
 * Main navigation component with user profile, notifications, and theme toggle
 * @param {Object} props
 * @param {Object} props.user - User data including avatar, username, notifications, and friend requests
 */
export function Navbar({ user }) {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    window.location.href = '/signin';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'bg-[#1a1b3a]' : 'bg-white'} shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              DashFriends
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/dashboard"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/dashboard'
                  ? 'bg-primary text-white'
                  : isDark
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/friends"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/friends'
                  ? 'bg-primary text-white'
                  : isDark
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Friends
            </Link>
            <Link
              to="/achievements"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/achievements'
                  ? 'bg-primary text-white'
                  : isDark
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Achievements
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              {isDark ? (
                <SunIcon className="w-5 h-5 text-gray-300" />
              ) : (
                <MoonIcon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowFriendRequests(false);
                  setShowProfileMenu(false);
                }}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
              >
                <BellIcon className={`w-5 h-5 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`} />
                {user.notifications.length > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" />
                )}
              </button>
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg ${
                      isDark ? 'bg-gray-800' : 'bg-white'
                    } ring-1 ring-black ring-opacity-5`}
                  >
                    {/* Notification content */}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Friend Requests */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowFriendRequests(!showFriendRequests);
                  setShowNotifications(false);
                  setShowProfileMenu(false);
                }}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
              >
                <UserGroupIcon className={`w-5 h-5 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`} />
                {user.friendRequests.length > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" />
                )}
              </button>
              <AnimatePresence>
                {showFriendRequests && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg ${
                      isDark ? 'bg-gray-800' : 'bg-white'
                    } ring-1 ring-black ring-opacity-5`}
                  >
                    {/* Friend requests content */}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                  setShowFriendRequests(false);
                }}
                className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
              >
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-8 h-8 rounded-full"
                />
                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {user.username}
                </span>
              </button>
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${
                      isDark ? 'bg-gray-800' : 'bg-white'
                    } ring-1 ring-black ring-opacity-5`}
                  >
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className={`block px-4 py-2 text-sm ${
                          isDark
                            ? 'text-gray-300 hover:bg-gray-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setShowProfileMenu(false)}
                      >
                        View Profile
                      </Link>
                      <Link
                        to="/profile/settings"
                        className={`block px-4 py-2 text-sm ${
                          isDark
                            ? 'text-gray-300 hover:bg-gray-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          isDark
                            ? 'text-red-400 hover:bg-gray-700'
                            : 'text-red-600 hover:bg-gray-100'
                        }`}
                      >
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 