// Dashboard.tsx
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { MdEvent, MdPeople, MdAssignment, MdBarChart } from 'react-icons/md';

const stats = [
  { label: 'Total Events', value: 12, icon: MdEvent, color: '#6366f1' },
  { label: 'Attendees', value: 320, icon: MdPeople, color: '#34d399' },
  { label: 'Tasks', value: 48, icon: MdAssignment, color: '#fbbf24' },
  { label: 'Engagement', value: '87%', icon: MdBarChart, color: '#f472b6' },
];

const Dashboard: React.FC = () => (
  <div className="container py-5">
    <h2 className="mb-4 event-categories-heading">Dashboard</h2>
    <Row className="g-4 mb-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Col key={stat.label} xs={12} sm={6} md={3}>
            <Card className="shadow-sm border-0 event-category-card text-center p-3">
              <div className="mb-2">
                <Icon size={32} color={stat.color} />
              </div>
              <h4 className="mb-0">{stat.value}</h4>
              <div className="text-muted">{stat.label}</div>
            </Card>
          </Col>
        );
      })}
    </Row>
    {/* Placeholder for charts and quick links */}
    <Card className="shadow-sm border-0 event-category-card p-4 mb-4">
      <h5>Event Analytics (Coming Soon)</h5>
      <div className="text-muted">Charts and insights will appear here.</div>
    </Card>
    <Card className="shadow-sm border-0 event-category-card p-4">
      <h5>Quick Links</h5>
      <ul className="list-unstyled mb-0">
        <li><a href="/create-event">+ Create New Event</a></li>
        <li><a href="/events">View All Events</a></li>
        <li><a href="/vendor-list">Manage Vendors</a></li>
        <li><a href="/calendar">Calendar View</a></li>
      </ul>
    </Card>
  </div>
);

export default Dashboard;
