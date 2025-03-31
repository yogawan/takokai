import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const ChatHistory = () => {
  const [chats, setChats] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingChat, setEditingChat] = useState(null);
  const [title, setTitle] = useState("");
  const router = useRouter(); // Tambahkan router untuk navigasi

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChats(response.data);
    } catch (error) {
      console.error("Error fetching chats:", error.response?.data || error.message);
    }
  };

  const handleCreateOrUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token tidak ditemukan");

      if (!title.trim()) {
        alert("Title tidak boleh kosong");
        return;
      }

      if (editingChat) {
        // Update chat
        await axios.put(
          `http://localhost:3000/api/history?id=${editingChat._id}`,
          { title },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Create chat
        await axios.post(
          "http://localhost:3000/api/history",
          { title },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      fetchChats();
      closeModal();
    } catch (error) {
      console.error("Error saving chat:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/history?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchChats();
    } catch (error) {
      console.error("Error deleting chat:", error.response?.data || error.message);
    }
  };

  const openModal = (chat = null) => {
    setEditingChat(chat);
    setTitle(chat ? chat.title : "");
    setModalOpen(true);
  };

  const closeModal = () => {
    setEditingChat(null);
    setTitle("");
    setModalOpen(false);
  };

  return (
    <div className="pt-[96px] flex justify-center bg-black pb-[1080px] p-3">
      <Navbar />
      <Sidebar />

      <div>
        <h1 className="text-center text-white text-3xl">Chat History</h1>

        <button className="text-white fixed bottom-20 right-5" onClick={() => openModal()}>
          <Icon icon="basil:add-solid" width="64" height="64" />
        </button>

        <ul className="p-3 w-[340px] xs:w-[390px] sm:w-[610px]">
          {chats.map((chat) => (
            <li className="flex text-white/75 pt-3 pb-3 border-b border-white/15" key={chat._id}>
              
              <button onClick={() => router.push(`/history/${chat._id}`)} className="text-left text-xl pb-2">{chat.title}{" "}</button>

              <button className="text-xs pl-5" onClick={() => openModal(chat)}>
                <Icon icon="lucide:edit" width="16" height="16" className="text-white" />
              </button>

              <button className="text-xs pl-3" onClick={() => handleDelete(chat._id)}>
                <Icon icon="material-symbols:delete" width="16" height="16" className="text-white" />
              </button>

            </li>
          ))}
        </ul>
      </div>

      {modalOpen && (
        <div className="fixed top-0 left-0 right-0 flex justify-center items-center h-screen bg-black/15 backdrop-blur text-white">
          <div className="p-3 w-full xs:w-[390px]">
            <h2 className="ml-5">{editingChat ? "Edit Chat" : "Tambah Chat"}</h2>
            <input
              className="w-full bg-transparent border border-white/15 p-3 m-3 rounded-xl"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul chat"
            />
            <div className="flex justify-between items-center ml-5 mr-5">
              <button onClick={handleCreateOrUpdate}>
                {editingChat ? "Simpan Perubahan" : "Tambah"}
              </button>
              <button onClick={closeModal}>Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatHistory;