import {useNavigate} from "react-router-dom";
import Button from "@/shared/ui/button/Button.jsx";

const GameSelector = () => {

    const navigate = useNavigate()

    const handlePageChange = () => {
        navigate('/game')
    }

    return (
        <div>
            <h1>PICK MINI-GAMES</h1>
            <h2>6 GAMES SELECTED</h2>
            {/*ЗДЕСЬ ДОЛЖНА БЫТЬ ГАЛЕРЕЯ ИГР, КАРТИНКА, НА НЕЙ НАЗВАНИЕ И ОПИСАНИЕ ИГРЫ, В ПРАВОМ ВЕРХНЕМ УГЛУ КНОПКА +, КОТОРАЯ ПОСЛЕ НАЖАТИЯ МЕНЯЕТСЯ НА ГАЛОЧКУ. МОЖНО ЛИСТАТЬ ВПРАВО И ВИДЕТЬ ДРУГИЕ ИГРЫ*/}
            <Button onClick={handlePageChange}>LET'S GO</Button>
        </div>
    )
}

export default GameSelector;