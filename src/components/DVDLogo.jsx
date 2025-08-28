import React from "react";
import { LOGO_SIZE, COLORS } from "../utils/constants";

const DVDLogo = ({ position, currentColorIndex }) => {
  return (
    <div
      className="absolute flex items-center justify-center font-bold text-xl text-black rounded-lg transition-colors z-10
        tracking-wider bg-contain bg-no-repeat bg-center border-3 border-green-400/50"
      style={{
        left: position.x,
        top: position.y,
        width: LOGO_SIZE.width,
        height: LOGO_SIZE.height,
        background: COLORS[currentColorIndex],
      }}
    >
      DVD
    </div>
  );
};

export default DVDLogo;
