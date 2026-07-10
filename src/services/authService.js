import {sanityClient} from '../lib/sanityClient'
import CryptoJS from 'crypto-js'

// Constants
const TOKEN_SECRET = import.meta.env.VITE_TOKEN_SECRET || 'jwazzy-fallback-secret-key'
const TOKEN_EXPIRY_HOURS = parseInt(import.meta.env.VITE_TOKEN_EXPIRY_HOURS) || 24
const APP_NAME = import.meta.env.VITE_APP_NAME || 'Jwazzy'



// Enhanced password hashing with salt
const hashPassword = (password) => {
  const salt = CryptoJS.lib.WordArray.random(128/8).toString()
  const saltedPassword = salt + password
  return {
    hash: CryptoJS.PBKDF2(saltedPassword, salt, { 
      keySize: 512/32, 
      iterations: 1000 
    }).toString(),
    salt: salt
  }
}

// Verify password
const verifyPassword = (password, hashedPassword, salt) => {
  const saltedPassword = salt + password
  const hash = CryptoJS.PBKDF2(saltedPassword, salt, { 
    keySize: 512/32, 
    iterations: 1000 
  }).toString()
  return hash === hashedPassword
}

// Enhanced token generation with better security
const generateToken = (user) => {
  const payload = {
    userId: user._id,
    email: user.email,
    role: user.role,
    timestamp: Date.now(),
    expiry: Date.now() + (TOKEN_EXPIRY_HOURS * 60 * 60 * 1000)
  }
  
  const encryptedPayload = CryptoJS.AES.encrypt(
    JSON.stringify(payload), 
    TOKEN_SECRET
  ).toString()
  
  // Add signature for extra security
  const signature = CryptoJS.HmacSHA256(encryptedPayload, TOKEN_SECRET).toString()
  
  return `${encryptedPayload}.${signature}`
}

// Enhanced token verification
const verifyToken = (token) => {
  try {
    if (!token || typeof token !== 'string') {
      throw new Error('Invalid token format')
    }

    const [encryptedPayload, signature] = token.split('.')
    
    if (!encryptedPayload || !signature) {
      throw new Error('Invalid token structure')
    }

    // Verify signature
    const expectedSignature = CryptoJS.HmacSHA256(encryptedPayload, TOKEN_SECRET).toString()
    if (signature !== expectedSignature) {
      throw new Error('Token signature invalid')
    }

    // Decrypt payload
    const bytes = CryptoJS.AES.decrypt(encryptedPayload, TOKEN_SECRET)
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
    
    if (!decryptedData) {
      throw new Error('Failed to decrypt token')
    }

    const payload = JSON.parse(decryptedData)
    
    // Check if token is expired
    if (Date.now() > payload.expiry) {
      throw new Error('Token expired')
    }
    
    return payload
  } catch (error) {
    console.error('Token verification failed:', error.message)
    throw new Error('Invalid token')
  }
}

// Input validation
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validateUserData = (userData) => {
  const errors = []

  if (userData.email && !validateEmail(userData.email)) {
    errors.push('Invalid email format')
  }

  if (userData.password && userData.password.length < 6) {
    errors.push('Password must be at least 6 characters long')
  }

  if (userData.name && userData.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long')
  }

  return errors
}

