import React from "react";

const InputArea = ({
  inputText,
  setInputText,
  gameStarted,
  startGame,
  resetGame,
}) => {
  return (
    <div
      className="mb-8 text-center max-w-[600px] w-full p-8 rounded-2xl
      border-2 border-green-400 backdrop-blur-md"
      style={{
        background: "rgba(0, 20, 40, 0.3)",
        boxShadow: `
          0 0 20px rgba(0, 255, 136, 0.3),
          inset 0 0 20px rgba(0, 255, 136, 0.1)
        `,
      }}
    >
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="► ENTER WORDS (SEPARATED BY COMMAS/NEW LINES)..."
        className="w-[90%] h-32 p-4 min-h-[200px] mb-6 border-2 border-green-400 rounded-lg text-sm
          text-green-400 font-orbitron outline-none resize-vertical backdrop-blur-sm"
        style={{
          background: "rgba(0, 0, 0, 0.8)",
          boxShadow: `
            0 0 10px rgba(0, 255, 136, 0.3),
            inset 0 0 10px rgba(0, 255, 136, 0.1)
          `,
        }}
        disabled={gameStarted}
      />
      <div>
        <button
          onClick={startGame}
          disabled={gameStarted}
          className={`px-6 py-3 mx-2 mb-2 text-xs border-2 border-green-400 rounded-lg 
            text-green-400 cursor-pointer transition-all font-orbitron font-semibold
            uppercase tracking-wider backdrop-blur-sm ${
              gameStarted
                ? "opacity-40 cursor-not-allowed border-gray-600"
                : "hover:bg-green-400/20 hover:-translate-y-0.5"
            }`}
          style={{
            background: "rgba(0, 0, 0, 0.8)",
            boxShadow: `
              0 0 10px rgba(0, 255, 136, 0.3),
              inset 0 0 10px rgba(0, 255, 136, 0.1)
            `,
          }}
          onMouseEnter={(e) => {
            if (!gameStarted) {
              e.target.style.background = "rgba(0, 255, 136, 0.2)";
              e.target.style.boxShadow = `
                0 0 20px rgba(0, 255, 136, 0.6),
                inset 0 0 20px rgba(0, 255, 136, 0.2)
              `;
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(0, 0, 0, 0.8)";
            e.target.style.boxShadow = `
              0 0 10px rgba(0, 255, 136, 0.3),
              inset 0 0 10px rgba(0, 255, 136, 0.1)
            `;
          }}
        >
          {gameStarted ? " SYSTEM ACTIVE" : " START"}
        </button>
        <button
          onClick={resetGame}
          className="px-6 py-3 mx-2 mb-2 text-xs border-2 border-pink-600 rounded-lg 
            text-pink-600 cursor-pointer transition-all font-orbitron font-semibold
            uppercase tracking-wider backdrop-blur-sm"
          style={{
            background: "rgba(255, 0, 128, 0.2)",
            boxShadow: "0 0 10px rgba(255, 0, 128, 0.3)",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(255, 0, 128, 0.4)";
            e.target.style.boxShadow = "0 0 20px rgba(255, 0, 128, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(255, 0, 128, 0.2)";
            e.target.style.boxShadow = "0 0 10px rgba(255, 0, 128, 0.3)";
          }}
        >
          SYSTEM RESET
        </button>
      </div>
    </div>
  );
};

export default InputArea;
