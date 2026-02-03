import React, { useState } from "react";
import RemovalModal from "./RemovalModal";

const WinnerDisplay = ({ winner, onRemoveName, inputText, setInputText }) => {
  const [showModal, setShowModal] = useState(true);

  const handleRemove = () => {
    if (onRemoveName) {
      onRemoveName(winner);
    }

    // Remove the name from input text
    const names = inputText
      .split(/[,\n]/)
      .map((name) => name.trim())
      .filter((name) => name.toLowerCase() !== winner.toLowerCase());
    setInputText(names.join("\n"));

    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <RemovalModal
          winner={winner}
          onConfirm={handleRemove}
          onCancel={handleCancel}
        />
      )}
      <div
        className="text-3xl text-center p-6 rounded-2xl border-2 border-pink-600
        animate-pulse backdrop-blur-md my-4"
        style={{
          background: "rgba(255, 0, 128, 0.2)",
          boxShadow: `
            0 0 30px rgba(255, 0, 128, 0.5),
            inset 0 0 30px rgba(255, 0, 128, 0.1)
          `,
        }}
      >
        <div className="text-pink-600 font-black">{winner.toUpperCase()}</div>
      </div>
    </>
  );
};

export default WinnerDisplay;
