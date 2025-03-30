import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { requestToGroqAI } from "@/utilities/groq";
import ChatHeader from "@/components/ChatHeader";
import ChatForm from "@/components/ChatForm";
import ChatHistory from "@/components/ChatHistory";
import Link from "next/link";

const ChatDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchChatDetail();
      loadLocalChatHistory();
    }
  }, [id]);

  const fetchChatDetail = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3000/api/history/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTitle(response.data.title);
    } catch (error) {
      console.error("Error fetching chat details:", error.response?.data || error.message);
    }
  };

  const loadLocalChatHistory = () => {
    try {
      const savedChats = JSON.parse(localStorage.getItem("chatHistory")) || {};
      setChatHistory(savedChats[id] || []);
    } catch {
      setChatHistory([]);
    }
  };

  const syncChatHistoryToServer = async () => {
    if (!id) return console.error("ID tidak ditemukan, tidak bisa sync chat.");
    
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token tidak ditemukan");

      for (const chat of chatHistory) {
        const response = await axios.post(
          `http://localhost:3000/api/history/${id}`,
          { message: { role: chat.role, content: chat.content } },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Response dari server:", response.data);
      }

      console.log("Chat history berhasil dikirim ke server!");
    } catch (error) {
      console.error("Error syncing chat history:", error.response?.data || error.message);
    }
  };

  const restoreChatHistoryFromServer = async () => {
    if (!id) return console.error("ID tidak ditemukan, tidak bisa mengambil chat.");
    
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token tidak ditemukan");

      const response = await axios.get(`http://localhost:3000/api/history/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const restoredChats = response.data.messages || [];
      setChatHistory(restoredChats);
      localStorage.setItem("chatHistory", JSON.stringify({ 
        ...JSON.parse(localStorage.getItem("chatHistory") || "{}"), 
        [id]: restoredChats 
      }));

      console.log("Chat history berhasil dikembalikan dari server!");
    } catch (error) {
      console.error("Error restoring chat history:", error.response?.data || error.message);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || input.length > 500) return;

    const userMessage = { role: "user", content: input };
    const updatedHistory = [...chatHistory, userMessage];

    setChatHistory(updatedHistory);
    localStorage.setItem("chatHistory", JSON.stringify({ 
      ...JSON.parse(localStorage.getItem("chatHistory") || "{}"), 
      [id]: updatedHistory 
    }));

    setInput("");
    setIsLoading(true);

    try {
      const aiResponse = await requestToGroqAI(input);
      const aiMessage = { role: "ai", content: aiResponse };

      const finalHistory = [...updatedHistory, aiMessage];
      setChatHistory(finalHistory);
      localStorage.setItem("chatHistory", JSON.stringify({ 
        ...JSON.parse(localStorage.getItem("chatHistory") || "{}"), 
        [id]: finalHistory 
      }));
    } catch {
      setChatHistory((prev) => [...prev, { role: "ai", content: "Maaf, terjadi kesalahan." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setChatHistory([]);
    const savedChats = JSON.parse(localStorage.getItem("chatHistory")) || {};
    delete savedChats[id];
    localStorage.setItem("chatHistory", JSON.stringify(savedChats));
  };

  return (
    <div className="bg-black w-full flex flex-col">
      <div className="bg-black pb-[1080px] pt-[128px] flex justify-center">
        <div className="p-3 w-full xs:w-[390px] sm:w-[610px]">
          <ChatHeader />
          <h1 className="text-white text-xl font-bold text-center mt-4">{title || "Loading..."}</h1>
          <Link className="text-white" href={"/history"}>Back</Link>
          <ChatForm input={input} setInput={setInput} handleSend={handleSend} isLoading={isLoading} />
          <ChatHistory chatHistory={chatHistory} isLoading={isLoading} handleClearHistory={handleClearHistory} />
          <div className="flex justify-center space-x-4 mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={syncChatHistoryToServer}>
              Sync Chat to Server
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={restoreChatHistoryFromServer}>
              Load Chat dari Server
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
