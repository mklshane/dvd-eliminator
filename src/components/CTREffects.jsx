import React from "react";

const CRTEffects = () => {
  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full 
        repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 136, 0.03) 2px, rgba(0, 255, 136, 0.03) 4px)
        pointer-events-none z-50 animate-flicker"
      ></div>
      <div
        className="fixed top-0 left-0 w-full h-full 
        radial-gradient(ellipse at center, transparent 40%, rgba(0, 20, 40, 0.3) 100%)
        pointer-events-none z-0"
      ></div>
    </>
  );
};

export default CRTEffects;
