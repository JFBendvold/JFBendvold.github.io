import Image from "next/image";
import styles from "../styles/home/Home.module.css";
import HomeHeader from "@/components/HomeHeader";

export default function Home() {
  return (
    <main className={styles.main}>
      <HomeHeader />
      <div className={styles.titleContainer}>
        <div className={styles.textOverlay}>
          <p className={styles.description}>
            Lokale råvarer kun et<br/>tastetrykk unna
          </p>
          <div className={styles.buttonRow}>
            <a href="apple.com" className={styles.button}>
              <Image src="/icons/App-store-icon.svg" alt="App store" width={256} height={48} className={styles.button} />
            </a>
            <a href="google.com" className={styles.button}>
              <Image src="/icons/Play-store-icon.png" alt="Play Store" width={256} height={48} className={styles.button} />
            </a>
          </div>
        </div>
        <button className={styles.arrowButton}>
          <span className="material-symbols-outlined">
            expand_more
          </span>
        </button>
      </div>
    </main>
  );
}
