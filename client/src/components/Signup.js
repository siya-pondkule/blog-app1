// client/src/components/Signup.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Signup.css'; // Import the CSS file for styling

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/signup", { username, email, password });
      navigate("/login"); // Redirect to login page after successful signup
    } catch (err) {
      setError("Error signing up.");
      console.error(err);
    }
  };
  

  return (
    <div className="signup-container">
      <h1 className="signup-title">Signup</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="signup-form" onSubmit={handleSignup}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div>
          <button type="submit" className="submit-button">Signup</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
