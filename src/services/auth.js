
import axios from 'axios';

const firebaseConfig = {
    apiKey: "AIzaSyDEVyTjCIYZ20CRFhRbJn0A5WomsNJVFUU",
    authDomain: "merapi-monitoring.firebaseapp.com",
    databaseURL: "https://merapi-monitoring-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "merapi-monitoring",
    storageBucket: "merapi-monitoring.firebasestorage.app",
    messagingSenderId: "759946480508",
    appId: "1:759946480508:web:84faa5a0d63a05f7df72f9",
    measurementId: "G-KMZ5485HS2"
};

const authService = {
  setAuthToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  register: async (email, password) => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`,
        {
          email,
          password,
          returnSecureToken: true
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data?.error?.message || error.message;
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`,
        {
          email,
          password,
          returnSecureToken: true
        }
      );

      const { idToken, localId, email: userEmail } = response.data;
      const userData = {
        email: userEmail,
        uid: localId
      };

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', idToken);
      
      return {
        user: userData,
        token: idToken
      };
    } catch (error) {
      throw error.response?.data?.error?.message || error.message;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (!token || !userData) return null;

      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseConfig.apiKey}`,
        {
          idToken: token
        }
      );

      if (response.data.users && response.data.users.length > 0) {
        return JSON.parse(userData);
      }
      
      return null;
    } catch (error) {
      authService.logout();
      return null;
    }
  }
};

// Create axios instance for database operations
export const dbService = axios.create({
  baseURL: firebaseConfig.databaseURL
});

// Add interceptor to add auth token to database requests
dbService.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // Add auth token as query parameter
    config.url = `${config.url}${config.url.includes('?') ? '&' : '?'}auth=${token}`;
  }
  return config;
});

export default authService;