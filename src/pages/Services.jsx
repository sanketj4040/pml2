import React from "react";
import Footer from "../components/Footer";

function Services() {
  return (
    <>
      <div className="header">
        <img src="/images/logo.png" alt="Logo" className="logo" />
        <div className="header-text">
          <h1>Our Services</h1>
          <p>Comprehensive project management solutions</p>
        </div>
        <nav className="main-nav">
          <ul className="nav-links">
            <li><a href="/" className="nav-link">Home</a></li>
            <li><a href="/services" className="nav-link active">Services</a></li>
            <li><a href="/help" className="nav-link">Help</a></li>
          </ul>
        </nav>
      </div>
      
      <div className="services-container">
        <h2 className="services-title">Our Project Management Services</h2>
        
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">
              <img src="/images/services_task_mng.png" alt="Task Management" />
            </div>
            <h3>Task Management</h3>
            <p>Create, assign, and track tasks with ease. Set priorities, deadlines, and monitor progress in real-time.</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">
              <img src="/images/services_progress.png" alt="Progress Tracking" />
            </div>
            <h3>Progress Tracking</h3>
            <p>Visual progress indicators help you keep projects on schedule with percentage-based completion tracking.</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">
              <img src="/images/services_notification.png" alt="Notifications" />
            </div>
            <h3>Notifications & Reminders</h3>
            <p>Never miss a deadline with automated notifications and reminders for upcoming and overdue tasks.</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">
              <img src="/images/services_techinfo.png" alt="Technical Info" />
            </div>
            <h3>Technical Information</h3>
            <p>Store and access important technical documents, specifications, and project requirements.</p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">
              <img src="/images/services_graphical.png" alt="Graphical Reports" />
            </div>
            <h3>Graphical Reports</h3>
            <p>Comprehensive visual reporting to analyze project performance, resource allocation, and timeline adherence.</p>
          </div>
        </div>
        
        <div className="service-cta">
          <h3>Ready to streamline your project management?</h3>
          <p>Choose the role that fits your needs and get started today.</p>
          <div className="cta-buttons">
            <a href="/admin" className="cta-button admin">Admin Access</a>
            <a href="/manager" className="cta-button manager">Manager Access</a>
            <a href="/team" className="cta-button team">Team Member Access</a>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default Services;