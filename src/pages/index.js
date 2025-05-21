import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { Icon } from "@iconify/react";
import ProtectedImage from "@/components/ProtectedImage";

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
      const response = await axios.post("/api/auth/login", { email, password });

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
    <div className="bg-[url('/assets/background.png')] bg-cover h-screen flex justify-center items-center">
      <div className="w-full xs:w-[390px] p-3 relative z-10">

        {/* <ProtectedImage
          src="/branding/logo.png"
          className="w-[128px] mb-5 ml-2"
          alt="JawirAI Logo"
        />

        <p className="text-xl text-white mb-5 ml-2 leading-1">TakonAI</p> */}

        {message && (
          <p className="text-sm text-red-400 bg-white/10 p-2 rounded mb-2 ml-2">
            {message}
          </p>
        )}

        {/* Form & Button Login */}
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="w-full mt-3">
            <label className="ml-3 text-white/50">Email</label>
            <input
              className="mt-2 w-full text-white bg-transparent border border-white/5 p-3 rounded-xl"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="w-full mt-3 relative">
            <label className="ml-3 text-white/50">Password</label>
            <input
              className="mt-2 w-full text-white bg-transparent border border-white/5 p-3 pr-10 rounded-xl"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="absolute right-4 top-[65%] transform -translate-y-1/2 cursor-pointer text-white/60"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Icon icon={showPassword ? "mdi:eye-off" : "mdi:eye"} width={20} height={20} />
            </div>
          </div>

          <button
            className="mt-5 bg-primary p-4 text-white/75 w-full rounded-2xl flex justify-center items-center"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <Icon icon="eos-icons:loading" className="animate-spin" width={24} height={24} />
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Text Button */}
        <div className="text-center mt-2">
          <Link className="text-white text-xs" href="/auth/register">
            Belum Punya Akun?
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
