"use client";

interface VoiceButtonProps {
  variant: "speak" | "listen";
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  size?: "sm" | "md";
  ariaLabel?: string;
}

export function VoiceButton({
  variant,
  active,
  disabled = false,
  onClick,
  size = "md",
  ariaLabel,
}: VoiceButtonProps) {
  const dim = size === "sm" ? "w-8 h-8" : "w-9 h-9";
  const iconDim = size === "sm" ? "w-4 h-4" : "w-4 h-4";

  if (disabled) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? (variant === "speak" ? "Read aloud" : "Speak to fill")}
      className={`
        relative flex items-center justify-center rounded-full transition-all duration-200
        ${dim}
        ${active
          ? "bg-emerald-600 text-white shadow-md"
          : "bg-slate-100 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-sm"
        }
      `}
    >
      {/* Pulsing ring when active */}
      {active && (
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-30 animate-ping" />
      )}

      {variant === "speak" ? (
        /* Speaker / volume icon */
        <svg className={`relative z-10 ${iconDim}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M15.536 8.464a5 5 0 010 7.072M12 6v12m0 0l-3-3m3 3l3-3M9 9H5a2 2 0 00-2 2v2a2 2 0 002 2h4l5 5V4L9 9z"
          />
        </svg>
      ) : (
        /* Microphone icon */
        <svg className={`relative z-10 ${iconDim}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      )}
    </button>
  );
}
