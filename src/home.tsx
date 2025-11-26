import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUsername(parsedUser.username);
      } catch (error) {
        console.error("Error parsing user:", error);
      }
    }
  }, []);

  return (
    <div>
      <h1>Messaging</h1>
      <button onClick={() => navigate("/signup")}>Sign Up</button>
      <button onClick={() => navigate("/login")}>Login</button>

      {username ? (
        <h1>Welcome, {username}!</h1>
      ) : (
        <h1>Welcome! Please log in or make an account.</h1>
      )}
    </div>
  );
}

export default Home;
