import styles from '../../../styles/Message.module.scss';

const Mesage = ({user, message}) => {
    console.log(message);
    return (
        <div className={styles.container}>
            <p>{message.message}</p>
        </div>
    )
}

export default Mesage

