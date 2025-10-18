// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Something went wrong');
  }
  return response.json();
};

// Helper function to make authenticated requests
const makeAuthenticatedRequest = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  return fetch(url, {
    ...options,
    headers,
  }).then(handleResponse);
};

// API Service Object
export const apiService = {
  // Authentication endpoints
  auth: {
    signin: (credentials) =>
      fetch(`${API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      }).then(handleResponse),

    signup: (userData) =>
      fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      }).then(handleResponse),

    logout: () =>
      makeAuthenticatedRequest(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
      }),

    verifyToken: () =>
      makeAuthenticatedRequest(`${API_BASE_URL}/auth/verify`),
  },

  // User endpoints
  users: {
    getProfile: () =>
      makeAuthenticatedRequest(`${API_BASE_URL}/users/profile`),

    updateProfile: (userData) =>
      makeAuthenticatedRequest(`${API_BASE_URL}/users/profile`, {
        method: 'PUT',
        body: JSON.stringify(userData),
      }),
  },

  // Trip planning endpoints
  trips: {
    getAll: () =>
      makeAuthenticatedRequest(`${API_BASE_URL}/trips`),

    getById: (id) =>
      makeAuthenticatedRequest(`${API_BASE_URL}/trips/${id}`),

    create: (tripData) =>
      makeAuthenticatedRequest(`${API_BASE_URL}/trips`, {
        method: 'POST',
        body: JSON.stringify(tripData),
      }),

    update: (id, tripData) =>
      makeAuthenticatedRequest(`${API_BASE_URL}/trips/${id}`, {
        method: 'PUT',
        body: JSON.stringify(tripData),
      }),

    delete: (id) =>
      makeAuthenticatedRequest(`${API_BASE_URL}/trips/${id}`, {
        method: 'DELETE',
      }),
  },

  // Booking endpoints
  bookings: {
    getAll: () =>
      makeAuthenticatedRequest(`${API_BASE_URL}/bookings`),

    getById: (id) =>
      makeAuthenticatedRequest(`${API_BASE_URL}/bookings/${id}`),

    create: (bookingData) =>
      makeAuthenticatedRequest(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        body: JSON.stringify(bookingData),
      }),

    update: (id, bookingData) =>
      makeAuthenticatedRequest(`${API_BASE_URL}/bookings/${id}`, {
        method: 'PUT',
        body: JSON.stringify(bookingData),
      }),

    cancel: (id) =>
      makeAuthenticatedRequest(`${API_BASE_URL}/bookings/${id}/cancel`, {
        method: 'POST',
      }),
  },

  // Hotel endpoints
  hotels: {
    search: (params) =>
      fetch(`${API_BASE_URL}/hotels/search?${new URLSearchParams(params)}`)
        .then(handleResponse),

    getById: (id) =>
      fetch(`${API_BASE_URL}/hotels/${id}`).then(handleResponse),

    getAll: () =>
      fetch(`${API_BASE_URL}/hotels`).then(handleResponse),
  },

  // Payment endpoints
  payments: {
    create: (paymentData) =>
      makeAuthenticatedRequest(`${API_BASE_URL}/payments`, {
        method: 'POST',
        body: JSON.stringify(paymentData),
      }),

    getById: (id) =>
      makeAuthenticatedRequest(`${API_BASE_URL}/payments/${id}`),

    getUserPayments: () =>
      makeAuthenticatedRequest(`${API_BASE_URL}/payments/user`),
  },
};

export default apiService;
