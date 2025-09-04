import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function ManagerLogin() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user === "sanket@4040" && pass === "sanket@4040") {
      // Successful login
      localStorage.setItem("managerLoggedIn", "true");
      navigate("/manager-dashboard");
    } else {
      setError("Invalid User ID or Password!");
    }
  };

  return (
    <div className="login-overlay">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Manager Login</h2>
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
          Not registered yet? <Link to="/manager-register">Register now</Link>
        </div>
        <div className="login-link" style={{ marginTop: "10px" }}>
          Not a manager? <Link to="/">Go to Home</Link>
        </div>
      </form>
    </div>
  );
}

export default ManagerLogin;