import { useParams } from "react-router-dom";
import "./index.css";
function ChatPage() {
  const { username } = useParams();
  async function send(e: React.FormEvent) {
    e.preventDefault(); 
    const form = e.target as HTMLFormElement; 
    const formData = new FormData(form); 
    const message = String(formData.get("message")); 
    console.log(`Message: ${message}, sending`); 
  }
  return (
    <div>
      <h1>Chatting with {username}</h1>
      <form onSubmit={send} id="chat"> 
        <input type="text" id="message" name="message" placeholder="Enter message"/> 
        <button type="submit"> Send </button>
      </form>
    </div>
  );
}

export default ChatPage;
