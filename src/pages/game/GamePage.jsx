import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@/shared/ui/button/Button.jsx";
import { usePlayerContext } from "@/entities/player/model/usePlayerContext";
import {
  AVAILABLE_GAME_IDS,
  getGameById,
} from "@/features/select-games/model/gamesCatalog";
import {
  readGameSession,
  saveGameSession,
} from "@/features/select-games/model/gameSession";
import FastTapGame from "@/features/select-games/ui/FastTapGame";
import GuessSoundGame from "@/features/select-games/ui/GuessSoundGame";
import styles from "./GamePage.module.scss";

const GamePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { players } = usePlayerContext();

  const activePlayers = useMemo(
    () => players.filter((p) => p.active),
    [players],
  );

  const stateSession = location.state || {};
  const storedSession = readGameSession() || {};

  const selectedGameIds =
    stateSession.selectedGameIds ||
    storedSession.selectedGameIds ||
    AVAILABLE_GAME_IDS;

  const gameIndex = Number.isInteger(stateSession.gameIndex)
    ? stateSession.gameIndex
    : Number.isInteger(storedSession.gameIndex)
      ? storedSession.gameIndex
      : 0;

  const [turnIndex, setTurnIndex] = useState(0);
  const [scores, setScores] = useState(() => ({
    ...activePlayers.reduce((acc, player) => ({ ...acc, [player.id]: 0 }), {}),
    ...(stateSession.scores || storedSession.scores || {}),
  }));
  const [showPassModal, setShowPassModal] = useState(false);
  const [pendingTurnIndex, setPendingTurnIndex] = useState(null);

  if (activePlayers.length < 1) {
    return (
      <div className={styles.page}>
        <p className={styles.error}>No active players. Go back to lobby.</p>
        <Button onClick={() => navigate("/lobby")}>BACK TO LOBBY</Button>
      </div>
    );
  }

  const selectedGames = selectedGameIds
    .map((id) => getGameById(id))
    .filter((g) => g?.available);

  const currentGame = selectedGames[gameIndex];
  const currentPlayer = activePlayers[turnIndex];

  if (!currentGame || !currentPlayer) {
    return (
      <div className={styles.page}>
        <p className={styles.error}>Game session is not valid.</p>
        <Button onClick={() => navigate("/select")}>BACK TO SELECTOR</Button>
      </div>
    );
  }

  const handleTurnComplete = (earnedPoints) => {
    const playerId = currentPlayer.id;
    const updatedScores = {
      ...scores,
      [playerId]: (scores[playerId] || 0) + earnedPoints,
    };

    const isLastPlayer = turnIndex === activePlayers.length - 1;

    if (!isLastPlayer) {
      setScores(updatedScores);
      setPendingTurnIndex(turnIndex + 1);
      setShowPassModal(true);
      return;
    }

    const session = { selectedGameIds, gameIndex, scores: updatedScores };
    saveGameSession(session);

    navigate("/leaderboard", {
      state: {
        selectedGameIds,
        completedGameIndex: gameIndex,
        scores: updatedScores,
      },
    });
  };

  const passToPlayer =
    pendingTurnIndex !== null ? activePlayers[pendingTurnIndex] : null;

  const startNextTurn = () => {
    if (pendingTurnIndex !== null) {
      setTurnIndex(pendingTurnIndex);
      setPendingTurnIndex(null);
    }
    setShowPassModal(false);
  };

  const renderGame = () => {
    if (currentGame.key === "fast_tap") {
      return (
        <FastTapGame
          key={`${currentGame.id}-${currentPlayer.id}`}
          onTurnComplete={handleTurnComplete}
        />
      );
    }

    if (currentGame.key === "guess_sound") {
      return (
        <GuessSoundGame
          key={`${currentGame.id}-${currentPlayer.id}`}
          seed={currentPlayer.id + gameIndex}
          onTurnComplete={handleTurnComplete}
        />
      );
    }

    return <p className={styles.error}>Unknown game type</p>;
  };

  return (
    <div className={styles.page}>
      <header className={styles.top}>
        <h1>{currentGame.title}</h1>
        <div className={styles.meta}>
          <span className={styles.chip}>
            Game {gameIndex + 1}/{selectedGames.length}
          </span>
          <span className={styles.chip}>
            {currentPlayer.name || `Player ${currentPlayer.id}`}
          </span>
        </div>
      </header>

      {renderGame()}

      {showPassModal && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h3>PASS TO PLAYER {passToPlayer?.id}</h3>
            <p>
              {passToPlayer?.name || `Player ${passToPlayer?.id}`}, YOUR TURN.
            </p>
            <Button onClick={startNextTurn}>START TURN</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
