// frontend/src/config.js
const environments = {
  development: {
    API_URL: 'http://localhost:6050/api',
    SOCKET_URL: 'http://localhost:6050',
    UPLOAD_URL: 'http://localhost:6050'
  },
  production: {
    // Use relative paths when frontend is served from same domain as backend via Load Balancer
    API_URL: '/api',
    SOCKET_URL: '',
    UPLOAD_URL: '/api'
    
    // Alternative: Direct URL to Load Balancer (uncomment if needed)
    // API_URL: 'http://your-load-balancer-dns/api',
    // SOCKET_URL: 'http://your-load-balancer-dns',
    // UPLOAD_URL: 'http://your-load-balancer-dns/api'
  }
};

// Determine environment
const getEnvironment = () => {
  const hostname = window.location.hostname;
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'development';
  }
  return 'production';
};

const env = getEnvironment();
const config = environments[env];

// Export configuration
export const API_URL = config.API_URL;
export const SOCKET_URL = config.SOCKET_URL;
export const UPLOAD_URL = config.UPLOAD_URL;
export const IS_PRODUCTION = env === 'production';

// Helper function to get full API endpoint
export const getApiEndpoint = (endpoint) => {
  // Remove any leading/trailing slashes and combine
  const base = API_URL.replace(/\/$/, '');
  const path = endpoint.replace(/^\//, '');
  return `${base}/${path}`;
};