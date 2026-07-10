// components/NetworkStatusHandler.jsx
import React, { useState, useEffect } from 'react'
import NetworkOffline from './NetworkOffline'

const NetworkStatusHandler = ({ children }) => {
  const [isOnline, setIsOnline] = useState(true)
  const [showOffline, setShowOffline] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowOffline(false)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowOffline(true)
    }

    // Set initial state
    setIsOnline(navigator.onLine)
    setShowOffline(!navigator.onLine)

    // Add event listeners
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Show offline page only when we're sure we're offline
  if (showOffline) {
    return <NetworkOffline />
  }

  return children
}

export default NetworkStatusHandler