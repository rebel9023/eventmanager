import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';

const initialState = { name: '', email: '', message: '' };

const Contact: React.FC = () => {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('All fields are required.');
      return;
    }
    setError('');
    setSubmitted(true);
    setForm(initialState);
  };

  return (
    <div className="container py-5">
      <Card className="mx-auto shadow-sm border-0 event-category-card" style={{ maxWidth: 500 }}>
        <Card.Body>
          <h2 className="text-center mb-4 event-categories-heading">Contact Us</h2>
          <p className="text-center text-muted mb-4">We'd love to hear from you! Fill out the form and our team will get back to you soon.</p>
          {submitted && <Alert variant="success">Thank you for reaching out! We'll be in touch soon.</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={form.name} onChange={handleChange} required placeholder="Your Name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@email.com" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" name="message" rows={4} value={form.message} onChange={handleChange} required placeholder="How can we help?" />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">Send Message</Button>
          </Form>
          <div className="mt-4 text-center">
            <iframe
              title="Event Planner Location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1357%2C51.4975%2C-0.1277%2C51.5015&amp;layer=mapnik"
              style={{ width: '100%', height: 180, border: 0, borderRadius: 12 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
            <div className="mt-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="me-3 text-decoration-none text-primary">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="me-3 text-decoration-none text-danger">Instagram</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-info">Twitter</a>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Contact;
