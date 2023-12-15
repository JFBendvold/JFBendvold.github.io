import styles from '../style/components/bubbles.module.css';

export default function Bubbles({content}) {
    return (
        <div className={styles.bubbleContainer}>
            <div className={styles.bubble}>{content}</div>
            <div className={styles.bubble}>{content}</div>
            <div className={styles.bubble}>{content}</div>
            <div className={styles.bubble}>{content}</div>
            <div className={styles.bubble}>{content}</div>
            <div className={styles.bubble}>{content}</div>
            <div className={styles.bubble}>{content}</div>
            <div className={styles.bubble}>{content}</div>
            <div className={styles.bubble}>{content}</div>
            <div className={styles.bubble}>{content}</div>
            <div className={styles.bubble}>{content}</div>
            <div className={styles.bubble}>{content}</div>
            <div className={styles.bubble}>{content}</div>
            <div className={styles.bubble}>{content}</div>
        </div>
    );
}