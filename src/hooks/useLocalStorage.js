import { useState, useEffect } from 'react'

export const useLocalStorage = (key, initialValue) => {
  const [loading, setLoading] = useState(true)
  const [storedValue, setStoredValue] = useState(() => {
    try {
      setLoading(true)
      const item = window.localStorage.getItem(key)
      setLoading(false)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      setLoading(false)
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue, loading]
}