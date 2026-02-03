import React from "react";

const RemovalModal = ({ winner, onConfirm, onCancel }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
      style={{
        background: "rgba(0, 0, 0, 0.7)",
      }}
    >
      <div
        className="p-12 rounded-2xl border-2 border-pink-600 text-center max-w-md"
        style={{
          background: "rgba(0, 20, 40, 0.95)",
          boxShadow: `
            0 0 40px rgba(255, 0, 128, 0.6),
            inset 0 0 30px rgba(255, 0, 128, 0.1)
          `,
        }}
      >
        <p className="text-pink-600 mb-4 font-orbitron text-lg tracking-widest">
          ✦ WINNER ✦
        </p>
        <h2 className="text-5xl font-black text-pink-600 mb-2 font-orbitron ">
          {winner.toUpperCase()}
        </h2>

        <div className="border-t border-pink-600/30 pt-6">
          <p className="text-gray-400 mb-4 font-orbitron text-xs">
            remove from pool?
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-xs border border-green-400 rounded 
                text-green-400 cursor-pointer transition-all font-orbitron
                uppercase tracking-wider backdrop-blur-sm
                hover:bg-green-400/20 hover:shadow-md"
              style={{
                background: "rgba(0, 0, 0, 0.6)",
                boxShadow: `
                  0 0 5px rgba(0, 255, 136, 0.2)
                `,
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(0, 255, 136, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(0, 0, 0, 0.6)";
              }}
            >
              yes
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2 text-xs border border-gray-500 rounded 
                text-gray-400 cursor-pointer transition-all font-orbitron
                uppercase tracking-wider backdrop-blur-sm
                hover:bg-gray-500/10"
              style={{
                background: "rgba(0, 0, 0, 0.6)",
                boxShadow: `
                  0 0 5px rgba(100, 100, 100, 0.2)
                `,
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(100, 100, 100, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(0, 0, 0, 0.6)";
              }}
            >
              no
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemovalModal;
