import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';
import Stats from './Stats';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-[#0B0B1F] min-h-screen">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-[#4F46E5] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-[#10B981] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-[#9333EA] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-32 sm:pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1 
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] via-[#9333EA] to-[#10B981] animate-gradient inline-block mb-2">
              Track Your Gaming
            </span>
            <br />
            <span className="text-white">
              Journey Like Never Before
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Track your gaming progress, connect with friends, and elevate your gaming experience with DashFriends.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-lg font-medium text-base w-full sm:w-auto
                transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Get started for free</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#4F46E5] to-[#9333EA] opacity-0 
                group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-white/5 text-white rounded-lg font-medium text-base w-full sm:w-auto
                hover:bg-white/10 border border-white/10 backdrop-blur-sm
                transition-all duration-300"
            >
              Live demo →
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 relative mx-auto max-w-5xl"
        >
          <div className="relative group">
            {/* Glow effect on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#4F46E5] to-[#9333EA] rounded-xl blur-xl opacity-25 
              group-hover:opacity-50 transition duration-1000"></div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B1F] via-transparent to-transparent opacity-50 z-10 rounded-xl"></div>
              <img
                src="/dashboard-mockup.png"
                alt="DashFriends Dashboard"
                className="w-full h-auto rounded-xl shadow-2xl border border-white/10 backdrop-blur-sm"
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#4F46E5] rounded-lg rotate-12 opacity-10 blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#9333EA] rounded-lg -rotate-12 opacity-10 blur-2xl"></div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <Stats />
      </div>
    </div>
  );
};

export default Hero; 