import { useRef, useEffect, useCallback } from "react";

export const useAudio = () => {
  const audioRefs = useRef({ start: null, winner: null, bounce: null });
  const lastBounceSoundTime = useRef(0);

  useEffect(() => {
    audioRefs.current.start = new Audio("/sounds/start.mp3");
    audioRefs.current.winner = new Audio("/sounds/winner.mp3");
    audioRefs.current.bounce = new Audio("/sounds/bounce.mp3");

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

  return { playAudio };
};
