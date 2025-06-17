import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, Event, RSVP } from '../services/api';

// Event interface is imported from api.ts

interface EventListProps {
    events: Event[];
    setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
    rsvps?: RSVP[];
    setRsvps?: React.Dispatch<React.SetStateAction<RSVP[]>>;
}

const EventList: React.FC<EventListProps> = ({ events, setEvents, rsvps = [], setRsvps }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [locations, setLocations] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch events
                const eventData = await api.events.getAll();
                setEvents(eventData);

                // Extract unique locations
                const uniqueLocations = [...new Set(eventData.map(event => event.location))];
                setLocations(uniqueLocations);

                // Fetch RSVPs for current user
                if (setRsvps) {
                    const rsvpData = await api.rsvps.getByUser('user1');
                    setRsvps(rsvpData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [setEvents, setRsvps]);

    const handleRSVP = async (eventId: string, status: 'going' | 'maybe' | 'not going') => {
        if (!setRsvps) return;
        const userId = 'user1';
        
        try {
            await api.rsvps.create({ eventId, userId, status });
            const existing = rsvps.find(r => r.eventId === eventId && r.userId === userId);
            if (existing) {
                setRsvps(rsvps.map(r => (r.eventId === eventId && r.userId === userId ? { ...r, status } : r)));
            } else {
                setRsvps([...rsvps, { eventId, userId, status }]);
            }
        } catch (error) {
            alert('Failed to RSVP: ' + error);
        }
    };

    if (loading) {
        return <div>Loading events...</div>;
    }

    return (
        <div>
            <h2>Event List</h2>
            <div className="location-list">
                <h3>All Locations</h3>
                <ul>
                    {locations.map(loc => (
                        <li key={loc}>{loc}</li>
                    ))}
                </ul>
            </div>
            <ul className="event-list">
                {events.map(event => (
                    <li className="event-item" key={event.id}>
                        <h3>{event.title}</h3>
                        <p>
                            <b>Date:</b> {event.date}
                        </p>
                        <p>
                            <b>Location:</b> {event.location}
                        </p>
                        <p>{event.description}</p>
                        <Link to={`/edit-event/${event.id}`}>Edit</Link>
                        <div>
                            <button onClick={() => handleRSVP(event.id, 'going')}>Going</button>
                            <button onClick={() => handleRSVP(event.id, 'maybe')}>Maybe</button>
                            <button onClick={() => handleRSVP(event.id, 'not going')}>Not Going</button>
                            {rsvps &&
                                rsvps.find(r => r.eventId === event.id && r.userId === 'user1') && (
                                    <span className="rsvp-status">
                                        RSVP: {rsvps.find(r => r.eventId === event.id && r.userId === 'user1')?.status}
                                    </span>
                                )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;
