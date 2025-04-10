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

const AchievementsTimeline = ({ achievements, isDark }) => {
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
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          barGap={0}
          barCategoryGap="20%"
        >
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: isDark ? '#9CA3AF' : '#4B5563', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: isDark ? '#9CA3AF' : '#4B5563', fontSize: 12 }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
          />
          <Bar
            dataKey="legendary"
            stackId="achievements"
            fill="#9333EA"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="rare"
            stackId="achievements"
            fill="#EAB308"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="common"
            stackId="achievements"
            fill="#4F46E5"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AchievementsTimeline 