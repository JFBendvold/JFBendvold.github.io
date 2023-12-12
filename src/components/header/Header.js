import styles from '../../style/header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getTokens } from '@/utils/Web3Connection.js';
import { localUrl } from "@/utils/ApiClientSetup";

export default function Header() {
    const [tokens, setTokens] = useState(0);
    const [user, setUser] = useState({});
    const router = useRouter();

    useEffect(() => {
        async function fetchDataFromLocalStorage() {
            const initialUser = localStorage.getItem('user'); // Get user from local storage
    
            if (initialUser) {
                setUser(JSON.parse(initialUser));
                setTokens(JSON.parse(initialUser).tokens);
            } else {
                console.error("No user found in local storage");
                router.push('/login'); // Redirect to login page
            }
        }
        
        fetchDataFromLocalStorage();
    }, []);

    useEffect(() => {
        if (user.name && user.name !== "") {
                getTokensFromBlockchain();
            }
    }, [user.name]);

    async function getTokensFromBlockchain() {
        const tokens = await getTokens();
        if (tokens === -1) {
            console.error("Error getting tokens from blockchain");
            return;
        }
        setTokens(tokens);

        //console.log("User:", user);
        const updatedUser = user;
        //console.log("Updated user:", updatedUser);
        updatedUser.tokens = tokens;
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    }

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <Link className={styles.logo} href="/dashboard">
                    <h1>T</h1>
                    <h1>O</h1>
                    <h1>K</h1>
                    <h1>E</h1>
                    <h1>N</h1>
                    <h1>T</h1>
                    <h1>R</h1>
                    <h1>I</h1>
                    <h1>V</h1>
                    <h1>I</h1>
                    <h1>A</h1>
                </Link>
                <div className={styles.content}>
                    <Link className={styles.wallet} href="/settings?page=2">
                        <span>{tokens}</span>
                        <p>Tokens</p>
                    </Link>
                    <div href="/profile" className={styles.profile}>
                        <Image src={`${localUrl}/users/image/${user.name}`} alt="Profile" width={36} height={36} />
                        <div className={styles.dropdown}>
                            <Link href="/settings?page=0">
                                <span className="material-symbols-outlined">
                                person
                                </span>
                            </Link>
                            <Link href="/settings?page=1">
                                <span className="material-symbols-outlined">
                                settings
                                </span>
                            </Link>
                            <Link href="/settings?page=2">
                                <span className="material-symbols-outlined">
                                sync_alt
                                </span>
                            </Link>
                            <Link href="/logout">
                                <span className="material-symbols-outlined">
                                logout
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}