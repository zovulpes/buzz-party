import { useEffect, useRef, useState } from "react";
import Button from "@/shared/ui/button/Button.jsx";
import styles from "./MiniGames.module.scss";

const TURN_SECONDS = 8;

const FastTapGame = ({ onTurnComplete }) => {
  const [timeLeft, setTimeLeft] = useState(TURN_SECONDS);
  const [displayTaps, setDisplayTaps] = useState(0);
  const tapsRef = useRef(0);
  const completedRef = useRef(false);

  useEffect(() => {
    if (completedRef.current) return;

    if (timeLeft <= 0) {
      completedRef.current = true;
      onTurnComplete(tapsRef.current);
      return;
    }

    const timerId = setTimeout(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft, onTurnComplete]);

  const handleTap = () => {
    tapsRef.current += 1;
    setDisplayTaps(tapsRef.current);
  };

  return (
    <section className={styles.gameBox}>
      <h3>Tap as many times as you can</h3>
      <p>Time left: {timeLeft}s</p>
      <p>Score this turn: {displayTaps}</p>
      <Button onClick={handleTap}>TAP!</Button>
    </section>
  );
};

export default FastTapGame;
