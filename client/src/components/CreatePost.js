import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import myImage from './blog.png'; 

const CreatePost = ({ postId }) => { 
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/");
    } catch (err) {
      setError("Error creating post: " + (err.response?.data.message || err.message));
    }
  };

  const handleDeletePost = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      const token = localStorage.getItem("token");
      try {
        await axios.delete(`http://localhost:5000/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate("/");
      } catch (err) {
        setError("Error deleting post: " + (err.response?.data.message || err.message));
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Create Post</h1>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.formContainer}>
        <form onSubmit={handleCreatePost} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="title" style={styles.label}>Title</label>
            <input
              id="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="body" style={styles.label}>Body</label>
            <textarea
              id="body"
              placeholder="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              style={{ ...styles.input, ...styles.textarea }}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="image" style={styles.label}>Upload Image</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              style={styles.fileInput}
            />
          </div>
          <div>
            <button type="submit" style={styles.button}>Create Post</button>
          </div>
        </form>

        {/* Image Section */}
        <div style={styles.imageWrapper}>
          <img
            src={myImage}
            alt="A blog illustration" // Updated alt text
            style={styles.image}
          />
        </div>
      </div>

      {/* Delete Button */}
      {postId && ( // Check if postId is available before showing the delete button
        <button onClick={handleDeletePost} style={styles.deleteButton}>Delete Post</button>
      )}
    </div>
  );
};

// Styles remain the same with adjustments
const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
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
  formContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  form: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    marginRight: "20px",
    gap: "15px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.3s",
  },
  textarea: {
    height: "100px",
    resize: "none",
  },
  fileInput: {
    display: "block",
    marginTop: "5px",
    fontSize: "16px",
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
  deleteButton: {
    padding: "12px",
    backgroundColor: "#FF4C4C",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
    transition: "background-color 0.3s ease",
  },
  imageWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "300px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  label: {
    marginBottom: "5px",
    fontSize: "14px",
    color: "#333",
  },
};

export default CreatePost;
