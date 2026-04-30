import { useState, useEffect, useCallback } from "react";

const API_URL = "http://localhost:3001/players";

/**
 * Хук для управления игроками через JSON Server
 * @returns {Object} players, loading, error, togglePlayer, updatePlayerName
 */
export const usePlayers = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Загрузка игроков с сервера
    const fetchPlayers = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error("Failed to fetch players");
            const data = await res.json();
            // Сортируем по ID для консистентности
            setPlayers(data.sort((a, b) => a.id - b.id));
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Обновление игрока на сервере
    const updatePlayer = useCallback(async (id, updates) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updates)
            });
            if (!res.ok) throw new Error("Failed to update player");
            const updated = await res.json();
            // Оптимистичное обновление локального стейта
            setPlayers(prev => prev.map(p => p.id === id ? updated : p));
            return updated;
        } catch (err) {
            console.error("Update error:", err);
            setError(err.message);
            // Откат при ошибке: перезагружаем данные
            fetchPlayers();
            throw err;
        }
    }, [fetchPlayers]);

    // Загрузка при монтировании
    useEffect(() => {
        fetchPlayers();
    }, [fetchPlayers]);

    // Переключение статуса игрока (активен/неактивен)
    const togglePlayer = useCallback(async (id) => {
        const player = players.find(p => p.id === id);
        if (!player) return;

        if (player.active) {
            // Деактивация
            await updatePlayer(id, { active: false });
        } else {
            // Активация (имя устанавливается отдельно через updatePlayerName)
            await updatePlayer(id, { active: true });
        }
    }, [players, updatePlayer]);

    // Обновление имени игрока
    const updatePlayerName = useCallback(async (id, name) => {
        await updatePlayer(id, { name });
    }, [updatePlayer]);

    const activatePlayer = useCallback(async (id, name) => {
        // При добавлении сразу ставим active: true + сохраняем имя
        await updatePlayer(id, { active: true, name });
    }, [updatePlayer]);


    return {
        players,
        loading,
        error,
        togglePlayer,
        updatePlayerName,
        activatePlayer,
        refresh: fetchPlayers // для ручной перезагрузки
    };
};