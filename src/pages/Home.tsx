import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollAnimate from '../components/ScrollAnimate';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <ScrollAnimate animation="scroll-fade-in">
              <div className="hero bg-primary text-white text-center py-5">
                  <div className="container">
                      <h1 className="display-4">Welcome to the Event Planner</h1>
                      <p className="lead">Your one-stop solution for planning and managing events.</p>
                      <Link to="/create-event" className="btn btn-light btn-lg mr-2">Create a New Event</Link>
                      <Link to="/events" className="btn btn-outline-light btn-lg">View Events</Link>
                  </div>
              </div>
            </ScrollAnimate>

            {/* Event Categories Section */}
            <div className="container py-5">
                <h2 className="text-center mb-4">Event Categories</h2>
                <div className="row">
                    <ScrollAnimate animation="scroll-slide-up">
                      <div className="col-md-4">
                          <div className="card mb-4">
                              <div className="card-body">
                                  <h5 className="card-title">Conferences</h5>
                                  <p className="card-text">Plan and manage conferences with ease.</p>
                                  <Link to="/events/conferences" className="btn btn-primary">View Conferences</Link>
                              </div>
                          </div>
                      </div>
                    </ScrollAnimate>
                    <ScrollAnimate animation="scroll-slide-up">
                      <div className="col-md-4">
                          <div className="card mb-4">
                              <div className="card-body">
                                  <h5 className="card-title">Workshops</h5>
                                  <p className="card-text">Discover and join interactive workshops.</p>
                                  <Link to="/events/workshops" className="btn btn-primary">View Workshops</Link>
                              </div>
                          </div>
                      </div>
                    </ScrollAnimate>
                    <ScrollAnimate animation="scroll-slide-up">
                      <div className="col-md-4">
                          <div className="card mb-4">
                              <div className="card-body">
                                  <h5 className="card-title">Webinars</h5>
                                  <p className="card-text">Attend informative webinars from experts.</p>
                                  <Link to="/events/webinars" className="btn btn-primary">View Webinars</Link>
                              </div>
                          </div>
                      </div>
                    </ScrollAnimate>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="cta bg-light py-5">
                <div className="container text-center">
                    <h2>Ready to Plan Your Event?</h2>
                    <Link to="/create-event" className="btn btn-success btn-lg">Get Started Now</Link>
                </div>
            </div>

            {/* Testimonials Section */}
            <ScrollAnimate animation="scroll-fade-in">
              <div className="testimonials py-5">
                  <div className="container">
                      <h2 className="text-center mb-4">What Our Users Say</h2>
                      <div className="row">
                          <div className="col-md-4">
                              <div className="testimonial-card p-4 mb-4">
                                  <p className="testimonial-text">"Event Planner made organizing my event a breeze!"</p>
                                  <p className="testimonial-author">- Jane Doe</p>
                              </div>
                          </div>
                          <div className="col-md-4">
                              <div className="testimonial-card p-4 mb-4">
                                  <p className="testimonial-text">"I loved the user-friendly interface and helpful features."</p>
                                  <p className="testimonial-author">- John Smith</p>
                              </div>
                          </div>
                          <div className="col-md-4">
                              <div className="testimonial-card p-4 mb-4">
                                  <p className="testimonial-text">"A fantastic tool for anyone looking to plan an event."</p>
                                  <p className="testimonial-author">- Mary Johnson</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            </ScrollAnimate>

            {/* Newsletter Signup Section */}
            <ScrollAnimate animation="scroll-slide-up">
              <div className="newsletter bg-primary text-white text-center py-5">
                  <div className="container">
                      <h2>Subscribe to Our Newsletter</h2>
                      <p>Get the latest news and updates about events directly in your inbox.</p>
                      <form className="form-inline justify-content-center">
                          <input type="email" className="form-control mb-2 mr-2" placeholder="Enter your email" />
                          <button type="submit" className="btn btn-light mb-2">Subscribe</button>
                      </form>
                  </div>
              </div>
            </ScrollAnimate>
        </div>
    );
};

export default Home;