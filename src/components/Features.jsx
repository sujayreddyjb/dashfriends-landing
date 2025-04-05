const features = [
  {
    title: 'Achievement Tracking',
    description: 'Track your gaming achievements across multiple platforms in one centralized dashboard.',
    icon: '🏆'
  },
  {
    title: 'Social Integration',
    description: 'Connect with friends, share achievements, and discover new gaming communities.',
    icon: '👥'
  },
  {
    title: 'Progress Visualization',
    description: 'Beautiful charts and graphs to visualize your gaming progress and milestones.',
    icon: '📊'
  },
  {
    title: 'Real-time Updates',
    description: 'Get instant notifications when friends unlock achievements or reach new milestones.',
    icon: '⚡'
  }
]

export default function Features() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to track your gaming journey
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            DashFriends provides all the tools you need to track, share, and celebrate your gaming achievements.
          </p>
        </div>

        <div className="mt-20">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.title} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white text-2xl">
                    {feature.icon}
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.title}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
} 