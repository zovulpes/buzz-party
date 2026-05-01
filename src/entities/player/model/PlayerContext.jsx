// entities/player/model/PlayerContext.jsx

// no direct React hooks needed here
import { usePlayers } from "./usePlayers";
import PlayerContext from "./PlayerContextCore";

export const PlayerProvider = ({ children }) => {
  const playersData = usePlayers();

  return (
    <PlayerContext.Provider value={playersData}>
      {children}
    </PlayerContext.Provider>
  );
};

// Note: `usePlayerContext` is moved to a separate file to keep this module
// exporting only the component (avoids react-refresh rule warnings).
