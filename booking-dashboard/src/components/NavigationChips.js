import { Chip } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const NavigationChips = () => {
  const location = useLocation();

  const getVariant = (path) =>
    location.pathname.includes(path) ? 'filled' : 'outlined';

  return (
    <div style={{ marginBottom: '24px' }}>
      <Chip
        label="Movies"
        component={Link}
        to="/movies"
        variant={getVariant('/movies')}
        sx={{ mr: 1 }}
      />
      <Chip
        label="Events"
        component={Link}
        to="/events"
        variant={getVariant('/events')}
        sx={{ mr: 1 }}
      />
      <Chip
        label="Theaters"
        component={Link}
        to="/theaters"
        variant={getVariant('/theaters')}
      />
    </div>
  );
};

export default NavigationChips;
