import { useMemo, useState } from "react"; // убедитесь, что useState импортирован
import Player from "../../components/Player/Player.jsx";
import PlayerNameModal from "../../components/PlayerNameModal/PlayerNameModal.jsx";
import { usePlayerContext } from "../../context/PlayerContext";
import { usePlayerModal } from "../../hooks/usePlayerModal.js";
import styles from "./LobbyPage.module.scss";
import Button from "../../components/Button/Button.jsx";

const LobbyPage = () => {
    // Данные и методы из глобального контекста
    const { players, loading, error, togglePlayer, updatePlayerName, activatePlayer } = usePlayerContext();

    // Логика модального окна
    const { modalState, openAddModal, openEditModal, closeModal, handleSubmit } = usePlayerModal(players);

    // Исправление: добавляем состояние для кнопки "CHOOSE GAMES"
    const [showMessage, setShowMessage] = useState(false);

    // Обработчики
    const handlePlayerClick = (id) => {
        const player = players.find(p => p.id === id);
        if (!player) return;

        if (player.active) {
            togglePlayer(id);
        } else {
            openAddModal(id, player.name || `Player ${id}`);
        }
    };

    const handleEditClick = (id, name) => {
        openEditModal(id, name);
    };

    const handleNameSubmit = handleSubmit((playerId, name) => {
        if (modalState.mode === "add") {
            activatePlayer(playerId, name); // активируем + сохраняем имя
        } else {
            updatePlayerName(playerId, name); // только редактирование имени
        }
    });

    // Список для отображения
    const displayedPlayers = useMemo(() => {
        if (loading || !players.length) return [];
        const active = players.filter(p => p.active);
        const firstInactive = players.find(p => !p.active);
        return [...active, ...(firstInactive ? [firstInactive] : [])];
    }, [players, loading]);

    // Состояния загрузки и ошибки
    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;

    return (
        <div className={styles.page}>
            <h1>WHO'S PLAYING?</h1>
            <h2>Tap an avatar to join the party</h2>

            <div className={styles.playersContainer}>
                {displayedPlayers.map((player) => (
                    <div key={player.id} className={styles.playerWrapper}>
                        <Player
                            count={player.id}
                            active={player.active}
                            name={player.name}
                            onClick={() => handlePlayerClick(player.id)}
                        />

                        {player.active && (
                            <button
                                className={styles.editBtn}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditClick(player.id, player.name);
                                }}
                                aria-label="Edit player name"
                                title="Edit name"
                            >
                                ✎
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <Button onClick={() => setShowMessage(true)}>
                CHOOSE GAMES
            </Button>

            {showMessage && players.filter(p => p.active).length < 2 && (
                <p className={styles.error}>Minimum 2 players required</p>
            )}

            <PlayerNameModal
                isOpen={modalState.isOpen}
                playerId={modalState.playerId}
                initialName={modalState.initialName}
                mode={modalState.mode}
                onClose={closeModal}
                onSubmit={handleNameSubmit}
            />
        </div>
    );
};

export default LobbyPage;