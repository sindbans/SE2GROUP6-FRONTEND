import React from 'react';
import { Link } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ event }) => {
  return (
    <Link to={`/events/${event.id}`} className="event-card">
      <div className="card-image-container">
        <img src={event.poster} alt={event.title} className="event-image" />
        <div className="event-type">{event.type.toUpperCase()}</div>
      </div>
      <div className="card-content">
        <h3 className="event-title">{event.title}</h3>
        <div className="event-meta">
          <span className="event-date">
          {new Date(event.date).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  })} • {new Date(event.date).toLocaleTimeString('en-IN', {
    hour: 'numeric', minute: '2-digit'
  })}

          </span>
          <span className="event-price">₹{event.price}</span>
        </div>
        <div className="event-location">{event.location}</div>
      </div>
    </Link>
  );
};

export default EventCard;


