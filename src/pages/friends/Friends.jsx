import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import { Tooltip } from 'react-tooltip'
import confetti from 'canvas-confetti'
import { toast } from 'react-hot-toast'

// Game icons mapping
const gameIcons = {
  "Valorant": "🎯",
  "CS:GO": "🔫",
  "League of Legends": "⚔️",
  "Fortnite": "🎮",
  "Minecraft": "⛏️",
  "Apex Legends": "🎯",
  "Dota 2": "⚔️",
  "Overwatch": "🎮"
}

// Game colors mapping
const gameColors = {
  "Valorant": "bg-red-500/20 text-red-400",
  "CS:GO": "bg-orange-500/20 text-orange-400",
  "League of Legends": "bg-blue-500/20 text-blue-400",
  "Fortnite": "bg-purple-500/20 text-purple-400",
  "Minecraft": "bg-green-500/20 text-green-400",
  "Apex Legends": "bg-red-500/20 text-red-400",
  "Dota 2": "bg-blue-500/20 text-blue-400",
  "Overwatch": "bg-orange-500/20 text-orange-400"
}

// Friend groups
const friendGroups = [
  { id: 'all', name: 'All Friends' },
  { id: 'favorites', name: 'Favorites' },
  { id: 'valorant', name: 'Valorant Squad' },
  { id: 'csgo', name: 'CS:GO Team' },
  { id: 'minecraft', name: 'Minecraft Builders' }
]

