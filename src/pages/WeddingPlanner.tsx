import React from 'react';
import '../styles/main.css';

const WeddingPlanner: React.FC = () => {
  return (
    <div className="container">
      <h1>Wedding Planner</h1>
      <p className="wedding-intro">
        Plan your dream wedding with our all-in-one wedding planner section! Organize every detail, from the guest list to the venue, catering, and more.
      </p>
      <div className="wedding-section">
        <h2>Key Features</h2>
        <ul>
          <li><b>Guest List Management:</b> Add, edit, and track RSVPs for all your wedding guests.</li>
          <li><b>Venue Selection:</b> Save and compare venues, add location details, and mark your favorite.</li>
          <li><b>Budget Tracker:</b> Set your wedding budget and track expenses for each category (venue, catering, decor, etc.).</li>
          <li><b>Vendor Contacts:</b> Store contact info for photographers, florists, caterers, and more.</li>
          <li><b>Event Timeline:</b> Create a detailed schedule for the wedding day and related events (rehearsal, reception, etc.).</li>
          <li><b>Task Checklist:</b> Stay organized with a checklist for all wedding planning tasks.</li>
        </ul>
      </div>
      <div className="wedding-section">
        <h2>How to Use</h2>
        <ol>
          <li>Start by adding your guest list and sending out invitations.</li>
          <li>Browse and save venue options, then select your favorite.</li>
          <li>Set your budget and add expenses as you book vendors and services.</li>
          <li>Keep all vendor contacts in one place for easy access.</li>
          <li>Build your wedding day timeline and share it with your team.</li>
          <li>Check off tasks as you complete them to stay on track!</li>
        </ol>
      </div>
      <div className="wedding-section">
        <h2>Popular Wedding Venues</h2>
        <ul>
          <li>Grand Palace Banquet Hall</li>
          <li>Sunset Gardens</li>
          <li>Royal Heritage Resort</li>
          <li>Beachside Pavilion</li>
          <li>City View Rooftop</li>
        </ul>
      </div>
      <div className="wedding-section">
        <h2>Tips for a Perfect Wedding</h2>
        <ul>
          <li>Start planning early to secure your preferred vendors and venues.</li>
          <li>Set a realistic budget and track all expenses.</li>
          <li>Delegate tasks to friends, family, or a wedding planner.</li>
          <li>Communicate clearly with all vendors and your wedding party.</li>
          <li>Remember to enjoy the process and celebrate your love!</li>
        </ul>
      </div>
    </div>
  );
};

export default WeddingPlanner;
