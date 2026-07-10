export const appConfig = {
  name: import.meta.env.VITE_APP_NAME || 'Jwazzy Travel',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  supportedLanguages: ['en', 'ar'],
  defaultLanguage: 'en',
  theme: {
    light: 'light',
    dark: 'dark'
  }
}

export const apiConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
}

export const features = {
  multiLanguage: true,
  darkMode: true,
  stripePayments: true,
  bookingSystem: true,
}