import React, { useState, useEffect } from "react";
import axios from "axios";
import { requestToGroqAI } from "../utilities/groq";
import { useRouter } from "next/router";
import ChatHeader from "./ChatHeader";
import ChatForm from "./ChatForm";
import ChatHistory from "./ChatHistory";

const AssistantAI = () => {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const storedUsername = localStorage.getItem("username");

      if (!token) {
        router.push("/login"); // Redirect jika tidak login
        return;
      }

      if (storedUsername) {
        setUsername(storedUsername);
      }

      try {
        const response = await axios.get("/api/chat/get", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (Array.isArray(response.data.chatHistory)) {
          setChatHistory(response.data.chatHistory);
        }
      } catch (error) {
        console.error("Failed to fetch chat history:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || input.length > 500) return;

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User not authenticated");
      return;
    }

    const userMessage = { role: "user", content: input };
    setChatHistory((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const aiResponse = await requestToGroqAI(input);
      const aiMessage = { role: "ai", content: aiResponse };

      await axios.post("/api/chat/save", [userMessage, aiMessage], {
        headers: { Authorization: `Bearer ${token}` },
      });

      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending chat:", error);
      setChatHistory((prev) => [...prev, { role: "ai", content: "Sorry, an error occurred." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Tampilkan username di atas ChatHeader */}
      <div className="text-lg font-bold text-center text-white">Welcome, {username}</div>
      <ChatHeader />
      <ChatForm input={input} setInput={setInput} handleSend={handleSend} isLoading={isLoading} />
      <ChatHistory chatHistory={chatHistory} isLoading={isLoading} />
    </div>
  );
};

export default AssistantAI;
