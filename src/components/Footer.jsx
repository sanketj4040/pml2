import React from "react";
function Footer() {
  return (
    <footer className="footer" style={{
      position: 'relative',
      width: '100%', 
      zIndex: 40,
      padding: '16px',
      textAlign: 'center',
      marginTop: '30px'
    }}>
      <span>&copy; {new Date().getFullYear()} Your Company. All Rights Reserved.</span>
      <span style={{margin: '0 8px'}}>|</span>
      <span>Email Support: <a href="mailto:support@yourcompany.com" style={{color: '#3b82f6', textDecoration: 'underline'}}>support@yourcompany.com</a></span>
      <span style={{margin: '0 8px'}}>|</span>
      <span>Mobile Support: <a href="tel:+18001234567" style={{color: '#3b82f6', textDecoration: 'underline'}}>+1 (800) 123-4567</a></span>
    </footer>
  );
}

export default Footer;  