import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const AnimatedCounter = ({ value, duration = 2000, isDecimal = false }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = parseFloat(value);
      const increment = end / (duration / 16); // 60 FPS
      const timer = setInterval(() => {
        start += increment;
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(isDecimal ? Math.round(start * 10) / 10 : Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [value, duration, inView, isDecimal]);

  return <span ref={ref}>{count}</span>;
};

const WhyUs = () => {
  return (
    <section id="why-us" className="py-20 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-[#4F46E5] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-[#9333EA] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] to-[#9333EA]">
              Why Choose DashFriends?
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of gamers who trust DashFriends to track their gaming journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M17 11a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm0 0a4 4 0 1 1 4 4h-4m-8 0H5a4 4 0 0 1 4-4m10-4a4 4 0 0 0-8 0m4-4v4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              label: 'Active Gamers',
              value: '25',
              suffix: 'k+',
              description: 'Trusted by thousands of gamers worldwide'
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.83.932 6.59 2.468M21 3v6h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              label: 'Integrated Games',
              value: '50',
              suffix: '+',
              description: 'Support for all major gaming platforms'
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              label: 'Average Rating',
              value: '4.9',
              suffix: '⭐',
              description: 'Rated by our amazing community',
              isDecimal: true
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 
                hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/10 to-transparent opacity-0 
                group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[#4F46E5]/10 text-[#4F46E5] mb-6 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] to-[#9333EA]">
                  <AnimatedCounter value={stat.value} isDecimal={stat.isDecimal} />{stat.suffix}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{stat.label}</h3>
                <p className="text-gray-400">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs; 