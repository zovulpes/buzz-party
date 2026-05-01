import styles from './PlayerCard.module.scss';

const PlayerCard = ({ count, active, onClick, name }) => {
    return (
        <section className={styles.section} onClick={onClick}>
            {active ? (
                <svg data-count={count} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="30" r="12" stroke="white" strokeWidth="6"/>
                    <path d="M20 80 C20 60, 80 60, 80 80" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round"/>
                </svg>
            ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )}
            <h3>{name || `Player ${count}`}</h3>
        </section>
    );
};

export default PlayerCard;