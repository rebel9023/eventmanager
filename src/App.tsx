import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import EventList from './components/EventList';
import EditEvent from './pages/EditEvent';
import CalendarView from './pages/CalendarView';
import Login from './pages/Login';
import Register from './pages/Register';
import WeddingPlanner from './pages/WeddingPlanner';
import EventCategories from './pages/EventCategories';
import VendorList from './pages/VendorList';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Attendees from './pages/Attendees';
import Ticketing from './pages/tickets/Ticketing';
import Agenda from './pages/Agenda';
import Tasks from './pages/Tasks';
import VendorsSponsors from './pages/VendorsSponsors';
import Reports from './pages/Reports';
import { Event, RSVP } from './types';
import './styles/main.css';

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);

  // Fetch events and RSVPs from backend on mount
  useEffect(() => {
    fetch('http://localhost:4000/api/events')
      .then(res => res.json())
      .then(setEvents)
      .catch(console.error);
    fetch('http://localhost:4000/api/rsvps')
      .then(res => res.json())
      .then(setRsvps)
      .catch(console.error);
  }, [events.length, rsvps.length]);

  return (
    <Router>
      <div className="d-flex">
        <nav className="sidebar bg-white shadow-sm p-3" style={{ minWidth: 220 }}>
          <div className="navbar-brand d-flex align-items-center mb-4">
            <img src="/logo-event-planner.svg" alt="Event Planner Logo" width="36" height="36" className="me-2 rounded-circle shadow-sm" />
            <span className="navbar-brand-custom">Event Planner</span>
          </div>
          <ul className="nav flex-column">
            <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/events">Events</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/create-event">Create Event</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/calendar">Calendar</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/attendees">Attendees</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/ticketing">Ticketing</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/agenda">Agenda</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/tasks">Tasks</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/vendors-sponsors">Vendors & Sponsors</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/reports">Reports</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/event-categories">Event Categories</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/vendor-list">Vendor Directory</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/wedding-planner">Wedding Planner</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
          </ul>
        </nav>
        <main className="flex-grow-1 dashboard-main p-4" style={{ background: '#f8fafc' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-event" element={<CreateEvent setEvents={setEvents} events={events} />} />
            <Route path="/events" element={<EventList events={events} setEvents={setEvents} rsvps={rsvps} setRsvps={setRsvps} />} />
            <Route path="/edit-event/:id" element={<EditEvent events={events} setEvents={setEvents} />} />
            <Route path="/calendar" element={<CalendarView events={events} />} />
            <Route path="/wedding-planner" element={<WeddingPlanner />} />
            <Route path="/event-categories" element={<EventCategories />} />
            <Route path="/vendor-list" element={<VendorList />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/attendees" element={<Attendees />} />
            <Route path="/ticketing" element={<Ticketing />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/vendors-sponsors" element={<VendorsSponsors />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
