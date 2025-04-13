import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * A reusable card component that adapts to the current theme
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be rendered inside the card
 * @param {string} [props.className=''] - Additional CSS classes to apply to the card
 */
export function Card({ children, className = '' }) {
  const { isDark } = useTheme();
  
  return (
    <div
      className={`rounded-lg shadow-sm ${
        isDark ? 'bg-[#1a1b3a] shadow-gray-900/10' : 'bg-white shadow-gray-200/50'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default Card; 