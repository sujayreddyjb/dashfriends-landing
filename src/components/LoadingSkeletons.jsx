import { motion } from 'framer-motion'

export function AchievementSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
          <div className="mt-3">
            <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full w-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function FriendCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  )
}

export function CardSkeleton({ rows = 1 }) {
  return (
    <div className="animate-pulse space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-20 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
      ))}
    </div>
  )
} 