import axios from 'axios';
import { SportEvent } from '../interfaces/SportEvent';

const API_BASE_URL = 'http://localhost:3005/api';

// Add a function to set the authorization token
export const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const fetchEvents = async (): Promise<SportEvent[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events');
  }
};

// Mock events for when the user is not logged in
export const mockEvents: SportEvent[] = [
  { event_id: 1, event_name: 'Mock Event 1', odds: 1.5 },
  { event_id: 2, event_name: 'Mock Event 2', odds: 2.0 },
  { event_id: 3, event_name: 'Mock Event 3', odds: 1.8 },
];