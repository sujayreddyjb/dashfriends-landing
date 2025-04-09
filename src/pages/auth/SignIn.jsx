import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Social login icons (you can replace these with actual icons from your preferred icon library)
const socialIcons = {
  discord: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  ),
  google: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  ),
  steam: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.97 4.36 10.91 10.07 11.84v-2.37C6.37 20.6 3.67 16.69 3.67 12c0-4.57 3.7-8.27 8.27-8.27s8.27 3.7 8.27 8.27c0 4.69-2.7 8.6-6.4 9.47v2.37C19.64 22.91 24 17.97 24 12c0-6.63-5.37-12-12-12zm0 4.53c-4.13 0-7.47 3.34-7.47 7.47s3.34 7.47 7.47 7.47 7.47-3.34 7.47-7.47-3.34-7.47-7.47-7.47zm0 2.13c2.93 0 5.33 2.4 5.33 5.33s-2.4 5.33-5.33 5.33-5.33-2.4-5.33-5.33 2.4-5.33 5.33-5.33z"/>
    </svg>
  )
}

export default function SignIn() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
    rememberMe: false
  })
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear any previous error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Get stored user data from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const user = storedUsers.find(u => 
      (u.email === formData.emailOrUsername || u.username === formData.emailOrUsername) && 
      u.password === formData.password
    )

    if (user) {
      // Store authentication state
      localStorage.setItem('currentUser', JSON.stringify(user))
      if (formData.rememberMe) {
        localStorage.setItem('rememberMe', 'true')
      }
      
      // Redirect to dashboard
      navigate('/dashboard')
    } else {
      setError('Invalid email/username or password')
    }
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
        className="max-w-md mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-blue-500 to-primary bg-clip-text text-transparent mb-4">
            Welcome Back, Gamer!
          </h1>
          <p className="text-gray-400 text-xl">
            Ready to continue your journey?
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
            {/* Email/Username Input */}
            <div>
              <label className="block text-gray-300 mb-2">Email or Username</label>
              <input
                type="text"
                name="emailOrUsername"
                value={formData.emailOrUsername}
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
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-gray-700 bg-gray-900/50 text-blue-500
                  focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-0
                  transition-all duration-300"
                />
                <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  Remember Me
                </span>
              </label>

              <Link
                to="/forgot-password"
                className="text-blue-500 hover:text-blue-400 transition-colors duration-300
                hover:underline decoration-blue-500 underline-offset-4"
              >
                Forgot Password?
              </Link>
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
              <span className="relative z-10 text-lg font-medium">Log In</span>
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

            {/* Social Login */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#0b0c2a] text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {Object.entries(socialIcons).map(([platform, icon]) => (
                <motion.button
                  key={platform}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center p-3 rounded-lg bg-gray-800/50 
                  hover:bg-gray-800 text-gray-400 hover:text-white
                  border border-gray-700 hover:border-gray-600
                  transition-all duration-300"
                >
                  {icon}
                </motion.button>
              ))}
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <Link
                to="/signup"
                className="text-gray-400 hover:text-white transition-colors duration-300
                hover:underline decoration-blue-500 underline-offset-4"
              >
                Don't have an account? Create one now
              </Link>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  )
} 