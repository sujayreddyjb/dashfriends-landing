import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-[#0E0E2C] min-h-screen">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-[#4F46E5] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-[#10B981] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#9333EA] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] via-[#9333EA] to-[#10B981] animate-gradient">
              Track Your Gaming
            </span>
            <br />
            <span className="text-white">
              Journey Like Never Before
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Track your gaming progress, connect with friends, and elevate your gaming experience with DashFriends.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Get started for free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/5 text-white rounded-lg font-semibold text-lg border border-white/10 backdrop-blur-sm 
                hover:bg-white/10 hover:border-[#4F46E5]/50 hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] 
                transition-all duration-300"
            >
              Live demo →
            </motion.button>
          </div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 relative mx-auto max-w-5xl"
        >
          <div className="relative group">
            {/* Glow effect on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#4F46E5] to-[#9333EA] rounded-xl blur-xl opacity-25 
              group-hover:opacity-50 transition duration-1000"></div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E2C] to-transparent opacity-50 z-10 rounded-xl"></div>
              <img
                src="/dashboard-mockup.png"
                alt="DashFriends Dashboard"
                className="w-full h-auto rounded-xl shadow-2xl border border-white/10 backdrop-blur-sm"
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#4F46E5] rounded-lg rotate-12 opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#9333EA] rounded-lg -rotate-12 opacity-20 blur-2xl"></div>
              
              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#4F46E5] to-[#9333EA] rounded-xl opacity-0 
                group-hover:opacity-20 transition duration-500"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero; 