import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { useTheme } from '../contexts/ThemeContext'

const AchievementsTimeline = ({ achievements }) => {
  const { isDark } = useTheme()
  const [hoveredAchievement, setHoveredAchievement] = useState(null)

  // Group achievements by month
  const monthlyData = achievements.reduce((acc, achievement) => {
    const date = new Date(achievement.unlockedAt)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    
    if (!acc[monthKey]) {
      acc[monthKey] = {
        month: new Date(date.getFullYear(), date.getMonth(), 1).toLocaleDateString('en-US', { 
          month: 'short',
          year: '2-digit'
        }),
        total: 0,
        legendary: 0,
        rare: 0,
        common: 0,
        achievements: []
      }
    }
    
    acc[monthKey].total += 1
    acc[monthKey][achievement.rarity.toLowerCase()] += 1
    acc[monthKey].achievements.push(achievement)
    
    return acc
  }, {})

  const chartData = Object.values(monthlyData).slice(-6) // Last 6 months

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null

    const monthData = chartData.find(data => data.month === label)
    if (!monthData) return null

    return (
      <div className={`p-4 rounded-lg shadow-lg ${
        isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}>
        <h3 className="font-bold mb-2">{label}</h3>
        <div className="space-y-1">
          {monthData.achievements.map(achievement => (
            <div
              key={achievement.id}
              className="flex items-center gap-2"
            >
              <span className={`w-2 h-2 rounded-full ${
                achievement.rarity === 'LEGENDARY' ? 'bg-purple-500' :
                achievement.rarity === 'RARE' ? 'bg-yellow-500' :
                'bg-blue-500'
              }`} />
              <span className="text-sm">{achievement.name}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {achievements.map((achievement) => (
        <motion.div
          key={achievement.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg ${
            isDark ? 'bg-gray-800/50' : 'bg-gray-50'
          }`}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 text-2xl">
              {achievement.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className={`font-medium ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {achievement.title}
                </h3>
                <span className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {achievement.progress}/{achievement.total}
                </span>
              </div>
              <p className={`text-sm mt-1 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {achievement.description}
              </p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-1.5 rounded-full ${
                      achievement.progress === achievement.total
                        ? 'bg-green-500'
                        : 'bg-primary'
                    }`}
                  />
                </div>
              </div>
              {achievement.unlockedAt && (
                <p className={`text-xs mt-2 ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default AchievementsTimeline 