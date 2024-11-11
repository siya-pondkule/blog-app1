// client/src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";
import Navbar from "./components/Navbar";  
import './App.css'; 

const App = () => {
  return (
    <div className="container"> 
      <Navbar />  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/posts/:id" element={<Post />} />
      </Routes>
    </div>
  );
};

export default App;
