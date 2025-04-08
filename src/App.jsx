import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Header from './components/Header'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="bg-[#070818] min-h-screen">
            <Header />
            <main>
              <Hero />
              <Stats />
              <Testimonials />
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
      </Routes>
    </Router>
  )
}
