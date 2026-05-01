import PlayerCard from "@/entities/player/ui/Player/PlayerCard/PlayerCard.jsx";
import PlayerNameModal from "@/features/add-player/ui/PlayerNameModal";
import { usePlayerContext } from "@/entities/player/model/usePlayerContext";
import { usePlayerModal } from "@/features/add-player/model/usePlayerModal";
import { useLobby } from "@/features/manage-lobby/model/useLobby";
import Button from "@/shared/ui/button/Button";
import styles from "./LobbyPage.module.scss";
import EditButton from "@/entities/player/ui/Player/EditButton/EditButton.jsx";

const LobbyPage = () => {
  const {
    players,
    loading,
    error,
    togglePlayer,
    updatePlayerName,
    activatePlayer,
  } = usePlayerContext();

  const modal = usePlayerModal(players);
  const lobby = useLobby(players);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  const handlePlayerClick = (player) => {
    if (player.active) {
      togglePlayer(player.id);
    } else {
      modal.openAddModal(player.id, player.name || `Player ${player.id}`);
    }
  };

  const handleNameSubmit = modal.handleSubmit((playerId, name) => {
    if (modal.modalState.mode === "add") {
      activatePlayer(playerId, name);
    } else {
      updatePlayerName(playerId, name);
    }
  });

  return (
    <div>
      <h1>WHO'S PLAYING?</h1>
      <h2>Tap an avatar to join the party</h2>

      <div className={styles.playersContainer}>
        {lobby.displayedPlayers.map((player) => (
          <div key={player.id} className={styles.playerWrapper}>
            <PlayerCard
              count={player.id}
              active={player.active}
              name={player.name}
              onClick={() => handlePlayerClick(player)}
            />

            {player.active && (
              <EditButton
                onClick={(e) => {
                  e.stopPropagation();
                  modal.openEditModal(player.id, player.name);
                }}
              ></EditButton>
            )}
          </div>
        ))}
      </div>

      <Button onClick={lobby.goToGameSelect}>CHOOSE GAMES</Button>

      {lobby.showMessage && (
        <p className={styles.error}>Minimum 2 players required</p>
      )}

      <PlayerNameModal
        isOpen={modal.modalState.isOpen}
        playerId={modal.modalState.playerId}
        initialName={modal.modalState.initialName}
        mode={modal.modalState.mode}
        onClose={modal.closeModal}
        onSubmit={handleNameSubmit}
      />
    </div>
  );
};

export default LobbyPage;
