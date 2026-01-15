import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0f172a]/90 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-lg font-bold text-[#ffb703]">
          BuzzTalk
        </div>

        <div className="flex gap-6 text-sm text-gray-300">
          <a href="#hero" className="hover:text-white">
            Home
          </a>
          <a href="#how" className="hover:text-white">
            How it works
          </a>
          <a href="#why" className="hover:text-white">
            Why choose
          </a>
          <button
            onClick={() => navigate("/login")}
            className="text-[#ffb703] font-semibold hover:text-[#ffc933]"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
