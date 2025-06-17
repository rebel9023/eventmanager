export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    organizer: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface RSVP {
    eventId: string;
    userId: string;
    status: 'going' | 'maybe' | 'not going';
}