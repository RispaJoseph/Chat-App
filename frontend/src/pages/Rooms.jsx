import { useNavigate } from "react-router-dom";
import { HiUserGroup } from "react-icons/hi";

export default function Rooms() {
    const navigate = useNavigate();

    // Temporary dummy data (later comes from backend)
    const rooms = [
        {
            id: 1,
            name: "General Chat",
            description: "Talk about anything and everything.",
            users: 12,
        },
        {
            id: 2,
            name: "Tech Talk",
            description: "Discuss programming, AI, and tech trends.",
            users: 8,
        },
        {
            id: 3,
            name: "Movies & Music",
            description: "Chat about movies, series, and music.",
            users: 5,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#0f172a] text-white">

            {/* HEADER */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-gray-800">
                <h1 className="text-2xl font-bold text-[#ffb703]">
                    BuzzTalk
                </h1>

                <button
                    onClick={() => navigate("/")}
                    className="text-sm text-gray-300 hover:text-[#ffb703]"
                >
                    Logout
                </button>
            </div>

            {/* PAGE HEADER */}
            <div className="max-w-6xl mx-auto px-8 mt-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-semibold mb-2">Join a Room</h2>
                    <p className="text-gray-400 text-sm">
                        Choose a room and start chatting instantly.
                    </p>
                </div>

                <button
                    onClick={() => navigate("/create-room")}
                    className="bg-[#ffb703] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#ffc933] transition"
                >
                    + Create Room
                </button>
            </div>

            {/* ROOMS GRID */}
            <div className="max-w-6xl mx-auto px-8 mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                {rooms.map((room) => (
                    <div
                        key={room.id}
                        className="bg-[#1f2937] rounded-xl p-6 border border-gray-700 shadow-lg hover:border-[#ffb703] transition"
                    >
                        <h3 className="text-xl font-semibold mb-2 text-[#ffb703]">
                            {room.name}
                        </h3>

                        <p className="text-gray-400 text-sm mb-4">
                            {room.description}
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <HiUserGroup className="w-4 h-4 text-[#ffb703]" />
                                <span>{room.users} online</span>
                            </div>

                            <button
                                onClick={() => navigate(`/room/${room.id}`)}
                                className="bg-[#ffb703] text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#ffc933]"
                            >
                                Join
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
