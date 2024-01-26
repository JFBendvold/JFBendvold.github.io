import styles from '@/styles/utselger/login.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { openNotificationError, openNotificationSuccess } from '@/utils/Notifications';
import { Spin } from 'antd';

export default function Login() {
    // Supabase client
    const supabaseClient = useSupabaseClient();

    // Process information
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    // Form information
    const [email, setEmail] = useState('');

    // Check if user is logged in
    useEffect(() => {
        supabaseClient.auth.getUser().then((user) => {
            console.log(user.data.user);
        }).catch((error) => {
            console.log(error);
        });
    }, [supabaseClient]);

    // Handle login
    async function handleLogin() {
        setLoading(true);

        if (email === '') {
            openNotificationError('E-posten kan ikke være tom');
            setLoading(false);
            return;
        } else if (!email.includes('@') || !email.includes('.') || email.length < 5) {
            openNotificationError('E-posten er ikke gyldig');
            setLoading(false);
            return;
        }

        const {data, error } = await supabaseClient.auth.signInWithOtp({
            email: email,
            options: { 
                emailRedirectTo: process.env.NEXT_PUBLIC_BASE_URL + '/utselger',
                shouldCreateUser: true
            } 
        })

        if (error) {
            openNotificationError(error.message);
            setLoading(false);
        } else {
            openNotificationSuccess("Velykket", "Vi har sendt en e-post til deg med innloggingsinformasjon");
            setSent(true);
            setLoading(false);
        }
    }

    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <Link href="/" className={styles.logo}>
                    <Image src="/icons/Logo.svg" alt="Logo" width={98} height={98} priority />
                </Link>
                <Link href="/utselger">
                    Gå tilbake
                </Link>
            </header>
            {!sent && (
            <div className={styles.content}>
                <h1>
                    Logg inn
                </h1>
                <div className={styles.inputContainer}>
                    <label htmlFor="email">E-post</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-post" />
                </div>
                <div className={styles.buttonContainer}>
                    <button onClick={handleLogin}>Logg inn</button>
                </div>
            </div>
            )}
            {sent && (
            <div className={styles.content}>
                <h1>
                    E-post sendt
                </h1>
                <p>
                    Vi har sendt en e-post til deg med innloggingsinformasjon.
                </p>
                <p>
                    Hvis du ikke har mottatt e-posten, sjekk spam-mappen din.
                </p>
            </div>
            )}
            <Spin spinning={loading} fullscreen/>
        </main>
    )
}