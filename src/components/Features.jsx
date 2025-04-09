import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const features = [
  {
    title: "Smart Friend Matching",
    description: "Our AI-powered system analyzes your gaming preferences and playstyle to connect you with compatible gaming partners.",
    icon: "👥",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Achievement Tracking",
    description: "Track and showcase your gaming achievements across multiple platforms with our comprehensive achievement system.",
    icon: "🏆",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    title: "Real-time Stats",
    description: "Get instant access to your gaming statistics, performance metrics, and progress tracking across all your games.",
    icon: "📈",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Social Hub",
    description: "Connect with friends, join gaming communities, and participate in tournaments all in one place.",
    icon: "💬",
    gradient: "from-green-500 to-teal-500"
  },
  {
    title: "Cross-Platform Support",
    description: "Seamlessly switch between PC, console, and mobile gaming while maintaining your progress and connections.",
    icon: "🔄",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    title: "Customizable Dashboard",
    description: "Personalize your gaming dashboard with widgets, themes, and layouts that suit your style.",
    icon: "🎮",
    gradient: "from-pink-500 to-rose-500"
  }
];

export default function Features() {
  const { isDark } = useTheme();

  return (
    <section className={`py-20 ${isDark ? 'bg-[#070818]' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}
          >
            Powerful Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto`}
          >
            Discover the tools and features that make DashFriends the ultimate gaming companion
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${isDark ? 'bg-[#0b0c2a]/50' : 'bg-white'} rounded-xl p-6 backdrop-blur-sm hover:shadow-lg transition-all duration-300`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-4 bg-gradient-to-r ${feature.gradient} text-white`}>
                {feature.icon}
              </div>
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                {feature.title}
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
