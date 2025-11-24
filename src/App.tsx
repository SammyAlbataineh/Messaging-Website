// App.tsx
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./home"
import SignUpPage from "./signUp";
import "./App.css";
function App() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/home" element={<Home/>}/>
    </Routes>
  );
}

export default App;
