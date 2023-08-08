import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; 

const token = localStorage.getItem('jwtToken');
export const HttpService = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`
  }
});

