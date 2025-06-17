import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaBirthdayCake, FaRing, FaPlane, FaBriefcase, FaGlassCheers, FaHeart } from 'react-icons/fa';
import '../styles/main.css';
import ScrollAnimate from '../components/ScrollAnimate';

const categories = [
  { name: 'Weddings', icon: <FaRing size={36} color="#a78bfa" /> },
  { name: 'Birthdays', icon: <FaBirthdayCake size={36} color="#fbbf24" /> },
  { name: 'Destination Weddings', icon: <FaPlane size={36} color="#60a5fa" /> },
  { name: 'Corporate Functions', icon: <FaBriefcase size={36} color="#34d399" /> },
  { name: 'Parties', icon: <FaGlassCheers size={36} color="#f472b6" /> },
  { name: 'Anniversaries', icon: <FaHeart size={36} color="#f87171" /> },
];

const EventCategories: React.FC = () => (
  <div className="container py-5">
    <h2 className="text-center mb-4 event-categories-heading">Event Categories</h2>
    <Row xs={1} sm={2} md={3} className="g-4 justify-content-center">
      {categories.map((cat, idx) => (
        <Col key={cat.name} className="d-flex align-items-stretch">
          <ScrollAnimate animation="scroll-slide-up">
            <Card className="shadow-sm border-0 event-category-card animate__animated animate__fadeInUp">
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <div className="mb-3">{cat.icon}</div>
                <Card.Title className="event-category-title">{cat.name}</Card.Title>
              </Card.Body>
            </Card>
          </ScrollAnimate>
        </Col>
      ))}
    </Row>
  </div>
);

export default EventCategories;
