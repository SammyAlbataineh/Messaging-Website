import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "./index.css";
function ChatPage() {
  const { username, username2 } = useParams();
  if (!username || !username2) {
    return <div> Error: missing usernames </div>
  }
  function makeChatId(a: string, b: string): string {
    return [a,b].sort().join("_"); 
  }
  let chatId: string = makeChatId(username,username2);
  const [messages, setMessages] = useState<{ from: string; message: string }[]>([]);
  const socketRef = useRef<WebSocket | null>(null); 
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    socketRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "join", chatId }));
    };

    ws.onmessage = (e: MessageEvent) => {
      const data = JSON.parse(e.data);
      if (data.type === "message") {
        setMessages((prev) => [...prev, { from: data.from, message: data.message }]);
      }
    };
    return () => {
      ws.close();
    };
  }, [chatId]);

  async function send(e: React.FormEvent) {
    e.preventDefault(); 
    const form = e.target as HTMLFormElement; 
    const formData = new FormData(form); 
    const message = String(formData.get("message")); 
    console.log(`Message: ${message}, sending`); 
    if (socketRef.current) {
      socketRef.current.send(
        JSON.stringify({
          type: "message",
          chatId: chatId,
          from: username,
          message: message,
        })
      );
    }

  form.reset();
  }
  return (
    <div>
      <h1>Chatting with {username2}</h1>
      <div id="messageHistory">
        {messages.map((msg, index) => (
          <div key={index} className={msg.from === username ? "myMsg" : "theirMsg"}>
            <strong>{msg.from}: </strong>
            {msg.message}
          </div>
        ))}
      </div>
      <form onSubmit={send} id="chat"> 
        <input type="text" id="message" name="message" placeholder="Enter message"/> 
        <button type="submit"> Send </button>
      </form>
    </div>
  );
}

export default ChatPage;
