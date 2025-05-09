import { useState, useEffect } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const loadMessages = async () => {
      const res = await fetch("/api/receive");
      const data = await res.json();
      setMessages(data);
    };
    loadMessages();
  }, []);

  const sendReply = async () => {
    if (!selectedUser || !replyText.trim()) return;
    await fetch("/api/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: selectedUser, message: replyText }),
    });
    alert("Message sent!");
    setReplyText("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>User Mes</h1>
      {messages.map((msg, i) => (
        <div key={i} style={{ marginBottom: 15, padding: 10, border: "1px solid #ddd" }}>
          <strong>{msg.name}</strong> (ID: {msg.user_id})<br />
          <em>{msg.message}</em>
          <br />
          <button onClick={() => setSelectedUser(msg.user_id)} style={{ marginTop: 5 }}>
            Reply
          </button>
        </div>
      ))}
      {selectedUser && (
        <div style={{ marginTop: 30 }}>
          <h2>Reply to: {selectedUser}</h2>
          <textarea
            rows={4}
            cols={50}
            placeholder="Type your reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <br />
          <button onClick={sendReply} style={{ marginTop: 10 }}>Send</button>
        </div>
      )}
    </div>
  );
}
