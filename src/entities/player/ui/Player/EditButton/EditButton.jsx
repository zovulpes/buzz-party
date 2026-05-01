import styles from './EditButton.module.scss'

const EditButton = (props) => {
    const {onClick} = props

    return (
        <button
            className={styles.editBtn}
            onClick={onClick}
        >
            ✎
        </button>)
}

export default EditButton;

