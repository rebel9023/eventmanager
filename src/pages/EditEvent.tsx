import React, { useState } from 'react';
import { Event } from '../types';
import { useNavigate, useParams } from 'react-router-dom';

interface EditEventProps {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

const EditEvent: React.FC<EditEventProps> = ({ events, setEvents }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find(e => e.id === id);
  const [title, setTitle] = useState(event?.title || '');
  const [date, setDate] = useState(event?.date || '');
  const [location, setLocation] = useState(event?.location || '');
  const [description, setDescription] = useState(event?.description || '');
  const [organizer, setOrganizer] = useState(event?.organizer || '');

  if (!event) return <div>Event not found.</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedEvent = { ...event, title, date, location, description, organizer };
    fetch(`http://localhost:4000/api/events/${event.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEvent),
    })
      .then(res => res.json())
      .then(() => {
        setEvents(events.map(ev => ev.id === id ? updatedEvent : ev));
        navigate('/events');
      })
      .catch(err => alert('Failed to update event: ' + err));
  };

  return (
    <div>
      <h1>Edit Event</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Name:</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required placeholder="Enter event name" title="Event Name" />
        </div>
        <div>
          <label>Event Date:</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} required placeholder="Select event date" title="Event Date" />
        </div>
        <div>
          <label>Event Location:</label>
          <input type="text" value={location} onChange={e => setLocation(e.target.value)} required placeholder="Enter event location" title="Event Location" />
        </div>
        <div>
          <label>Event Description:</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} required placeholder="Enter event description" title="Event Description" />
        </div>
        <div>
          <label>Organizer:</label>
          <input type="text" value={organizer} onChange={e => setOrganizer(e.target.value)} required placeholder="Enter organizer name" title="Organizer" />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditEvent;
