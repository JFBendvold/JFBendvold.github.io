import styles from '../style/arrowLink.module.css'
import Link from 'next/link'

export default function ArrowLink({ href }) {
    return (
        <div className={styles.arrowLink}>
            <Link href={href}>
                <div className={styles.arrowicon}>
                    <span className="material-symbols-outlined">
                        arrow_back_ios_new
                    </span>
                </div>
            </Link>
        </div>
    )
}
