import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField, InputAdornment, Button, Card, CardContent, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import TheatersIcon from '@mui/icons-material/Theaters';
import BarChartIcon from '@mui/icons-material/BarChart';
import MetricCard from '../components/MetricCard';

const AdminDashboard = () => {
  const navigate = useNavigate(); // React Router's navigation hook

  return (
    <div style={{ padding: '24px' }}>
      {/* Dashboard Title */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '24px',
          color: '#1976d2',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
        }}
      >
        Event Management Dashboard
      </Typography>

      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Search movies, events, cinemas..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 4 }}
      />

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginRight: 2 }}
          onClick={() => navigate('/movies')}
        >
          Movies
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ marginRight: 2 }}
          onClick={() => navigate('/events')}
        >
          Events
        </Button>
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() => navigate('/theaters')}
        >
          Theaters
        </Button>
      </div>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard 
            title="Total Bookings"
            value="2,456"
            icon={<EventSeatIcon fontSize="large" />}
            progress={75}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Active Shows"
            value="148"
            icon={<TheatersIcon fontSize="large" />}
            trend="+12%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Revenue"
            value="$45,230"
            icon={<BarChartIcon fontSize="large" />}
          />
        </Grid>
      </Grid>

      {/* Recent Bookings Section */}
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Bookings
          </Typography>
          {/* Booking Table Placeholder */}
          <div style={{ height: 200 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#666'
            }}>
              Booking management table (Coming Soon)
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;

