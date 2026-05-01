import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/shared/ui/button/Button.jsx";
import { GameGallery } from "@/widgets/game-gallery";
import styles from "./GameSelectorPage.module.scss";
import {
  AVAILABLE_GAME_IDS,
  GAMES_CATALOG,
} from "@/features/select-games/model/gamesCatalog";
import {
  clearGameSession,
  saveGameSession,
} from "@/features/select-games/model/gameSession";

const GameSelector = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(AVAILABLE_GAME_IDS);
  const [error, setError] = useState("");

  const toggle = (id) => {
    const game = GAMES_CATALOG.find((g) => g.id === id);
    if (!game?.available) return;

    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
    setError("");
  };

  const selectedCount = selected.length;

  const startGame = () => {
    const selectedAvailable = selected.filter((id) =>
      AVAILABLE_GAME_IDS.includes(id),
    );

    if (selectedAvailable.length === 0) {
      setError("Select at least one available game");
      return;
    }

    clearGameSession();
    saveGameSession({
      selectedGameIds: selectedAvailable,
      gameIndex: 0,
      scores: {},
    });

    navigate("/game", {
      state: { selectedGameIds: selectedAvailable, gameIndex: 0, scores: {} },
    });
  };

  const games = useMemo(() => GAMES_CATALOG, []);

  return (
    <div className={styles["game-selector"]}>
      <h1>PICK MINI-GAMES</h1>
      <h2>{selectedCount} GAMES SELECTED</h2>

      <GameGallery games={games} selectedIds={selected} onToggle={toggle} />

      {error && <p className={styles.error}>{error}</p>}

      <Button onClick={startGame}>START GAME</Button>
    </div>
  );
};

export default GameSelector;
