import React from 'react';
import { Event } from '../types';

interface CalendarViewProps {
  events: Event[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ events }) => {
  // Simple list for now; can be replaced with a calendar UI library
  return (
    <div>
      <h1>Calendar View</h1>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <b>{event.date}:</b> {event.title} at {event.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarView;
