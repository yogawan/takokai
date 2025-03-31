import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { requestToGroqAI } from "@/utilities/groq";
import ChatHeader from "@/components/ChatHeader";
import ChatForm from "@/components/ChatForm";
import ChatHistory from "@/components/ChatHistory";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { Icon } from "@iconify/react";

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
      const response = await axios.get(`/api/history/${id}`, {
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
      <Sidebar />
      <nav className="fixed bottom-5 left-0 right-0 flex justify-center">
          <ul className="bg-black/5 backdrop-blur flex p-3 border border-white/15 rounded-full">
              <li className="m-3">
                  <Link className="flex items-center text-white text-xs" href="/history">
                      <Icon className="text-white mr-2" icon="material-symbols:history" width="24" height="24" />
                      History
                  </Link>
              </li>
              <li className="m-3">
                  <Link className="flex items-center text-white text-xs" href={`/history/${id}`}>
                      <Icon className="text-white mr-2" icon="ri:chat-ai-fill" width="24" height="24" />
                      Chat
                  </Link>
              </li>
          </ul>
      </nav>
      <div className="bg-black pb-[1080px] pt-[96px] flex justify-center">
        <div className="p-3 w-full xs:w-[390px] sm:w-[610px]">
          <h1 className="text-white text-3xl leading-none font-bold text-center mt-5 mb-3 pb-5 border-b border-white/15">{title || "Loading..."}</h1>
          <div className="flex justify-end">
            <Link className="text-xs text-black p-3 bg-white rounded-full" href={"/history"}>Back</Link>
          </div>
          <ChatHeader />
          <ChatForm input={input} setInput={setInput} handleSend={handleSend} isLoading={isLoading} />
          <ChatHistory chatHistory={chatHistory} isLoading={isLoading} handleClearHistory={handleClearHistory} />
          <div className="flex justify-center space-x-1 mt-4">
            <button className="bg-white p-3 rounded-full" onClick={syncChatHistoryToServer}>
              Sync
            </button>
            <button className="border border-white/15 text-white p-3 rounded-full" onClick={restoreChatHistoryFromServer}>
              Restore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;