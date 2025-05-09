import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { Toaster } from 'react-hot-toast'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Header from './components/Header'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import Footer from './components/Footer'
import Dashboard from './pages/dashboard/Dashboard'
import Friends from './pages/friends/Friends'
import Achievements from './pages/achievements/Achievements'
import WhyUs from './components/WhyUs'
import Features from './components/Features'
import Profile from './pages/profile/Profile'
import ProfileSettings from './pages/profile/ProfileSettings'
import Demo from './pages/demo/Demo'
import './styles/animations.css'

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={
            <div className="bg-[#070818] min-h-screen">
              <Header />
              <main>
                <Hero />
                <Features />
                <WhyUs />
                <Stats />
                <Testimonials />
                <Pricing />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/signin" element={
            <div className="bg-[#070818] min-h-screen">
              <SignIn />
            </div>
          } />
          <Route path="/login" element={<Navigate to="/signin" replace />} />
          <Route path="/signup" element={
            <div className="bg-[#070818] min-h-screen">
              <SignUp />
            </div>
          } />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/settings" element={<ProfileSettings />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}
