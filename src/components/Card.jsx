import { useTheme } from '../contexts/ThemeContext'

export function Card({ children, className = '' }) {
  const { isDark } = useTheme()
  
  return (
    <div
      className={`
        ${isDark ? 'bg-[#0b0c2a]/50' : 'bg-white'}
        backdrop-blur-sm
        rounded-xl
        p-6
        shadow-lg
        ${isDark ? 'shadow-black/5' : 'shadow-gray-200'}
        ${className}
      `}
    >
      {children}
    </div>
  )
} 