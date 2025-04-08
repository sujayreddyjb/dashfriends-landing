import { motion } from 'framer-motion'
import { useTheme } from '../../../contexts/ThemeContext'

export default function QuestCard({ quest }) {
  const { isDark } = useTheme()
  const progress = (quest.progress / quest.total) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isDark ? 'bg-[#1a1f35]/50' : 'bg-white'} rounded-2xl p-6`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Daily Quest</h2>
        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {quest.expiresIn} remaining
        </span>
      </div>

      <div className={`${isDark ? 'bg-[#0b0c2a]/50' : 'bg-gray-50'} rounded-xl p-4`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{quest.title}</h3>
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Progress: {quest.progress}/{quest.total}
              </span>
              <span className="text-sm text-primary font-medium">
                • {quest.reward}
              </span>
            </div>
          </div>
        </div>

        <div className="h-2 bg-gray-700/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-lg transition-colors"
        >
          Play Now
        </motion.button>
      </div>
    </motion.div>
  )
} 