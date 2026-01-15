import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#0f172a] text-white">
      <Navbar />

      {/* ================= HERO ================= */}
      <section
        id="hero"
        className="
          min-h-screen
          scroll-mt-[80px]
          flex
          flex-col
          items-center
          justify-center
          text-center
          px-6
        "
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Welcome to <span className="text-[#ffb703]">BuzzTalk</span>
        </h1>

        <p className="text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Connect with people, share ideas, and enjoy fast, real-time
          conversations. Join public rooms or create your own space.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="
            bg-[#ffb703]
            text-black
            px-8
            py-3
            rounded-full
            font-semibold
            hover:bg-[#ffc933]
            transition
          "
        >
          Login to get started →
        </button>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section
        id="how"
        className="
          min-h-screen
          scroll-mt-[80px]
          flex
          flex-col
          justify-start
          pt-24
          px-6
        "
      >
        <h2 className="text-3xl font-semibold text-center mb-20">
          How It Works
        </h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-[#1f2937] p-8 rounded-xl shadow-lg border border-gray-700">
            <h3 className="text-lg font-semibold mb-3 text-[#ffb703]">
              🔗 Join a Room
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover public chat rooms and connect instantly with people who
              share your interests.
            </p>
          </div>

          <div className="bg-[#1f2937] p-8 rounded-xl shadow-lg border border-gray-700">
            <h3 className="text-lg font-semibold mb-3 text-[#ffb703]">
              ➕ Create a Room
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Start your own private room and invite others to join your
              conversation.
            </p>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE ================= */}
      <section
        id="why"
        className="
          min-h-screen
          scroll-mt-[80px]
          flex
          flex-col
          justify-start
          pt-24
          bg-[#111827]
          px-6
        "
      >
        <h2 className="text-3xl font-semibold text-center mb-24">
          Why Choose BuzzTalk?
        </h2>

        <div className="grid md:grid-cols-3 gap-20 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="text-5xl mb-5 text-[#ffb703]">👥</div>
            <h4 className="font-semibold mb-3">Community Driven</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Engage in meaningful conversations with a growing global
              community.
            </p>
          </div>

          <div className="text-center">
            <div className="text-5xl mb-5 text-[#ffb703]">⚡</div>
            <h4 className="font-semibold mb-3">Fast & Real-Time</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Built with WebSockets for instant, lag-free messaging.
            </p>
          </div>

          <div className="text-center">
            <div className="text-5xl mb-5 text-[#ffb703]">🔒</div>
            <h4 className="font-semibold mb-3">Secure & Private</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Authenticated chats with secure communication.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="text-center text-gray-500 text-sm py-10">
        © {new Date().getFullYear()} BuzzTalk. All rights reserved.
      </footer>
    </div>
  );
}
