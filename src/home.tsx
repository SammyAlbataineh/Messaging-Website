import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./index.css"
function Home() {
  const [username, setUsername] = useState<any>(null);
  const [query,setQuery] = useState(""); 
  const [results, setResults] = useState<any[]>([]); 
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
 useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const response = await fetch(`http://localhost:5000/search?q=${query}`);
        if (!response.ok) throw new Error("Network error");
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setResults([]);
      }
    }, 400); 

    return () => clearTimeout(delayDebounce);
  }, [query]); 
  function startChat(username: string, username2: string): void {
    navigate(`/chat/from/${username2}/to/${username}`);

  }
  return (
    <div>
      <h1>Messaging</h1>

      {username ? (
        <h1>Welcome, {username}!</h1>
      ) : (
        <div>
          <h1>Welcome! Please log in or make an account.</h1>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      )}
      <input type="text" placeholder="Search for users" value={query} onChange={(e) => setQuery(e.target.value)}/> 
      <div>
        {results.length > 0 ? (
          results.map((user, index) => (
            <button id="user" onClick={() => startChat(user.username,username)} key={index}>
              {user.username} 
            </button>
          ))
        ) : (
          query && <p>No users found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
