// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Memoized auth status check to prevent unnecessary re-renders
  const checkAuthStatus = useCallback(async () => {
    try {
      const token = localStorage.getItem('jwazzy_token')
      if (token) {
        const userData = await authService.verifyToken(token)
        setUser(userData)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('jwazzy_token')
      setError('Your session has expired. Please log in again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuthStatus()
  }, [checkAuthStatus])

  const login = async (email, password) => {
    try {
      setError('')
      setLoading(true)
      
      // Basic validation
      if (!email || !password) {
        setError('Email and password are required')
        return { success: false, error: 'Email and password are required' }
      }

      const result = await authService.login(email, password)
      
      if (result.success) {
        setUser(result.user)
        localStorage.setItem('jwazzy_token', result.token)
        return { success: true }
      } else {
        setError(result.error || 'Login failed')
        return { success: false, error: result.error }
      }
    } catch (error) {
      const errorMessage = error.message || 'An unexpected error occurred during login'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setError('')
      setLoading(true)
      
      // Basic validation
      if (!userData.email || !userData.password) {
        setError('Email and password are required')
        return { success: false, error: 'Email and password are required' }
      }

      if (userData.password.length < 6) {
        setError('Password must be at least 6 characters long')
        return { success: false, error: 'Password must be at least 6 characters long' }
      }

      const result = await authService.register(userData)
      
      if (result.success) {
        setUser(result.user)
        localStorage.setItem('jwazzy_token', result.token)
        return { success: true }
      } else {
        setError(result.error || 'Registration failed')
        return { success: false, error: result.error }
      }
    } catch (error) {
      const errorMessage = error.message || 'An unexpected error occurred during registration'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const logout = useCallback(() => {
    setUser(null)
    setError('')
    localStorage.removeItem('jwazzy_token')
  }, [])

  const updateProfile = async (userData) => {
    try {
      if (!user) {
        return { success: false, error: 'No user logged in' }
      }

      setLoading(true)
      const result = await authService.updateProfile(user._id, userData)
      
      if (result.success) {
        setUser(result.user)
        return { success: true }
      }
      return { success: false, error: result.error }
    } catch (error) {
      const errorMessage = error.message || 'Failed to update profile'
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email) => {
    try {
      setError('')
      setLoading(true)
      
      if (!email) {
        setError('Email is required')
        return { success: false, error: 'Email is required' }
      }

      const result = await authService.resetPassword(email)
      return result
    } catch (error) {
      const errorMessage = error.message || 'Failed to reset password'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const clearError = useCallback(() => {
    setError('')
  }, [])

  const refreshUser = useCallback(async () => {
    if (user) {
      await checkAuthStatus()
    }
  }, [user, checkAuthStatus])

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    resetPassword,
    clearError,
    refreshUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isVerified: user?.isVerified === true
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}