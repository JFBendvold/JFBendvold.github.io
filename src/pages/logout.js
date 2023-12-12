import styles from "../style/logout.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { logoutUser } from "@/services/AuthService";
import ArrowLink from "@/components/ArrowLink";

export default function Logout() {
    const [user, setUser] = useState({});
    const router = useRouter();

    useEffect(() => {
        const initialUser = localStorage.getItem('user') // Get user from local storage

        if (initialUser) { // If user is found in local storage
            setUser(JSON.parse(initialUser));
        } else {
            console.error("No user found in local storage");
            router.push('/login'); // Redirect to login page
        }
    }, []);

    function logout() {
        logoutUser(); // Logout user
        localStorage.removeItem('user'); // Remove user from local storage
        router.push('/'); // Redirect to login page
    }

    return (
        <main className={styles.main}>
            <ArrowLink href="/dashboard" />
            <h1>Are you sure you want to log out?</h1>
            <button onClick={logout}>Log out</button>
        </main>
    )
}