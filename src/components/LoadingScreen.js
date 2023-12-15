import styles from '../style/loadingScreen.module.css';

export default function LoadingScreen() {
  return (
    <div className={styles.loaderContainer} id="loading-screen" style={{display: 'none'}}>
      <div className={styles.loader}></div>
    </div>
  );
}