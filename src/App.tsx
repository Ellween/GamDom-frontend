import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, AppBar, Toolbar, Box, Button } from '@mui/material';
import EventList from './components/EventList';
import LoginModal from './components/LoginModal';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#06FF86',
    },
    background: {
      default: '#000000',
      paper: '#141A22',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#141A22',
          borderRadius: '8px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
        },
        containedSecondary: {
          color: '#000000',
          '&:hover': {
            backgroundColor: '#05CC6B',
          },
        },
      },
    },
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
});

const AppContent: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      bgcolor: 'background.default',
    }}>
      <AppBar position="static" color="primary" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <img src="/images/logo.svg" alt="Logo" style={{ height: '40px' }} />
            <Button 
              color="secondary" 
              variant="contained" 
              onClick={isLoggedIn ? logout : () => setShowLoginModal(true)}
              sx={{ fontWeight: 'bold' }}
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Container 
        maxWidth="lg" 
        sx={{ 
          mt: 4, 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
        }}
      >
        <EventList onLoginRequired={() => setShowLoginModal(true)} />
      </Container>
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
