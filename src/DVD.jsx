import React, { useEffect } from "react";
import Confetti from "react-confetti";
import { useAudio } from "./hooks/useAudio";
import { useGameLogic } from "./hooks/useGameLogic";
import CRTEffects from "./components/CRTEffects";
import GameContainer from "./components/GameContainer";
import DVDLogo from "./components/DVDLogo";
import NameElement from "./components/NameElement";
import InputArea from "./components/InputArea";
import WinnerDisplay from "./components/WinnerDisplay";
import ControlButtons from "./components/ControlButtons";

const App = () => {
  const { playAudio } = useAudio();
  const {
    gameContainerRef,
    nameElements,
    isPaused,
    gameStarted,
    winner,
    inputText,
    setInputText,
    position,
    currentColorIndex,
    showConfetti,
    width,
    height,
    remainingCount,
    startGame,
    resetGame,
    togglePause,
    gameLoop,
    animationRef,
  } = useGameLogic(playAudio);

  useEffect(() => {
    if (gameStarted && !isPaused && !winner) {
      animationRef.current = requestAnimationFrame(gameLoop);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameStarted, isPaused, winner, gameLoop, animationRef]);

  // Add CSS animations
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
      
      @keyframes glow {
        from {
          text-shadow: 
            0 0 5px rgba(0, 255, 136, 0.5),
            0 0 10px rgba(0, 255, 136, 0.3);
        }
        to {
          text-shadow: 
            0 0 8px rgba(0, 255, 136, 0.7),
            0 0 15px rgba(0, 255, 136, 0.4);
        }
      }
      
      @keyframes flicker {
        0% { opacity: 1; }
        98% { opacity: 1; }
        100% { opacity: 0.98; }
      }
      
      @keyframes pulse {
        from {
          box-shadow: 
            0 0 30px rgba(255, 0, 128, 0.5),
            inset 0 0 30px rgba(255, 0, 128, 0.1);
        }
        to {
          box-shadow: 
            0 0 50px rgba(255, 0, 128, 0.8),
            inset 0 0 50px rgba(255, 0, 128, 0.2);
        }
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div
      className="flex flex-col items-center p-0 min-h-screen
      font-orbitron text-green-400 m-0 overflow-hidden relative"
      style={{
        background: `
          radial-gradient(circle at 25% 25%, #1a0033 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, #001a33 0%, transparent 50%),
          linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)
        `,
      }}
    >
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={250}
          recycle={false}
          className="fixed top-0 left-0 z-50"
        />
      )}

      <CRTEffects />

      <div className="flex flex-col items-center p-8 min-h-screen max-w-full text-green-400 relative z-10">
        <h1
          className="text-green-400 mb-8 mt-1 text-[clamp(2rem,5vw,4rem)] uppercase
          text-shadow-[0_0_5px_rgba(0,255,136,0.5),0_0_10px_rgba(0,255,136,0.3)]
          tracking-widest font-black text-center
          bg-gradient-to-r from-green-400 via-cyan-400 to-pink-600 bg-clip-text text-transparent"
        >
          DVD ELIMINATOR
        </h1>
        <div className="text-sm text-gray-400 -mt-6 mb-8 tracking-widest uppercase">
          LAST MAN STANDING
        </div>

        <InputArea
          inputText={inputText}
          setInputText={setInputText}
          gameStarted={gameStarted}
          startGame={startGame}
          resetGame={resetGame}
        />

        {winner && <WinnerDisplay winner={winner} />}

        {!winner && gameStarted && (
          <div
            className="text-xl text-green-400 text-shadow-[0_0_10px_#00ff88] font-bold
            bg-green-400/10 px-4 py-2 rounded-full border border-green-400 backdrop-blur-sm my-4"
          >
            NAMES REMAINING: {remainingCount}
          </div>
        )}

        <GameContainer innerRef={gameContainerRef}>
          {gameStarted && (
            <DVDLogo
              position={position}
              currentColorIndex={currentColorIndex}
            />
          )}

          {nameElements.map((item) => (
            <NameElement key={item.id} item={item} />
          ))}
        </GameContainer>

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
              uppercase tracking-wider shadow-[0_0_10px_currentColor] backdrop-blur-sm
              hover:-translate-y-0.5 hover:shadow-[0_0_20px_currentColor]`}
            disabled={!gameStarted}
          >
            {isPaused ? "▶ RESUME" : "⏸PAUSE"}
          </button>
        </div>
      </div>

      <h4 className="text-sm text-gray-400 -mt-6 mb-8 tracking-widest">
        ⋆˚࿔ shine ⋆˚࿔
      </h4>
    </div>
  );
};

export default App;
