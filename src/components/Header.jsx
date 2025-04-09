import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { isDark } = useTheme()

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
      setIsMenuOpen(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['features', 'why-us', 'pricing', 'testimonials']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed w-full z-50 ${isDark ? 'bg-[#070818]/80' : 'bg-white/80'} backdrop-blur-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-primary via-blue-500 to-primary bg-clip-text text-transparent">
              DashFriends
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <motion.a 
              href="#features"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('features')
              }}
              className={`relative text-base transition-all duration-300 ${
                activeSection === 'features' 
                  ? 'text-primary' 
                  : 'text-gray-200 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Features</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.a>
            <motion.a 
              href="#why-us"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('why-us')
              }}
              className={`relative text-base transition-all duration-300 ${
                activeSection === 'why-us' 
                  ? 'text-primary' 
                  : 'text-gray-200 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Why Us</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.a>
            <motion.a 
              href="#testimonials"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('testimonials')
              }}
              className={`relative text-base transition-all duration-300 ${
                activeSection === 'testimonials' 
                  ? 'text-primary' 
                  : 'text-gray-200 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Testimonials</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.a>
            <motion.a 
              href="#pricing"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('pricing')
              }}
              className={`relative text-base transition-all duration-300 ${
                activeSection === 'pricing' 
                  ? 'text-primary' 
                  : 'text-gray-200 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Pricing</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.a>
            <div className="flex items-center space-x-4">
              <motion.div whileHover={{ x: 5 }}>
                <Link 
                  to="/signin" 
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  Login
                </Link>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  to="/signup" 
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-blue-500 text-white hover:from-primary/90 hover:to-blue-500/90 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </motion.div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-gray-200 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#070818]/95 backdrop-blur-sm border-t border-white/10"
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              <motion.a 
                href="#features"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('features')
                }}
                className={`relative block px-3 py-2 transition-all duration-300 ${
                  activeSection === 'features' 
                    ? 'text-primary' 
                    : 'text-gray-200 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Features</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.a>
              <motion.a 
                href="#why-us"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('why-us')
                }}
                className={`relative block px-3 py-2 transition-all duration-300 ${
                  activeSection === 'why-us' 
                    ? 'text-primary' 
                    : 'text-gray-200 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Why Us</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.a>
              <motion.a 
                href="#testimonials"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('testimonials')
                }}
                className={`relative block px-3 py-2 transition-all duration-300 ${
                  activeSection === 'testimonials' 
                    ? 'text-primary' 
                    : 'text-gray-200 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Testimonials</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.a>
              <motion.a 
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('pricing')
                }}
                className={`relative block px-3 py-2 transition-all duration-300 ${
                  activeSection === 'pricing' 
                    ? 'text-primary' 
                    : 'text-gray-200 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Pricing</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.a>
              <div className="pt-4 flex flex-col space-y-3">
                <motion.div whileHover={{ x: 5 }}>
                  <Link 
                    to="/signin" 
                    className="block px-3 py-2 text-gray-200 hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    to="/signup" 
                    className="block mx-3 py-2 text-center rounded-full bg-gradient-to-r from-primary to-blue-500 text-white hover:from-primary/90 hover:to-blue-500/90 transition-all duration-300"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
} 