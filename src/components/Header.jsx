import React from "react";

function Header() {
  return (
    <header className="header" style={{
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      zIndex: 50,
      padding: '15px 20px',
      minHeight: '80px',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      <img src="/images/logo.png" alt="Logo" className="logo" style={{ height: '50px', width: '50px' }} />
      <div className="header-text">
        <h1 style={{ fontSize: '1.8em', marginBottom: '4px' }}>Task Board</h1>
        <p style={{ fontSize: '0.9em' }}>Welcome to your project management portal</p>
      </div>
      <nav className="main-nav">
        <ul className="nav-links" style={{display: 'flex', gap: '10px'}}>
          <li><a href="/" className="nav-link" style={{ padding: '6px 12px', fontSize: '0.95em' }}>Home</a></li>
          <li><a href="/services" className="nav-link" style={{ padding: '6px 12px', fontSize: '0.95em' }}>Services</a></li>
          <li><a href="/help" className="nav-link" style={{ padding: '6px 12px', fontSize: '0.95em' }}>Help</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
