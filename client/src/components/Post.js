// // client/src/components/Post.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import DeletePost from "./DeletePost"; // Import DeletePost component

// const Post = () => {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [comment, setComment] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchPostAndComments = async () => {
//       try {
//         const postResponse = await axios.get(`http://localhost:5000/posts/${id}`);
//         setPost(postResponse.data);

//         const commentsResponse = await axios.get(`http://localhost:5000/posts/${id}/comments`);
//         setComments(commentsResponse.data);
//       } catch (err) {
//         setError("Error fetching post or comments.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPostAndComments();
//   }, [id]);

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     try {
//       await axios.post(
//         `http://localhost:5000/posts/${id}/comments`,
//         { comment },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setComment("");
//       const updatedComments = await axios.get(`http://localhost:5000/posts/${id}/comments`);
//       setComments(updatedComments.data);
//     } catch (err) {
//       console.error("Error submitting comment:", err);
//       setError("Error submitting comment.");
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p style={{ color: 'red' }}>{error}</p>;

//   return (
//     <div>
//       <h1>{post?.title}</h1>
//       {post?.image_url && (
//         <img
//           src={`http://localhost:5000${post.image_url}`}
//           alt="Post"
//           style={{ width: '100%', height: 'auto' }}
//         />
//       )}
//       <p>{post?.body}</p>
//       <DeletePost postId={id} /> {/* Integrate DeletePost here */}
//       <h2>Comments</h2>
//       <form onSubmit={handleCommentSubmit}>
//         <textarea
//           placeholder="Add a comment"
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           required
//         ></textarea>
//         <button type="submit">Submit Comment</button>
//       </form>
//       <ul>
//         {comments.length > 0 ? comments.map(c => (
//           <li key={c.id}><strong>{c.username}:</strong> {c.comment}</li>
//         )) : <p>No comments yet.</p>}
//       </ul>
//     </div>
//   );
// };

// export default Post;
// client/src/components/Post.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DeletePost from "./DeletePost"; // Import DeletePost component

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postResponse = await axios.get(`http://localhost:5000/posts/${id}`);
        setPost(postResponse.data);

        const commentsResponse = await axios.get(`http://localhost:5000/posts/${id}/comments`);
        setComments(commentsResponse.data);
      } catch (err) {
        setError("Error fetching post or comments.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `http://localhost:5000/posts/${id}/comments`,
        { comment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComment("");
      const updatedComments = await axios.get(`http://localhost:5000/posts/${id}/comments`);
      setComments(updatedComments.data);
    } catch (err) {
      console.error("Error submitting comment:", err);
      setError("Error submitting comment.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>{post?.title}</h1>
      {post?.image_url && (
        <img
          src={`http://localhost:5000${post.image_url}`}
          alt="Post"
          style={{ width: '100%', height: 'auto' }}
        />
      )}
      <p>{post?.body}</p>
      <DeletePost postId={id} /> {/* Integrate DeletePost here */}
      <h2>Comments</h2>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
        <button type="submit">Submit Comment</button>
      </form>
      <ul>
        {comments.length > 0 ? comments.map(c => (
          <li key={c.id}><strong>{c.username}:</strong> {c.comment}</li>
        )) : <p>No comments yet.</p>}
      </ul>
    </div>
  );
};

export default Post;
