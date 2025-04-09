import { motion } from 'framer-motion'

const pricingPlans = [
  {
    name: 'Basic',
    price: '$9.99',
    period: '/month',
    features: [
      'Up to 5 friends',
      'Basic matchmaking',
      'Standard support',
      'Basic statistics',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    price: '$19.99',
    period: '/month',
    features: [
      'Up to 20 friends',
      'Advanced matchmaking',
      'Priority support',
      'Detailed statistics',
      'Custom preferences',
      'Early access to features',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$49.99',
    period: '/month',
    features: [
      'Unlimited friends',
      'Premium matchmaking',
      '24/7 dedicated support',
      'Advanced analytics',
      'API access',
      'Custom integrations',
      'Team management',
    ],
    popular: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-[#070818] to-[#0a0c1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-blue-500 to-primary bg-clip-text text-transparent mb-4">
            Choose Your Plan
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find the perfect plan for your gaming needs. All plans include our core features with additional benefits as you upgrade.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? 'bg-gradient-to-b from-primary/20 to-blue-500/20 border border-primary/30'
                  : 'bg-[#0a0c1f] border border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white text-sm font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <svg
                      className="w-5 h-5 text-primary mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-primary to-blue-500 text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-4">Need a custom plan for your team?</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-blue-500 text-white font-semibold hover:from-primary/90 hover:to-blue-500/90 transition-all duration-300"
          >
            Contact Sales
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
} 