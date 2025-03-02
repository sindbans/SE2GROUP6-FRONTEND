import { Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const MetricCard = ({ title, value, icon, progress, trend }) => (
  <Card elevation={3}>
    <CardContent>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ color: '#1976d2' }}>{icon}</div>
        <div>
          <Typography variant="h5">{value}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {title}
          </Typography>
          {progress && (
            <div style={{ 
              marginTop: '8px', 
              width: '100%', 
              height: '8px', 
              backgroundColor: '#eee', 
              borderRadius: '4px' 
            }}>
              <div style={{ 
                width: `${progress}%`, 
                height: '100%', 
                backgroundColor: '#4caf50',
                borderRadius: '4px' 
              }} />
            </div>
          )}
          {trend && (
            <span style={{
              color: trend.startsWith('+') ? '#4caf50' : '#f44336'
            }}>
              {trend}
            </span>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

MetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.element.isRequired,
  progress: PropTypes.number,
  trend: PropTypes.string,
};

export default MetricCard;
