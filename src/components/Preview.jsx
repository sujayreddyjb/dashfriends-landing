export default function Preview() {
  return (
    <div className="bg-gray-50 overflow-hidden">
      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="relative lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="relative">
            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
              Beautiful dashboard for gamers
            </h3>
            <p className="mt-3 text-lg text-gray-500">
              Get a clear view of your gaming progress with our intuitive dashboard. Track achievements, compare stats, and stay connected with your gaming community.
            </p>

            <dl className="mt-10 space-y-10">
              {[
                {
                  name: 'Real-time Stats',
                  description: 'See your gaming statistics update in real-time as you play.'
                },
                {
                  name: 'Cross-platform Support',
                  description: 'Track achievements across multiple gaming platforms in one place.'
                },
                {
                  name: 'Custom Widgets',
                  description: 'Customize your dashboard with widgets that matter most to you.'
                }
              ].map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10 -mx-4 relative lg:mt-0">
            <div className="relative space-y-4">
              <div className="bg-gradient-to-r from-primary to-secondary rounded-lg shadow-xl overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  {/* Placeholder for dashboard preview - replace with actual image */}
                  <div className="h-64 bg-white bg-opacity-10 rounded-lg flex items-center justify-center text-white text-xl font-semibold">
                    Dashboard Preview
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 