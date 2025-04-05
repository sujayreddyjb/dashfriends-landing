export default function Hero() {
  return (
    <div className="relative bg-white pt-16 overflow-hidden">
      <div className="relative pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1>
                <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                  <span className="block text-gray-900">Track Your Gaming</span>
                  <span className="block text-primary mt-3">Journey Like Never Before</span>
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                DashFriends helps you track achievements, connect with fellow gamers, and visualize your gaming progress all in one beautiful dashboard.
              </p>
              <div className="mt-8 sm:mt-12">
                <div className="sm:flex sm:justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    Get started for free
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 border-2 border-primary text-base font-medium rounded-lg text-primary bg-transparent hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    Live demo
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                  <div className="w-full h-[600px] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg overflow-hidden">
                    {/* Dashboard Mockup */}
                    <div className="relative w-full h-full backdrop-blur-sm p-4">
                      <div className="absolute inset-0 bg-white/40"></div>
                      <div className="relative z-10">
                        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                          </div>
                          <div className="space-y-3">
                            <div className="w-full h-24 bg-gray-200 rounded animate-pulse"></div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
                              <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-white rounded-lg shadow-sm p-4">
                            <div className="w-full h-40 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                          <div className="bg-white rounded-lg shadow-sm p-4">
                            <div className="w-full h-40 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 