import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import ProtectedImage from "@/components/ProtectedImage";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await axios.post("/api/auth/register", formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registrasi gagal");
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

        {message && <p className="text-white">{message}</p>}

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

          <button className="mt-5 border border-white/15 p-3 text-white/75 w-full rounded-full" type="submit">Register</button>

        </form>
        <div className="text-center mt-2">
          <Link className="text-white text-xs" href={"/"}>Sudah Punya Akun?</Link>
        </div>

        <hr className="mt-2 border-t border-white/15" />

        <div className="mt-3 flex justify-center items-center border border-white/15 p-3 rounded-full">
          <ProtectedImage
            src="/assets/google.png"
            className="w-[16px] h-[16px] mr-3"
          />
          <p className="text-white/75 text-xs">
            Register with Google (Coming Soon)
          </p>
        </div>

        <div className="mt-3 flex justify-center items-center border border-white/15 p-3 rounded-full">
          <ProtectedImage
            src="/assets/facebook.png"
            className="w-[16px] h-[16px] mr-3"
          />
          <p className="text-white/75 text-xs">
            Register with Facebook (Coming Soon)
          </p>
        </div>

        <div className="mt-3 flex justify-center items-center border border-white/15 p-3 rounded-full">
          <ProtectedImage
            src="/assets/x.png"
            className="w-[16px] h-[16px] mr-3"
          />
          <p className="text-white/75 text-xs">
            Register with X (Coming Soon)
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;