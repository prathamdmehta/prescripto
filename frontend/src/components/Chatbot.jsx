import React, { useState } from "react";
import { IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    // Convert input to lowercase for better keyword detection
    const lowerInput = input.toLowerCase();

    let botResponse = "I'm still learning! How can I assist you?";

    if (
      lowerInput.includes("book an appointment") || 
      lowerInput.includes("schedule a visit") ||
      lowerInput.includes("how to book") || lowerInput.includes("appointment") 
    ) {
      botResponse = 
        "📅 How to book an appointment:\n" +
        "1️⃣ First, log in to your account.\n" +
        "2️⃣ Go to the 'All Doctors' section.\n" +
        "3️⃣ Select the type of doctor you need.\n" +
        "4️⃣ Choose an available time slot and confirm your booking.";
    } else if (
      lowerInput.includes("payment") || 
      lowerInput.includes("refund") || 
      lowerInput.includes("money") || 
      lowerInput.includes("transaction")
    ) {
      botResponse = 
        "💳 For payment-related queries:\n" +
        "📧 Email: support@prescripto.com\n" +
        "📞 Phone: +91 7666077745";
    }

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    }, 1000);
  };

  // Handle Enter key press to send message
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div style={styles.chatbotContainer}>
      {/* Floating Chat Button */}
      {!isOpen && (
        <IconButton style={styles.chatButton} onClick={toggleChat}>
          <ChatIcon />
        </IconButton>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={styles.chatWindow}>
          <div style={styles.chatHeader}>
            <span>Chat with Us</span>
            <IconButton onClick={toggleChat} size="small">
              <CloseIcon />
            </IconButton>
          </div>

          <div style={styles.chatBody}>
            {messages.map((msg, index) => (
              <div 
                key={index} 
                style={msg.sender === "user" ? styles.userMessage : styles.botMessage}
              >
                {msg.text.split("\n").map((line, i) => (
                  <p key={i} style={{ margin: 0 }}>{line}</p>
                ))}
              </div>
            ))}
          </div>

          <div style={styles.chatInputContainer}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress} // Listen for Enter key
              placeholder="Type a message..."
              style={styles.chatInput}
            />
            <button onClick={handleSend} style={styles.sendButton}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Inline styles
const styles = {
  chatbotContainer: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1000,
  },
  chatButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    borderRadius: "50%",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  chatWindow: {
    width: "300px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
  },
  chatHeader: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
  chatBody: {
    padding: "10px",
    height: "400px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "8px",
    borderRadius: "10px",
    maxWidth: "80%",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f1f1f1",
    padding: "8px",
    borderRadius: "10px",
    maxWidth: "80%",
  },
  chatInputContainer: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #ddd",
  },
  chatInput: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    outline: "none",
  },
  sendButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "8px",
    marginLeft: "5px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Chatbot;
