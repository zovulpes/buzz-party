import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "lobby_players_v1";
const DEFAULT_PLAYERS = [
    { id: 1, active: false, name: "" },
    { id: 2, active: false, name: "" },
    { id: 3, active: false, name: "" },
    { id: 4, active: false, name: "" }
];

export const usePlayers = () => {
    // 🔹 1. Ленивая инициализация: читаем из localStorage только при первом рендере
    const [players, setPlayers] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                // 🔹 Безопасный мердж: если в сохранённых данных не хватает полей, подставляем дефолтные
                return DEFAULT_PLAYERS.map(def => {
                    const savedPlayer = parsed.find(p => p.id === def.id);
                    return savedPlayer ? { ...def, ...savedPlayer } : def;
                });ф
            }
        } catch (e) {
            console.error("Failed to load players from localStorage:", e);
        }
        return DEFAULT_PLAYERS;
    });

    const [loading, setLoading] = useState(false); // localStorage синхронен → сразу готово
    const [error, setError] = useState(null);

    // 🔹 2. Авто-сохранение при каждом изменении players
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
        } catch (e) {
            console.error("Failed to save players:", e);
            setError("Storage quota exceeded or disabled");
        }
    }, [players]);

    // 🔹 3. Базовое обновление одного игрока
    const updatePlayer = useCallback((id, updates) => {
        setPlayers(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    }, []);

    // 🔹 4. Переключение active / inactive
    const togglePlayer = useCallback((id) => {
        setPlayers(prev => {
            const player = prev.find(p => p.id === id);
            if (!player) return prev;
            return prev.map(p => p.id === id ? { ...p, active: !p.active } : p);
        });
    }, []);

    // 🔹 5. Обновление только имени
    const updatePlayerName = useCallback((id, name) => {
        updatePlayer(id, { name });
    }, [updatePlayer]);

    // 🔹 6. Активация + установка имени (вызывается из модалки)
    const activatePlayer = useCallback((id, name) => {
        updatePlayer(id, { active: true, name });
    }, [updatePlayer]);

    // 🔹 7. Возвращаем ТОТ ЖЕ интерфейс, что и API-версия
    return {
        players,
        loading,
        error,
        togglePlayer,
        updatePlayerName,
        activatePlayer,
        refresh: () => {} // Заглушка для совместимости (localStorage не требует перезагрузки)
    };
};