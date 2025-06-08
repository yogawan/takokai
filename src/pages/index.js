import Link from "next/link";
import { Icon } from "@iconify/react";

const Home = () => {
  const anggota = [
    { npm: "5220411056", nama: "Yogaone" },
    { npm: "5220411000", nama: "Firman" },
    { npm: "5220411000", nama: "Uday" },
  ];

  return (
    <div className="min-h-screen bg-[#171717] flex flex-col justify-center px-6 py-10 max-w-xl mx-auto">
      <div className="mb-8 text-start">
        <Icon
          icon="mdi:robot"
          width={60}
          height={60}
          className="text-[#EEEEEE] mb-2"
        />
        <h1 className="text-4xl font-bold text-white mb-2">Our Team</h1>
        <p className="text-white/80 mb-6">Daftar anggota kelompok dan NPM.</p>
      </div>

      <div className="space-y-4 mb-10">
        {anggota.map(({ npm, nama }) => (
          <div
            key={npm}
            className="border border-white/15 p-4 rounded-2xl shadow-md text-white"
          >
            <p>
              <span className="font-semibold">NPM:</span> {npm}
            </p>
            <p>
              <span className="font-semibold">Nama:</span> {nama}
            </p>
          </div>
        ))}
      </div>

      <Link href="/auth/login">
        <button
          className="bg-[#EEEEEE] text-black font-semibold py-5 rounded-2xl w-full hover:bg-gray-300 transition"
          type="button"
        >
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default Home;
