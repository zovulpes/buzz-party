import React from "react";
import styles from "./GameCard.module.scss";

const GameCard = ({ game, selected, onToggle }) => {
  const isAvailable = game.available;

  const handleToggle = (e) => {
    e.stopPropagation();
    if (!isAvailable) return;
    onToggle(game.id);
  };

  const variantKey = `v${game.id % 4}`;

  return (
    <div
      className={`${styles.card} ${styles[variantKey]} ${!isAvailable ? styles.locked : ""}`}
      onClick={() => isAvailable && onToggle(game.id)}
    >
      <img src={game.image} alt={game.title} />

      {isAvailable ? (
        <button
          className={
            selected
              ? `${styles.selectBtn} ${styles.selected}`
              : styles.selectBtn
          }
          onClick={handleToggle}
          aria-pressed={selected}
          title={selected ? "Remove game" : "Add game"}
        >
          {selected ? "✓" : "+"}
        </button>
      ) : (
        <span className={styles.badge}>В разработке</span>
      )}

      <div className={styles.info}>
        <h3>{game.title}</h3>
        <p>{game.description}</p>
      </div>
    </div>
  );
};

export default GameCard;
