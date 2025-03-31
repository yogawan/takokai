import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ProtectedImage from "@/components/ProtectedImage";
import { Icon } from "@iconify/react";

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
    <div className="bg-black">
      <Sidebar />
      <Navbar />
      <div className="bg-black h-screen flex justify-center items-center">
        <div>
          <ProtectedImage
            src="/branding/logo.png"
            className="w-[128px] ml-5 mb-5"
            alt="JawirAI Logo"
          />

          <h1 className="text-white text-3xl ml-5 mb-3">User Profile</h1>

          {error ? (
            <p className="text-red-500">{error}</p>
          ) : user ? (
            <div className="p-5 w-[340px] xs:w-[390px] border border-white/15 rounded-3xl">
              <div className="flex items-center">
                <Icon className="text-white" icon="gg:profile" width="16" height="16" />
                <p className="ml-2 text-white/35 text-xs">{user.name}</p>
              </div>

              <div className="flex items-center mt-2">
                <Icon className="text-white" icon="ic:baseline-email" width="16" height="16" />
                <p className="ml-2 text-white/35 text-xs">{user.email}</p><br />
              </div>
              <button
                className="p-3 mt-5 bg-red-500 rounded-full text-white/75 text-xs"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;