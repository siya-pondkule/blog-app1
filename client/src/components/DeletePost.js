// client/src/components/DeletePost.js
import React, { useState } from "react";
import axios from "axios";

const DeletePost = ({ postId, onPostDeleted, buttonStyle }) => {
  const [error, setError] = useState("");

  const handleDeletePost = async () => {
    const token = localStorage.getItem("token");

    // Show confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) {
      return; // Exit if the user does not confirm
    }

    try {
      await axios.delete(`http://localhost:5000/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Call onPostDeleted to remove the post from the list
      onPostDeleted(postId);
    } catch (err) {
      setError("Error deleting post.");
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <button
        onClick={handleDeletePost}
        style={{ ...styles.deleteButton, ...buttonStyle }} // Combine button styles
      >
        Delete Post
      </button>
      {error && <p style={styles.errorMessage}>{error}</p>}
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    marginTop: "10px", // Space above the button
    display: "flex",    // Flexbox for alignment
    flexDirection: "column", // Stack elements vertically
    alignItems: "center", // Center align items
  },
  deleteButton: {
    backgroundColor: "#ff4d4d", // Red background
    color: "white",              // White text
    border: "none",              // No border
    borderRadius: "5px",        // Rounded corners
    padding: "10px 15px",       // Padding
    cursor: "pointer",           // Pointer cursor on hover
    transition: "background-color 0.3s, transform 0.3s", // Smooth transitions
    fontSize: "1em",            // Font size
    fontWeight: "bold",          // Bold text
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", // Subtle shadow
    width: "100%",              // Full width for better aesthetics
    maxWidth: "150px",          // Maximum width
  },
  deleteButtonHover: {
    backgroundColor: "#e60000", // Darker red on hover
  },
  errorMessage: {
    color: "red",                // Red text for errors
    marginTop: "5px",           // Space above the error message
    fontSize: "0.9em",          // Slightly smaller font for error message
  },
};

export default DeletePost;
