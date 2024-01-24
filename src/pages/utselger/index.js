import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/home/Home.module.css";
import HomeHeader from "@/components/UtselgerHeader";

export default function Home() {
  return (
    <main className={styles.main}>
      <HomeHeader />
      <div className={styles.titleContainer} style={{background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0)), url("/img/title_bg1.jpg")'}}>
        <div className={styles.textOverlay}>
          <p className={styles.description}>
            Kom i gang med å gjøre<br/>utsalget ditt mer tilgjengelig for kundene
          </p>
          <div className={styles.buttonRow}>
            <Link href="/utselger/registrer" className={styles.textButton}>
              Registrer deg som utselger
            </Link>
          </div>
        </div>
        <button className={styles.arrowButton}>
          <span class="material-symbols-outlined">
            expand_more
          </span>
        </button>
      </div>
    </main>
  );
}
