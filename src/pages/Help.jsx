import React from "react";
import Footer from "../components/Footer";

function Help() {
  return (
    <>
      <div className="header">
        <img src="/images/logo.png" alt="Logo" className="logo" />
        <div className="header-text">
          <h1>Help Center</h1>
          <p>Get assistance with your project management</p>
        </div>
        <nav className="main-nav">
          <ul className="nav-links">
            <li><a href="/" className="nav-link">Home</a></li>
            <li><a href="/services" className="nav-link">Services</a></li>
            <li><a href="/help" className="nav-link active">Help</a></li>
          </ul>
        </nav>
      </div>
      
      <div className="help-container">
        <div className="help-section">
          <h2>User Guides</h2>
          
          <div className="guide-categories">
            <div className="guide-category">
              <h3>For Administrators</h3>
              <ul className="guide-list">
                <li>
                  <span className="guide-icon">📊</span>
                  <a href="#admin-dashboard">Dashboard Overview</a>
                </li>
                <li>
                  <span className="guide-icon">👥</span>
                  <a href="#admin-users">Managing Users</a>
                </li>
                <li>
                  <span className="guide-icon">📁</span>
                  <a href="#admin-projects">Project Administration</a>
                </li>
                <li>
                  <span className="guide-icon">📈</span>
                  <a href="#admin-reports">Generating Reports</a>
                </li>
              </ul>
            </div>
            
            <div className="guide-category">
              <h3>For Managers</h3>
              <ul className="guide-list">
                <li>
                  <span className="guide-icon">✏️</span>
                  <a href="#manager-create">Creating Projects</a>
                </li>
                <li>
                  <span className="guide-icon">👤</span>
                  <a href="#manager-assign">Assigning Team Members</a>
                </li>
                <li>
                  <span className="guide-icon">📋</span>
                  <a href="#manager-track">Tracking Progress</a>
                </li>
                <li>
                  <span className="guide-icon">⏱️</span>
                  <a href="#manager-deadlines">Managing Deadlines</a>
                </li>
              </ul>
            </div>
            
            <div className="guide-category">
              <h3>For Team Members</h3>
              <ul className="guide-list">
                <li>
                  <span className="guide-icon">🔍</span>
                  <a href="#team-view">Viewing Assigned Projects</a>
                </li>
                <li>
                  <span className="guide-icon">✅</span>
                  <a href="#team-update">Updating Task Status</a>
                </li>
                <li>
                  <span className="guide-icon">💬</span>
                  <a href="#team-communicate">Communicating with Team</a>
                </li>
                <li>
                  <span className="guide-icon">⏰</span>
                  <a href="#team-time">Time Tracking</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="help-tips">
            <h3>Quick Tips</h3>
            <div className="tips-container">
              <div className="tip-card">
                <div className="tip-icon">💡</div>
                <div className="tip-content">
                  <h4>Use Search</h4>
                  <p>The search bar at the top of the page can help you quickly find projects, tasks, or team members.</p>
                </div>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">🔄</div>
                <div className="tip-content">
                  <h4>Regular Updates</h4>
                  <p>Update your project progress regularly to keep everyone informed of the current status.</p>
                </div>
              </div>
              
              <div className="tip-card">
                <div className="tip-icon">🔔</div>
                <div className="tip-content">
                  <h4>Notifications</h4>
                  <p>Enable browser notifications to stay updated on project changes and upcoming deadlines.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="help-section">
          <h2>Contact Support</h2>
          <p>Need more help? Contact our support team:</p>
          
          <form className="contact-form">
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Your name" />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Your email address" />
            </div>
            
            <div className="form-group">
              <label>Subject</label>
              <input type="text" placeholder="What is this regarding?" />
            </div>
            
            <div className="form-group">
              <label>Message</label>
              <textarea rows="5" placeholder="Describe your issue or question"></textarea>
            </div>
            
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default Help;
