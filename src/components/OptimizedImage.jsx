import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  placeholder = 'blur',
}) {
  const [isLoading, setIsLoading] = useState(!priority)
  const [error, setError] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)

  useEffect(() => {
    if (priority) return

    const img = new Image()
    img.src = src
    img.onload = () => {
      setIsLoading(false)
      setError(false)
    }
    img.onerror = () => {
      setError(true)
      setIsLoading(false)
      // Set fallback image URL for avatar or banner
      if (src.includes('avatar')) {
        setImageSrc('https://ui-avatars.com/api/?name=User&background=random')
      } else if (src.includes('banner')) {
        setImageSrc('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&h=300')
      }
    }
  }, [src, priority])

  const generateBlurDataURL = () => {
    return `data:image/svg+xml;base64,${btoa(
      `<svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg"><rect width="${width}" height="${height}" fill="#1f2937"/></svg>`
    )}`
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <AnimatePresence>
        {isLoading && placeholder === 'blur' && (
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-800 animate-pulse"
            style={{
              backgroundImage: `url("${generateBlurDataURL()}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}
      </AnimatePresence>

      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        loading={priority ? 'eager' : 'lazy'}
        onError={() => setError(true)}
      />

      {error && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white">
          <span className="text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  )
} 