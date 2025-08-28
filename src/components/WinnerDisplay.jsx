import React from "react";

const WinnerDisplay = ({ winner }) => {
  return (
    <div
      className="text-3xl text-center p-6 bg-pink-600/20 rounded-2xl border-2 border-pink-600
      shadow-[0_0_30px_rgba(255,0,128,0.5),inset_0_0_30px_rgba(255,0,128,0.1)]
      animate-pulse backdrop-blur-md"
    >
      <div className="text-pink-600 font-black">{winner.toUpperCase()}</div>
    </div>
  );
};

export default WinnerDisplay;
