import React, { useState } from 'react';
import { Card, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { FaSearch, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import ScrollAnimate from '../components/ScrollAnimate';

const initialVendors = [
  { name: 'Elegant Events', type: 'Wedding', location: 'New York', rating: 4.8 },
  { name: 'Party Pros', type: 'Party', location: 'Los Angeles', rating: 4.5 },
  { name: 'Corporate Solutions', type: 'Corporate', location: 'Chicago', rating: 4.7 },
  { name: 'Birthday Bashers', type: 'Birthday', location: 'Miami', rating: 4.6 },
  { name: 'Anniversary Angels', type: 'Anniversary', location: 'San Francisco', rating: 4.9 },
  { name: 'Destination Dreamers', type: 'Destination', location: 'Hawaii', rating: 4.8 },
];

const types = ['All', 'Wedding', 'Party', 'Corporate', 'Birthday', 'Anniversary', 'Destination'];

const VendorList: React.FC = () => {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('All');

  const filtered = initialVendors.filter(v =>
    (type === 'All' || v.type === type) &&
    (v.name.toLowerCase().includes(search.toLowerCase()) || v.location.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 event-categories-heading">Vendors</h2>
      <Row className="mb-4 justify-content-center">
        <Col xs={12} md={6} lg={4} className="mb-2">
          <InputGroup>
            <InputGroup.Text><FaSearch /></InputGroup.Text>
            <Form.Control
              placeholder="Search by name or location"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={12} md={4} lg={3} className="mb-2">
          <Form.Select value={type} onChange={e => setType(e.target.value)}>
            {types.map(t => <option key={t}>{t}</option>)}
          </Form.Select>
        </Col>
      </Row>
      <Row xs={1} sm={2} md={3} className="g-4 justify-content-center">
        {filtered.map((vendor, idx) => (
          <Col key={vendor.name} className="d-flex align-items-stretch">
            <ScrollAnimate animation="scroll-slide-up">
              <Card className="shadow-sm border-0 event-category-card animate__animated animate__fadeInUp">
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                  <div className="mb-2"><FaMapMarkerAlt className="me-1" color="#6366f1" /> {vendor.location}</div>
                  <Card.Title className="event-category-title">{vendor.name}</Card.Title>
                  <div className="mb-2 text-muted">{vendor.type}</div>
                  <div>
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} color={i < Math.round(vendor.rating) ? '#fbbf24' : '#e5e7eb'} />
                    ))}
                    <span className="ms-2">{vendor.rating.toFixed(1)}</span>
                  </div>
                </Card.Body>
              </Card>
            </ScrollAnimate>
          </Col>
        ))}
        {filtered.length === 0 && (
          <Col xs={12} className="text-center text-muted py-5">No vendors found.</Col>
        )}
      </Row>
    </div>
  );
};

export default VendorList;
