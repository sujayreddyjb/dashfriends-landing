import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = parseInt(value);
      const increment = end / (duration / 16); // 60 FPS
      const timer = setInterval(() => {
        start += increment;
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [value, duration, inView]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const Stats = () => {
  return (
    <div className="relative -mt-20 mb-20 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { value: '50000', label: 'Active Gamers', icon: '🎮' },
            { value: '1000000', label: 'Games Tracked', icon: '📊' },
            { value: '25000', label: 'Daily Users', icon: '👥' },
            { value: '100000', label: 'Achievements', icon: '🏆' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="glass-card p-6 text-center transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] to-[#9333EA] mb-2">
                <AnimatedCounter value={stat.value} />+
              </div>
              <div className="text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Stats; 