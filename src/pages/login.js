import styles from '../style/login.module.css'
import Link from 'next/link'
import Cookie from '@/components/Cookie'
import BouncyTitle from '@/components/BouncyTitle'
import ArrowLink from '@/components/ArrowLink'
import { useState, useEffect, useRef } from 'react'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { loginUser } from '@/services/AuthService'  
import { useRouter } from 'next/router'
import { getTokens } from '@/utils/Web3Connection.js';
import { openNotificationError, openNotificationInfo } from '@/utils/Notifications.js';
import { enforceGuard } from "../utils/RouterGuard";

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [fingerPrint, setFingerPrint] = useState('') //Fingerprint for device
    const [error, setError] = useState('') //Error message
    const [code, setCode] = useState('') //Code for 2FA
    const [showCode, setShowCode] = useState(false) //Show 2FA input
    const mainRef = useRef(null)
    const router = useRouter()

    const [userToStore, setUserToStore] = useState(null);
    const [storedUser, setStoredUser] = useState(null);

    useEffect(() => {
        const initialUser = localStorage.getItem('user'); //TODO: move to util
        if (initialUser) {
            setStoredUser(JSON.parse(initialUser));
            console.log("Initial stored user:", JSON.parse(initialUser));
        }
    }, []);
    
    useEffect(() => {
        if (storedUser) {
            localStorage.setItem('user', JSON.stringify(storedUser));
        }
    }, [storedUser]);


    useEffect(() => {
        mainRef.current.style.opacity = 1;

        // Generate and set fingerprint
        async function getFingerprint() {
            const fp = await FingerprintJS.load();
            const result = await fp.get();
            setFingerPrint(result.visitorId);
        }

        getFingerprint();
    }, [])

    //Submit form
    async function onSubmit(event) {
        event.preventDefault() //Prevent page reload
        console.log(userToStore)

        if (validate()) { //If inputs are valid
            console.log(username, password, fingerPrint)
            const response = await loginUser({
                name: username,
                password: password,
                fingerprint: fingerPrint,
                code: code
            })

            console.log(response)

            if (response.status === 404 || response.status === 401) {
                setError('Username or password is incorrect')
                openNotificationError('Invalid credentials', 'Username or password is incorrect');
                return
            }

            if (response.status === 500) {
                setError('Server error')
                openNotificationError('Server error', 'Please try again later');
                return
            }

            if (response.status === 400) {
                if (response.data === 'No code provided') {
                    openNotificationInfo('2FA', 'Please enter your 2FA code');
                    setCode('')
                    setShowCode(true)
                    return
                }

                if (response.data === 'Invalid code provided') {
                    openNotificationError('Invalid code', 'Please enter a valid 2FA code');
                    setCode('')
                    return
                }

                openNotificationError('Invalid request', 'Please try again later');
                return
            }

            console.log('Logged in')
            if (response && response.data && response.data.user) {
                // Get tokens from wallet
                const tokens = await getTokens();

                // Add tokens to user object
                response.data.user.tokens = tokens;

                setUserToStore(response.data.user);
                setStoredUser(response.data.user);
                console.log('User set')
            }

            router.push('/dashboard')
            const storedUser = localStorage.getItem('user'); //TODO: move to util
            if (storedUser) {
                console.log("Stored user:", JSON.parse(storedUser));
            }
        } else {
            console.log('Invalid')
        }
    }

    //Check if inputs are valid
    function validate() {
        if (username.length < 1) {
            setError('Please enter a username or email')
            openNotificationError('No username', 'Please enter a username or email');
            return false
        } else if (password.length < 1) {
            setError('Please enter a password')
            openNotificationError('No password', 'Please enter a password');
            return false
        } else {
            setError('')
            return true
        }
    }

    return (
        <main className={styles.main} ref={mainRef}>
            <BouncyTitle title="Login" />
            <ArrowLink href="/" />
            <div className={styles.content}>
                <form onSubmit={onSubmit}>
                    {!showCode &&
                    <>
                    <input
                        type="text"
                        placeholder="Username/Email"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    </>
                    }
                    {showCode &&
                    <>
                    <input
                        type="text"
                        placeholder="2FA Code"
                        value={code}
                        onChange={event => setCode(event.target.value)}
                    />
                    </>
                    }
                    <button type="submit">Login</button>
                    <div className={styles.links}>
                        <Link href="/register">Register</Link>
                        <Link href="/forgot">Forgot Password</Link>
                    </div>
                    <p className={styles.error}>{error}</p>
                </form>
            </div>
            <Cookie />
        </main>
    )
}