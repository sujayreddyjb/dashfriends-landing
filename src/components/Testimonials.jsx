import { motion } from 'framer-motion'
import { useState } from 'react'

const testimonials = [
  {
    id: 1,
    quote: "DashFriends made tracking achievements fun and social!",
    username: "@ShadowNinja24",
    role: "Pro Gamer",
    roleColor: "from-purple-500 to-purple-600",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ShadowNinja24",
    rating: 5,
    games: ["Valorant", "CS:GO", "Apex Legends"]
  },
  {
    id: 2,
    quote: "The best gaming community platform I've ever used!",
    username: "@NeonStreamer",
    role: "Streamer",
    roleColor: "from-blue-500 to-blue-600",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NeonStreamer",
    rating: 5,
    games: ["Fortnite", "Minecraft", "Among Us"]
  },
  {
    id: 3,
    quote: "Finally, a platform that understands gamers!",
    username: "@PixelWarrior",
    role: "Casual Player",
    roleColor: "from-green-500 to-green-600",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PixelWarrior",
    rating: 5,
    games: ["Stardew Valley", "Animal Crossing", "Minecraft"]
  }
]

const TestimonialCard = ({ testimonial }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ 
      scale: 1.02
    }}
    className="flex-none w-[320px] p-5 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm 
    border border-[#1a1f35] cursor-pointer group relative transition-all duration-300 ease-out
    hover:bg-gradient-to-br hover:from-gray-900/80 hover:to-black/80
    shadow-[0_4px_15px_-3px_rgba(0,0,0,0.3)]
    hover:shadow-[0_15px_30px_-5px_rgba(59,130,246,0.3)]
    hover:border-blue-500/50
    m-3"
  >
    {/* User info */}
    <div className="flex items-center space-x-4 mb-5 relative z-10">
      <div className="relative overflow-visible">
        <div className="absolute inset-[-2px] rounded-full bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out blur-[2px]" />
        <img
          src={testimonial.avatar}
          alt={testimonial.username}
          className="w-12 h-12 rounded-full border-2 border-[#1a1f35] group-hover:border-blue-500/50 transition-all duration-300 ease-out relative"
        />
      </div>
      <div>
        <h4 className="text-white font-medium text-base">{testimonial.username}</h4>
        <span className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${testimonial.roleColor} text-white`}>
          {testimonial.role}
        </span>
      </div>
    </div>

    {/* Quote */}
    <p className="text-gray-300 mb-5 relative z-10 text-base leading-relaxed group-hover:text-white transition-colors duration-300">
      "{testimonial.quote}"
    </p>

    {/* Games */}
    <div className="flex flex-wrap gap-2 mb-5 relative z-10">
      {testimonial.games.map((game, index) => (
        <span
          key={index}
          className="px-2.5 py-1 rounded-full bg-white/5 text-gray-300 text-sm group-hover:bg-white/10 group-hover:text-white transition-all duration-300 ease-out"
        >
          {game}
        </span>
      ))}
    </div>

    {/* Rating */}
    <div className="flex items-center space-x-1 relative z-10">
      {[...Array(testimonial.rating)].map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  </motion.div>
)

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-primary via-blue-500 to-primary bg-clip-text text-transparent mb-4">
            Loved by Gamers Worldwide
          </h2>
          <p className="text-gray-400 text-xl">
            Hear what our community has to say about DashFriends.
          </p>
        </motion.div>

        <div className="relative">
          <div className="flex justify-center space-x-8 overflow-x-auto pb-8 scrollbar-hide px-4 mt-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-20 relative"
        >
          <div className="relative z-10 p-12 rounded-3xl bg-[#0b0c2a]/80 backdrop-blur-sm border border-[#1a1f35]
          before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-b before:from-blue-500/5 before:via-transparent before:to-blue-500/5 before:opacity-50">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-8 relative z-20">
              Ready to join thousands of happy gamers?
            </h3>
            <motion.a
              href="/signup"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full text-white bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group text-lg font-medium
              shadow-[0_4px_15px_-3px_rgba(79,70,229,0.3)] hover:shadow-[0_8px_25px_-5px_rgba(79,70,229,0.4)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Sign Up Now</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 