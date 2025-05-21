import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
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
  const [showPassword, setShowPassword] = useState(false);
  
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
    <div className="bg-[url('/assets/background.png')] bg-cover h-screen flex justify-center items-center">
      <div className="w-full xs:w-[390px] p-3">

        {/* <ProtectedImage
          src="/branding/logo.png"
          className="w-[128px] mb-5 ml-2"
          alt="JawirAI Logo"
        />

        <p className="text-xl text-white mb-5 ml-2 leading-1">
          TakonAI
        </p> */}

        {message && <p className="text-white">{message}</p>}
        {passwordError && <p className="text-red-500">{passwordError}</p>}

        {/* Form & Button Register */}
        <form onSubmit={handleSubmit}>

          <div className="w-full mt-2">
            <label className="ml-3 text-white/50">Name</label><br />
            <input
              className="mt-2 w-full text-white bg-transparent border border-white/5 p-3 rounded-xl"
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="w-full mt-2">
            <label className="ml-3 text-white/50">Username</label><br />
            <input
              className="mt-2 w-full text-white bg-transparent border border-white/5 p-3 rounded-xl"
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="w-full mt-2">
            <label className="ml-3 text-white/50">Email</label><br />
            <input
              className="mt-2 w-full text-white bg-transparent border border-white/5 p-3 rounded-xl"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="w-full mt-2 relative"> 
            <label className="ml-3 text-white/50">Password</label><br />
            <input
              className="mt-2 w-full text-white bg-transparent border border-white/5 p-3 pr-10 rounded-xl"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {/* Tambahkan icon mata */}
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
              "Register"
            )}
          </button>

        </form>

        {/* Text Button */}
        <div className="text-center mt-2">
          <Link className="text-white text-xs" href={"/"}>Sudah Punya Akun?</Link>
        </div>

      </div>
    </div>
  );
};

export default Register;
