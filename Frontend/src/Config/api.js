import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000';
const API_BASE_URL = "https://job-prep-q873.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Enable cookies to be sent with requests
});

export default api;
