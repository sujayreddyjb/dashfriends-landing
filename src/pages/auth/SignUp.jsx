import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const roleOptions = [
  { id: 'pro-gamer', label: 'Pro Gamer', color: 'from-purple-500 to-purple-600' },
  { id: 'casual-player', label: 'Casual Player', color: 'from-green-500 to-green-600' },
  { id: 'streamer', label: 'Streamer', color: 'from-blue-500 to-blue-600' },
  { id: 'developer', label: 'Game Developer', color: 'from-red-500 to-red-600' }
]

const avatarPresets = [
  'Gamer1', 'Gamer2', 'Gamer3', 'Gamer4', 'Gamer5', 'Gamer6'
].map(seed => `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`)

export default function SignUp() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    avatar: avatarPresets[0],
    agreeToTerms: false,
    subscribeUpdates: false
  })

  const [passwordStrength, setPasswordStrength] = useState(0)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    if (name === 'password') {
      // Simple password strength calculation
      let strength = 0
      if (value.length >= 8) strength += 0.25
      if (value.match(/[A-Z]/)) strength += 0.25
      if (value.match(/[0-9]/)) strength += 0.25
      if (value.match(/[^A-Za-z0-9]/)) strength += 0.25
      setPasswordStrength(strength)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically make an API call to create the user account
    console.log('Form submitted:', formData)
    
    // For now, we'll simulate a successful signup and redirect to dashboard
    // In a real application, this would happen after successful API response
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#070818] py-16 px-4 sm:px-6 lg:px-8">
      {/* Home Link */}
      <div className="absolute top-8 left-8">
        <Link
          to="/"
          className="flex items-center space-x-2 text-white hover:text-primary transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="font-medium">Back to Home</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-blue-500 to-primary bg-clip-text text-transparent mb-4">
            Join DashFriends
          </h1>
          <p className="text-gray-400 text-xl">
            Where Gamers Unite
          </p>
        </div>

        {/* Form Card */}
        <motion.div
          className="bg-[#0b0c2a]/80 backdrop-blur-sm border border-[#1a1f35] rounded-2xl p-8 
          shadow-[0_4px_15px_-3px_rgba(0,0,0,0.3)]
          hover:shadow-[0_8px_25px_-5px_rgba(59,130,246,0.3)]
          transition-all duration-300"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div>
              <label className="block text-gray-300 mb-2">Gamertag</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300
                hover:border-gray-600"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300
                hover:border-gray-600"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300
                hover:border-gray-600"
                required
              />
              {/* Password Strength Meter */}
              <div className="mt-2 h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-300"
                  style={{ width: `${passwordStrength * 100}%` }}
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-gray-300 mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300
                hover:border-gray-600"
                required
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-gray-300 mb-3">Choose Your Role</label>
              <div className="grid grid-cols-2 gap-3">
                {roleOptions.map((role) => (
                  <motion.button
                    key={role.id}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormData(prev => ({ ...prev, role: role.id }))}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                    ${formData.role === role.id
                        ? `bg-gradient-to-r ${role.color} text-white shadow-lg`
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
                      }`}
                  >
                    {role.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Avatar Selection */}
            <div>
              <label className="block text-gray-300 mb-3">Choose Avatar</label>
              <div className="flex flex-wrap gap-3">
                {avatarPresets.map((avatar, index) => (
                  <motion.button
                    key={index}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFormData(prev => ({ ...prev, avatar }))}
                    className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-300
                    ${formData.avatar === avatar
                        ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                        : 'border-gray-700 hover:border-gray-500'
                      }`}
                  >
                    <img src={avatar} alt="Avatar option" className="w-full h-full" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-gray-700 bg-gray-900/50 text-blue-500
                  focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-0
                  transition-all duration-300"
                  required
                />
                <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  I agree to the Terms & Conditions
                </span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="subscribeUpdates"
                  checked={formData.subscribeUpdates}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-gray-700 bg-gray-900/50 text-blue-500
                  focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-0
                  transition-all duration-300"
                />
                <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  Subscribe to weekly gaming updates
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-lg text-white bg-gradient-to-r from-primary to-blue-500 
              hover:from-primary/90 hover:to-blue-500/90 transition-all duration-300
              shadow-[0_4px_15px_-3px_rgba(79,70,229,0.3)] hover:shadow-[0_8px_25px_-5px_rgba(79,70,229,0.4)]
              relative overflow-hidden group"
            >
              <span className="relative z-10 text-lg font-medium">Start My Journey</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 opacity-0 
                group-hover:opacity-20 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.button>

            {/* Sign In Link */}
            <div className="text-center">
              <Link
                to="/signin"
                className="text-gray-400 hover:text-white transition-colors duration-300
                hover:underline decoration-blue-500 underline-offset-4"
              >
                Already have an account? Log in
              </Link>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  )
} 