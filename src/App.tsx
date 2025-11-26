// App.tsx
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./home"
import SignUpPage from "./signUp";
import Login from "./login"; 
import "./App.css";
function App() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  );
}

export default App;
