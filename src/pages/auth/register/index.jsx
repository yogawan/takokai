import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import ProtectedImage from "@/components/ProtectedImage";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setPasswordError("");

    if (!validatePassword(formData.password)) {
      setPasswordError("Password harus terdiri dari minimal 8 karakter, termasuk angka dan huruf.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/auth/register", formData);
      setMessage(response.data.message);
      router.push("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <div className="w-full xs:w-[340px] p-3">
        
        <ProtectedImage
          src="/branding/logo.png"
          className="w-[128px] mb-5 ml-2"
          alt="JawirAI Logo"
        />

        <p className="text-xl text-white mb-5 ml-2 leading-1">
          Indonesian DeepSeek with budget $16 (Beta Test)
        </p>

        {message && <p className="text-white">{message}</p>}
        {passwordError && <p className="text-red-500">{passwordError}</p>}

        <form onSubmit={handleSubmit}>

          <div className="w-full mt-2">
            <label className="text-white/50">Name</label><br />
            <input
              className="w-full text-white bg-transparent border border-white/15 p-3 rounded-xl"
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="w-full mt-2">
            <label className="text-white/50">Username</label><br />
            <input
              className="w-full text-white bg-transparent border border-white/15 p-3 rounded-xl"
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="w-full mt-2">
            <label className="text-white/50">Email</label><br />
            <input
              className="w-full text-white bg-transparent border border-white/15 p-3 rounded-xl"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="w-full mt-2">
            <label className="text-white/50">Password</label><br />
            <input
              className="w-full text-white bg-transparent border border-white/15 p-3 rounded-xl"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button 
            className="mt-5 border border-white/15 p-3 text-white/75 w-full rounded-full"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Register"}
          </button>

        </form>
        <div className="text-center mt-2">
          <Link className="text-white text-xs" href={"/"}>Sudah Punya Akun?</Link>
        </div>

      </div>
    </div>
  );
};

export default Register;