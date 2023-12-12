import styles from '../style/footer.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.column}>
                    <h1 className={styles.title}>TOKENTRIVIA <span className={styles.version}>v1.0.0</span></h1>
                    <p className={styles.text}>WEB3 Trivia Game</p>
                </div>
                <div className={styles.column}>
                    <h1 className={styles.title}>Links</h1>
                    <Link href="/dashboard">
                        <p className={styles.text}>Dashboard</p>
                    </Link>
                    <Link href="/tutorial">
                        <p className={styles.text}>Tutorial</p>
                    </Link>
                    <Link href="/leaderboard">
                        <p className={styles.text}>Leaderboard</p>
                    </Link>
                </div>
                <div className={styles.column}>
                    <h1 className={styles.title}>Socials</h1>
                    <div className={styles.socials}>
                        <Link href="https://www.instagram.com/tokent.io/">
                            <Image src="/img/socials/instagram.svg" width={30} height={30} alt="Instagram" className={styles.black} />
                        </Link>
                        <Link href="https://www.facebook.com/tokent.io">
                            <Image src="/img/socials/facebook.png" width={30} height={30} alt="Facebook" />
                        </Link>
                        <Link href="https://twitter.com/tokent_io">
                            <Image src="/img/socials/twitter.svg" width={30} height={30} alt="Twitter" className={styles.black} />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}