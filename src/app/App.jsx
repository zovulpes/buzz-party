import {Routes, Route} from 'react-router-dom'
import { PlayerProvider } from "@/entities/player/model/PlayerContext.jsx";
import StartPage from "@/pages/start/index.js";
import GamePage from "@/pages/game/index.js";
import GameSelectorPage from "@/pages/game-selector/index.js";
import LobbyPage from "@/pages/lobby/index.js";
import LeaderboardPage from "@/pages/leaderboard/index.js";

function App() {
  return (
          <PlayerProvider>
              <Routes>
                  <Route path='/' element={<StartPage />} />
                  <Route path='/select' element={<GameSelectorPage />} />
                  <Route path='/lobby' element={<LobbyPage />} />
                  <Route path='/game' element={<GamePage />} />
                  <Route path='/leaderboard' element={<LeaderboardPage />} />
              </Routes>
          </PlayerProvider>
  )
}

export default App
