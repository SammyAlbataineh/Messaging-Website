// App.tsx
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import Home from "./home"
import { jwtDecode } from "jwt-decode";
import "./App.css";
function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        id="login"
        element={
          <GoogleLogin 
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                const decoded: any = jwtDecode(credentialResponse.credential); 
                localStorage.setItem("userName",decoded.name);
              }
              navigate("/home");
            }}
            onError={() => console.log("Login failed")}
          />
        }
      />
      <Route path="/home" element={<Home/>}/>
    </Routes>
  );
}

export default App;
