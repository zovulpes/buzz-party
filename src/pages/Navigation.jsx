import { NavLink } from 'react-router-dom'

const Navigation = () => {
    return (
        <nav>
            <NavLink to='start'>Start page</NavLink>
            <NavLink to='lobby'>Lobby</NavLink>
            <NavLink to='select'>Game selector</NavLink>
            <NavLink to='game'>Game</NavLink>
            <NavLink to='leaderboard'>Leaderboard</NavLink>
        </nav>
    )
}

export default Navigation;