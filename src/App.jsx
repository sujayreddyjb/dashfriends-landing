import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Header from './components/Header'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Testimonials from './components/Testimonials'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <main className="bg-[#070818] min-h-screen">
            <Header />
            <Hero />
            <Stats />
            <Testimonials />
          </main>
        } />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Navigate to="/signin" replace />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  )
}
