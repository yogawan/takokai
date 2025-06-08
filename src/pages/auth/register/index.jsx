import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";

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
      setPasswordError(
        "Password harus minimal 8 karakter, termasuk angka dan huruf.",
      );
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "/api/auth/register",
        formData,
      );
      setMessage(response.data.message);
      router.push("/auth/login");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#171717] min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-md p-6 bg-[#303030] rounded-2xl shadow-lg border border-white/10">
        {message && (
          <p className="text-sm text-green-400 bg-white/10 p-2 rounded mb-4 text-center">
            {message}
          </p>
        )}
        {passwordError && (
          <p className="text-red-500 bg-white/10 p-2 rounded mb-4 text-center">
            {passwordError}
          </p>
        )}
        <h2 className="text-white text-2xl font-semibold mb-6 text-center">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="w-full mt-2 relative">
            <label className="ml-3 text-white/60 flex items-center gap-2">
              <Icon icon="mdi:account-outline" width={20} height={20} /> Name
            </label>
            <input
              className="mt-2 w-full bg-[#303030] text-white border border-white/20 p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Icon
              icon="mdi:account-outline"
              width={20}
              height={20}
              className="absolute top-[44px] left-3 text-white/60 pointer-events-none"
            />
          </div>

          <div className="w-full mt-2 relative">
            <label className="ml-3 text-white/60 flex items-center gap-2">
              <Icon icon="mdi:account-circle-outline" width={20} height={20} />{" "}
              Username
            </label>
            <input
              className="mt-2 w-full bg-[#303030] text-white border border-white/20 p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <Icon
              icon="mdi:account-circle-outline"
              width={20}
              height={20}
              className="absolute top-[44px] left-3 text-white/60 pointer-events-none"
            />
          </div>

          <div className="w-full mt-2 relative">
            <label className="ml-3 text-white/60 flex items-center gap-2">
              <Icon icon="mdi:email-outline" width={20} height={20} /> Email
            </label>
            <input
              className="mt-2 w-full bg-[#303030] text-white border border-white/20 p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Icon
              icon="mdi:email-outline"
              width={20}
              height={20}
              className="absolute top-[44px] left-3 text-white/60 pointer-events-none"
            />
          </div>

          <div className="w-full mt-2 relative">
            <label className="ml-3 text-white/60 flex items-center gap-2">
              <Icon icon="mdi:lock-outline" width={20} height={20} /> Password
            </label>
            <input
              className="mt-2 w-full bg-[#303030] text-white border border-white/20 p-3 pr-10 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
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
              "Register"
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link
            className="text-[#EEEEEE] text-sm underline hover:text-indigo-400"
            href={"/"}
          >
            Sudah Punya Akun?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
