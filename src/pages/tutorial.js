import { useState, useEffect, useRef, useLayoutEffect } from "react";
import styles from "@/style/tutorial.module.css";
import Header from "@/components/header/Header";

export default function Tutorial() {
    const [user, setUser] = useState({});
    const [style, setStyle] = useState("#FF70A6");

    const mainRef = useRef(null);

    useLayoutEffect(() => {
        // Get user from local storage
        const initialUser = localStorage.getItem('user') // Get user from local storage

        if (initialUser) { // If user is found in local storage
            setUser(JSON.parse(initialUser));
        } else {
            console.error("No user found in local storage");
        }
    }, []);

    useEffect(() => {
        if (user && user.style) {
            setStyle(user.style);

            // Set background color
            document.body.style.background = `${user.style}`;
        }
    }, [user]);

    function goToWeb3Tutorial() {
        console.log("Go to web3 tutorial");
    }

    function goToGameTutorial() {
        console.log("Go to game tutorial");
    }

    return (
        <main className={styles.main} ref={mainRef}>
            <Header />
            <div className={styles.content}>
                <h1 className={styles.title}>
                    Choose a tutorial
                </h1>
                <div className={styles.row}>
                    <button className={styles.button} onClick={goToWeb3Tutorial} style={{ backgroundImage: "url('/img/bg3.jpg')" }}>
                        <div className={styles.buttonContent}>
                            Web3
                        </div>
                    </button>
                    <button className={styles.button} onClick={goToGameTutorial} style={{ backgroundImage: "url('/img/bg2.jpg')" }}>
                        <div className={styles.buttonContent}>
                            Game
                        </div>
                    </button>
                </div>
            </div>
        </main>
    )
}