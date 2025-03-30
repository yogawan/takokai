import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ChatHistory() {
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
      const response = await axios.get("http://localhost:3000/api/history", {
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
    <div>
      <h1>Chat History</h1>
      <button onClick={() => openModal()}>+ Tambah Chat</button>
      <ul>
        {chats.map((chat) => (
          <li key={chat._id}>
            {chat.title}{" "}
            <button onClick={() => openModal(chat)}>Edit</button>
            <button onClick={() => handleDelete(chat._id)}>Hapus</button>
            <button onClick={() => router.push(`/history/${chat._id}`)}>Lihat Detail</button>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {modalOpen && (
        <div className="modal">
          <h2>{editingChat ? "Edit Chat" : "Tambah Chat"}</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul chat"
          />
          <button onClick={handleCreateOrUpdate}>
            {editingChat ? "Simpan Perubahan" : "Tambah"}
          </button>
          <button onClick={closeModal}>Batal</button>
        </div>
      )}
    </div>
  );
}
