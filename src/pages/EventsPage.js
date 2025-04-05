import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import EventCard from '../components/EventCard';
import './EventsPage.css';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    date: '',
    location: 'Mumbai',
    category: 'all',
    priceRange: [0, 5000],
  });
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const transformEvent = (backendEvent) => {
    let type = 'other';
    if (backendEvent.type === 'MovieSchema') type = 'movie';
    else if (backendEvent.type === 'ConcertSchema') type = 'concert';
    else if (backendEvent.type === 'TheatreSchema' || backendEvent.type === 'Theatre') type = 'theatre';

    return {
      id: backendEvent.eventId,
      title: backendEvent.name,
      date: backendEvent.eventDate,
      poster: backendEvent.posterImage || 'https://via.placeholder.com/150',
      type: type,
      price: 0,
      location: 'Mumbai',
    };
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const url = new URL('http://localhost:3000/api/events');
        const res = await fetch(url);
        const data = await res.json();
        if (data.events) {
          const transformed = data.events.map(transformEvent);
          setEvents(transformed);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesDate = !filters.date || new Date(event.date).toISOString().slice(0, 10) === filters.date;
    const matchesLocation = event.location === filters.location;
    const matchesCategory = filters.category === 'all' || event.type === filters.category;
    const matchesPrice = event.price >= filters.priceRange[0] && event.price <= filters.priceRange[1];
    return matchesDate && matchesLocation && matchesCategory && matchesPrice;
  });

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="events-page">
      <Header />

      <div className="filter-toggle">
        <button onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {showFilters && (
        <div className="filters-container inline" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', margin: '20px 0' }}>
          <div className="filter-group">
            <label>Date</label>
            <input
              type="date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            />
          </div>

          <div className="filter-group">
            <label>Location</label>
            <select
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            >
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Bengaluru">Bengaluru</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="all">All</option>
              <option value="concert">Concerts</option>
              <option value="movie">Movies</option>
              <option value="theatre">Theatre</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Price Range</label>
            <input
              type="range"
              min="0"
              max="5000"
              value={filters.priceRange[1]}
              onChange={(e) => setFilters({ ...filters, priceRange: [0, Number(e.target.value)] })}
            />
            <div className="price-range">₹0 - ₹{filters.priceRange[1]}</div>
          </div>
        </div>
      )}

      <div className="events-grid">
        {paginatedEvents.length > 0 ? (
          paginatedEvents.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <p style={{ textAlign: 'center', marginTop: '40px' }}>No events found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination" style={{ textAlign: 'center', marginTop: '30px' }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              style={{
                padding: '8px 14px',
                margin: '0 6px',
                borderRadius: '5px',
                border: pageNum === currentPage ? '2px solid #000' : '1px solid #ccc',
                backgroundColor: pageNum === currentPage ? '#f0f0f0' : '#fff',
              }}
            >
              {pageNum}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;


