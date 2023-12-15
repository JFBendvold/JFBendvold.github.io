import { useEffect, useRef, useState, useLayoutEffect } from "react";
import styles from "../style/settings.module.css";
import Header from "@/components/header/Header";
import ProfileSettings from "@/components/settings/ProfileSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import WalletSettings from "@/components/settings/WalletSettings";
import AdminSettings from "@/components/settings/AdminSettings";
import RewardsSettings from "@/components/settings/RewardsSettings";
import { useRouter } from "next/router";
import { getAuthority } from "@/services/AuthorityService";

export default function Settings() {
    const mainRef = useRef(null);
    const contentRef = useRef(null);
    const [active, setActive] = useState(0);
    const [user, setUser] = useState({});
    const [style, setStyle] = useState("#FF70A6");
    const [isAdmin, setIsAdmin] = useState(false);
    const [openLeftMenu, setOpenLeftMenu] = useState(false);
    const router = useRouter();

    const isMetamaskUser = () => {
        return user?.metamask;
    }
   
    useLayoutEffect(() => {
        // Get user's authority
        getAuthority().then((response) => {
            if (response.data === "admin") {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        }).catch((error) => {
            console.log(error);
        });

        // Change opacity of main element
        contentRef.current.style.opacity = 1;

        // Get user from local storage
        const initialUser = localStorage.getItem('user') // Get user from local storage

        if (initialUser) { // If user is found in local storage
            setUser(JSON.parse(initialUser));
        } else {
            console.error("No user found in local storage");
            router.push('/login'); // Redirect to login page
        }

        // Check for query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get("page");
        if (page) {
            try {
                const toPage = parseInt(page);
                if (isMetamaskUser() && (toPage === 1 || toPage > 4)) {
                    setActive(0);
                }
                else {
                    setActive(toPage);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }, []);

    useEffect(() => {
        if (user && user.style) {
            setStyle(user.style);

            // Set background color
            document.body.style.background = `${user.style}`;
        }

        return () => {
            document.body.style.background = `${style}`;
        }
    }, [user]);

    return (
        <main className={styles.main} ref={mainRef}>
            <Header />
            <div className={styles.content} ref={contentRef}>
                <div className={styles.leftMenuButton} onClick={() => setOpenLeftMenu(!openLeftMenu)} style={{ left: openLeftMenu ? "200px" : 0 }}>
                    <span className="material-symbols-outlined">
                        {openLeftMenu ? "chevron_left" : "chevron_right"}
                    </span>
                </div>
                <div className={styles.leftMenu} style={{ left: openLeftMenu ? 0 : "-200px" }}>
                    <div className={styles.leftMenuHeader}>
                        <h1>Settings</h1>
                    </div>
                    <div className={styles.leftMenuContent}>
                        <ul>
                            <li>
                                <button className={active === 0 ? styles.active : ""} onClick={() => setActive(0)}>
                                    <span className="material-symbols-outlined">
                                        person
                                    </span>
                                    Profile
                                </button>
                            </li>
                            
                            { !isMetamaskUser() &&
                                <li>
                                    <button className={active === 1 ? styles.active : ""} 
                                    onClick={() => setActive(1)}>
                                        <span className="material-symbols-outlined">
                                            lock
                                        </span>
                                        Security
                                    </button>
                                </li>
                            }

                            <li>
                                <button className={active === 2 ? styles.active : ""} onClick={() => setActive(2)}>
                                    <span className="material-symbols-outlined">
                                        payment
                                    </span>
                                    Wallet
                                </button>
                            </li>
                            <li>
                                <button className={active === 3 ? styles.active : ""} onClick={() => setActive(3)}>
                                    <span className="material-symbols-outlined">
                                        card_giftcard
                                    </span>
                                    Rewards
                                </button>
                            </li>
                            <li>
                                <button className={active === 4 ? styles.active : ""} onClick={() => setActive(4)}>
                                    <span className="material-symbols-outlined">
                                        history
                                    </span>
                                    History
                                </button>
                            </li>
                            {isAdmin && !isMetamaskUser() && (
                                <li>
                                    <button className={active === 5 ? styles.active : ""} onClick={() => setActive(5)}>
                                        <span className="material-symbols-outlined">
                                            admin_panel_settings
                                        </span>
                                        Admin
                                    </button>
                                </li>
                            )
                            }
                        </ul>
                    </div>
                </div>
                <div className={styles.rightMenu}>
                    {active === 0 && <ProfileSettings user={user} />}
                    {active === 1 && <SecuritySettings user={user} />}
                    {active === 2 && <WalletSettings user={user} />}
                    {active === 3 && <RewardsSettings user={user} />}
                    {active === 4 && <h1>History</h1>}
                    {active === 5 && <AdminSettings user={user} />}
                </div>
            </div>
        </main>
    );
}