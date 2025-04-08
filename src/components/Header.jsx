import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { Link } from 'react-router-dom'

const sections = ['features', 'why-us', 'pricing', 'testimonials']

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const activeSection = useScrollSpy(sections)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  const NavLink = ({ href, children, section }) => (
    <a
      href={`#${href}`}
      onClick={(e) => {
        e.preventDefault()
        scrollToSection(href)
      }}
      className={`transition-colors duration-200 px-3 py-2 text-sm font-medium ${
        activeSection === href
          ? 'text-primary'
          : 'text-gray-200 hover:text-white'
      }`}
    >
      {children}
    </a>
  )

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0">
            <motion.span 
              className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent cursor-pointer"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              DashFriends
            </motion.span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <motion.div
              className="flex space-x-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <NavLink href="features" section="features">Features</NavLink>
              <NavLink href="why-us" section="why-us">Why Us</NavLink>
              <NavLink href="pricing" section="pricing">Pricing</NavLink>
              <NavLink href="testimonials" section="testimonials">Testimonials</NavLink>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link 
                to="/signin" 
                className="transition-colors duration-200 px-3 py-2 text-sm font-medium text-gray-200 hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-6 py-2 rounded-full shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:scale-105"
              >
                Sign up
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden rounded-md p-2 inline-flex items-center justify-center text-gray-200 hover:text-white hover:bg-white/10 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <span className="sr-only">Open menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-black/80 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              <motion.a 
                href="#features"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('features')
                }}
                className={`block px-3 py-2 transition-colors ${
                  activeSection === 'features' ? 'text-primary' : 'text-gray-200 hover:text-white'
                }`}
                whileHover={{ x: 5 }}
              >
                Features
              </motion.a>
              <motion.a 
                href="#why-us"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('why-us')
                }}
                className={`block px-3 py-2 transition-colors ${
                  activeSection === 'why-us' ? 'text-primary' : 'text-gray-200 hover:text-white'
                }`}
                whileHover={{ x: 5 }}
              >
                Why Us
              </motion.a>
              <motion.a 
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('pricing')
                }}
                className={`block px-3 py-2 transition-colors ${
                  activeSection === 'pricing' ? 'text-primary' : 'text-gray-200 hover:text-white'
                }`}
                whileHover={{ x: 5 }}
              >
                Pricing
              </motion.a>
              <motion.a 
                href="#testimonials"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('testimonials')
                }}
                className={`block px-3 py-2 transition-colors ${
                  activeSection === 'testimonials' ? 'text-primary' : 'text-gray-200 hover:text-white'
                }`}
                whileHover={{ x: 5 }}
              >
                Testimonials
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