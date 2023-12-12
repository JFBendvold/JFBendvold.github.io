import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "../style/dashboard.module.css";
import Header from "@/components/header/Header";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useRouter } from 'next/router'
import { getActiveUsers } from "@/services/UserService";

export default function Dashboard() {
    const mainRef = useRef(null);
    const contentRef = useRef(null);
    const [user, setUser] = useState({});
    const [style, setStyle] = useState("#FF70A6");
    const router = useRouter();
    const [activeUsers, setActiveUsers] = useState("...");

    useLayoutEffect(() => {
        // Change opacity of main element
        contentRef.current.style.opacity = 1;
        
        // Set background color
        mainRef.current.style.backgroundColor = `${style}`;
        document.body.style.background = `${style}`;

        // Get user from local storage
        const initialUser = localStorage.getItem('user') // Get user from local storage

        if (initialUser) { // If user is found in local storage
            setUser(JSON.parse(initialUser));
        } else {
            console.error("No user found in local storage");
        }

        getActiveUsers().then((response) => {
            if (response?.status === 200) {
                setActiveUsers(response.data);
            }
        });
    }, []);

    useEffect(() => {
        if (user && user.style) {
            setStyle(user.style);

            // Set background color
            mainRef.current.style.background = `${user.style}`;
        }

        return () => {
            document.body.style.background = `${style}`;
        }
    }, [user]);

    function goToGame() {
        // Play animation on content
        contentRef.current.style.transform = "translateX(-200vw)";
        contentRef.current.style.transition = "transform 0.5s ease-in-out";

        //Wait for 1 second
        setTimeout(() => {
            // Redirect to game page
            router.push('/game');
        }, 500);
    }

    function goToTutorial() {
        // Play animation on content
        contentRef.current.style.transform = "translateY(-200vw)";
        contentRef.current.style.opacity = 0;
        contentRef.current.style.transition = "all 0.5s ease-in-out";

        //Wait for 1 second
        setTimeout(() => {
            // Redirect to game page
            router.push('/tutorial');
        }, 500);
    }

    function goToFeedback() {
        // Play animation on content
        contentRef.current.style.transform = "translateY(-200vw)";
        contentRef.current.style.opacity = 0;
        contentRef.current.style.transition = "all 0.5s ease-in-out";

        //Wait for 1 second
        setTimeout(() => {
            // Redirect to game page
            router.push('/feedback');
        }, 500);
    }
    
    return (
        <main className={styles.main} ref={mainRef}>
            <Header />
            <div className={styles.content} ref={contentRef}>
                <div className={styles.section}>
                    <div className={styles.joinGameContainer}>
                        <div className={styles.topLeft}>
                            <p className={styles.topLeftText}>Active players: {activeUsers}</p>
                        </div>
                        <h1 className={styles.title}>Join a game</h1>
                        <button className={styles.button} onClick={goToGame}>
                            Find a game
                        </button>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.smallContainer} style={{backgroundImage: `url('/img/bg3.jpg')`}}>
                        <h1 className={styles.title}>Learn how to play</h1>
                        <button className={styles.button} onClick={goToTutorial}>
                            Tutorial
                        </button>
                    </div>
                    <div className={styles.smallContainer} style={{backgroundImage: `url('/img/bg4.jpg')`}}>
                        <h1 className={styles.title}>View your ranking</h1>
                        <Link className={styles.button} href="/leaderboard">
                            Leaderboard
                        </Link>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.feedbackContainer}>
                        <h1 className={styles.title}>Give us feedback</h1>
                        <button className={styles.button} onClick={goToFeedback}>
                            Feedback
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        </main>
    );
}