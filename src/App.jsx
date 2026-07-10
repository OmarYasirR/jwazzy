import { BrowserRouter as Router } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { StripeProvider } from './contexts/StripeContext'
import { BookingProvider } from './contexts/BookingContext'
import { AuthProvider } from './contexts/AuthContext'
import ScrollToTop from './components/ScrollToTop'
import AppLayout from './AppLayout'
import NetworkOffline from './components/NetworkOffline'
import { useEffect, useState } from 'react'


// Protected Route Component
// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth()
  
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-light dark:border-primary-dark mx-auto mb-4"></div>
//           <p className="text-gray-600 dark:text-gray-300">Loading...</p>
//         </div>
//       </div>
//     )
//   }
  
//   return user ? children : <Navigate to="/login" replace />
// }

// // Public Route Component (redirect to home if already authenticated)
// const PublicRoute = ({ children }) => {
//   const { user, loading } = useAuth()
  
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-light dark:border-primary-dark mx-auto mb-4"></div>
//           <p className="text-gray-600 dark:text-gray-300">Loading...</p>
//         </div>
//       </div>
//     )
//   }
  
//   return !user ? children : <Navigate to="/" replace />
// }

// Main App Layout


function App() {

    const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [isOnline])

  if (!isOnline) {
    return <NetworkOffline  />
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <StripeProvider>
          <AuthProvider>
            <BookingProvider>
              <Router>
                <ScrollToTop />
                {isOnline ? <AppLayout /> : <NetworkOffline />}
              </Router>
            </BookingProvider>
          </AuthProvider>
        </StripeProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App