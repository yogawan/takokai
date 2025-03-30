import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token tidak ditemukan, silakan login.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Terjadi kesalahan.");
        localStorage.removeItem("token"); // Hapus token jika tidak valid
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>

      {error ? (
        <p className="text-red-400">{error}</p>
      ) : user ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-center">
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="text-gray-400">{user.email}</p>
          <button
            className="mt-4 bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;