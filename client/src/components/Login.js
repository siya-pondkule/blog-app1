import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loginImage from './login.png'; // Import the image
import './Login.css'; // Import the CSS file for styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", { email, password });
      localStorage.setItem("token", res.data.token); // Store JWT token in local storage
      navigate("/"); // Redirect to homepage
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h1 className="login-title" style={styles.title}>Login</h1>
        {error && <p className="error-message" style={styles.error}>{error}</p>}
        <form className="login-form" onSubmit={handleLogin} style={styles.form}>
          <div className="input-group" style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              id="email" // Add id for accessibility
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
              style={styles.input}
            />
          </div>
          <div className="input-group" style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              id="password" // Add id for accessibility
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
              style={styles.input}
            />
          </div>
          <div>
            <button type="submit" className="submit-button" style={styles.button}>
              Login
            </button>
          </div>
        </form>
      </div>

      {/* Image Section */}
      <div style={styles.imageWrapper}>
        <img
          src={loginImage} // Use the imported image
          alt="Login Illustration"
          style={styles.image}
        />
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "row", // Align form and image side by side
    justifyContent: "space-between",
    alignItems: "center",
    height: "100vh",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    margin: 0, // Reset margin for the container
  },
  formWrapper: {
    flex: 1, // Form takes 50% of space
    padding: "30px", // Increased padding for more breathing room
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Enhanced shadow for depth
    backgroundColor: "#fff",
    maxWidth: "400px",
    marginRight: "20px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px", // Space between label and input
    color: "#333", // Label color
    fontSize: "14px", // Font size for label
  },
  input: {
    padding: "12px", // Slightly larger padding for inputs
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.3s ease",
  },
  button: {
    padding: "12px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  imageWrapper: {
    flex: 1, // Image takes the other 50% of space
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "400px", // Adjust the image size
    objectFit: "cover", // Ensure the image fits within its container
    borderRadius: "10px",
  },
};

export default Login;
