const API_BASE_URL = 'http://localhost:4000/api';

export interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    description: string;
    organizer: string;
}

export interface RSVP {
    eventId: string;
    userId: string;
    status: 'going' | 'maybe' | 'not going';
}

export const api = {
    events: {
        getAll: async (): Promise<Event[]> => {
            const response = await fetch(`${API_BASE_URL}/events`);
            if (!response.ok) throw new Error('Failed to fetch events');
            return response.json();
        },

        getById: async (id: string): Promise<Event> => {
            const response = await fetch(`${API_BASE_URL}/events/${id}`);
            if (!response.ok) throw new Error('Failed to fetch event');
            return response.json();
        },

        create: async (event: Omit<Event, 'id'>): Promise<Event> => {
            const response = await fetch(`${API_BASE_URL}/events`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(event),
            });
            if (!response.ok) throw new Error('Failed to create event');
            return response.json();
        },

        update: async (id: string, event: Partial<Event>): Promise<Event> => {
            const response = await fetch(`${API_BASE_URL}/events/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(event),
            });
            if (!response.ok) throw new Error('Failed to update event');
            return response.json();
        }
    },

    rsvps: {
        getByUser: async (userId: string): Promise<RSVP[]> => {
            const response = await fetch(`${API_BASE_URL}/rsvps?userId=${userId}`);
            if (!response.ok) throw new Error('Failed to fetch RSVPs');
            return response.json();
        },

        create: async (rsvp: RSVP): Promise<RSVP> => {
            const response = await fetch(`${API_BASE_URL}/rsvps`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(rsvp),
            });
            if (!response.ok) throw new Error('Failed to create RSVP');
            return response.json();
        }
    }
};
