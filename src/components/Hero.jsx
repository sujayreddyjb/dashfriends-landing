import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';

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
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
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

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {/* Active Gamers */}
            <motion.div 
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 
                hover:bg-white/10 transition-all duration-300 relative group
                hover:shadow-[0_0_30px_rgba(79,70,229,0.2)] hover:border-[#4F46E5]/30"
            >
              <div className="flex items-center justify-center mb-4">
                <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Main circle */}
                  <circle cx="24" cy="20" r="12" className="fill-[#4F46E5]" filter="url(#shadow)" />
                  {/* Smaller circles for 3D effect */}
                  <circle cx="16" cy="18" r="4" className="fill-[#9333EA]" />
                  <circle cx="32" cy="18" r="4" className="fill-[#10B981]" />
                  <path d="M8 38C8 34 12 28 24 28C36 28 40 34 40 38" className="stroke-[#4F46E5] stroke-2" strokeLinecap="round" />
                  {/* Shadow filter */}
                  <defs>
                    <filter id="shadow" x="-8" y="-8" width="64" height="64">
                      <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#4F46E5" floodOpacity="0.3"/>
                    </filter>
                  </defs>
                </svg>
              </div>
              <div className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] via-[#9333EA] to-[#10B981] group-hover:scale-105 transition-transform">
                50,000+
              </div>
              <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                Active Gamers
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#4F46E5] to-[#9333EA] opacity-0 
                group-hover:opacity-10 transition-opacity duration-300 -z-10"></div>
            </motion.div>

            {/* Games Tracked */}
            <motion.div 
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 
                hover:bg-white/10 transition-all duration-300 relative group
                hover:shadow-[0_0_30px_rgba(147,51,234,0.2)] hover:border-[#9333EA]/30"
            >
              <div className="flex items-center justify-center mb-4">
                <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* 3D Bar Chart */}
                  <path d="M8 40V20H16V40H8Z" className="fill-[#4F46E5]" filter="url(#shadow)" />
                  <path d="M20 40V12H28V40H20Z" className="fill-[#9333EA]" filter="url(#shadow)" />
                  <path d="M32 40V8H40V40H32Z" className="fill-[#10B981]" filter="url(#shadow)" />
                  {/* Base platform */}
                  <path d="M4 40H44" className="stroke-white/30" strokeWidth="2" strokeLinecap="round" />
                  <defs>
                    <filter id="shadow" x="-8" y="-8" width="64" height="64">
                      <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#9333EA" floodOpacity="0.3"/>
                    </filter>
                  </defs>
                </svg>
              </div>
              <div className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] via-[#9333EA] to-[#10B981] group-hover:scale-105 transition-transform">
                1,000,000+
              </div>
              <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                Games Tracked
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#9333EA] to-[#10B981] opacity-0 
                group-hover:opacity-10 transition-opacity duration-300 -z-10"></div>
            </motion.div>

            {/* Daily Users */}
            <motion.div 
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 
                hover:bg-white/10 transition-all duration-300 relative group
                hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:border-[#10B981]/30"
            >
              <div className="flex items-center justify-center mb-4">
                <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Central user */}
                  <circle cx="24" cy="20" r="8" className="fill-[#4F46E5]" filter="url(#shadow)" />
                  <path d="M12 40C12 32 17 28 24 28C31 28 36 32 36 40" className="fill-[#9333EA]" />
                  {/* Orbiting users */}
                  <circle cx="12" cy="20" r="4" className="fill-[#10B981]">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 24 20"
                      to="360 24 20"
                      dur="8s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="36" cy="20" r="4" className="fill-[#10B981]">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="180 24 20"
                      to="540 24 20"
                      dur="8s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <defs>
                    <filter id="shadow" x="-8" y="-8" width="64" height="64">
                      <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#10B981" floodOpacity="0.3"/>
                    </filter>
                  </defs>
                </svg>
              </div>
              <div className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] via-[#9333EA] to-[#10B981] group-hover:scale-105 transition-transform">
                25,000+
              </div>
              <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                Daily Users
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#10B981] to-[#4F46E5] opacity-0 
                group-hover:opacity-10 transition-opacity duration-300 -z-10"></div>
            </motion.div>

            {/* Achievements */}
            <motion.div 
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 
                hover:bg-white/10 transition-all duration-300 relative group
                hover:shadow-[0_0_30px_rgba(79,70,229,0.2)] hover:border-[#4F46E5]/30"
            >
              <div className="flex items-center justify-center mb-4">
                <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Trophy base */}
                  <path d="M20 40H28M24 32V40" className="stroke-[#4F46E5]" strokeWidth="2" />
                  <path d="M12 8H36V20C36 26.6274 30.6274 32 24 32C17.3726 32 12 26.6274 12 20V8Z" 
                    className="fill-[#9333EA]" filter="url(#shadow)" />
                  {/* Trophy handles */}
                  <path d="M36 12H40C40 16 38 20 36 20M12 12H8C8 16 10 20 12 20" 
                    className="stroke-[#10B981]" strokeWidth="2" />
                  {/* Star accent */}
                  <path d="M24 12L26 16L30 17L27 20L28 24L24 22L20 24L21 20L18 17L22 16L24 12Z" 
                    className="fill-[#10B981]" />
                  <defs>
                    <filter id="shadow" x="-8" y="-8" width="64" height="64">
                      <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#4F46E5" floodOpacity="0.3"/>
                    </filter>
                  </defs>
                </svg>
              </div>
              <div className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] via-[#9333EA] to-[#10B981] group-hover:scale-105 transition-transform">
                100,000+
              </div>
              <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                Achievements
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#4F46E5] to-[#10B981] opacity-0 
                group-hover:opacity-10 transition-opacity duration-300 -z-10"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero; 