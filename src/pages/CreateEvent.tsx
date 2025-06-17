import React, { useState } from 'react';
import { Form, Button, ProgressBar, Card } from 'react-bootstrap';
import { Event } from '../types';
import ScrollAnimate from '../components/ScrollAnimate';

interface CreateEventProps {
    events: Event[];
    setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

const steps = [
  'Event Details',
  'Location & Date',
  'Description',
  'Organizer',
  'Review & Submit',
];

const CreateEvent: React.FC<CreateEventProps> = ({ events, setEvents }) => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventOrganizer, setEventOrganizer] = useState('');
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const newEvent = {
      id: Date.now().toString(),
      title: eventName,
      date: eventDate,
      location: eventLocation,
      description: eventDescription,
      organizer: eventOrganizer,
    };
    fetch('http://localhost:4000/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent),
    })
      .then(res => res.json())
      .then(() => {
        setEvents([...events, newEvent]);
        setEventName('');
        setEventDate('');
        setEventLocation('');
        setEventDescription('');
        setEventOrganizer('');
        setStep(0);
        alert('Event Created!');
      })
      .catch(err => alert('Failed to create event: ' + err))
      .finally(() => setSubmitting(false));
  };

  return (
    <ScrollAnimate animation="scroll-fade-in">
      <div className="container py-5">
        <Card className="mx-auto shadow-sm border-0 event-category-card" style={{ maxWidth: 500 }}>
          <Card.Body>
            <h2 className="text-center mb-4 event-categories-heading">Create Event</h2>
            <ProgressBar now={((step + 1) / steps.length) * 100} label={steps[step]} className="mb-4" style={{ height: 18 }} />
            <Form onSubmit={handleSubmit}>
              {step === 0 && (
                <Form.Group className="mb-3">
                  <Form.Label>Event Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={eventName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEventName(e.target.value)}
                    required
                    placeholder="Enter event name"
                    autoFocus
                  />
                </Form.Group>
              )}
              {step === 1 && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Event Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={eventDate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEventDate(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Event Location</Form.Label>
                    <Form.Control
                      type="text"
                      value={eventLocation}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEventLocation(e.target.value)}
                      required
                      placeholder="Enter event location"
                    />
                  </Form.Group>
                </>
              )}
              {step === 2 && (
                <Form.Group className="mb-3">
                  <Form.Label>Event Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={eventDescription}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEventDescription(e.target.value)}
                    required
                    placeholder="Enter event description"
                  />
                </Form.Group>
              )}
              {step === 3 && (
                <Form.Group className="mb-3">
                  <Form.Label>Organizer</Form.Label>
                  <Form.Control
                    type="text"
                    value={eventOrganizer}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEventOrganizer(e.target.value)}
                    required
                    placeholder="Enter organizer name"
                  />
                </Form.Group>
              )}
              {step === 4 && (
                <div className="mb-3">
                  <h5 className="mb-3">Review Details</h5>
                  <ul className="list-group mb-3">
                    <li className="list-group-item"><strong>Name:</strong> {eventName}</li>
                    <li className="list-group-item"><strong>Date:</strong> {eventDate}</li>
                    <li className="list-group-item"><strong>Location:</strong> {eventLocation}</li>
                    <li className="list-group-item"><strong>Description:</strong> {eventDescription}</li>
                    <li className="list-group-item"><strong>Organizer:</strong> {eventOrganizer}</li>
                  </ul>
                </div>
              )}
              <div className="d-flex justify-content-between mt-4">
                <Button variant="outline-secondary" disabled={step === 0 || submitting} onClick={handleBack} type="button">Back</Button>
                {step < steps.length - 1 && (
                  <Button variant="primary" onClick={handleNext} disabled={
                    (step === 0 && !eventName) ||
                    (step === 1 && (!eventDate || !eventLocation)) ||
                    (step === 2 && !eventDescription) ||
                    (step === 3 && !eventOrganizer)
                  }>Next</Button>
                )}
                {step === steps.length - 1 && (
                  <Button variant="success" type="submit" disabled={submitting}>Create Event</Button>
                )}
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </ScrollAnimate>
  );
};

export default CreateEvent;