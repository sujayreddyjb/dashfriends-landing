import { useState, useEffect } from 'react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-primary">DashFriends</span>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a href="#features" className="text-gray-500 hover:text-gray-900 transition-colors duration-200 px-3 py-2 text-sm font-medium">
              Features
            </a>
            <a href="#testimonials" className="text-gray-500 hover:text-gray-900 transition-colors duration-200 px-3 py-2 text-sm font-medium">
              Testimonials
            </a>
            <a href="#pricing" className="text-gray-500 hover:text-gray-900 transition-colors duration-200 px-3 py-2 text-sm font-medium">
              Pricing
            </a>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors duration-200 px-3 py-2 text-sm font-medium">
                Login
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
              >
                Sign up
              </a>
            </div>
          </div>
          <button className="md:hidden rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200">
            <span className="sr-only">Open menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
} 