import axios from 'axios';

// Set the base URL for the backend API
const API_URL = 'http://localhost:5000/api/auth/'; 

// Function for user registration
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);
  
  if (response.data.token) {
    // Store user data and token in local storage upon successful registration
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Function for user login
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data.token) {
    // Store user data and token in local storage upon successful login
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Function to log user out
const logout = () => {
  localStorage.removeItem('user');
};

const getProfile = async () => {
  // Get token from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user ? user.token : null;

  if (!token) {
    throw new Error('No token found');
  }

  // Configuration for the private request
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Send the JWT
    },
  };

  const response = await axios.get('http://localhost:5000/api/users/profile', config);
  return response.data;
};

const authService = {
  register,
  logout,
  login,
  getProfile,
};

export default authService;


