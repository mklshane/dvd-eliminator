import React from "react";

const ControlButtons = ({
  isPaused,
  gameStarted,
  togglePause,
  remainingCount,
}) => {
  return (
    <>
      {!gameStarted && (
        <div
          className="text-xl text-green-400 text-shadow-[0_0_10px_#00ff88] font-bold
          bg-green-400/10 px-4 py-2 rounded-full border border-green-400 backdrop-blur-sm"
        >
          NAMES REMAINING: {remainingCount}
        </div>
      )}

      <div className="mt-8">
        <button
          onClick={togglePause}
          className={`px-6 py-3 w-36 text-xs rounded-lg border-2
            ${
              isPaused
                ? "bg-green-400/20 border-green-400 text-green-400"
                : "bg-orange-400/20 border-orange-400 text-orange-400"
            }
            ${
              gameStarted ? "opacity-100" : "opacity-40"
            } cursor-pointer transition-all font-orbitron font-semibold
            uppercase tracking-wider shadow-[0_0_10px_rgba(0,255,136,0.3)] backdrop-blur-sm
            hover:-translate-y-0.5 hover:shadow-[0_0_20px_currentColor]`}
          disabled={!gameStarted}
        >
          {isPaused ? "▶ RESUME" : "⏸PAUSE"}
        </button>
      </div>
    </>
  );
};

export default ControlButtons;
