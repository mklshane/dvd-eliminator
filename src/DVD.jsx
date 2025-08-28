import React, { useState, useRef, useEffect, useCallback } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

const App = () => {
  const gameContainerRef = useRef(null);
  const animationRef = useRef();
  const lastBounceSoundTime = useRef(0);
  const audioRefs = useRef({ start: null, winner: null, bounce: null });

  // State variables
  const [names, setNames] = useState([]);
  const [nameElements, setNameElements] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState(null);
  const [inputText, setInputText] = useState("");
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [velocity, setVelocity] = useState({ dx: 10, dy: 10 });
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [width, height] = useWindowSize();

  useEffect(() => {
    // Create audio instances only once
    audioRefs.current.start = new Audio("/sounds/start.mp3");
    audioRefs.current.winner = new Audio("/sounds/winner.mp3");
    audioRefs.current.bounce = new Audio("/sounds/bounce.mp3");

    // Set volume
    audioRefs.current.start.volume = 0.5;
    audioRefs.current.winner.volume = 0.5;
    audioRefs.current.bounce.volume = 0.1;

    const handleUserInteraction = () => {
      if (audioRefs.current.start) audioRefs.current.start.load();
      if (audioRefs.current.winner) audioRefs.current.winner.load();
      if (audioRefs.current.bounce) audioRefs.current.bounce.load();
      window.removeEventListener("click", handleUserInteraction);
    };

    window.addEventListener("click", handleUserInteraction);

    return () => {
      window.removeEventListener("click", handleUserInteraction);

      // Properly dispose of audio objects
      ["start", "winner", "bounce"].forEach((key) => {
        if (audioRefs.current[key]) {
          audioRefs.current[key].pause();
          audioRefs.current[key].src = "";
          audioRefs.current[key].load();
          audioRefs.current[key] = null;
        }
      });
    };
  }, []);

  const playAudio = useCallback((audioType) => {
    const audio = audioRefs.current[audioType];
    if (audio) {
      if (audioType === "bounce") {
        if (Date.now() - lastBounceSoundTime.current < 200) return;
        lastBounceSoundTime.current = Date.now();
      }
      audio.currentTime = 0;
      audio.play().catch((e) => console.log(`${audioType} sound error:`, e));
    }
  }, []);

  const logoSize = { width: 80, height: 40 };
  const colors = [
    "#FF0080",
    "#00FFFF",
    "#FFFF00",
    "#FF4000",
    "#8000FF",
    "#00FF80",
  ];

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0",
      minHeight: "100vh",
      background: `
        radial-gradient(circle at 25% 25%, #1a0033 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, #001a33 0%, transparent 50%),
        linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)
      `,
      fontFamily: "'Orbitron', 'Courier New', monospace",
      color: "#00ff88",
      margin: "0",
      overflow: "hidden",
      position: "relative",
    },
    scanlines: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: `
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 255, 136, 0.03) 2px,
          rgba(0, 255, 136, 0.03) 4px
        )
      `,
      pointerEvents: "none",
      zIndex: 1000,
      animation: "flicker 0.15s infinite linear alternate",
    },
    crtOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: `
        radial-gradient(ellipse at center, transparent 40%, rgba(0, 20, 40, 0.3) 100%)
      `,
      pointerEvents: "none",
      zIndex: 0,
    },
    app: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "2rem",
      minHeight: "100vh",
      maxWidth: "100%",
      color: "#00ff88",
      position: "relative",
      zIndex: 10,
    },
    header: {
      color: "#00ff88",
      marginBottom: "2rem",
      marginTop: "1px",
      fontSize: "clamp(2rem, 5vw, 4rem)",
      textTransform: "uppercase",
      textShadow: `
        0 0 5px rgba(0, 255, 136, 0.5),
        0 0 10px rgba(0, 255, 136, 0.3)
      `,
      letterSpacing: "4px",
      fontWeight: "900",
      textAlign: "center",
      background: "linear-gradient(45deg, #00ff88, #00ffff, #ff0080)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    subtitle: {
      fontSize: "0.9rem",
      color: "#888",
      marginTop: "-1.5rem",
      marginBottom: "2rem",
      letterSpacing: "2px",
      textTransform: "uppercase",
    },
    inputArea: {
      marginBottom: "2rem",
      textAlign: "center",
      maxWidth: "600px",
      width: "100%",
      background: "rgba(0, 20, 40, 0.3)",
      padding: "2rem",
      borderRadius: "15px",
      border: "2px solid #00ff88",
      boxShadow: `
        0 0 20px rgba(0, 255, 136, 0.3),
        inset 0 0 20px rgba(0, 255, 136, 0.1)
      `,
      backdropFilter: "blur(10px)",
    },
    textarea: {
      width: "90%",
      height: "120px",
      padding: "1rem",
      minHeight: "200px",
      marginBottom: "1.5rem",
      border: "2px solid #00ff88",
      borderRadius: "8px",
      fontSize: "0.95rem",
      background: "rgba(0, 0, 0, 0.8)",
      color: "#00ff88",
      fontFamily: "'Orbitron', 'Courier New', monospace",
      outline: "none",
      boxShadow: `
        0 0 10px rgba(0, 255, 136, 0.3),
        inset 0 0 10px rgba(0, 255, 136, 0.1)
      `,
      resize: "vertical",
      backdropFilter: "blur(5px)",
    },
    gameContainer: {
      position: "relative",
      width: "min(90vw, 960px)",
      height: "75vh",
      minHeight: "420px",
      margin: "20px auto",
      overflow: "hidden",
      background: `
        radial-gradient(circle at 30% 30%, rgba(0, 255, 136, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 70% 70%, rgba(255, 0, 128, 0.1) 0%, transparent 50%),
        rgba(0, 0, 0, 0.9)
      `,
      border: "3px solid #00ff88",
      borderRadius: "15px",
      boxShadow: `
        0 0 30px rgba(0, 255, 136, 0.5),
        inset 0 0 30px rgba(0, 255, 136, 0.1)
      `,
      backdropFilter: "blur(10px)",
    },
    dvdLogo: {
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      fontSize: "20px",
      color: "black",
      borderRadius: "8px",
      transition: "background 0.2s",
      zIndex: 10,
      letterSpacing: "1px",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      border: "3px solid rgba(0, 255, 136, 0.5)",
    },
    name: {
      position: "absolute",
      fontSize: "16px",
      fontWeight: "600",
      padding: "2px 4px",
      background: "rgba(0, 0, 0, 0.8)",
      borderRadius: "6px",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "transparent",
      textShadow: "0 0 2px currentColor",
      transition: "opacity 0.1s ease",
      zIndex: 5,
      fontFamily: "'Orbitron', monospace",
      backdropFilter: "blur(5px)",
      boxShadow: "0 0 15px rgba(0,0,0,0.5), 0 0 10px currentColor",
    },
    button: {
      padding: "12px 24px",
      margin: "0 8px 8px 8px",
      fontSize: "0.7rem",
      border: "2px solid #00ff88",
      borderRadius: "8px",
      background: "rgba(0, 0, 0, 0.8)",
      color: "#00ff88",
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontFamily: "'Orbitron', monospace",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "1px",
      boxShadow: `
        0 0 10px rgba(0, 255, 136, 0.3),
        inset 0 0 10px rgba(0, 255, 136, 0.1)
      `,
      backdropFilter: "blur(5px)",
    },
    buttonHover: {
      background: "rgba(0, 255, 136, 0.2)",
      boxShadow: `
        0 0 20px rgba(0, 255, 136, 0.6),
        inset 0 0 20px rgba(0, 255, 136, 0.2)
      `,
      transform: "translateY(-2px)",
    },
    disabledButton: {
      opacity: 0.4,
      cursor: "not-allowed",
      borderColor: "#666",
    },
    winnerDisplay: {
      fontSize: "1.8rem",
      textAlign: "center",
      padding: "1.5rem",
      background: "rgba(255, 0, 128, 0.2)",
      borderRadius: "15px",
      border: "2px solid #ff0080",
      boxShadow: `
        0 0 30px rgba(255, 0, 128, 0.5),
        inset 0 0 30px rgba(255, 0, 128, 0.1)
      `,
      animation: "pulse 1.5s ease-in-out infinite alternate",
      backdropFilter: "blur(10px)",
    },
    remainingCount: {
      fontSize: "1.2rem",
      color: "#00ff88",
      textShadow: "0 0 10px #00ff88",
      fontWeight: "bold",
      background: "rgba(0, 255, 136, 0.1)",
      padding: "0.5rem 1rem",
      borderRadius: "20px",
      border: "1px solid #00ff88",
      backdropFilter: "blur(5px)",
    },
    grid: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: `
        repeating-linear-gradient(
          0deg,
          rgba(0, 255, 136, 0.05) 0px,
          rgba(0, 255, 136, 0.05) 1px,
          transparent 1px,
          transparent 40px
        ),
        repeating-linear-gradient(
          90deg,
          rgba(0, 255, 136, 0.05) 0px,
          rgba(0, 255, 136, 0.05) 1px,
          transparent 1px,
          transparent 40px
        )
      `,
      pointerEvents: "none",
      zIndex: 1,
    },
    glowEffect: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      boxShadow: `inset 0 0 50px rgba(0, 255, 136, 0.2)`,
      pointerEvents: "none",
      zIndex: 2,
      borderRadius: "12px",
    },
  };

  // CSS animation
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

  const parseNames = (input) =>
    input
      .split(/[\n,]/)
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

  const positionNames = useCallback(
    (namesArray) => {
      if (!gameContainerRef.current) return [];
      const container = gameContainerRef.current;
      const newNameElements = [];

      for (const name of namesArray) {
        const tempDiv = document.createElement("div");
        tempDiv.style.fontSize = "14px";
        tempDiv.style.fontWeight = "600";
        tempDiv.style.padding = "6px 0";
        tempDiv.style.position = "absolute";
        tempDiv.style.visibility = "hidden";
        tempDiv.textContent = name;
        document.body.appendChild(tempDiv);
        const { width, height } = tempDiv.getBoundingClientRect();
        document.body.removeChild(tempDiv);

        let x, y;
        let attempts = 0;
        const maxAttempts = 50;
        const margin = 20;

        do {
          x =
            Math.random() * (container.clientWidth - width - margin * 2) +
            margin;
          y =
            Math.random() * (container.clientHeight - height - margin * 2) +
            margin;
          attempts++;
        } while (
          attempts < maxAttempts &&
          newNameElements.some(
            (existing) =>
              Math.abs(x - existing.x) < width + 20 &&
              Math.abs(y - existing.y) < height + 20
          )
        );

        newNameElements.push({
          id: Math.random().toString(36).substr(2, 9),
          name,
          x,
          y,
          width,
          height,
          color: colors[Math.floor(Math.random() * colors.length)],
          eliminated: false,
        });
      }
      return newNameElements;
    },
    [colors]
  );

  const checkCollision = useCallback(
    (logoX, logoY, name) => {
      if (name.eliminated) return false;
      return (
        logoX < name.x + name.width &&
        logoX + logoSize.width > name.x &&
        logoY < name.y + name.height &&
        logoY + logoSize.height > name.y
      );
    },
    [logoSize]
  );

  const eliminateName = useCallback(
    (nameId) => {
      setNameElements((prev) => {
        const newElements = prev.map((item) =>
          item.id === nameId ? { ...item, eliminated: true } : item
        );

        const remaining = newElements.filter((item) => !item.eliminated);
        if (remaining.length === 1) {
          setWinner(remaining[0].name);
          setIsPaused(true);
          setGameStarted(false);
          setShowConfetti(true);
          playAudio("winner");
          setTimeout(() => setShowConfetti(false), 5000);
        }
        return newElements;
      });
    },
    [playAudio]
  );

  const gameLoop = useCallback(() => {
    if (isPaused || !gameContainerRef.current || winner) return;

    setPosition((prevPosition) => {
      const container = gameContainerRef.current;
      if (!container) return prevPosition;

      let newX = prevPosition.x + velocity.dx;
      let newY = prevPosition.y + velocity.dy;
      let newDx = velocity.dx;
      let newDy = velocity.dy;
      let colorChanged = false;
      let playBounceSound = false;

      // Check for wall collisions
      const hitLeftWall = newX <= 0;
      const hitRightWall = newX >= container.clientWidth - logoSize.width;
      const hitTopWall = newY <= 0;
      const hitBottomWall = newY >= container.clientHeight - logoSize.height;

      if (hitLeftWall) {
        newX = 0;
        newDx = Math.abs(newDx);
        colorChanged = true;
        playBounceSound = true;
      } else if (hitRightWall) {
        newX = container.clientWidth - logoSize.width;
        newDx = -Math.abs(newDx);
        colorChanged = true;
        playBounceSound = true;
      }

      if (hitTopWall) {
        newY = 0;
        newDy = Math.abs(newDy);
        colorChanged = true;
        playBounceSound = true;
      } else if (hitBottomWall) {
        newY = container.clientHeight - logoSize.height;
        newDy = -Math.abs(newDy);
        colorChanged = true;
        playBounceSound = true;
      }

      // Play bounce sound for left/right wall hits
      if (playBounceSound) {
        playAudio("bounce");
      }

      setVelocity({ dx: newDx, dy: newDy });

      // Check for name collisions
      nameElements.forEach((name) => {
        if (!name.eliminated && checkCollision(newX, newY, name)) {
          eliminateName(name.id);
          colorChanged = true;
        }
      });

      if (colorChanged) {
        setCurrentColorIndex((i) => (i + 1) % colors.length);
      }

      return { x: newX, y: newY };
    });

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [
    isPaused,
    winner,
    velocity.dx,
    velocity.dy,
    nameElements,
    checkCollision,
    eliminateName,
    colors.length,
    logoSize.width,
    logoSize.height,
    playAudio,
  ]);

  const startGame = () => {
    const parsedNames = parseNames(inputText);
    if (parsedNames.length < 2) {
      alert("Please enter at least 2 names!");
      return;
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const fixedNameElements = positionNames(parsedNames);
    setNames(parsedNames);
    setNameElements(fixedNameElements);
    setWinner(null);
    setCurrentColorIndex(0);
    playAudio("start");

    setTimeout(() => {
      if (gameContainerRef.current) {
        setPosition({
          x:
            Math.random() *
            (gameContainerRef.current.clientWidth - logoSize.width),
          y:
            Math.random() *
            (gameContainerRef.current.clientHeight - logoSize.height),
        });
        setVelocity({
          dx: (Math.random() > 0.5 ? 1 : -1) * (6 + Math.random() * 1.5),
          dy: (Math.random() > 0.5 ? 1 : -1) * (6    + Math.random() * 1.5),
        });

        setGameStarted(true);
        setIsPaused(false);
      }
    }, 100);
  };

  const resetGame = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setGameStarted(false);
    setNameElements([]);
    setNames([]);
    setWinner(null);
    setInputText("");
    setIsPaused(false);
    setPosition({ x: 100, y: 100 });
    setVelocity({ dx: 2.5, dy: 2.5 });
    setCurrentColorIndex(0);
    lastBounceSoundTime.current = 0; // Reset debounce timer
  };

  const togglePause = () => {
    if (!gameStarted) return;
    setIsPaused(!isPaused);
  };

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
  }, [gameStarted, isPaused, winner, gameLoop]);

  const remainingCount = nameElements.filter((item) => !item.eliminated).length;


  return (
    <div style={styles.container}>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={250}
          recycle={false}
          style={{ position: "fixed", top: 0, left: 0, zIndex: 1000 }}
        />
      )}

      {/* CRT Effects */}
      <div style={styles.scanlines}></div>
      <div style={styles.crtOverlay}></div>

      <div style={styles.app}>
        <h1 style={styles.header}>DVD ELIMINATOR</h1>
        <div style={styles.subtitle}>LAST MAN STANDING</div>

        <div style={styles.inputArea}>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="► ENTER WORDS (SEPARATED BY COMMAS/NEW LINES)..."
            style={styles.textarea}
            disabled={gameStarted}
          />
          <div>
            <button
              onClick={startGame}
              disabled={gameStarted}
              style={{
                ...styles.button,
                ...(gameStarted && styles.disabledButton),
              }}
              onMouseEnter={(e) => {
                if (!gameStarted) {
                  Object.assign(e.target.style, styles.buttonHover);
                }
              }}
              onMouseLeave={(e) => {
                Object.assign(e.target.style, styles.button);
              }}
            >
              {gameStarted ? " SYSTEM ACTIVE" : " START"}
            </button>
            <button
              onClick={resetGame}
              style={{
                ...styles.button,
                background: "rgba(255, 0, 128, 0.2)",
                borderColor: "#ff0080",
                color: "#ff0080",
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

        {winner && (
          <div style={styles.winnerDisplay}>
            {/* <div
              style={{
                fontSize: "0.9rem",
                marginBottom: "0.5rem",
                color: "#888",
              }}
            >
              WINNER
            </div>  */}
            <div style={{ color: "#ff0080", fontWeight: "900" }}>
              {winner.toUpperCase()}
            </div>
          </div>
        )}

        {!winner && gameStarted && (
          <div style={styles.remainingCount}>
            NAMES REMAINING: {remainingCount}
          </div>
        )}

        <div ref={gameContainerRef} style={styles.gameContainer}>
          {/* Grid Background */}
          <div style={styles.grid} />

          {/* DVD Logo */}
          {gameStarted && (
            <div
              style={{
                ...styles.dvdLogo,
                left: position.x,
                top: position.y,
                width: logoSize.width,
                height: logoSize.height,
                background: colors[currentColorIndex],
              }}
            >
              DVD
            </div>
          )}

          {/* Name Elements */}
          {nameElements.map((item) => (
            <div
              key={item.id}
              style={{
                ...styles.name,
                left: item.x,
                top: item.y,
                color: item.color,
                borderColor: item.color,
                opacity: item.eliminated ? 0 : 1,
              }}
            >
              {item.name}
            </div>
          ))}

          {/* Glow Effect */}
          <div style={styles.glowEffect} />
        </div>

        <div style={{ marginTop: "2rem" }}>
          <button
            onClick={togglePause}
            style={{
              ...styles.button,
              background: isPaused
                ? "rgba(0, 255, 136, 0.2)"
                : "rgba(255, 165, 0, 0.2)",
              borderColor: isPaused ? "#00ff88" : "#ffa500",
              color: isPaused ? "#00ff88" : "#ffa500",
              width: "140px",
              opacity: gameStarted ? 1 : 0.4,
            }}
            disabled={!gameStarted}
            onMouseEnter={(e) => {
              if (gameStarted) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = `0 0 20px ${
                  isPaused ? "rgba(0, 255, 136, 0.6)" : "rgba(255, 165, 0, 0.6)"
                }`;
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = `0 0 10px ${
                isPaused ? "rgba(0, 255, 136, 0.3)" : "rgba(255, 165, 0, 0.3)"
              }`;
            }}
          >
            {isPaused ? "▶ RESUME" : "⏸PAUSE"}
          </button>
        </div>
      </div>
      <h4
        style={{
          fontSize: "0.9rem",
          color: "#888",
          marginTop: "-1.5rem",
          marginBottom: "2rem",
          letterSpacing: "2px",
        }}
      >
        {" "}
        ⋆˚࿔ shine ⋆˚࿔
      </h4>
    </div>
  );
};

export default App;