// Mock data - In a real app, this would come from an API
const mockFriends = [
  { 
    id: 1, 
    username: "Alex", 
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", 
    status: "online", 
    lastSeen: "Now", 
    games: ["Valorant", "CS:GO"],
    groups: ['favorites', 'valorant', 'csgo'],
    level: 42,
    rank: "Diamond"
  },
  { 
    id: 2, 
    username: "Sarah", 
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", 
    status: "online", 
    lastSeen: "Now", 
    games: ["League of Legends", "Valorant"],
    groups: ['valorant'],
    level: 35,
    rank: "Platinum"
  },
  { id: 3, username: "Mike", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike", status: "offline", lastSeen: "2 hours ago", games: ["Valorant"] },
  { id: 4, username: "Emma", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma", status: "idle", lastSeen: "10 minutes ago", games: ["CS:GO", "Valorant"] },
]

const mockFriendRequests = [
  { id: 1, username: "NinjaWarrior", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NinjaWarrior", mutualFriends: 3, mutuals: ["Alex", "Sarah", "Mike"] },
  { id: 2, username: "PixelQueen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PixelQueen", mutualFriends: 5, mutuals: ["Emma", "Alex", "Sarah", "Mike", "John"] },
]

const mockSuggestions = [
  { id: 1, username: "GameMaster", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GameMaster", mutualFriends: 8, mutuals: ["Alex", "Sarah", "Mike", "Emma", "John", "Jane", "Bob", "Alice"] },
  { id: 2, username: "ProPlayer99", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ProPlayer99", mutualFriends: 4, mutuals: ["Alex", "Sarah", "Mike", "Emma"] },
  { id: 3, username: "LegendaryGamer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LegendaryGamer", mutualFriends: 6, mutuals: ["Alex", "Sarah", "Mike", "Emma", "John", "Jane"] },
]

function StatusRing({ status }) {
  const ringColors = {
    online: "ring-green-500 animate-pulse",
    idle: "ring-yellow-500 animate-pulse",
    offline: "ring-gray-500"
  }

  return (
    <div className={`absolute -inset-1 rounded-full ring-2 ${ringColors[status]} transition-all duration-300`} />
  )
}

function GameTag({ game }) {
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full flex items-center space-x-1 ${gameColors[game] || 'bg-gray-500/20 text-gray-400'}`}>
      <span>{gameIcons[game] || '🎮'}</span>
      <span>{game}</span>
    </span>
  )
}

function MutualFriendsTooltip({ mutuals }) {
  const { isDark } = useTheme()
  
  return (
    <div className={`p-3 rounded-lg ${isDark ? 'bg-[#1a1f35] text-white' : 'bg-white text-gray-900'} shadow-xl`}>
      <h4 className="font-medium mb-2">Mutual Friends</h4>
      <div className="flex flex-col space-y-2">
        {mutuals.map((friend, index) => (
          <div key={index} className="flex items-center space-x-2">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${friend}`}
              alt={friend}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm">{friend}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function QuickActions({ friend, onRemove, onAddToFavorites, isFavorite }) {
  const { isDark } = useTheme()
  const [showActions, setShowActions] = useState(false)

  return (
    <div className="relative">
      <motion.button
        onClick={() => setShowActions(!showActions)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`p-2 rounded-lg ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'} transition-colors`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} viewBox="0 0 20 20" fill="currentColor">
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      </motion.button>

      {showActions && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${
            isDark ? 'bg-[#1a1f35] border border-[#2a2f45]' : 'bg-white border border-gray-200'
          } py-1 z-10`}
        >
          <button
            onClick={() => {
              onAddToFavorites(friend.id)
              setShowActions(false)
            }}
            className={`w-full text-left px-4 py-2 text-sm ${
              isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'
            } transition-colors flex items-center space-x-2`}
          >
            <span>{isFavorite ? '⭐' : '☆'}</span>
            <span>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
          </button>
          <button
            onClick={() => {
              window.open(`/message/${friend.username}`, '_blank')
              setShowActions(false)
            }}
            className={`w-full text-left px-4 py-2 text-sm ${
              isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'
            } transition-colors flex items-center space-x-2`}
          >
            <span>💬</span>
            <span>Send Message</span>
          </button>
          <button
            onClick={() => {
              onRemove(friend.id)
              setShowActions(false)
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors flex items-center space-x-2"
          >
            <span>🚫</span>
            <span>Remove Friend</span>
          </button>
        </motion.div>
      )}
    </div>
  )
}

function FriendCard({ friend, onRemove, onAddToFavorites, isFavorite }) {
  const { isDark } = useTheme()
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`${isDark ? 'bg-[#0b0c2a]/50' : 'bg-gray-50'} rounded-xl p-4 backdrop-blur-sm`}
    >
      <div className="flex items-start space-x-4">
        <div className="relative">
          <img
            src={friend.avatar}
            alt={friend.username}
            className="w-12 h-12 rounded-full"
            data-tooltip-id={`status-${friend.id}`}
          />
          <StatusRing status={friend.status} />
          <Tooltip
            id={`status-${friend.id}`}
            place="top"
            content={friend.status === 'online' ? 'Online now' : `Last seen ${friend.lastSeen}`}
            className={isDark ? '!bg-[#1a1f35] !text-white' : '!bg-white !text-gray-900'}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {friend.username}
            </h3>
            {friend.level && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                Lvl {friend.level}
              </span>
            )}
            {friend.rank && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                {friend.rank}
              </span>
            )}
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {friend.status === 'online' ? 'Online' : `Last seen ${friend.lastSeen}`}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {friend.games.map((game) => (
              <GameTag key={game} game={game} />
            ))}
          </div>
        </div>
        <QuickActions
          friend={friend}
          onRemove={onRemove}
          onAddToFavorites={onAddToFavorites}
          isFavorite={isFavorite}
        />
      </div>
    </motion.div>
  )
}

function FriendRequest({ request, onAccept, onDecline }) {
  const { isDark } = useTheme()
  const [isAccepting, setIsAccepting] = useState(false)
  const [isDeclining, setIsDeclining] = useState(false)

  const handleAccept = async () => {
    setIsAccepting(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    onAccept(request.id)
    toast.success(`${request.username} added to friends!`)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  const handleDecline = async () => {
    setIsDeclining(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    onDecline(request.id)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={`${isDark ? 'bg-[#0b0c2a]/50' : 'bg-gray-50'} rounded-xl p-4 backdrop-blur-sm`}
    >
      <div className="flex items-center space-x-4">
        <img src={request.avatar} alt={request.username} className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{request.username}</h3>
          <div
            className="text-sm cursor-pointer hover:underline"
            data-tooltip-id={`mutuals-${request.id}`}
          >
            {request.mutualFriends} mutual friends
          </div>
          <Tooltip
            id={`mutuals-${request.id}`}
            place="bottom"
            content={<MutualFriendsTooltip mutuals={request.mutuals} />}
            className="!p-0"
          />
        </div>
        <div className="flex space-x-2">
          <motion.button
            onClick={handleAccept}
            disabled={isAccepting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-sm transition-colors disabled:opacity-50"
          >
            {isAccepting ? 'Accepting...' : 'Accept'}
          </motion.button>
          <motion.button
            onClick={handleDecline}
            disabled={isDeclining}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-full text-sm transition-colors disabled:opacity-50"
          >
            {isDeclining ? 'Declining...' : 'Decline'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

function FriendSuggestion({ suggestion, onAdd }) {
  const { isDark } = useTheme()
  const [isAdding, setIsAdding] = useState(false)

  const handleAdd = async () => {
    setIsAdding(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    onAdd(suggestion.id)
    toast.success(`Friend request sent to ${suggestion.username}!`)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`${isDark ? 'bg-[#0b0c2a]/50' : 'bg-gray-50'} rounded-xl p-4 backdrop-blur-sm`}
    >
      <div className="flex items-center space-x-4">
        <img src={suggestion.avatar} alt={suggestion.username} className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{suggestion.username}</h3>
          <div
            className="text-sm cursor-pointer hover:underline"
            data-tooltip-id={`mutuals-${suggestion.id}`}
          >
            {suggestion.mutualFriends} mutual friends
          </div>
          <Tooltip
            id={`mutuals-${suggestion.id}`}
            place="bottom"
            content={<MutualFriendsTooltip mutuals={suggestion.mutuals} />}
            className="!p-0"
          />
        </div>
        <motion.button
          onClick={handleAdd}
          disabled={isAdding}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-1 rounded-full text-sm transition-all ${
            isAdding
              ? 'bg-green-500/20 text-green-500'
              : 'bg-primary/10 hover:bg-primary/20 text-primary'
          }`}
        >
          {isAdding ? 'Added ✓' : 'Add Friend'}
        </motion.button>
      </div>
    </motion.div>
  )
}

function AddFriendModal({ isOpen, onClose }) {
  const { isDark } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (searchQuery.length >= 3) {
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        setSearchResults([
          { id: 1, username: "GameMaster", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GameMaster" },
          { id: 2, username: "ProPlayer99", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ProPlayer99" }
        ])
        setIsLoading(false)
      }, 1000)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className={`w-full max-w-md rounded-2xl ${
          isDark ? 'bg-[#0b0c2a] border border-[#1a1f35]' : 'bg-white'
        } p-6 shadow-xl`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Add New Friend
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'} transition-colors`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search by username or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg ${
              isDark
                ? 'bg-[#1a1f35]/50 text-white placeholder-gray-500'
                : 'bg-gray-50 text-gray-900 placeholder-gray-400'
            } focus:outline-none focus:ring-2 focus:ring-primary/50`}
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent"></div>
            </div>
          )}
        </div>

        <div className="space-y-4 max-h-60 overflow-y-auto">
          {searchResults.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center justify-between p-3 rounded-lg ${
                isDark ? 'bg-[#1a1f35]/50' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full" />
                <span className={isDark ? 'text-white' : 'text-gray-900'}>{user.username}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  toast.success(`Friend request sent to ${user.username}!`)
                  onClose()
                }}
                className="px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-sm transition-colors"
              >
                Add Friend
              </motion.button>
            </motion.div>
          ))}
          {searchQuery.length >= 3 && searchResults.length === 0 && !isLoading && (
            <p className={`text-center py-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              No users found
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Friends() {
  const { isDark } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [friends, setFriends] = useState(mockFriends)
  const [friendRequests, setFriendRequests] = useState(mockFriendRequests)
  const [suggestions, setSuggestions] = useState(mockSuggestions)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterGame, setFilterGame] = useState('all')
  const [filterGroup, setFilterGroup] = useState('all')
  const [sortBy, setSortBy] = useState('status')
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [favorites, setFavorites] = useState(new Set(['1'])) // Mock initial favorite

  const handleAcceptRequest = (requestId) => {
    setFriendRequests(requests => requests.filter(r => r.id !== requestId))
  }

  const handleDeclineRequest = (requestId) => {
    setFriendRequests(requests => requests.filter(r => r.id !== requestId))
  }

  const handleAddFriend = (suggestionId) => {
    setSuggestions(suggestions => suggestions.filter(s => s.id !== suggestionId))
  }

  const handleRemoveFriend = (friendId) => {
    setFriends(friends => friends.filter(f => f.id !== friendId))
    toast.success('Friend removed successfully')
  }

  const handleToggleFavorite = (friendId) => {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(String(friendId))) {
        next.delete(String(friendId))
        toast.success('Removed from favorites')
      } else {
        next.add(String(friendId))
        toast.success('Added to favorites')
      }
      return next
    })
  }

  const filteredAndSortedFriends = friends
    .filter(friend => {
      const matchesSearch = friend.username.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = filterStatus === 'all' || friend.status === filterStatus
      const matchesGame = filterGame === 'all' || friend.games.includes(filterGame)
      const matchesGroup = filterGroup === 'all' || 
        (filterGroup === 'favorites' ? favorites.has(String(friend.id)) : friend.groups?.includes(filterGroup))
      return matchesSearch && matchesStatus && matchesGame && matchesGroup
    })
    .sort((a, b) => {
      if (sortBy === 'status') {
        return a.status === 'online' ? -1 : 1
      } else if (sortBy === 'name') {
        return a.username.localeCompare(b.username)
      } else if (sortBy === 'level') {
        return (b.level || 0) - (a.level || 0)
      }
      return 0
    })

  const allGames = [...new Set(friends.flatMap(f => f.games))]

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#070818]' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Friends</h1>
          <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your friends and connections
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Friends List */}
          <div className="lg:col-span-2 space-y-6">
            <div className={`${isDark ? 'bg-[#1a1f35]/50' : 'bg-white'} rounded-2xl p-6 backdrop-blur-sm border ${isDark ? 'border-[#2a2f45]' : 'border-gray-200'}`}>
              <div className="flex flex-col space-y-6">
                {/* Header and Add Friend Button */}
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Friends</h2>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {friends.length} total friends
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddFriend(true)}
                    className="px-4 py-2 bg-primary text-white rounded-lg 
                    transition-colors flex items-center space-x-2 hover:bg-primary/90"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    <span>Add Friend</span>
                  </motion.button>
                </div>

                {/* Friend Groups */}
                <div className="flex flex-wrap gap-2">
                  {friendGroups.map((group) => (
                    <motion.button
                      key={group.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFilterGroup(group.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        filterGroup === group.id
                          ? 'bg-primary text-white'
                          : isDark
                          ? 'bg-white/5 text-gray-300 hover:bg-white/10'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {group.name}
                    </motion.button>
                  ))}
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className={`px-3 py-2 rounded-lg ${
                      isDark ? 'bg-[#0b0c2a]/50 text-white border-[#2a2f45]' : 'bg-gray-50 text-gray-900 border-gray-200'
                    } border focus:outline-none focus:ring-2 focus:ring-primary/50`}
                  >
                    <option value="all">All Status</option>
                    <option value="online">Online</option>
                    <option value="idle">Idle</option>
                    <option value="offline">Offline</option>
                  </select>
                  <select
                    value={filterGame}
                    onChange={(e) => setFilterGame(e.target.value)}
                    className={`px-3 py-2 rounded-lg ${
                      isDark ? 'bg-[#0b0c2a]/50 text-white border-[#2a2f45]' : 'bg-gray-50 text-gray-900 border-gray-200'
                    } border focus:outline-none focus:ring-2 focus:ring-primary/50`}
                  >
                    <option value="all">All Games</option>
                    {allGames.map(game => (
                      <option key={game} value={game}>{game}</option>
                    ))}
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`px-3 py-2 rounded-lg ${
                      isDark ? 'bg-[#0b0c2a]/50 text-white border-[#2a2f45]' : 'bg-gray-50 text-gray-900 border-gray-200'
                    } border focus:outline-none focus:ring-2 focus:ring-primary/50`}
                  >
                    <option value="status">Sort by Status</option>
                    <option value="name">Sort by Name</option>
                    <option value="level">Sort by Level</option>
                  </select>
                </div>

                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search friends..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg ${
                      isDark ? 'bg-[#0b0c2a]/50 text-white border-[#2a2f45]' : 'bg-gray-50 text-gray-900 border-gray-200'
                    } border focus:outline-none focus:ring-2 focus:ring-primary/50`}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Friends List */}
              <AnimatePresence>
                <div className="space-y-4 mt-6">
                  {filteredAndSortedFriends.map(friend => (
                    <FriendCard
                      key={friend.id}
                      friend={friend}
                      onRemove={handleRemoveFriend}
                      onAddToFavorites={handleToggleFavorite}
                      isFavorite={favorites.has(String(friend.id))}
                    />
                  ))}
                  {filteredAndSortedFriends.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`flex flex-col items-center justify-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <p className="text-center">No friends found matching your filters</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setFilterStatus('all')
                          setFilterGame('all')
                          setFilterGroup('all')
                          setSearchQuery('')
                        }}
                        className="mt-4 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                      >
                        Clear Filters
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Friend Requests */}
            <div className={`${isDark ? 'bg-[#1a1f35]/50' : 'bg-white'} rounded-2xl p-6 backdrop-blur-sm border ${isDark ? 'border-[#2a2f45]' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Friend Requests</h2>
                {friendRequests.length > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-sm">
                    {friendRequests.length} pending
                  </span>
                )}
              </div>
              <AnimatePresence>
                <div className="space-y-4">
                  {friendRequests.map(request => (
                    <FriendRequest
                      key={request.id}
                      request={request}
                      onAccept={handleAcceptRequest}
                      onDecline={handleDeclineRequest}
                    />
                  ))}
                  {friendRequests.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`flex flex-col items-center justify-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-center text-sm">No pending friend requests</p>
                    </motion.div>
                  )}
                </div>
              </AnimatePresence>
            </div>

            {/* Suggestions */}
            <div className={`${isDark ? 'bg-[#1a1f35]/50' : 'bg-white'} rounded-2xl p-6 backdrop-blur-sm border ${isDark ? 'border-[#2a2f45]' : 'border-gray-200'}`}>
              <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Suggested Friends</h2>
              <AnimatePresence>
                <div className="space-y-4">
                  {suggestions.map(suggestion => (
                    <FriendSuggestion
                      key={suggestion.id}
                      suggestion={suggestion}
                      onAdd={handleAddFriend}
                    />
                  ))}
                  {suggestions.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`flex flex-col items-center justify-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <p className="text-center text-sm">No friend suggestions available</p>
                    </motion.div>
                  )}
                </div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Add Friend Modal */}
      <AnimatePresence>
        {showAddFriend && (
          <AddFriendModal
            isOpen={showAddFriend}
            onClose={() => setShowAddFriend(false)}
          />
        )}
      </AnimatePresence>

      {/* Floating Add Friend Button (Mobile) */}
      <div className="lg:hidden fixed right-4 bottom-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddFriend(true)}
          className="w-12 h-12 rounded-full bg-primary text-white shadow-lg flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </div>
    </div>
  )
} 