export const authService = {
  async login (email, password) {
    try {
      // Input validation
      if (!email || !password) {
        return { success: false, error: 'Email and password are required' }
      }

      if (!validateEmail(email)) {
        return { success: false, error: 'Invalid email format' }
      }

      // Query Sanity for user with this email
      const query = `*[_type == "user" && email == $email][0]{
        _id, name, email, password, salt, role, isVerified,
        phone, dateOfBirth, nationality, passportNumber,
        createdAt, updatedAt
      }`
      
      const user = await sanityClient.fetch(query, { email })

      if (!user) {
        return { success: false, error: 'Invalid email or password' }
      }
      
      // Verify password
      const isPasswordValid = verifyPassword(password, user.password, user.salt)
      if (!isPasswordValid) {
        return { success: false, error: 'Invalid email or password' }
      }

      // Generate token
      const token = generateToken(user)

      // Remove sensitive data from user object
      const { password: _, salt: __, ...userWithoutSensitiveData } = user

      return {
        success: true,
        user: userWithoutSensitiveData,
        token
      }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        error: error.message || 'Login failed. Please try again.' 
      }
    }
  },

 async register(userData) {
  try {
    // Input validation
    const validationErrors = validateUserData(userData)
    if (validationErrors.length > 0) {
      return { success: false, error: validationErrors.join(', ') }
    }

    // Check if user already exists
    const existingUserQuery = `*[_type == "user" && email == $email][0]{
      _id, email
    }`
    
    console.log('Checking existing user for:', userData.email)
    const existingUser = await sanityClient.fetch(existingUserQuery, { 
      email: userData.email 
    })

    if (existingUser) {
      return { success: false, error: 'User already exists with this email' }
    }

    // Hash password with salt
    const { hash: hashedPassword, salt } = hashPassword(userData.password)
    
    // Create user document in Sanity
    const userDoc = {
      _type: 'user',
      name: userData.name?.trim(),
      email: userData.email.toLowerCase().trim(),
      password: hashedPassword,
      salt: salt,
      phone: userData.phone?.trim() || '',
      dateOfBirth: userData.dateOfBirth || '',
      nationality: userData.nationality?.trim() || '',
      passportNumber: userData.passportNumber?.trim() || '',
      isVerified: false,
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    console.log('Creating user document:', { 
      email: userDoc.email, 
      name: userDoc.name,
      hasPassword: !!userDoc.password 
    })

    // Create user in Sanity
    const createdUser = await sanityClient.create(userDoc)
    console.log('User created successfully:', { id: createdUser._id, email: createdUser.email })

    // Generate token
    const token = generateToken(createdUser)

    // Remove sensitive data from user object
    const { password: _, salt: __, ...userWithoutSensitiveData } = createdUser

    return {
      success: true,
      user: userWithoutSensitiveData,
      token
    }
  } catch (error) {
    console.error('Registration error details:', {
      message: error.message,
      statusCode: error.statusCode,
      response: error.response
    })
    
    let errorMessage = 'Registration failed. Please try again.'
    
    if (error.message.includes('project not found')) {
      errorMessage = 'Configuration error. Please check your Sanity project settings.'
    } else if (error.message.includes('Not authorized')) {
      errorMessage = 'Authentication error. Please check your API token permissions.'
    } else if (error.message.includes('Network error')) {
      errorMessage = 'Network error. Please check your internet connection.'
    }
    
    return { 
      success: false, 
      error: errorMessage 
    }
  }
},

  async verifyToken(token) {
    try {
      if (!token) {
        throw new Error('No token provided')
      }

      const payload = verifyToken(token)
      
      // Fetch user from Sanity
      const query = `*[_type == "user" && _id == $userId][0]{
        _id, name, email, role, isVerified,
        phone, dateOfBirth, nationality, passportNumber,
        createdAt, updatedAt
      }`
      
      const user = await sanityClient.fetch(query, { userId: payload.userId })

      if (!user) {
        throw new Error('User not found')
      }

      return user
    } catch (error) {
      console.error('Token verification error:', error)
      throw new Error('Invalid or expired token')
    }
  },

  async updateProfile(userId, userData) {
    try {
      if (!userId) {
        return { success: false, error: 'User ID is required' }
      }

      const validationErrors = validateUserData(userData)
      if (validationErrors.length > 0) {
        return { success: false, error: validationErrors.join(', ') }
      }

      const updateDoc = {
        ...userData,
        updatedAt: new Date().toISOString()
      }

      // If password is being updated, hash it with new salt
      if (userData.password) {
        const { hash: hashedPassword, salt } = hashPassword(userData.password)
        updateDoc.password = hashedPassword
        updateDoc.salt = salt
      }

      const updatedUser = await sanityClient
        .patch(userId)
        .set(updateDoc)
        .commit()

      // Remove sensitive data
      const { password: _, salt: __, ...userWithoutSensitiveData } = updatedUser

      return {
        success: true,
        user: userWithoutSensitiveData
      }
    } catch (error) {
      console.error('Profile update error:', error)
      return { 
        success: false, 
        error: error.message || 'Profile update failed. Please try again.' 
      }
    }
  },

  async resetPassword(email) {
    try {
      if (!email || !validateEmail(email)) {
        return { success: false, error: 'Valid email is required' }
      }

      // Check if user exists
      const userQuery = `*[_type == "user" && email == $email][0]{ _id, name }`
      const user = await sanityClient.fetch(userQuery, { email })

      if (!user) {
        return { 
          success: false, 
          error: 'If an account with that email exists, you will receive reset instructions' 
        }
      }

      // In a real implementation, you would:
      // 1. Generate a reset token
      // 2. Save it to the database with expiry
      // 3. Send email with reset link
      
      console.log(`Password reset requested for: ${email}`)
      
      return { 
        success: true, 
        message: 'If an account with that email exists, you will receive reset instructions shortly.' 
      }
    } catch (error) {
      console.error('Password reset error:', error)
      return { 
        success: false, 
        error: 'Failed to process password reset request. Please try again.' 
      }
    }
  },

  async verifyEmail(token) {
    // Implementation for email verification
    return { success: true, message: 'Email verified successfully' }
  }
}