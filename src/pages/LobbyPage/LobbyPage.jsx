import { useState } from "react";
import Player from "../../components/Player/Player.jsx";
import PlayerNameModal from "../../components/PlayerNameModal/PlayerNameModal.jsx";
import styles from "./LobbyPage.module.scss";
import Button from "../../components/Button/Button.jsx";

const LobbyPage = () => {
    const [players, setPlayers] = useState([
        { id: 1, active: false, name: "" },
        { id: 2, active: false, name: "" },
        { id: 3, active: false, name: "" },
        { id: 4, active: false, name: "" }
    ]);

    const [showMessage, setShowMessage] = useState(false);

    // Состояние модалки
    const [modalState, setModalState] = useState({
        isOpen: false,
        playerId: null,
        initialName: "",
        mode: "add" // "add" | "edit"
    });

    // Открытие модалки при клике на неактивного игрока
    const handlePlayerClick = (id) => {
        const player = players.find(p => p.id === id);
        if (!player) return;

        if (player.active) {
            // Деактивация
            setPlayers(prev => prev.map(p =>
                p.id === id ? { ...p, active: false } : p
            ));
        } else {
            // Активация → модалка
            const activeCount = players.filter(p => p.active).length;
            if (activeCount >= 4) return;

            setModalState({
                isOpen: true,
                playerId: id,
                initialName: `Player ${id}`,
                mode: "add"
            });
        }
    };

    // Обработчик сохранения имени из модалки
    const handleNameSubmit = (name) => {
        const { playerId } = modalState;
        if (!playerId) return;

        setPlayers(prev => prev.map(p =>
            p.id === playerId
                ? { ...p, active: true, name }
                : p
        ));
    };

    // Редактирование имени активного игрока
    const handleEditClick = (id, currentName) => {
        setModalState({
            isOpen: true,
            playerId: id,
            initialName: currentName,
            mode: "edit"
        });
    };

    // Закрытие модалки
    const closeModal = () => {
        setModalState(prev => ({ ...prev, isOpen: false }));
    };

    // Список для отображения
    const activePlayers = players.filter(p => p.active);
    const firstInactive = players.find(p => !p.active);
    const displayedPlayers = [...activePlayers, ...(firstInactive ? [firstInactive] : [])];

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

            {showMessage && activePlayers.length < 2 && (
                <p className={styles.error}>Minimum 2 players required</p>
            )}

            {/* Вынесенная модалка */}
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