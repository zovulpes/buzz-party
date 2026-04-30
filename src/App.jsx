import { Routes, Route } from 'react-router-dom'
import StartPage from "./pages/StartPage/index.js";
import GamePage from "./pages/GamePage/index.js";
import GameSelectorPage from "./pages/GameSelectorPage/index.js";
import LobbyPage from "./pages/LobbyPage/index.js";
import LeaderboardPage from "./pages/LeaderboardPage/index.js";

function App() {
  return (
      <div>
              <Routes>
                  <Route path='/' element={<StartPage />} />
                  <Route path='/select' element={<GameSelectorPage />} />
                  <Route path='/lobby' element={<LobbyPage />} />
                  <Route path='/game' element={<GamePage />} />
                  <Route path='/leaderboard' element={<LeaderboardPage />} />
              </Routes>
      </div>
  )
}

export default App
