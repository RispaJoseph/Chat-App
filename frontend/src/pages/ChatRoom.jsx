import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  HiArrowLeft,
  HiPaperAirplane,
  HiEmojiHappy,
  HiPhotograph,
} from "react-icons/hi";

export default function ChatRoom() {
  const { id } = useParams();
  const navigate = useNavigate();

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const typingTimerRef = useRef(null);

  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const users = [
    { name: "Alice", online: true },
    { name: "Bob", online: true },
    { name: "You", online: true },
  ];

  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Alice",
      text: "Hey everyone!",
      time: "10:30 AM",
    },
    {
      id: 2,
      user: "Bob",
      text: "Welcome!",
      time: "10:31 AM",
    },
    {
      id: 3,
      user: "You",
      text: "Hi Alice 👋",
      time: "10:32 AM",
    },
  ]);

  const emojis = ["😀", "😂", "😍", "😎", "🔥", "👍", "🎉"];

  /* ✅ Auto scroll (this effect is correct) */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* ✅ Handle typing (NO useEffect misuse) */
  const handleTyping = (e) => {
    setMessage(e.target.value);
    setIsTyping(true);

    clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        user: "You",
        text: message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setMessage("");
    setIsTyping(false);
    setShowEmoji(false);
  };

  const handleEmojiClick = (emoji) => {
    setMessage((prev) => prev + emoji);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        user: "You",
        image: imageURL,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  return (
    <div className="h-screen flex bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#0f172a] text-white">

      {/* SIDEBAR */}
      <aside className="hidden md:flex w-64 flex-col border-r border-gray-800 bg-[#111827]">
        <div className="px-6 py-4 border-b border-gray-800 text-[#ffb703] font-semibold">
          Room Members
        </div>

        <div className="flex-1 px-4 py-4 space-y-3">
          {users.map((user) => (
            <div
              key={user.name}
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#1f2937]"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  user.online ? "bg-green-400" : "bg-gray-500"
                }`}
              ></span>
              <span className="text-sm">{user.name}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-800 bg-[#111827]">
          <button onClick={() => navigate("/rooms")}>
            <HiArrowLeft className="text-gray-300 hover:text-[#ffb703]" size={22} />
          </button>

          <h2 className="text-lg font-semibold text-[#ffb703]">
            Room #{id}
          </h2>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.user === "You" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl text-sm ${
                  msg.user === "You"
                  ? "bg-[#2c256b] text-white rounded-br-none"
                  : "bg-[#1f2937] rounded-bl-none"

                }`}
              >
                {msg.user !== "You" && (
                  <div className="text-xs text-gray-400 mb-1">
                    {msg.user}
                  </div>
                )}

                {msg.text && <p>{msg.text}</p>}

                {msg.image && (
                  <img
                    src={msg.image}
                    alt="uploaded"
                    className="rounded-lg mt-2 max-h-48"
                  />
                )}

                <div className="text-[10px] text-gray-400 mt-1 text-right">
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="text-xs text-gray-400 italic">
              Someone is typing...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <form
          onSubmit={sendMessage}
          className="relative flex items-center gap-3 px-6 py-4 border-t border-gray-800 bg-[#111827]"
        >
          <button
            type="button"
            onClick={() => setShowEmoji(!showEmoji)}
            className="text-gray-400 hover:text-[#ffb703]"
          >
            <HiEmojiHappy size={22} />
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="text-gray-400 hover:text-[#ffb703]"
          >
            <HiPhotograph size={22} />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileUpload}
          />

          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={handleTyping}
            className="flex-1 px-4 py-3 rounded-full bg-[#0f172a] border border-gray-700 outline-none focus:border-[#ffb703]"
          />

          <button
            type="submit"
            className="bg-[#ffb703] text-black p-3 rounded-full hover:bg-[#ffc933]"
          >
            <HiPaperAirplane />
          </button>

          {showEmoji && (
            <div className="absolute bottom-16 left-6 bg-[#1f2937] p-3 rounded-xl flex gap-2 shadow-lg">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleEmojiClick(emoji)}
                  className="text-lg hover:scale-110 transition"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
