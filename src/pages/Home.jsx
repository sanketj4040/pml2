import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {

  // Image error handling
  const handleImageError = (e) => {
    console.log("Image failed to load:", e.target.src);
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = "/vite.svg"; // Fallback to a default image
  };

  return (
    <>
  <Header />
  <main style={{
    paddingTop: '100px', 
    paddingBottom: '20px', 
    minHeight: 'calc(100vh - 150px)',
    overflowX: 'hidden',
    width: '100%',
    boxSizing: 'border-box'
  }}>
      <div className="dashboard">
        <div className="card">
          <img 
            src="/images/admin-img.png" 
            alt="Admin" 
            className="role-img" 
            onError={handleImageError}
          />
          <h2>Admin</h2>
          {/* <ul>
            <li>Manage users</li>
            <li>View reports</li>
          </ul> */}
          <button onClick={() => window.location.href = "/admin"}>Go to Admin</button>
        </div>
        <div className="card">
          <img 
            src={"/images/manager-img%20(1).png"} 
            alt="Manager" 
            className="role-img" 
            onError={handleImageError}
          />
          <h2>Manager</h2>
          <button onClick={() => window.location.href = "/manager"}>Manager Login</button>
          <div className="register-link">
            <p>Contact Admin for registration</p>
          </div>
        </div>
        <div className="card">
          <img 
            src="/images/team-member-img.png" 
            alt="Team Member" 
            className="role-img" 
            onError={handleImageError}
          />
          <h2>Team Member</h2>
          <button onClick={() => window.location.href = "/team"}>Team Login</button>
          <div className="register-link">
            <p>Contact Admin for registration</p>
          </div>
        </div>
      </div>

      {/* User Guides Section (Moved from Help page) */}
      <div className="user-guide-container" style={{ marginTop: '50px', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '1.8rem' }}>User Guides</h2>
        <div className="guide-categories" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          <div className="guide-category" style={{ flex: '1 1 300px', maxWidth: '400px', backgroundColor: '#f8f9fa', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ borderBottom: '2px solid #2563eb', paddingBottom: '10px', marginBottom: '15px' }}>For Administrators</h3>
            <ul className="guide-list" style={{ listStyle: 'none', padding: '0' }}>
              <li style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
                <span className="guide-icon" style={{ marginRight: '10px', fontSize: '1.2rem' }}>📊</span>
                <a href="#admin-dashboard" style={{ textDecoration: 'none', color: '#2563eb' }}>Dashboard Overview</a>
              </li>
              <li style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
                <span className="guide-icon" style={{ marginRight: '10px', fontSize: '1.2rem' }}>👥</span>
                <a href="#admin-users" style={{ textDecoration: 'none', color: '#2563eb' }}>Managing Users</a>
              </li>
              <li style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
                <span className="guide-icon" style={{ marginRight: '10px', fontSize: '1.2rem' }}>📁</span>
                <a href="#admin-projects" style={{ textDecoration: 'none', color: '#2563eb' }}>Project Administration</a>
              </li>
              <li style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
                <span className="guide-icon" style={{ marginRight: '10px', fontSize: '1.2rem' }}>📈</span>
                <a href="#admin-reports" style={{ textDecoration: 'none', color: '#2563eb' }}>Generating Reports</a>
              </li>
            </ul>
          </div>

          <div className="guide-category" style={{ flex: '1 1 300px', maxWidth: '400px', backgroundColor: '#f8f9fa', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ borderBottom: '2px solid #2563eb', paddingBottom: '10px', marginBottom: '15px' }}>For Managers</h3>
            <ul className="guide-list" style={{ listStyle: 'none', padding: '0' }}>
              <li style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
                <span className="guide-icon" style={{ marginRight: '10px', fontSize: '1.2rem' }}>✏️</span>
                <a href="#manager-create" style={{ textDecoration: 'none', color: '#2563eb' }}>Creating Projects</a>
              </li>
              <li style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
                <span className="guide-icon" style={{ marginRight: '10px', fontSize: '1.2rem' }}>👤</span>
                <a href="#manager-assign" style={{ textDecoration: 'none', color: '#2563eb' }}>Assigning Team Members</a>
              </li>
              <li style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
                <span className="guide-icon" style={{ marginRight: '10px', fontSize: '1.2rem' }}>📋</span>
                <a href="#manager-track" style={{ textDecoration: 'none', color: '#2563eb' }}>Tracking Progress</a>
              </li>
              <li style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
                <span className="guide-icon" style={{ marginRight: '10px', fontSize: '1.2rem' }}>⏱️</span>
                <a href="#manager-deadlines" style={{ textDecoration: 'none', color: '#2563eb' }}>Managing Deadlines</a>
              </li>
            </ul>
          </div>

          <div className="guide-category" style={{ flex: '1 1 300px', maxWidth: '400px', backgroundColor: '#f8f9fa', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ borderBottom: '2px solid #2563eb', paddingBottom: '10px', marginBottom: '15px' }}>For Team Members</h3>
            <ul className="guide-list" style={{ listStyle: 'none', padding: '0' }}>
              <li style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
                <span className="guide-icon" style={{ marginRight: '10px', fontSize: '1.2rem' }}>🔍</span>
                <a href="#team-view" style={{ textDecoration: 'none', color: '#2563eb' }}>Viewing Assigned Projects</a>
              </li>
              <li style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
                <span className="guide-icon" style={{ marginRight: '10px', fontSize: '1.2rem' }}>✅</span>
                <a href="#team-update" style={{ textDecoration: 'none', color: '#2563eb' }}>Updating Task Status</a>
              </li>
              <li style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
                <span className="guide-icon" style={{ marginRight: '10px', fontSize: '1.2rem' }}>💬</span>
                <a href="#team-communicate" style={{ textDecoration: 'none', color: '#2563eb' }}>Communicating with Team</a>
              </li>
              <li style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
                <span className="guide-icon" style={{ marginRight: '10px', fontSize: '1.2rem' }}>⏰</span>
                <a href="#team-time" style={{ textDecoration: 'none', color: '#2563eb' }}>Time Tracking</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Tips Section */}
        <div className="help-tips" style={{ marginTop: '40px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '25px', fontSize: '1.5rem' }}>Quick Tips</h3>
          <div className="tips-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
            <div className="tip-card" style={{ flex: '1 1 300px', maxWidth: '350px', display: 'flex', backgroundColor: '#eff6ff', borderRadius: '8px', padding: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <div className="tip-icon" style={{ fontSize: '2rem', marginRight: '15px' }}>💡</div>
              <div className="tip-content">
                <h4 style={{ marginBottom: '8px', color: '#1e40af' }}>Use Search</h4>
                <p style={{ margin: '0', color: '#475569' }}>The search bar at the top of the page can help you quickly find projects, tasks, or team members.</p>
              </div>
            </div>
            <div className="tip-card" style={{ flex: '1 1 300px', maxWidth: '350px', display: 'flex', backgroundColor: '#eff6ff', borderRadius: '8px', padding: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <div className="tip-icon" style={{ fontSize: '2rem', marginRight: '15px' }}>🔄</div>
              <div className="tip-content">
                <h4 style={{ marginBottom: '8px', color: '#1e40af' }}>Regular Updates</h4>
                <p style={{ margin: '0', color: '#475569' }}>Update your project progress regularly to keep everyone informed of the current status.</p>
              </div>
            </div>
            <div className="tip-card" style={{ flex: '1 1 300px', maxWidth: '350px', display: 'flex', backgroundColor: '#eff6ff', borderRadius: '8px', padding: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <div className="tip-icon" style={{ fontSize: '2rem', marginRight: '15px' }}>🔔</div>
              <div className="tip-content">
                <h4 style={{ marginBottom: '8px', color: '#1e40af' }}>Notifications</h4>
                <p style={{ margin: '0', color: '#475569' }}>Enable browser notifications to stay updated on project changes and upcoming deadlines.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
      <Footer />
    </>
  );
}

export default Home;
