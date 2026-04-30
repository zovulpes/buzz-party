import { useState } from "react";
import Player from "../../components/Player/Player.jsx";
import styles from "./LobbyPage.module.scss";
import Button from "../../components/Button/Button.jsx";

const LobbyPage = () => {
    const [players, setPlayers] = useState([
        { id: 1, active: false }
    ]);

    const [showMessage, setShowMessage] = useState(false);

    const addPlayer = (id) => {
        setPlayers((prev) => {
            const updated = prev.map((p) =>
                p.id === id ? { ...p, active: true } : p
            );

            if (prev.length >= 4) {
                return updated;
            }

            return updated.concat({
                id: prev.length + 1,
                active: false,
            });
        });
    };

    return (
        <div className={styles.page}>
            <h1>WHO'S PLAYING?</h1>
            <h2>Tap an avatar to join the party</h2>

            <div className={styles.playersContainer}>
                {players.map((player) => (
                    <Player
                        key={player.id}
                        count={player.id}
                        active={player.active}
                        onClick={() => addPlayer(player.id)}
                    />
                ))}
            </div>

            <Button onClick={() => setShowMessage(true)}>
                CHOOSE GAMES
            </Button>

            {showMessage && (
                <>
                    {players.length < 2 && (
                        <p>Minimum 2 players required</p>
                    )}
                </>
            )}
        </div>
    );
};

export default LobbyPage;