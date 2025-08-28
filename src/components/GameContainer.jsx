import React from "react";

const GameContainer = ({ children, innerRef }) => {
  return (
    <div
      ref={innerRef}
      className="relative w-[min(90vw,960px)] h-[75vh] min-h-[420px] my-5 mx-auto overflow-hidden
        radial-gradient(circle at 30% 30%, rgba(0, 255, 136, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 70% 70%, rgba(255, 0, 128, 0.1) 0%, transparent 50%),
        rgba(0, 0, 0, 0.9)
        border-3 border-green-400 rounded-2xl
        shadow-[0_0_30px_rgba(0,255,136,0.5),inset_0_0_30px_rgba(0,255,136,0.1)]
        backdrop-blur-md"
    >
      {/* Grid Background */}
      <div
        className="absolute top-0 left-0 w-full h-full
        repeating-linear-gradient(0deg, rgba(0, 255, 136, 0.05) 0px, rgba(0, 255, 136, 0.05) 1px, transparent 1px, transparent 40px),
        repeating-linear-gradient(90deg, rgba(0, 255, 136, 0.05) 0px, rgba(0, 255, 136, 0.05) 1px, transparent 1px, transparent 40px)
        pointer-events-none z-1"
      />

      {children}

      {/* Glow Effect */}
      <div className="absolute top-0 left-0 w-full h-full shadow-[inset_0_0_50px_rgba(0,255,136,0.2)] pointer-events-none z-2 rounded-2xl" />
    </div>
  );
};

export default GameContainer;
