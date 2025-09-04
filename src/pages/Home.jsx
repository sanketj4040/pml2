import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  // Mock data for search functionality
  const searchableItems = [
    { id: 1, title: "Admin Dashboard", path: "/admin" },
    { id: 2, title: "Manager Dashboard", path: "/manager" },
    { id: 3, title: "Team Member Dashboard", path: "/team" },
    { id: 4, title: "Project Management", path: "/services" },
    { id: 5, title: "Task Assignment", path: "/services" },
    { id: 6, title: "Progress Tracking", path: "/services" },
    { id: 7, title: "Help Center", path: "/help" }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    
    const filteredResults = searchableItems.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(filteredResults);
    setShowResults(true);
  };

  const handleSearchItemClick = (path) => {
    setShowResults(false);
    setSearchQuery("");
    navigate(path);
  };

  // Image error handling
  const handleImageError = (e) => {
    console.log("Image failed to load:", e.target.src);
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = "/vite.svg"; // Fallback to a default image
  };

  return (
    <>
      <main>
      <div className="header">
        <img 
          src="/images/logo.png" 
          alt="Logo" 
          className="logo" 
          onError={handleImageError}
        />
        <div className="header-text">
          <h1>Task Board</h1>
          <p>Welcome to your project management portal</p>
        </div>
        <nav className="main-nav">
          <ul className="nav-links">
            <li><Link to="/" className="nav-link active">Home</Link></li>
            <li><Link to="/services" className="nav-link">Services</Link></li>
            <li><Link to="/help" className="nav-link">Help</Link></li>
          </ul>
          <div className="search-container">
            <form onSubmit={handleSearch}>
              <input 
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim() && setShowResults(true)}
                className="nav-search-input"
              />
              <button type="submit" className="search-btn">
                <span role="img" aria-label="search">🔍</span>
              </button>
            </form>
            {showResults && (
              <div className="search-results">
                {searchResults.length > 0 ? (
                  searchResults.map(item => (
                    <div 
                      key={item.id} 
                      className="search-result-item"
                      onClick={() => handleSearchItemClick(item.path)}
                    >
                      {item.title}
                    </div>
                  ))
                ) : (
                  <div className="search-result-item no-results">No results found</div>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
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
            <Link to="/manager-register">Register as Manager</Link>
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
            <Link to="/team-register">Register as Team Member</Link>
          </div>
        </div>
      </div>
    </main>
      <Footer />
    </>
  );
}

export default Home;
