import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateRoom() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Room name is required");
      return;
    }

    console.log({ name, description });

    // 🔜 later: API call
    navigate("/rooms");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#0f172a] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-lg bg-[#1f2937] rounded-2xl p-8 border border-gray-700 shadow-xl">
        
        <h1 className="text-2xl font-bold text-[#ffb703] mb-2">
          Create a Room
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          Start a conversation and invite others to join.
        </p>

        <form onSubmit={handleCreate} className="space-y-5">
          <input
            type="text"
            placeholder="Room name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#111827] border border-gray-700 text-white outline-none focus:border-[#ffb703]"
          />

          <textarea
            placeholder="Room description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-[#111827] border border-gray-700 text-white outline-none focus:border-[#ffb703] resize-none"
          />

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate("/rooms")}
              className="text-gray-400 hover:text-[#ffb703] text-sm"
            >
              ← Back to rooms
            </button>

            <button
              type="submit"
              className="bg-[#ffb703] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#ffc933] transition"
            >
              Create Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
