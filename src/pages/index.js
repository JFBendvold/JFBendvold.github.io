'use client'

import styles from '../style/page.module.css'
import Cookie from '@/components/Cookie'
import BouncyTitle from '@/components/BouncyTitle'
import Link from 'next/link'
import Image from 'next/image'
import PublicWrapper from '@/components/hocs/PublicWrapper'

export default function Home() {
  return (
    <PublicWrapper>
      <BouncyTitle title="TokenTrivia" />
      <div className={styles.subtitle}>
        <h2>Trivia with a twist of Crypto</h2>
      </div>
      <div className={styles.content}>
        <Link href="/login">
          <button className={styles.button}><p>Login</p></button>
        </Link>
        <Link href="/register">
          <button className={styles.button}><p>Register new account</p></button>
        </Link>
        <Link href="/metamask">
          <button className={styles.button}>
            <p>Login with MetaMask</p>
            <Image src="./img/MetaMask_Fox.svg"
              alt="MetaMask logo" width={30} height={30} />
          </button>
        </Link>
      </div>
      <Cookie />
    </PublicWrapper>
  )
}
