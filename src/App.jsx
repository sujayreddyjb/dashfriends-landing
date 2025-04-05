import { useState } from 'react'
import Header from './components/Header'
import Features from './components/Features'
import Hero from './components/Hero'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import WhyUs from './components/WhyUs'

function App() {
  return (
    <div className="min-h-screen bg-[#0B0B1F]">
      <Header />
      <main>
        <Hero />
        <Features />
        <WhyUs />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}

export default App
