import React from "react";

const NameElement = ({ item }) => {
  return (
    <div
      className="absolute text-base font-semibold px-1 py-0.5 bg-black/80 rounded border border-transparent
        text-shadow-[0_0_2px_currentColor] transition-opacity z-5 font-orbitron backdrop-blur-sm
        shadow-[0_0_15px_rgba(0,0,0,0.5),0_0_10px_currentColor]"
      style={{
        left: item.x,
        top: item.y,
        color: item.color,
        borderColor: item.color,
        opacity: item.eliminated ? 0 : 1,
      }}
    >
      {item.name}
    </div>
  );
};

export default NameElement;
