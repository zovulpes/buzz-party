// features/manage-lobby/model/useLobby.js

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLobby = (players) => {
    const navigate = useNavigate();
    const [showMessage, setShowMessage] = useState(false);

    const activePlayers = players.filter(p => p.active);

    const displayedPlayers = useMemo(() => {
        const firstInactive = players.find(p => !p.active);
        return [...activePlayers, ...(firstInactive ? [firstInactive] : [])];
    }, [players]);

    const canStart = activePlayers.length >= 2;

    const goToGameSelect = () => {
        if (!canStart) {
            setShowMessage(true);
            return;
        }
        navigate("/select");
    };

    return {
        displayedPlayers,
        canStart,
        showMessage,
        goToGameSelect
    };
};