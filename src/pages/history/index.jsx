import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import Sidebar from "@/components/Sidebar";

const BASE_URL = "http://localhost:5000/api/history";

const ChatHistory = () => {
  const [chats, setChats] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingChat, setEditingChat] = useState(null);
  const [title, setTitle] = useState("");
  const router = useRouter();

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        headers: getAuthHeaders(),
      });
      setChats(response.data);
    } catch (error) {
      console.error(
        "Error fetching chats:",
        error.response?.data || error.message,
      );
    }
  };

  const handleCreateOrUpdate = async () => {
    try {
      if (!title.trim()) return alert("Title tidak boleh kosong");

      const id = editingChat?._id || editingChat?.id;
      if (editingChat && id) {
        await axios.put(
          `${BASE_URL}/${id}`,
          { title },
          { headers: getAuthHeaders() },
        );
      } else {
        await axios.post(BASE_URL, { title }, { headers: getAuthHeaders() });
      }

      await fetchChats();
      closeModal();
    } catch (error) {
      console.error(
        "Error saving chat:",
        error.response?.data || error.message,
      );
      alert("Gagal menyimpan chat.");
    }
  };

  const handleDelete = async (id) => {
    if (!id || !confirm("Yakin ingin menghapus chat ini?")) return;

    try {
      await axios.delete(`${BASE_URL}/${id}`, { headers: getAuthHeaders() });
      await fetchChats();
    } catch (error) {
      console.error(
        "Error deleting chat:",
        error.response?.data || error.message,
      );
      alert("Gagal menghapus chat.");
    }
  };

  const openModal = (chat = null) => {
    setEditingChat(chat);
    setTitle(chat?.title || "");
    setModalOpen(true);
  };

  const closeModal = () => {
    setEditingChat(null);
    setTitle("");
    setModalOpen(false);
  };

  return (
    <div className="pt-[96px] min-h-screen bg-black text-white flex justify-center pb-[200px] p-3">
      <Sidebar href="/profile" label="gg:profile" />

      <div className="w-full max-w-xl">
        <h1 className="text-center text-3xl font-bold mb-8">Semua Chat</h1>

        {chats.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-white/60">
            <Icon
              icon="mdi:chat-off"
              width="48"
              height="48"
              className="text-white"
            />
            <p className="mt-4 text-lg font-semibold">
              Belum ada chat tersedia
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {chats.map((chat) => (
              <li
                key={chat._id || chat.id}
                className="flex items-center justify-between bg-white/5 border border-white/15 rounded-xl px-4 py-3 backdrop-blur hover:scale-[1.01] transition-all"
              >
                <button
                  className="text-left flex-1 text-white/80 font-medium hover:text-white focus:outline-none focus:ring-2 focus:ring-[#EEEEEE] rounded"
                  onClick={() => router.push(`/history/${chat._id || chat.id}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter")
                      router.push(`/history/${chat._id || chat.id}`);
                  }}
                >
                  {chat.title}
                </button>

                <div className="flex gap-2 ml-3">
                  <button
                    onClick={() => openModal(chat)}
                    className="hover:text-[#EEEEEE] focus:outline-none focus:ring-2 focus:ring-[#EEEEEE] rounded"
                    aria-label={`Edit ${chat.title}`}
                  >
                    <Icon icon="lucide:edit" width="18" height="18" />
                  </button>
                  <button
                    onClick={() => handleDelete(chat._id || chat.id)}
                    className="hover:text-[#EEEEEE] focus:outline-none focus:ring-2 focus:ring-[#EEEEEE] rounded"
                    aria-label={`Hapus ${chat.title}`}
                  >
                    <Icon
                      icon="material-symbols:delete"
                      width="18"
                      height="18"
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Floating Button */}
        <button
          onClick={() => openModal()}
          className="bg-white/10 hover:bg-white/20 backdrop-blur border border-white/15 fixed bottom-5 right-5 p-4 rounded-full shadow-xl focus:outline-none focus:ring-2 focus:ring-[#EEEEEE] transition-all"
          aria-label="Tambah chat baru"
        >
          <Icon icon="ic:baseline-plus" width="28" height="28" />
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-white/5 border border-white/15 p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              {editingChat ? "Edit Judul Chat" : "Buat Chat Baru"}
            </h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul chat"
              className="w-full mb-4 px-4 py-2 rounded-xl bg-transparent border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEEEEE]"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateOrUpdate();
              }}
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                Batal
              </button>
              <button
                onClick={handleCreateOrUpdate}
                className="px-4 py-2 rounded-lg bg-[#EEEEEE] text-black hover:brightness-90 transition focus:outline-none focus:ring-2 focus:ring-[#EEEEEE]"
              >
                {editingChat ? "Simpan" : "Tambah"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
