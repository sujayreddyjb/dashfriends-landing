import React, { useState } from 'react'
import { motion } from 'framer-motion'

const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const generateColor = (name) => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-red-500',
    'bg-teal-500'
  ]
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[index % colors.length]
}

const AvatarFallback = ({ 
  src, 
  alt, 
  size = 'md',
  className = '',
  onError = () => {},
  isPro = false
}) => {
  const [imgError, setImgError] = useState(false)
  const initials = getInitials(alt || 'User Name')
  const bgColor = generateColor(alt || 'User Name')

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-20 h-20 text-2xl',
    xl: 'w-40 h-40 text-4xl'
  }

  const handleError = (e) => {
    setImgError(true)
    onError(e)
  }

  return (
    <motion.div
      className={`relative rounded-full overflow-hidden flex items-center justify-center ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {!imgError && src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={handleError}
        />
      ) : (
        <div className={`w-full h-full flex items-center justify-center ${bgColor} text-white font-medium`}>
          {initials}
        </div>
      )}
      {isPro && (
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-purple-600/20 animate-gradient" />
      )}
    </motion.div>
  )
}

export default AvatarFallback 