import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Sidebar from "@/components/Sidebar";
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
        const response = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Terjadi kesalahan.");
        localStorage.removeItem("token");
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="bg-black min-h-screen">
      <Sidebar href="/history" label="ri:arrow-right-line" />

      <div className="flex justify-center items-center pt-[96px] pb-[128px]">
        <div className="text-center">
          {/* AI Icon */}
          <Icon
            icon="fluent:brain-circuit-24-regular"
            width="64"
            height="64"
            className="text-white mx-auto mb-4"
          />

          <h1 className="text-white text-3xl font-bold mb-2">
            Halo, {user?.name || "Pengguna"}!
          </h1>
          <p className="text-white/35 text-sm mb-5">
            Selamat datang kembali di TakokAI. Semoga harimu menyenangkan!
          </p>

          {error ? (
            <p className="text-red-500">{error}</p>
          ) : user ? (
            <div className="p-5 w-[340px] xs:w-[390px] border border-white/15 rounded-3xl backdrop-blur bg-white/5 mx-auto">
              <div className="flex items-center mb-2">
                <Icon
                  icon="gg:profile"
                  width="16"
                  height="16"
                  className="text-white"
                />
                <p className="ml-2 text-white/35 text-xs">{user.name}</p>
              </div>

              <div className="flex items-center mb-2">
                <Icon
                  icon="ic:baseline-email"
                  width="16"
                  height="16"
                  className="text-white"
                />
                <p className="ml-2 text-white/35 text-xs">{user.email}</p>
              </div>

              <button
                className="p-3 mt-5 bg-red-500 rounded-full text-white/75 text-xs w-full"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <p className="text-white/50">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
