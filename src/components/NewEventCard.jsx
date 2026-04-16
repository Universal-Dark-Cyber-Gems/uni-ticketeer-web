import { useState } from "react";

export default function EventDetailCard({
  image = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
  trending = true,
  title = "Sochess Club Migle",
  date = "Sat, 29 June",
  time = "8:00 PM",
  location = "Baselandmark Event Center, Enugu",
  price = 25,
  currency = "$",
  onGetTicket = () => {},
}) {
  const [liked, setLiked] = useState(false);

  return (
    <div
      className="bg-white rounded-3xl overflow-hidden shadow-lg"
      style={{ maxWidth: 380 }}
    >
      {/* ── Image section ── */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full object-cover rounded-3xl"
          style={{ height: 380 }}
        />

        {/* Dark overlay so badges read clearly */}
        <div
          className="absolute inset-0"
        />

        {/* Trending badge — top left */}
        <div
          className="absolute top-4 left-4 flex items-center gap-1.5 px-4 py-2 rounded-full"
          style={{ background: "rgba(75,31,168,0.88)", backdropFilter: "blur(8px)" }}
        >
          <svg width="11" height="14" viewBox="0 0 11 15" fill="none">
            <path d="M6.5 1L1 8.5h4.5L4 14l7-9H6.5L8 1z" fill="#f9c08a" />
          </svg>
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#f9c08a" }}>
            Trending
          </span>
        </div>

        {/* Wishlist button — top right */}
        <button
          onClick={() => setLiked((v) => !v)}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95"
          style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)" }}
        >
          <svg width="18" height="16" viewBox="0 0 20 18" fill="none">
            <path
              d="M10 16S2 10.5 2 5.5A4.5 4.5 0 0110 2.68 4.5 4.5 0 0118 5.5C18 10.5 10 16 10 16z"
              stroke={liked ? "#4B1FA8" : "#aaa"}
              strokeWidth="1.6"
              fill={liked ? "#4B1FA8" : "none"}
            />
          </svg>
        </button>
      </div>

      {/* ── Body ── */}
      <div className="px-5 pt-5 pb-6">
        {/* Trending label */}
        {trending && (
          <div className="flex items-center gap-1.5 mb-2">
            <svg width="11" height="14" viewBox="0 0 11 15" fill="none">
              <path d="M6.5 1L1 8.5h4.5L4 14l7-9H6.5L8 1z" fill="#4B1FA8" />
            </svg>
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#4B1FA8" }}>
              Trending
            </span>
          </div>
        )}

        {/* Title */}
        <h2 className="font-bold mb-3 leading-tight" style={{ fontSize: "1.45rem", color: "#1a0a3a" }}>
          {title}
        </h2>

        {/* Date & time */}
        <div className="flex items-center gap-2 mb-2">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="3" width="14" height="12" rx="2" stroke="#6b7280" strokeWidth="1.4" />
            <path d="M1 7h14" stroke="#6b7280" strokeWidth="1.4" />
            <path d="M5 1v3M11 1v3" stroke="#6b7280" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span className="text-sm" style={{ color: "#4a4a6a" }}>
            {date}
            <span className="mx-2 text-gray-300">•</span>
            {time}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mb-5">
          <svg width="13" height="16" viewBox="0 0 14 18" fill="none">
            <path
              d="M7 1C4.24 1 2 3.24 2 6c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5z"
              stroke="#6b7280"
              strokeWidth="1.4"
            />
            <circle cx="7" cy="6" r="1.8" stroke="#6b7280" strokeWidth="1.3" />
          </svg>
          <span className="text-sm" style={{ color: "#4a4a6a" }}>
            {location}
          </span>
        </div>

        {/* Price */}
        <p className="text-center mb-4">
          <span className="font-bold text-base" style={{ color: "#1a0a3a" }}>Starting from </span>
          <span className="font-extrabold text-2xl" style={{ color: "#1a0a3a" }}>
            {currency}{price}
          </span>
        </p>

        {/* CTA */}
        <button
          onClick={onGetTicket}
          className="w-full py-4 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all hover:bg-purple-50 active:scale-95"
          style={{
            border: "1.5px solid #4B1FA8",
            color: "#4B1FA8",
            background: "white",
            letterSpacing: "0.12em",
          }}
        >
          Get Ticket
        </button>
      </div>
    </div>
  );
}