import React, { useState } from 'react';
import { SportEvent } from '../interfaces/SportEvent';
import BetModal from './BetModal';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

interface EventItemProps {
  event: SportEvent;
  isLoggedIn: boolean;
  onLoginRequired: () => void;
}

const EventItem: React.FC<EventItemProps> = ({ event, isLoggedIn, onLoginRequired }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (isLoggedIn) {
      setShowModal(true);
    } else {
      onLoginRequired();
    }
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        boxShadow: 3,
        minHeight: '200px',
        filter: isLoggedIn ? 'none' : 'blur(5px)',
        transition: 'filter 0.3s ease-in-out',
        '&:hover': {
          cursor: isLoggedIn ? 'pointer' : 'not-allowed',
        },
      }}
      onClick={isLoggedIn ? undefined : onLoginRequired}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6" gutterBottom color="text.primary">{event.event_name}</Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>Odds: {event.odds}</Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleClick}
            fullWidth
            sx={{
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#05CC6B',
              },
            }}
          >
            Place Bet
          </Button>
        </Box>
      </CardContent>
      {isLoggedIn && (
        <BetModal
          open={showModal}
          eventName={event.event_name}
          odds={event.odds}
          onClose={() => setShowModal(false)}
        />
      )}
    </Card>
  );
};

export default EventItem;