import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { Icon } from "@iconify/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      router.push("/history");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        router.push("/history");
      } else {
        setMessage("Token tidak ditemukan di response.");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#171717] min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-md p-6 bg-[#303030] rounded-2xl shadow-lg border border-white/10">
        {message && (
          <p className="text-sm text-red-400 bg-white/10 p-2 rounded mb-4 text-center">
            {message}
          </p>
        )}
        <h2 className="text-white text-2xl font-semibold mb-6 text-center">
          Login
        </h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="w-full mt-3 relative">
            <label className="ml-3 text-white/60 flex items-center gap-2">
              <Icon icon="mdi:email-outline" width={20} height={20} /> Email
            </label>
            <input
              className="mt-2 w-full bg-[#303030] text-white border border-white/20 p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Icon
              icon="mdi:email-outline"
              width={20}
              height={20}
              className="absolute top-[44px] left-3 text-white/60 pointer-events-none"
            />
          </div>

          <div className="w-full mt-3 relative">
            <label className="ml-3 text-white/60 flex items-center gap-2">
              <Icon icon="mdi:lock-outline" width={20} height={20} /> Password
            </label>
            <input
              className="mt-2 w-full bg-[#303030] text-white border border-white/20 p-3 pr-10 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Icon
              icon="mdi:lock-outline"
              width={20}
              height={20}
              className="absolute top-[44px] left-3 text-white/60 pointer-events-none"
            />
            <div
              className="absolute right-4 top-[55%] transform -translate-y-1/2 cursor-pointer text-white/60"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Icon
                icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
                width={20}
                height={20}
              />
            </div>
          </div>

          <button
            className="mt-5 bg-[#EEEEEE] p-4 text-black w-full rounded-2xl flex justify-center items-center font-semibold hover:bg-gray-300 transition"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <Icon
                icon="eos-icons:loading"
                className="animate-spin"
                width={24}
                height={24}
              />
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link
            className="text-[#EEEEEE] text-sm underline hover:text-indigo-400"
            href="/auth/register"
          >
            Belum Punya Akun?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
