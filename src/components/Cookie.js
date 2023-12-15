import styles from '../style/cookie.module.css'
import Link from 'next/link'

export default function Cookie() {
    return (
        <div className={styles.cookie}>
            <Link href="/cookies">
                <div className={styles.cookieicon}>
                    <span className="material-symbols-outlined">
                        cookie
                    </span>
                </div>
            </Link>
        </div>
    )
}