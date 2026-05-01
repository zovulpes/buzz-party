// entities/player/model/PlayerContext.jsx

import { createContext, useContext } from "react";
import { usePlayers } from "./usePlayers"; // ✅ теперь локально

const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
    const playersData = usePlayers();

    return (
        <PlayerContext.Provider value={playersData}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayerContext = () => {
    const context = useContext(PlayerContext);

    if (!context) {
        throw new Error("usePlayerContext must be used within PlayerProvider");
    }

    return context;
};