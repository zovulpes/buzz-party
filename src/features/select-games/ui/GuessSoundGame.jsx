import { useState } from "react";
import Button from "@/shared/ui/button/Button.jsx";
import styles from "./MiniGames.module.scss";

const OPTIONS = ["BOOM", "CLAP", "WHISTLE"];

const GuessSoundGame = ({ onTurnComplete, seed = 0 }) => {
  const correctIndex = Math.abs(seed) % OPTIONS.length;
  const [chosenIndex, setChosenIndex] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    if (chosenIndex === null || submitted) return;
    setSubmitted(true);
    const points = chosenIndex === correctIndex ? 10 : 0;
    onTurnComplete(points);
  };

  return (
    <section className={styles.gameBox}>
      <h3>Guess the hidden sound</h3>
      <p>Pick one option. Correct answer gives 10 points.</p>

      <div className={styles.options}>
        {OPTIONS.map((label, index) => (
          <button
            key={label}
            type="button"
            className={
              chosenIndex === index
                ? `${styles.option} ${styles.active}`
                : styles.option
            }
            onClick={() => setChosenIndex(index)}
          >
            {label}
          </button>
        ))}
      </div>

      <Button onClick={submit}>SUBMIT</Button>
    </section>
  );
};

export default GuessSoundGame;
