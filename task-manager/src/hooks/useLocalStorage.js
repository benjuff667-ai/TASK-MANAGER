import { useState, useEffect } from 'react'

/**
 * useLocalStorage
 * A reusable hook that behaves like useState but automatically
 * reads from and writes to localStorage, so data survives a page refresh.
 *
 * @param {string} key - the localStorage key to use
 * @param {*} initialValue - fallback value if nothing is stored yet
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch (error) {
      console.warn(`Could not read localStorage key "${key}":`, error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`Could not write localStorage key "${key}":`, error)
    }
  }, [key, value])

  return [value, setValue]
}
