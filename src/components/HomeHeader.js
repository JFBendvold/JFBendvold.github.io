import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/home/HomeHeader.module.css";

export default function HomeHeader() {
    return (
        <header className={styles.header}>
            <Link href="/" className={styles.logo}>
                <Image src="/icons/Logo.svg" alt="Logo" width={98} height={98} />
            </Link>
            <Link href="/utselger">
                Utselger
            </Link>
        </header>
    );
}
