'use client'

import { useEffect, useRef, useState } from 'react'
import styles from '../style/page.module.css'
import Cookie from '@/components/Cookie'
import BouncyTitle from '@/components/BouncyTitle'
import Link from 'next/link'
import Image from 'next/image'
import io from 'socket.io-client';
import { generateToken, validateToken } from "@/services/AuthService.js"
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { useRouter } from 'next/router'

export default function Home() {
  const mainRef = useRef(null)
  const router = useRouter()

  const validate = async () => {
    try {
      const response = await validateToken();
      if (response.status === 200) {
        console.log("Token validated");
        router.push('/dashboard');
      } else {
        console.log("Token not validated");
      }

    } catch (error) {
      console.log("Token not validated: " + error);
    }
  }

  useEffect(() => {
    mainRef.current.style.opacity = 1;
    validate();
  }, [])


  return (
    <main className={styles.main} ref={mainRef}>
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
    </main>
  )
}
