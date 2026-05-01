import { useEffect, useState } from "react";
import styles from "./PlayerNameModal.module.scss";
import Button from "@/shared/ui/button/Button.jsx";

/**
 * Модальное окно для ввода/редактирования имени игрока
 * @param {Object} props
 * @param {boolean} props.isOpen - показывать ли модалку
 * @param {number|null} props.playerId - ID игрока
 * @param {string} props.initialName - начальное значение имени
 * @param {string} props.mode - "add" | "edit"
 * @param {function} props.onClose - callback при закрытии
 * @param {function} props.onSubmit - callback при сохранении (name: string) => void
 */
const PlayerNameModal = ({
                             isOpen,
                             playerId,
                             initialName,
                             mode = "add",
                             onClose,
                             onSubmit
                         }) => {
    // Состояние инпута внутри модалки
    const [tempName, setTempName] = useState(initialName);

    // Обновляем tempName при изменении initialName (для редактирования)
    useEffect(() => {
        setTempName(initialName);
    }, [initialName]);

    // Закрытие по Escape
    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    // Фокус на инпут при открытии
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                document.querySelector(`.${styles.input}`)?.focus();
            }, 100);
        }
    }, [isOpen]);

    const handleSubmit = () => {
        const trimmed = tempName.trim();
        if (trimmed) {
            onSubmit(trimmed);
        }
        onClose();
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3>
                    {mode === "edit" ? "Edit Player Name" : "Add New Player"}
                </h3>

                <input
                    type="text"
                    className={styles.input}
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    placeholder={`Player ${playerId}`}
                    maxLength={20}
                    onKeyDown={handleKeyDown}
                />

                <div className={styles.actions}>
                    <Button onClick={onClose} variant="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit}>
                        {mode === "edit" ? "Save" : "Join"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PlayerNameModal;