import { useTheme } from '../../../contexts/ThemeContext'
import { Link } from 'react-router-dom'

export default function ActivityFeed({ activities }) {
  const { isDark } = useTheme()

  return (
    <div className={`${isDark ? 'bg-[#1a1f35]/50' : 'bg-white'} rounded-2xl p-6`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Friends Activity</h2>
        <Link to="/activities" className="text-primary hover:text-primary/80 text-sm font-medium">
          View More Activities
        </Link>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`${isDark ? 'bg-[#0b0c2a]/50' : 'bg-gray-50'} rounded-xl p-4`}
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={activity.avatar} alt={activity.username} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <span className="font-medium">{activity.username}</span>{' '}
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {activity.action}
                  </span>
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {activity.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 