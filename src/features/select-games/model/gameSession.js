const SESSION_KEY = "buzz_party_game_session_v1";

export const saveGameSession = (session) => {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (e) {
    console.error("Failed to save game session", e);
  }
};

export const readGameSession = () => {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read game session", e);
    return null;
  }
};

export const clearGameSession = () => {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch (e) {
    console.error("Failed to clear game session", e);
  }
};
