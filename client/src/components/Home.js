import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeletePost from './DeletePost'; 

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/posts");
        setPosts(res.data);
      } catch (err) {
        setError("Error fetching posts.");
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  const handlePostDeleted = (deletedPostId) => {
    setPosts(posts.filter(post => post.id !== deletedPostId));
  };

  if (error) {
    return <p style={styles.errorMessage}>{error}</p>;
  }

  return (
    <div style={styles.homeContainer}>
      <h1 style={styles.homeTitle}>All Posts</h1>
      {posts.length > 0 ? (
        <div style={styles.postList}>
          {posts.map((post) => (
            <div key={post.id} style={styles.postCard}>
              <h2 style={styles.postTitle}>
                <Link to={`/post/${post.id}`} style={styles.postLink}>{post.title}</Link>
              </h2>
              {post.image_url && (
                <img
                  src={`http://localhost:5000${post.image_url}`}
                  alt="Post"
                  style={styles.postImage}
                />
              )}
              <p style={styles.postBody}>{post.body.substring(0, 100)}...</p>
              <DeletePost postId={post.id} onPostDeleted={handlePostDeleted} buttonStyle={styles.deleteButton} />
            </div>
          ))}
        </div>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

// Inline styles
const styles = {
  homeContainer: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  homeTitle: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginBottom: "15px",
  },
  postList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "15px",
  },
  postCard: {
    backgroundColor: "white",
    border: "1px solid #ccc",          
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s",
  },
  postTitle: {
    fontSize: "1.5em",
    color: "#007BFF",
  },
  postLink: {
    textDecoration: "none",
    color: "#007BFF",
    transition: "color 0.3s",
  },
  postImage: {
    width: "100%",
    height: "50%",                     
    borderRadius: "5px",
    marginBottom: "10px",
  },
  postBody: {
    fontSize: "1em",
    color: "#666",
    marginBottom: "10px",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d", 
    color: "white",             
    border: "none",             
    borderRadius: "5px",       
    padding: "10px 15px",      
    cursor: "pointer",          
    transition: "background-color 0.3s", 
    marginTop: "10px",         
  },
};

export default Home;
