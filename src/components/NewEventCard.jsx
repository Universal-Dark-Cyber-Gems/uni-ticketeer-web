import { useState } from "react";
import { CiCalendar, CiLocationOn } from "react-icons/ci"
import { BsFillLightningChargeFill } from "react-icons/bs";


export default function EventDetailCard({
  image = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
  trending = true,
  title = "Sochess Club Migle",
  date = "Sat, 29 June",
  time = "8:00 PM",
  location = "Baselandmark Event Center, Enugu",
  price = 5000,
  currency = "",
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
          <div className="flex items-center gap-1.5 mb-2 text-primary-dark">
            <BsFillLightningChargeFill />

            <span className="text-xs tracking-widest uppercase text-[12px] ">
              Trending
            </span>
          </div>
        )}

        {/* Title */}
        <h2 className="text-[20px] font-medium mb-3 leading-tight text-primary-dark">
          {title}
        </h2>

        {/* Date & time */}
        <div className="flex items-center gap-2 mb-2 text-primary-dark">
          <CiCalendar />
          <span className="text-sm">
            {date}
            <span className="mx-2 text-gray-300">•</span>
            {time}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mb-5 text-primary-dark">
          <CiLocationOn />
          <span className="text-[16px]">
            {location}
          </span>
        </div>

        {/* Price */}
        <p className="text-center mb-4 text-primary-dark">
          <span className="font-bold text-base">Starting from </span>
          <span className="font-extrabold text-2xl">
            &#8358;{price}
          </span>
        </p>

        {/* CTA */}
        <button
          onClick={onGetTicket}
          className="w-full py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-all hover:bg-purple-50 active:scale-95"
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