import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { SportEvent } from '../interfaces/SportEvent';
import EventItem from './EventItem';
import { Typography, Grid, CircularProgress, Alert, Box } from '@mui/material';
import { fetchEvents, mockEvents } from '../services/api';

const EventList: React.FC<{ onLoginRequired: () => void }> = ({ onLoginRequired }) => {
  const { isLoggedIn } = useAuth();
  const [events, setEvents] = useState<SportEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getEvents = async (): Promise<void> => {
      try {
        if (isLoggedIn) {
          const fetchedEvents = await fetchEvents();
          setEvents(fetchedEvents);
        } else {
          setEvents(mockEvents);
        }
      } catch (err) {
        setError('Error fetching events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, [isLoggedIn]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 6, textAlign: 'center' }}>Sports Events</Typography>
      <Grid container spacing={6}>
        {events.map((event: SportEvent) => (
          <Grid item xs={12} sm={6} md={4} key={event.event_id}>
            <EventItem event={event} isLoggedIn={isLoggedIn} onLoginRequired={onLoginRequired} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EventList;