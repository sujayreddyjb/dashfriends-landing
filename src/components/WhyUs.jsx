import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const whyUs = [
  {
    title: "Gaming-First Approach",
    description: "Built by gamers, for gamers. We understand what makes a great gaming community.",
    icon: "🎮",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "24/7 Support",
    description: "Our dedicated support team is always ready to help you with any issues or questions.",
    icon: "🎯",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    title: "Regular Updates",
    description: "We constantly improve our platform with new features and optimizations.",
    icon: "⚔️",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Community Events",
    description: "Participate in exclusive tournaments, giveaways, and community challenges.",
    icon: "🏆",
    gradient: "from-green-500 to-teal-500"
  },
  {
    title: "Privacy Focused",
    description: "Your data is secure with us. We prioritize your privacy and security.",
    icon: "🛡️",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    title: "Cross-Platform",
    description: "Connect with friends across all gaming platforms seamlessly.",
    icon: "🎲",
    gradient: "from-pink-500 to-rose-500"
  }
];

export default function WhyUs() {
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
            Why Choose DashFriends?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto`}
          >
            Experience gaming like never before with our comprehensive platform designed for modern gamers.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyUs.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${isDark ? 'bg-[#0b0c2a]/50' : 'bg-white'} rounded-xl p-6 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-4 bg-gradient-to-br ${reason.gradient} shadow-lg shadow-primary/20`}>
                {reason.icon}
              </div>
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                {reason.title}
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 