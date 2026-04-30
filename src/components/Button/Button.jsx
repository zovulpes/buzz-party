import styles from './Button.module.scss'

const Button = (props) => {
    const { children, onClick } = props
    return (
        <button onClick={() => onClick()} className={styles.button}>{children}</button>
    )
}

export default Button