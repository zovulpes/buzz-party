import Button from '@/shared/ui/button/Button.jsx'
import Cloud from '@/shared/ui/cloud/Cloud.jsx'
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
            <Cloud />
        </div>
    )
}

export default StartPage;