import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import ProtectedImage from "@/components/ProtectedImage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="bg-black h-screen flex justify-center items-center">
      <div className="w-full xs:w-[340px] p-3">
        <ProtectedImage
          src="/branding/logo.png"
          className="w-[128px] mb-5"
          alt="JawirAI Logo"
        />

        <p className="text-xl text-white border-b border-white/15 pb-3 leading-1">
          The first Indonesian's DeepSeek. Based in Javanese island
        </p>

        {message && <p className="text-white">{message}</p>}

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="w-full mt-2">
            <label className="text-white/50">Email</label>
            <input
              className="w-full text-white bg-transparent border border-white/15 p-3 rounded-xl"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="w-full mt-2">
            <label className="text-white/50">Password</label>
            <input
              className="w-full text-white bg-transparent border border-white/15 p-3 rounded-xl"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="mt-5 border border-white/15 p-3 text-white/75 w-full rounded-full"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-2">
          <Link className="text-white text-xs" href="/auth/register">
            Belum Punya Akun?
          </Link>
        </div>

        <hr className="mt-2 border-t border-white/15" />

        <div className="mt-3 flex justify-center items-center border border-white/15 p-3 rounded-full">
          <ProtectedImage src="/assets/google.png" className="w-[16px] h-[16px] mr-3" />
          <p className="text-white/75 text-xs">Login with Google (Coming Soon)</p>
        </div>

        <div className="mt-3 flex justify-center items-center border border-white/15 p-3 rounded-full">
          <ProtectedImage src="/assets/facebook.png" className="w-[16px] h-[16px] mr-3" />
          <p className="text-white/75 text-xs">Login with Facebook (Coming Soon)</p>
        </div>

        <div className="mt-3 flex justify-center items-center border border-white/15 p-3 rounded-full">
          <ProtectedImage src="/assets/x.png" className="w-[16px] h-[16px] mr-3" />
          <p className="text-white/75 text-xs">Login with X (Coming Soon)</p>
        </div>
      </div>
    </div>
  );
};

export default Login;