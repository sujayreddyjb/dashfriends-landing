import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import Navbar from '../../components/Navbar';
import Card from '../../components/Card';
import AchievementsTimeline from '../../components/AchievementsTimeline';
import GameplayStatsChart from '../../components/GameplayStatsChart';

const Demo = () => {
  const { isDark } = useTheme();
  const [user] = useState({
    username: 'Demo User',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo',
    notifications: [],
    friendRequests: [],
    level: 42,
    xp: 1250,
    maxXp: 2000,
    prestige: 3,
    stats: {
      gamesPlayed: 128,
      totalPlaytime: '256h',
      winRate: '68%',
      dayStreak: 14
    },
    achievements: [
      {
        id: 1,
        title: 'First Blood',
        description: 'Win your first game',
        icon: '🏆',
        progress: 100,
        total: 1,
        unlockedAt: '2024-03-15T10:30:00Z'
      },
      {
        id: 2,
        title: 'Weekend Warrior',
        description: 'Play 10 games in a weekend',
        icon: '⚔️',
        progress: 7,
        total: 10,
        unlockedAt: null
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'achievement',
        title: 'Unlocked First Blood',
        timestamp: '2024-03-15T10:30:00Z'
      },
      {
        id: 2,
        type: 'game',
        title: 'Won a match in Valorant',
        timestamp: '2024-03-14T15:45:00Z'
      }
    ]
  });

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0b0c2a]' : 'bg-gray-50'}`}>
      <Navbar user={user} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-20 h-20 rounded-full border-4 border-primary"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                    Lvl {user.level}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {user.username}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Prestige {user.prestige}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-300">XP Progress</span>
                  <span className="text-gray-900 dark:text-white">
                    {user.xp}/{user.maxXp}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${(user.xp / user.maxXp) * 100}%` }}
                  />
                </div>
              </div>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Games Played
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.stats.gamesPlayed}
                </p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Playtime
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.stats.totalPlaytime}
                </p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Win Rate
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.stats.winRate}
                </p>
              </Card>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Day Streak
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.stats.dayStreak}
                </p>
              </Card>
            </div>
          </div>

          {/* Middle Column */}
          <div className="space-y-6">
            {/* Achievements Card */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Recent Achievements
              </h2>
              <AchievementsTimeline achievements={user.achievements} />
            </Card>

            {/* Gameplay Stats Chart */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Gameplay Stats
              </h2>
              <GameplayStatsChart />
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {user.recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <div className="flex-shrink-0">
                      {activity.type === 'achievement' ? '🏆' : '🎮'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* CTA Section */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Sign up now to track your gaming progress, connect with friends, and unlock achievements!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  onClick={() => window.location.href = '/signup'}
                >
                  Get Started for Free
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-6 py-3 rounded-lg font-medium border ${
                    isDark
                      ? 'border-gray-700 text-white hover:bg-gray-800'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  } transition-colors`}
                  onClick={() => window.location.href = '/signin'}
                >
                  Sign In
                </motion.button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo; 