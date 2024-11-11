// client/src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt, faUserPlus, faEdit, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; 

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navbarContainer}>
        <Link to="/" style={styles.navbarLogo}>
          Blogger
        </Link>
        <ul style={styles.navbarMenu}>
          <li>
            <Link to="/" style={styles.navbarItem}>
              <FontAwesomeIcon icon={faHome} style={styles.icon} /> Home
            </Link>
          </li>
          {!token ? (
            <>
              <li>
                <Link to="/login" style={styles.navbarItem}>
                  <FontAwesomeIcon icon={faSignInAlt} style={styles.icon} /> Login
                </Link>
              </li>
              <li>
                <Link to="/signup" style={styles.navbarItem}>
                  <FontAwesomeIcon icon={faUserPlus} style={styles.icon} /> Signup
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/create" style={styles.navbarItem}>
                  <FontAwesomeIcon icon={faEdit} style={styles.icon} /> Create Post
                </Link>
              </li>
              <li>
                <button style={styles.navbarLogout} onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} style={styles.icon} /> Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

// Inline styles
const styles = {
  navbar: {
    backgroundColor: "#007BFF",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "center",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  navbarContainer: {
    width: "100%",
    maxWidth: "1200px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navbarLogo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "white",
    textDecoration: "none",
  },
  navbarMenu: {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    margin: 0,
    padding: 0,
  },
  navbarItem: {
    color: "white",
    textDecoration: "none",
    padding: "10px 15px",
    transition: "background-color 0.3s",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: "5px", // Space between icon and text
  },
  navbarLogout: {
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
    padding: "10px 15px",
    fontSize: "16px",
  },
};

export default Navbar;
