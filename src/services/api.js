const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

export const apiService = {
  async get(url, options = {}) {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return response.json()
  },

  async post(url, data, options = {}) {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return response.json()
  },

  async put(url, data, options = {}) {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return response.json()
  },

  async delete(url, options = {}) {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return response.json()
  }
}

// Specific API endpoints
export const destinationsAPI = {
  getAll: () => apiService.get('/destinations'),
  getById: (id) => apiService.get(`/destinations/${id}`),
  create: (data) => apiService.post('/destinations', data),
  update: (id, data) => apiService.put(`/destinations/${id}`, data),
  delete: (id) => apiService.delete(`/destinations/${id}`),
}

export const toursAPI = {
  getAll: () => apiService.get('/tours'),
  getById: (id) => apiService.get(`/tours/${id}`),
  create: (data) => apiService.post('/tours', data),
  update: (id, data) => apiService.put(`/tours/${id}`, data),
  delete: (id) => apiService.delete(`/tours/${id}`),
}

export const bookingsAPI = {
  getAll: () => apiService.get('/bookings'),
  getById: (id) => apiService.get(`/bookings/${id}`),
  create: (data) => apiService.post('/bookings', data),
  update: (id, data) => apiService.put(`/bookings/${id}`, data),
  cancel: (id) => apiService.delete(`/bookings/${id}`),
}