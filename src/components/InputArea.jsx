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
      className="mb-8 text-center max-w-[600px] w-full bg-[rgba(0,20,40,0.3)] p-8 rounded-2xl
      border-2 border-green-400 shadow-[0_0_20px_rgba(0,255,136,0.3),inset_0_0_20px_rgba(0,255,136,0.1)]
      backdrop-blur-md"
    >
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="► ENTER WORDS (SEPARATED BY COMMAS/NEW LINES)..."
        className="w-[90%] h-32 p-4 min-h-[200px] mb-6 border-2 border-green-400 rounded-lg text-sm
          bg-black/80 text-green-400 font-orbitron outline-none
          shadow-[0_0_10px_rgba(0,255,136,0.3),inset_0_0_10px_rgba(0,255,136,0.1)]
          resize-vertical backdrop-blur-sm"
        disabled={gameStarted}
      />
      <div>
        <button
          onClick={startGame}
          disabled={gameStarted}
          className={`px-6 py-3 mx-2 mb-2 text-xs border-2 border-green-400 rounded-lg 
            bg-black/80 text-green-400 cursor-pointer transition-all font-orbitron font-semibold
            uppercase tracking-wider shadow-[0_0_10px_rgba(0,255,136,0.3),inset_0_0_10px_rgba(0,255,136,0.1)]
            backdrop-blur-sm ${
              gameStarted
                ? "opacity-40 cursor-not-allowed border-gray-600"
                : "hover:bg-green-400/20 hover:shadow-[0_0_20px_rgba(0,255,136,0.6),inset_0_0_20px_rgba(0,255,136,0.2)] hover:-translate-y-0.5"
            }`}
        >
          {gameStarted ? " SYSTEM ACTIVE" : " START"}
        </button>
        <button
          onClick={resetGame}
          className="px-6 py-3 mx-2 mb-2 text-xs border-2 border-pink-600 rounded-lg 
            bg-pink-600/20 text-pink-600 cursor-pointer transition-all font-orbitron font-semibold
            uppercase tracking-wider shadow-[0_0_10px_rgba(255,0,128,0.3)] backdrop-blur-sm
            hover:bg-pink-600/40 hover:shadow-[0_0_20px_rgba(255,0,128,0.6)]"
        >
          SYSTEM RESET
        </button>
      </div>
    </div>
  );
};

export default InputArea;
