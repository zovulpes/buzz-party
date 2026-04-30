import { createContext, useContext } from "react";
import { usePlayers } from "../hooks/usePlayers";

// Создаём контекст
const PlayerContext = createContext(null);

// Провайдер оборачивает приложение и раздаёт данные
export const PlayerProvider = ({ children }) => {
    const playersData = usePlayers(); // ваш хук уже делает всю работу с API

    return (
        <PlayerContext.Provider value={playersData}>
            {children}
        </PlayerContext.Provider>
    );
};

// Безопасный хук для использования в компонентах
export const usePlayerContext = () => {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error("usePlayerContext должен использоваться внутри PlayerProvider");
    }
    return context;
};