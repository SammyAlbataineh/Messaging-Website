// App.tsx
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./home"
import SignUpPage from "./signUp";
import Login from "./login"; 
import ChatPage from "./chatPage";
import "./App.css";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/chat/:username" element={<ChatPage/>}/>
    </Routes>
  );
}

export default App;
