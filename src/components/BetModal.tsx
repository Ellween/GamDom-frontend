import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, Snackbar, Box, IconButton } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';

interface BetModalProps {
  open: boolean;
  eventName: string;
  odds: number;
  onClose: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BetModal: React.FC<BetModalProps> = ({ open, eventName, odds, onClose }) => {
  const [amount, setAmount] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
      onClose();
    }, 1500);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{ 
          bgcolor: '#141A22', 
          color: 'white', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '20px 24px',
        }}>
          Place Bet
          <IconButton aria-label="close" onClick={onClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ bgcolor: '#141A22', padding: '24px' }}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>{eventName}</Typography>
            <Typography variant="body1" gutterBottom>Odds: {odds}</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                autoFocus
                margin="dense"
                label="Bet Amount"
                type="number"
                fullWidth
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                sx={{ mt: 2 }}
              />
            </form>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: '16px 24px', bgcolor: '#141A22' }}>
          <Button 
            onClick={onClose} 
            variant="outlined" 
            sx={{ 
              color: 'white', 
              borderColor: 'white',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="secondary"
            sx={{ 
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#05CC6B',
              },
            }}
          >
            Place Bet
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success" sx={{ 
          width: '100%', 
          bgcolor: '#06FF86', 
          color: '#000000',
          '& .MuiAlert-icon': {
            color: '#000000',
          },
        }}>
          Bet placed successfully for {eventName}!
        </Alert>
      </Snackbar>
    </>
  );
};

export default BetModal;