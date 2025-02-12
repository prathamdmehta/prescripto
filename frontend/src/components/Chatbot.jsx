import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 5000); // Hide after 5 seconds
    }, 6000); // Show every 7 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    const lowerInput = input.toLowerCase();
    let botResponse = "I'm still learning! How can I assist you?";

    if (
      lowerInput.includes("book an appointment") ||
      lowerInput.includes("schedule a visit") ||
      lowerInput.includes("how to book") ||
      lowerInput.includes("appointment")
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

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={styles.chatbotContainer}>
      {/* Scroll to Top Button */}
      {showScrollButton && (
        <IconButton style={styles.scrollButton} onClick={scrollToTop}>
          <ArrowUpwardIcon />
        </IconButton>
      )}

      {/* Floating Chat Button with Popup */}
      {!isOpen && (
        <div style={styles.chatIconContainer}>
          {showPopup && <div className="popupMessage">Ask Query</div>}
          <IconButton style={styles.chatButton} onClick={toggleChat}>
            <ChatIcon />
          </IconButton>
        </div>
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
                style={
                  msg.sender === "user" ? styles.userMessage : styles.botMessage
                }
              >
                {msg.text.split("\n").map((line, i) => (
                  <p key={i} style={{ margin: 0 }}>
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div style={styles.chatInputContainer}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
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

// Styles
const styles = {
  chatbotContainer: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    zIndex: 1000,
  },
  scrollButton: {
    backgroundColor: "#007bff",
    bottom: "33px",
    // right: "5px",
    color: "#fff",
    padding: "10px",
    borderRadius: "50%",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    marginBottom: "10px",
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
