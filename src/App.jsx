import { useState } from 'react'
import Header from './components/Header'
import Features from './components/Features'
import Hero from './components/Hero'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-blue-950">
      <Header />
      <main>
        <Hero />
        <Features />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}

export default App
