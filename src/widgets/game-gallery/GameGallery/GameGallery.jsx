import React from "react";
import GameCard from "../GameCard";
import styles from "./GameGallery.module.scss";

const GameGallery = ({ games, selectedIds, onToggle }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.masonry}>
        {games.map((g) => (
          <div key={g.id} className={styles.item}>
            <GameCard
              game={g}
              selected={selectedIds.includes(g.id)}
              onToggle={onToggle}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameGallery;
