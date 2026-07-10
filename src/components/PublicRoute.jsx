import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoadingSpinner from './LoadingSpinner'

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()


  if (isAuthenticated) {
    // Redirect to home page if already authenticated
    return <Navigate to="/" replace />
  }

  return children
}

export default PublicRoute