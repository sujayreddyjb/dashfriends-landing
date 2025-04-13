import React from 'react';
import { useTheme } from '../contexts/ThemeContext'

function Card({ children, className = '' }) {
  const { isDark } = useTheme()
  
  return (
    <div
      className={`rounded-lg shadow-sm ${
        isDark ? 'bg-[#1a1b3a] shadow-gray-900/10' : 'bg-white shadow-gray-200/50'
      } ${className}`}
    >
      {children}
    </div>
  )
}

export { Card };
export default Card 