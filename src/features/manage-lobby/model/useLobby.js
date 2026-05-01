// features/manage-lobby/model/useLobby.js

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLobby = (players) => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  const memo = useMemo(() => {
    const activePlayers = players.filter((p) => p.active);
    const firstInactive = players.find((p) => !p.active);
    const displayed = [
      ...activePlayers,
      ...(firstInactive ? [firstInactive] : []),
    ];
    return { displayed, activeCount: activePlayers.length };
  }, [players]);

  const displayedPlayers = memo.displayed;
  const canStart = memo.activeCount >= 2;

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
    goToGameSelect,
  };
};
