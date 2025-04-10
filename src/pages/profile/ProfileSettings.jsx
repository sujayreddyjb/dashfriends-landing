import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import Navbar from '../../components/Navbar'
import { toast } from 'react-hot-toast'
import { 
  Camera, 
  Twitter as TwitterIcon, 
  Twitch as TwitchIcon, 
  MessageSquare as DiscordIcon, 
  Save as SaveIcon, 
  Trophy as TrophyIcon, 
  Star as StarIcon 
} from 'lucide-react'

export default function ProfileSettings() {
  const { isDark } = useTheme()
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [user] = useState({
    username: "Alex Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    notifications: [],
    friendRequests: [],
    email: "alex.johnson@example.com",
    title: "Pro Gamer",
    bio: "Competitive gamer with a passion for strategy games",
    level: {
      current: 42,
      xp: 8760,
      nextLevel: 43,
      maxXp: 10000
    },
    socialLinks: {
      twitter: "alexjgamer",
      twitch: "alexjpro",
      discord: "alexj#1234"
    }
  })

  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    title: user.title,
    bio: user.bio,
    twitter: user.socialLinks.twitter,
    twitch: user.socialLinks.twitch,
    discord: user.socialLinks.discord
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setIsUploading(true)
      // Simulate upload delay
      setTimeout(() => {
        setIsUploading(false)
        toast.success('Profile image updated successfully!')
      }, 1500)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSaving(true)
    // Simulate save delay
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: 'Saving changes...',
        success: 'Profile updated successfully!',
        error: 'Could not save changes.',
      }
    ).finally(() => setIsSaving(false))
  }

  return (
    <div className="min-h-screen bg-[#070817] bg-gradient-to-b from-[#070817] to-[#0c0e24]">
      <Navbar user={user} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary">
            Profile Settings
          </h1>
          <p className="text-gray-400 mt-2">Customize your gaming profile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image & Level Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-[#1a1b3a]/30 rounded-2xl p-8 backdrop-blur-xl border border-[#2a2f45]/50 overflow-hidden"
          >
            {/* Glow effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-blue-500/10 pointer-events-none" />
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 blur-3xl opacity-20" />
            
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center space-x-6">
                <div className="relative group">
                  <div className="relative w-24 h-24">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-full h-full rounded-2xl object-cover ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all duration-300"
                    />
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                        <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                    )}
                    <label className="absolute -bottom-2 -right-2 p-2 bg-primary/90 hover:bg-primary rounded-xl cursor-pointer transition-colors group-hover:scale-105 transform duration-200">
                      <Camera className="w-4 h-4 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{user.username}</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <TrophyIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm font-medium">{user.title}</span>
                  </div>
                </div>
              </div>

              {/* Level Progress */}
              <div className="w-full md:w-64 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-primary font-medium">Level {user.level.current}</span>
                  <span className="text-gray-400">{user.level.xp} / {user.level.maxXp} XP</span>
                </div>
                <div className="h-2 bg-[#1a1b3a] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-blue-500 transition-all duration-300"
                    style={{ width: `${(user.level.xp / user.level.maxXp) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Basic Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative bg-[#1a1b3a]/30 rounded-2xl p-8 backdrop-blur-xl border border-[#2a2f45]/50"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-blue-500/10 blur-3xl opacity-10" />
            
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <StarIcon className="w-5 h-5 text-primary" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#0b0c2a] border border-[#2a2f45] text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 hover:border-primary/50"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#0b0c2a] border border-[#2a2f45] text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 hover:border-primary/50"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#0b0c2a] border border-[#2a2f45] text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 hover:border-primary/50 resize-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Social Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative bg-[#1a1b3a]/30 rounded-2xl p-8 backdrop-blur-xl border border-[#2a2f45]/50"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-blue-500/10 blur-3xl opacity-10" />
            
            <h2 className="text-xl font-bold text-white mb-6">Social Links</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="twitter" className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <TwitterIcon className="w-4 h-4 text-[#1DA1F2]" />
                  Twitter
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                    @
                  </span>
                  <input
                    type="text"
                    id="twitter"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-3 rounded-xl bg-[#0b0c2a] border border-[#2a2f45] text-white focus:ring-2 focus:ring-[#1DA1F2]/50 focus:border-[#1DA1F2] transition-all duration-200 hover:border-[#1DA1F2]/50"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="twitch" className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <TwitchIcon className="w-4 h-4 text-[#9146FF]" />
                  Twitch
                </label>
                <input
                  type="text"
                  id="twitch"
                  name="twitch"
                  value={formData.twitch}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#0b0c2a] border border-[#2a2f45] text-white focus:ring-2 focus:ring-[#9146FF]/50 focus:border-[#9146FF] transition-all duration-200 hover:border-[#9146FF]/50"
                />
              </div>

              <div>
                <label htmlFor="discord" className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <DiscordIcon className="w-4 h-4 text-[#5865F2]" />
                  Discord
                </label>
                <input
                  type="text"
                  id="discord"
                  name="discord"
                  value={formData.discord}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#0b0c2a] border border-[#2a2f45] text-white focus:ring-2 focus:ring-[#5865F2]/50 focus:border-[#5865F2] transition-all duration-200 hover:border-[#5865F2]/50"
                />
              </div>
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-end"
          >
            <motion.button
              whileHover={{ scale: isSaving ? 1 : 1.02 }}
              whileTap={{ scale: isSaving ? 1 : 0.98 }}
              type="submit"
              disabled={isSaving}
              className="group relative w-full bg-gradient-to-r from-primary via-blue-500 to-primary bg-[length:200%_200%] animate-gradient text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-[#070817] overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center gap-2">
                {isSaving ? (
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <SaveIcon className="w-5 h-5" />
                )}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </span>
            </motion.button>
          </motion.div>
        </form>
      </main>
    </div>
  )
} 