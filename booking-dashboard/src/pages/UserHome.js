// src/pages/UserHome.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { UserContext } from '../UserContext';

const UserHome = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const upcomingEvents = [
    { id: 1, title: 'Concert: Rocking Stars', date: '2025-06-15' },
    { id: 2, title: 'Art Expo 2025', date: '2025-07-01' },
  ];

  return (
    <div>
      {/* Navigation Bar */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#Black' }}>
            BOOK VISTA
          </Typography>

          {/* Search Bar */}
          <div style={{ display: 'flex', alignItems: 'center', flex: 1, margin: '0 20px' }}>
            <TextField
              variant="outlined"
              placeholder="Search for Movies, Events, Plays, Sports and Activities"
              size="small"
              fullWidth
              sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
              InputProps={{
                endAdornment: (
                  <IconButton edge="end">
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </div>

          {/* Right Side: If user is logged in, greet them by name; else show Sign In. */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Button color="inherit" onClick={() => alert('Upcoming Concerts')}>
              Upcoming Concerts
            </Button>
            <Button color="inherit" onClick={() => alert('Popular Shows')}>
              Popular Shows
            </Button>
            <Button color="inherit" onClick={() => alert('My Bookings')}>
              My Bookings
            </Button>
            {user ? (
              <Button variant="contained" color="success">
                Hello, {user.firstName}
              </Button>
            ) : (
              <Button variant="contained" color="error" onClick={() => navigate('/login')}>
                Sign In
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <div style={styles.container}>
        <Typography variant="h3" style={{ marginBottom: '20px' }}>
          {user ? `Welcome back, ${user.firstName}!` : 'Welcome to Our Booking System'}
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '20px' }}>
          Discover upcoming events, movies, and theaters near you.
        </Typography>

        {/* Example: Upcoming Events Section */}
        <Typography variant="h5" style={{ marginTop: '40px', marginBottom: '16px' }}>
          Upcoming Events
        </Typography>
        <Grid container spacing={2}>
          {upcomingEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{event.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {`Date: ${event.date}`}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '40px auto',
    textAlign: 'center',
    padding: '20px',
  },
};

export default UserHome;
