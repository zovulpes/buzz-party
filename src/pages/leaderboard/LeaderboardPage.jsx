import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@/shared/ui/button/Button.jsx";
import { usePlayerContext } from "@/entities/player/model/usePlayerContext";
import {
  AVAILABLE_GAME_IDS,
  getGameById,
} from "@/features/select-games/model/gamesCatalog";
import {
  clearGameSession,
  readGameSession,
  saveGameSession,
} from "@/features/select-games/model/gameSession";
import styles from "./LeaderboardPage.module.scss";

const Leaderboard = () => {
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

  const completedGameIndex = Number.isInteger(stateSession.completedGameIndex)
    ? stateSession.completedGameIndex
    : Number.isInteger(storedSession.gameIndex)
      ? storedSession.gameIndex
      : 0;

  const scores = stateSession.scores || storedSession.scores || {};

  const playableGames = selectedGameIds
    .map((id) => getGameById(id))
    .filter((g) => g?.available);

  const isFinal = completedGameIndex >= playableGames.length - 1;

  const ranking = [...activePlayers]
    .map((p) => ({ ...p, points: scores[p.id] || 0 }))
    .sort((a, b) => b.points - a.points);

  const handleContinue = () => {
    if (isFinal) {
      clearGameSession();
      navigate("/lobby");
      return;
    }

    const nextSession = {
      selectedGameIds,
      scores,
      gameIndex: completedGameIndex + 1,
    };

    saveGameSession(nextSession);
    navigate("/game", { state: nextSession });
  };

  if (ranking.length === 0) {
    return (
      <div className={styles.page}>
        <p className={styles.error}>No player results found.</p>
        <Button onClick={() => navigate("/lobby")}>BACK TO LOBBY</Button>
      </div>
    );
  }

  const title = isFinal ? "FINAL LEADERBOARD" : "LEADERBOARD";
  const subtitle = isFinal
    ? "All selected games are completed"
    : `Game ${completedGameIndex + 1} completed`;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.sub}>{subtitle}</p>

      <ul className={styles.list}>
        {ranking.map((player, index) => (
          <li
            key={player.id}
            className={`${styles.item} ${index === 0 ? styles.winner : ""}`}
          >
            <span>
              <span className={styles.rank}>#{index + 1}</span>{" "}
              {player.name || `Player ${player.id}`}
              {index === 0 ? " 👑" : ""}
            </span>
            <strong>{player.points} pts</strong>
          </li>
        ))}
      </ul>

      <div className={styles.actions}>
        <Button onClick={handleContinue}>
          {isFinal ? "PLAY AGAIN" : "NEXT GAME"}
        </Button>
      </div>
    </div>
  );
};

export default Leaderboard;
