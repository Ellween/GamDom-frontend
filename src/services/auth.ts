import axios from 'axios';
import { setAuthToken } from './api';

const API_URL = 'http://localhost:3005/api';

export const login = async (username: string, password: string): Promise<void> => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      setAuthToken(response.data.token);
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const logout = async (): Promise<void> => {
  // Remove the token from storage
  localStorage.removeItem('token');
  setAuthToken(null);
};

export const checkAuthStatus = async (): Promise<boolean> => {
  const token = localStorage.getItem('token');
  if (token) {
    setAuthToken(token);
    return true;
  }
  return false;
};