import { useState, useRef, useCallback } from "react";
import { useWindowSize } from "@react-hook/window-size";
import { LOGO_SIZE, COLORS } from "../utils/constants";
import { parseNames, positionNames } from "../utils/helpers";

export const useGameLogic = (playAudio) => {
  const gameContainerRef = useRef(null);
  const animationRef = useRef();
  const [width, height] = useWindowSize();

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

  const checkCollision = useCallback((logoX, logoY, name) => {
    if (name.eliminated) return false;
    return (
      logoX < name.x + name.width &&
      logoX + LOGO_SIZE.width > name.x &&
      logoY < name.y + name.height &&
      logoY + LOGO_SIZE.height > name.y
    );
  }, []);

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

      const hitLeftWall = newX <= 0;
      const hitRightWall = newX >= container.clientWidth - LOGO_SIZE.width;
      const hitTopWall = newY <= 0;
      const hitBottomWall = newY >= container.clientHeight - LOGO_SIZE.height;

      if (hitLeftWall) {
        newX = 0;
        newDx = Math.abs(newDx);
        colorChanged = true;
        playBounceSound = true;
      } else if (hitRightWall) {
        newX = container.clientWidth - LOGO_SIZE.width;
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
        newY = container.clientHeight - LOGO_SIZE.height;
        newDy = -Math.abs(newDy);
        colorChanged = true;
        playBounceSound = true;
      }

      if (playBounceSound) {
        playAudio("bounce");
      }

      setVelocity({ dx: newDx, dy: newDy });

      nameElements.forEach((name) => {
        if (!name.eliminated && checkCollision(newX, newY, name)) {
          eliminateName(name.id);
          colorChanged = true;
        }
      });

      if (colorChanged) {
        setCurrentColorIndex((i) => (i + 1) % COLORS.length);
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

    const fixedNameElements = positionNames(
      parsedNames,
      gameContainerRef.current,
      COLORS
    );
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
            (gameContainerRef.current.clientWidth - LOGO_SIZE.width),
          y:
            Math.random() *
            (gameContainerRef.current.clientHeight - LOGO_SIZE.height),
        });
        setVelocity({
          dx: (Math.random() > 0.5 ? 1 : -1) * (6 + Math.random() * 1.5),
          dy: (Math.random() > 0.5 ? 1 : -1) * (6 + Math.random() * 1.5),
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
  };

  const togglePause = () => {
    if (!gameStarted) return;
    setIsPaused(!isPaused);
  };

  const remainingCount = nameElements.filter((item) => !item.eliminated).length;

  return {
    gameContainerRef,
    names,
    nameElements,
    isPaused,
    gameStarted,
    winner,
    inputText,
    setInputText,
    position,
    velocity,
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
  };
};
