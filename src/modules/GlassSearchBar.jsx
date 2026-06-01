import { useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function GlassSearchBar() {
  const navigate = useNavigate()
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  function onSearch(e){
    e.preventDefault()
    if(query=="") return
    navigate(`/search?q=${query}`)
  }

  return (
      <form onSubmit={onSearch} className="w-full max-w-2xl">
        <div
          className={`flex items-center gap-3 px-5 py-4 rounded-full transition-all duration-300 ${
            focused ? "scale-[1.02]" : "scale-100"
          }`}
          style={{
            background: "rgba(255, 255, 255, 0.0)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: focused
              ? "1px solid rgba(255, 255, 255, 0.28)"
              : "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: focused
              ? "inset 0 1px 0 rgba(255,255,255,0.18), 0 8px 32px rgba(0,0,0,0.4)"
              : "inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 20px rgba(0,0,0,0.25)",
          }}
        >
          {/* Search Icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className="flex-shrink-0 transition-opacity duration-200"
            style={{ opacity: focused ? 0.9 : 0.55 }}
          >
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth="2"
            />
            <path
              d="M16.5 16.5L21 21"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search events by city, genre, or date"
            className="flex-1 bg-transparent border-none outline-none text-sm tracking-wide"
            style={{
              color: "rgba(255,255,255,0.88)",
              fontSize: "15px",
              fontFamily: "'Georgia', serif",
              caretColor: "rgba(255,220,120,0.9)",
            }}
          />

          {/* Clear button */}
          {query && (
            <button
              onClick={() => setQuery("")}
              className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full transition-all duration-150 hover:scale-110"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
          <button
            className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full"
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            <IoArrowForward />
          </button>
        </div>

        {/* Suggestion pills */}
        <div className="flex gap-2 mt-4 px-2 flex-wrap">
          {["Lagos", "Afrobeats", "This Weekend", "Concerts", "Art"].map(
            (tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="text-xs px-3 py-1 rounded-full transition-all duration-200 hover:scale-105"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "12px",
                  fontFamily: "'Georgia', serif",
                  letterSpacing: "0.02em",
                }}
              >
                {tag}
              </button>
            )
          )}
        </div>
      </form>

      // {/* Inline placeholder style override */}
      // <style>{`
      //   input::placeholder { color: rgba(255,255,255,0.42); }
      // `}</style>
  );
}