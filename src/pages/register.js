import styles from '../style/login.module.css'
import Link from 'next/link'
import Cookie from '@/components/Cookie'
import BouncyTitle from '@/components/BouncyTitle'
import ArrowLink from '@/components/ArrowLink'
import { useState, useEffect, useRef, useContext } from 'react'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import Select from 'react-select'
import { registerUser, getUser } from '@/services/UserService'
import { loginUser } from '@/services/AuthService'
import { showLoadingScreen, hideLoadingScreen } from '@/utils/LoadingProvider'
import LoadingScreen from '@/components/LoadingScreen'
import { useRouter } from 'next/router'
import { getTokens } from '@/utils/Web3Connection.js';
import { openNotificationError, openNotificationSuccess } from '@/utils/Notifications.js';
import PublicWrapper from '@/components/hocs/PublicWrapper'

export default function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [countries, setCountries] = useState([]) //List of countries for select
    const [country, setCountry] = useState('')
    const [fingerPrint, setFingerPrint] = useState('') //Fingerprint for device
    const [error, setError] = useState('') //Error message
    const router = useRouter()
    const [isMounted, setIsMounted] = useState(false);

    const [storedUser, setStoredUser] = useState(null);

    useEffect(() => {
        const initialUser = localStorage.getItem('user'); 
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
        // Get list of countries
        fetch("https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code")
        .then(response => response.json())
        .then(data => {
            setCountries(data.countries)
            setCountry(data.userSelectValue)
        })

        // Generate and set fingerprint
        async function getFingerprint() {
            const fp = await FingerprintJS.load();
            const result = await fp.get();
            setFingerPrint(result.visitorId);
        }

        getFingerprint();
        setIsMounted(true);
    }, [])

    //Submit form
    async function onSubmit(event) {
        event.preventDefault() //Prevent page reload
        showLoadingScreen() //Show loading screen
        if (validate()) { //If inputs are valid
            try {
                const response = await registerUser({
                    name: username,
                    email: email,
                    password: password,
                    country: country.value,
                });

                if (response.status === 200) {
                    // User created successfully
                    console.log('User created successfully')
                    try {
                        const response = await loginUser({
                            name: username,
                            password: password,
                            fingerprint: fingerPrint
                        })
                        if(response.status === 200) {
                            // Get tokens from wallet
                            const tokens = await getTokens();

                            // Add tokens to user object
                            response.data.user.tokens = tokens;

                            // Login successful
                            setStoredUser(response.data.user);
                            console.log('User set')
                            console.log('Login successful')
                            openNotificationSuccess('Registration successful', 'Welcome! Your first 50 tokens will be added to your wallet shortly.');
                            
                            router.push('/dashboard')
                        }
                    } catch (error) {
                        console.error(error);
                    }
                } else if (response.status === 409) {
                    // User already exists
                    setError('Username or email already exists')
                    openNotificationError('Registration failed', 'Username or email already exists');
                } else {
                    // Unknown error
                    setError('Unknown error')
                    openNotificationError('Registration failed', 'Unknown error');
                }
            } catch (error) {
                setError(error.message)
                console.error(error);
            }

        } else {
            console.log('Invalid')
        }

        hideLoadingScreen() //Hide loading screen
    }

    //Check if inputs are valid
    function validate() {
        if (username.length < 6) {
            setError('Username must be at least 6 characters')
            openNotificationError('Registration failed', 'Username must be at least 6 characters');
            return false
        } else if (username.includes('@')) {
            setError('Username cannot contain @')
            openNotificationError('Registration failed', 'Username cannot contain @');
            return false
        } else if (password.length < 8) {
            setError('Password must be at least 8 characters')
            openNotificationError('Registration failed', 'Password must be at least 8 characters');
            return false
        } else if (password.search(/[a-z]/i) < 0 || password.search(/[0-9]/) < 0) {
            setError('Password must contain at least one letter and one number')
            openNotificationError('Registration failed', 'Password must contain at least one letter and one number');
            return false
        } else if (email.search(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) < 0) {
            setError('Invalid email')
            openNotificationError('Registration failed', 'Invalid email');
            return false
        } else if (email !== confirmEmail) {
            setError('Emails do not match')
            openNotificationError('Registration failed', 'Emails do not match');
            return false
        } else if (password !== confirmPassword) {
            setError('Passwords do not match')
            openNotificationError('Registration failed', 'Passwords do not match');
            return false
        } else {
            setError('')
            return true
        }
    }

    return (
        <PublicWrapper>
            <BouncyTitle title="Register" />
            <ArrowLink href="/" />
            <div className={styles.content}>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder="Username (min 6 characters)"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                    { isMounted && <Select
                        options={countries}
                        value={country}
                        onChange={setCountry}
                        placeholder="Country"
                        className={styles.select}
                        classNamePrefix="select"
                    />}
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Confirm Email"
                        value={confirmEmail}
                        onChange={event => setConfirmEmail(event.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={event => setConfirmPassword(event.target.value)}
                    />
                    <button type="submit">
                        Register
                    </button>
                    <div className={styles.links}>
                        <Link href="/login">Login</Link>
                        <Link href="/cookies">Terms of Service</Link>
                    </div>
                    <p className={styles.error}>{error}</p>
                </form>
            </div>
            <Cookie />
            <LoadingScreen />
        </PublicWrapper>
    )
}