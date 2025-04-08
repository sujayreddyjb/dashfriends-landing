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
  "Minecraft": "⛏️"
}

// Game colors mapping
const gameColors = {
  "Valorant": "bg-red-500/20 text-red-400",
  "CS:GO": "bg-orange-500/20 text-orange-400",
  "League of Legends": "bg-blue-500/20 text-blue-400",
  "Fortnite": "bg-purple-500/20 text-purple-400",
  "Minecraft": "bg-green-500/20 text-green-400"
}

// Mock data - In a real app, this would come from an API
const mockFriends = [
  { id: 1, username: "Alex", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", status: "online", lastSeen: "Now", games: ["Valorant", "CS:GO"] },
  { id: 2, username: "Sarah", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", status: "online", lastSeen: "Now", games: ["League of Legends"] },
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

function FriendCard({ friend }) {
  const { isDark } = useTheme()
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`${isDark ? 'bg-[#0b0c2a]/50' : 'bg-gray-50'} rounded-xl p-4 backdrop-blur-sm`}
    >
      <div className="flex items-center space-x-4">
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
          <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{friend.username}</h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {friend.status === 'online' ? 'Online' : `Last seen ${friend.lastSeen}`}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {friend.games.map((game) => (
              <GameTag key={game} game={game} />
            ))}
          </div>
        </div>
        <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'} transition-colors`}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
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

export default function Friends() {
  const { isDark } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [friends, setFriends] = useState(mockFriends)
  const [friendRequests, setFriendRequests] = useState(mockFriendRequests)
  const [suggestions, setSuggestions] = useState(mockSuggestions)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterGame, setFilterGame] = useState('all')
  const [sortBy, setSortBy] = useState('status')

  const handleAcceptRequest = (requestId) => {
    setFriendRequests(requests => requests.filter(r => r.id !== requestId))
    // In a real app, you would make an API call here
  }

  const handleDeclineRequest = (requestId) => {
    setFriendRequests(requests => requests.filter(r => r.id !== requestId))
    // In a real app, you would make an API call here
  }

  const handleAddFriend = (suggestionId) => {
    setSuggestions(suggestions => suggestions.filter(s => s.id !== suggestionId))
    // In a real app, you would make an API call here
  }

  const filteredAndSortedFriends = friends
    .filter(friend => {
      const matchesSearch = friend.username.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = filterStatus === 'all' || friend.status === filterStatus
      const matchesGame = filterGame === 'all' || friend.games.includes(filterGame)
      return matchesSearch && matchesStatus && matchesGame
    })
    .sort((a, b) => {
      if (sortBy === 'status') {
        return a.status === 'online' ? -1 : 1
      }
      return 0
    })

  const allGames = [...new Set(friends.flatMap(f => f.games))]

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#070818]' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Friends List */}
          <div className="lg:col-span-2 space-y-6">
            <div className={`${isDark ? 'bg-[#1a1f35]/50' : 'bg-white'} rounded-2xl p-6 backdrop-blur-sm`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                <div className="flex-1">
                  <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Friends</h2>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {friends.length} total friends
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className={`px-3 py-2 rounded-lg ${
                      isDark ? 'bg-[#0b0c2a]/50 text-white' : 'bg-gray-50 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-primary/50`}
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
                      isDark ? 'bg-[#0b0c2a]/50 text-white' : 'bg-gray-50 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-primary/50`}
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
                      isDark ? 'bg-[#0b0c2a]/50 text-white' : 'bg-gray-50 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-primary/50`}
                  >
                    <option value="status">Sort by Status</option>
                    <option value="name">Sort by Name</option>
                  </select>
                </div>
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Search friends..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg ${
                      isDark ? 'bg-[#0b0c2a]/50 text-white placeholder-gray-500' : 'bg-gray-50 text-gray-900 placeholder-gray-400'
                    } focus:outline-none focus:ring-2 focus:ring-primary/50`}
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
              <AnimatePresence>
                <div className="space-y-4">
                  {filteredAndSortedFriends.map(friend => (
                    <FriendCard key={friend.id} friend={friend} />
                  ))}
                  {filteredAndSortedFriends.length === 0 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                    >
                      No friends found matching your filters
                    </motion.p>
                  )}
                </div>
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Friend Requests */}
            <div className={`${isDark ? 'bg-[#1a1f35]/50' : 'bg-white'} rounded-2xl p-6 backdrop-blur-sm`}>
              <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Friend Requests</h2>
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
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`text-center py-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                    >
                      No pending friend requests
                    </motion.p>
                  )}
                </div>
              </AnimatePresence>
            </div>

            {/* Suggestions */}
            <div className={`${isDark ? 'bg-[#1a1f35]/50' : 'bg-white'} rounded-2xl p-6 backdrop-blur-sm`}>
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
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`text-center py-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                    >
                      No friend suggestions available
                    </motion.p>
                  )}
                </div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 