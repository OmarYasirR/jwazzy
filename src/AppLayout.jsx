import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import Tours from './pages/Tours'
import Booking from './pages/Booking'
import Payment from './pages/Payment'
import About from './pages/About'
import Contact from './pages/Contact'
import BookingConfirmation from './pages/BookingConfirmation'
import Login from './pages/Login'
import Register from './pages/Register'
import PublicRoute from './components/PublicRoute'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './pages/Prifile'
import ForgotPassword from './pages/ForgotPassword'
import MyBookings from './pages/MyBookings'
import { useAuth } from './contexts/AuthContext'
import { Routes, Route, Navigate } from 'react-router-dom'



const AppLayout = () => {
  const { user } = useAuth()
  
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
      {user && <Navbar />}
      <main className={`${user ? 'flex-grow' : 'min-h-screen'}`}>
        <Routes>
          {/* Public Routes (accessible without auth) */}
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/forgot-password" element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />
          
          {/* Protected Routes (require authentication) */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/destinations" element={
            <ProtectedRoute>
              <Destinations />
            </ProtectedRoute>
          } />
          <Route path="/tours" element={
            <ProtectedRoute>
              <Tours />
            </ProtectedRoute>
          } />
          <Route path="/booking" element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          } />
          <Route path="/payment" element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          } />
          <Route path="/booking-confirmation" element={
            <ProtectedRoute>
              <BookingConfirmation />
            </ProtectedRoute>
          } />
          <Route path="/about" element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          } />
          <Route path="/my-bookings" element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/contact" element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          } />
          
          {/* Catch all route - redirect to login if not authenticated, home if authenticated */}
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
        </Routes>
      </main>
      {user && <Footer />}
    </div>
  )
}

export default AppLayout