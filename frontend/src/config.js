// services/config.js

const environment = process.env.REACT_APP_ENV || 'development';

const config = {
  development: {
    API_URL: 'http://51.21.93.236:6050/api', // For local development
  },
  production: {
    API_URL: 'http://your-load-balancer-dns-name/api', // Your ALB endpoint
    // Or if using CloudFront: 'https://your-cloudfront-distribution-id.cloudfront.net/api'
  }
};

export const API_URL = config[environment].API_URL;