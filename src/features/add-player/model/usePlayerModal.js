import { useState, useCallback } from "react";

/**
 * Хук для управления состоянием модального окна игрока
 * @param {Array} players - массив игроков для проверок
 * @returns {Object} modalState, openAddModal, openEditModal, closeModal, handleSubmit
 */

export const usePlayerModal = (players) => {
    const [modalState, setModalState] = useState({
        isOpen: false,
        playerId: null,
        initialName: "",
        mode: "add" // "add" | "edit"
    });

    // Открытие модалки для добавления нового игрока
    const openAddModal = useCallback((playerId, defaultName) => {
        const activeCount = players.filter(p => p.active).length;
        if (activeCount >= 4) return; // лимит достигнут

        setModalState({
            isOpen: true,
            playerId: playerId,
            initialName: defaultName,
            mode: "add"
        });
    }, [players]);

    // Открытие модалки для редактирования имени
    const openEditModal = useCallback((playerId, currentName) => {
        setModalState({
            isOpen: true,
            playerId: playerId,
            initialName: currentName,
            mode: "edit"
        });
    }, []);

    // Закрытие модалки
    const closeModal = useCallback(() => {
        setModalState(prev => ({ ...prev, isOpen: false }));
    }, []);

    // Обработчик отправки имени (вызывает переданный callback)
    const handleSubmit = useCallback((onSubmit) => (name) => {
        const { playerId } = modalState;
        if (!playerId) return;
        onSubmit(playerId, name);
        closeModal();
    }, [modalState, closeModal]);

    return {
        modalState,
        openAddModal,
        openEditModal,
        closeModal,
        handleSubmit
    };
};