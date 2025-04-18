import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventDetailsPage.css';

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const transformEventDetails = (backendDetails) => {
    let type = "other";
    if (backendDetails.director) {
      type = "movie";
    } else if (backendDetails.host) {
      type = "concert";
    }
    return {
      id: backendDetails.eventId,
      title: backendDetails.name,
      date: backendDetails.eventDate,
      time: backendDetails.startTime,
      poster: backendDetails.posterImage || "https://via.placeholder.com/800x300",
      location: "Mumbai",
      type,
      price: backendDetails.price || 0,
      details: {
        duration: "N/A",
        ...(type === "concert" && {
          host: backendDetails.host,
          performers: backendDetails.performers,
          sponsors: backendDetails.sponsors,
        }),
        ...(type === "movie" && {
          cast: backendDetails.cast,
          director: backendDetails.director,
          runtime: backendDetails.runtime,
        }),
      },
    };
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/events/${eventId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch event details");
        return res.json();
      })
      .then((data) => {
        if (data.eventDetails) {
          const transformed = transformEventDetails(data.eventDetails);
          setEvent(transformed);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching event details:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [eventId]);

  const handleBookNow = () => {
    if (event) {
      navigate(event.type === 'concert' ? '/select-seats-concert' : '/select-seats', {
        state: { event }
      });
      
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>No event details available</div>;

  return (
    <div className="event-details-page">
      <div
        className="event-hero"
        style={{ backgroundImage: `url(${event.poster})` }}
      >
        <div className="hero-overlay">
          <h1 className="event-title">{event.title}</h1>
        </div>
      </div>

      <div className="event-content">
        <div className="event-meta-grid">
          <div className="meta-item">
            <span className="meta-label">Date & Time</span>
            <span className="meta-value">
              {new Date(event.date).toLocaleDateString('en-IN')} • {event.time}
            </span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Location</span>
            <span className="meta-value">{event.location}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Duration</span>
            <span className="meta-value">{event.details.duration}</span>
          </div>
        </div>

        {event.type === 'concert' && (
          <div className="details-section">
            <h2>Concert Details</h2>
            <div className="detail-item">
              <span>Host:</span>
              <span>{event.details.host}</span>
            </div>
            <div className="detail-item">
              <span>Performers:</span>
              <div className="artist-list">
                {event.details.performers?.map((artist, i) => (
                  <div key={i} className="artist-tag">{artist}</div>
                ))}
              </div>
            </div>
            <div className="detail-item">
              <span>Sponsors:</span>
              <div className="sponsor-list">
                {event.details.sponsors?.map((sponsor, i) => (
                  <div key={i} className="sponsor-tag">{sponsor}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {event.type === 'movie' && (
          <div className="details-section">
            <h2>Movie Details</h2>
            <div className="detail-item">
              <span>Cast:</span>
              <div className="cast-list">
                {event.details.cast?.map((actor, i) => (
                  <div key={i} className="cast-tag">{actor}</div>
                ))}
              </div>
            </div>
            <div className="detail-item">
              <span>Director:</span>
              <span className="director">{event.details.director}</span>
            </div>
            <div className="detail-item">
              <span>Runtime:</span>
              <span className="runtime">{event.details.runtime} minutes</span>
            </div>
          </div>
        )}

        <div className="booking-cta">
          <div className="price-section">
            <span className="price-label">Starting from</span>
            <span className="price">${event.price}</span>
          </div>
          <button
            className="book-button"
            onClick={handleBookNow}
          >
            Book Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;