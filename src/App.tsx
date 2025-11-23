// App.tsx
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import Home from "./home"
import SignUpPage from "./signUp";
import { jwtDecode } from "jwt-decode";
import "./App.css";
function App() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
    </Routes>
  );
}

export default App;
