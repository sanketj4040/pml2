import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function TeamMemberLogin() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user === "sanket@4040" && pass === "sanket@4040") {
      // Successful login
      localStorage.setItem("teamLoggedIn", "true");
      localStorage.setItem("teamMemberName", "Sanket Jadhav");
      
      // If this is a first-time login (not from registration), set sample manager data
      if (!localStorage.getItem("teamMemberManagerName")) {
        localStorage.setItem("teamMemberManagerId", "2");
        localStorage.setItem("teamMemberManagerName", "Michael Chen");
        localStorage.setItem("teamMemberManagerDepartment", "Design");
      }
      
      navigate("/team-dashboard");
    } else {
      setError("Invalid User ID or Password!");
    }
  };

  return (
    <div className="login-overlay">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Team Member Login</h2>
        <input 
          type="text" 
          placeholder="User ID" 
          value={user} 
          onChange={(e) => setUser(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={pass} 
          onChange={(e) => setPass(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
        <div className="login-error">{error}</div>
        <div className="login-link">
          <div className="registration-note">
            Please contact the administrator for registration.
          </div>
          <Link to="/">Go to Home</Link>
        </div>
      </form>
    </div>
  );
}

export default TeamMemberLogin;