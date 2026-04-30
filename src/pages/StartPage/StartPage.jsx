import Button from '../../components/Button/Button.jsx'
import styles from './StartPage.module.scss'
import {useNavigate} from "react-router-dom";

const StartPage = () => {
    const navigate = useNavigate()

    const handleStart = () => {
        navigate('/lobby')
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1>BUZZ</h1>
                <h3>PARTY</h3>
            </div>
            <Button onClick={handleStart}>START GAME</Button>
            <div className={styles.cloud}></div>
            <div className={styles.cloudLayer2}></div>
        </div>
    )
}

export default StartPage;